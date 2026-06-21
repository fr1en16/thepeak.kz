"use client";

import React, { useRef, useMemo, useCallback, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { formatTypography } from "@/utils/typography";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

interface CaseItem {
  logo: string;
  type: string;
  text: string;
  image: string;
  className?: string;
  href?: string;
}


interface InfiniteGalleryProps {
  cases: CaseItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  fadeSettings?: {
    fadeIn: { start: number; end: number };
    fadeOut: { start: number; end: number };
  };
  blurSettings?: {
    blurIn: { start: number; end: number };
    blurOut: { start: number; end: number };
    maxBlur: number;
  };
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 7;
const MAX_VERTICAL_OFFSET = 4.5;

// Custom shader material for liquid blur, opacity, and waving cloth effects
const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Smooth curving based on scroll velocity
        float curveIntensity = scrollForce * 0.25;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.5 + scrollForce * 2.5) * 0.015;
        float ripple2 = sin(pos.y * 3.0 + scrollForce * 1.5) * 0.01;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 6.0;
          float waveAmplitude = sin(wavePhase) * 0.08;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          float secondaryWave = sin(pos.x * 6.0 + time * 10.0) * 0.02 * dampening;
          flagWave += secondaryWave;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Subtle highlight based on curving
        float curveHighlight = abs(scrollForce) * 0.03;
        color.rgb += vec3(curveHighlight * 0.1);
        
        // Slight darkening overlay for text legibility (less darkening since we use HTML gradient)
        color.rgb *= 0.85;
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

const getLogoPath = (logo: string): string => {
  const name = logo.toLowerCase();
  if (name.includes("gippo")) return "/logo/clot-5.webp";
  if (name.includes("dodo")) return "/logo/clot-44.webp";
  if (name.includes("sensata")) return "/logo/clot-11.webp";
  if (name.includes("diskokras")) return "/logo/clot-2.webp";
  if (name.includes("qazsip")) return "/logo/clot-41.webp";
  if (name.includes("lukoil")) return "/logo/clot-12.webp";
  if (name.includes("вираж")) return "/logo/clot-24.webp";
  if (name.includes("тут")) return "/logo/clot-57.webp";
  if (name.includes("metro")) return "/logo/clot-40.webp";
  if (name.includes("compass")) return "/logo/clot-13.webp";
  return "";
};

const renderBrandLogo = (logo: string) => {
  const logoPath = getLogoPath(logo);
  const parts = logo.split(" / ");
  const displayName = parts[parts.length - 1]; // take "DODO PIZZA" from "HIGHTOWER / DODO PIZZA"
  
  if (logoPath) {
    return (
      <img
        src={logoPath}
        alt={displayName}
        className="h-[42px] w-auto max-w-[150px] object-contain select-none"
      />
    );
  }
  
  return (
    <span className="font-sans font-extrabold text-[12px] tracking-wider text-white uppercase leading-none select-none">
      {displayName}
    </span>
  );
};



function CasePlane({
  texture,
  position,
  scale,
  material,
  caseData,
  groupRef,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
  caseData: CaseItem;
  groupRef: React.Ref<THREE.Group>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (material && texture) {
      material.uniforms.map.value = texture;
    }
  }, [material, texture]);

  useEffect(() => {
    if (material && material.uniforms) {
      material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
    }
  }, [material, isHovered]);

  return (
    <group ref={groupRef} position={position}>
      {/* 3D mesh background plane with cloth shader */}
      <mesh
        ref={meshRef}
        scale={scale}
        material={material}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => {
          if (caseData.href) {
            router.push(caseData.href);
          }
        }}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
      </mesh>

      {/* HTML overlay positioned slightly in front of the mesh */}
      <Html
        transform
        distanceFactor={3.2} // Controls perspective size scaling (aligns with w-275 and h-350 to match [2.2, 2.8] mesh scale)
        position={[0, 0, 0.04]} // Slightly in front of the mesh plane
        pointerEvents="none" // Pass pointer events to mesh so hover state works
        className="w-[275px] h-[350px] flex flex-col justify-between text-white select-none no-invert px-2 py-6 bg-gradient-to-b from-black/45 via-transparent to-black/80"
      >
        {/* Top bar */}
        <div className="flex justify-between items-start w-full">
          {renderBrandLogo(caseData.logo)}
          <span className="text-[11px] font-sans font-medium text-white/95 lowercase tracking-wide mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {caseData.type}
          </span>
        </div>

        {/* Bottom text */}
        <div className="w-full">
          <p className="font-sans font-normal text-[13px] leading-relaxed text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.8)]">
            {formatTypography(caseData.text)}
          </p>
        </div>
      </Html>
    </group>
  );
}

function GalleryScene({
  cases,
  scrollProgressRef,
}: {
  cases: CaseItem[];
  scrollProgressRef: React.RefObject<number>;
}) {
  const textures = useTexture(cases.map((c) => c.image));

  const materials = useMemo(
    () => Array.from({ length: cases.length }, () => createClothMaterial()),
    [cases.length]
  );

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];

    for (let i = 0; i < cases.length; i++) {
      const isLeft = i % 2 === 0;
      const sideSign = isLeft ? -1 : 1;

      const baseHorizontalOffset = 3.0;
      const horizontalVariation = (i % 3) * 1.4; // 0, 1.4, 2.8
      const x = sideSign * (baseHorizontalOffset + horizontalVariation);

      const y = Math.sin(i * 1.9) * 1.6;

      positions.push({ x, y });
    }

    return positions;
  }, [cases.length]);

  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const currentScrollZ = useRef(0);

  useFrame((state, delta) => {
    const spacing = 14;
    const maxScrollZ = (cases.length - 1) * spacing;
    const targetScrollZ = (scrollProgressRef.current ?? 0) * maxScrollZ;

    // Smooth interpolation (lerp)
    currentScrollZ.current = THREE.MathUtils.lerp(currentScrollZ.current, targetScrollZ, 0.1);

    const velocity = (targetScrollZ - currentScrollZ.current) * 0.15;
    const time = state.clock.getElapsedTime();

    materials.forEach((material) => {
      if (material && material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.scrollForce.value = velocity;
      }
    });

    cases.forEach((_, i) => {
      const cardZ = -6 - i * spacing + currentScrollZ.current;
      const group = groupRefs.current[i];
      if (group) {
        group.position.z = cardZ;
      }

      let opacity = 0;
      let blur = 6.0;
      if (cardZ <= 0) {
        if (cardZ >= -4) {
          const progress = cardZ / -4;
          opacity = Math.max(0, Math.min(1, progress));
          blur = 0;
        } else if (cardZ >= -20) {
          opacity = 1.0;
          blur = 0;
        } else if (cardZ >= -40) {
          const progress = (cardZ + 40) / 20;
          opacity = Math.max(0, Math.min(1, progress));
          blur = 6.0 * (1 - opacity);
        }
      }

      const material = materials[i];
      if (material && material.uniforms) {
        material.uniforms.opacity.value = opacity;
        material.uniforms.blurAmount.value = blur;
      }
    });
  });

  if (cases.length === 0) return null;

  return (
    <>
      {cases.map((caseData, i) => {
        const texture = textures[i];
        const material = materials[i];
        const spatial = spatialPositions[i];

        if (!texture || !material || !spatial) return null;

        const scale: [number, number, number] = [2.2, 2.8, 1];
        const initialZ = -6 - i * 14;

        return (
          <CasePlane
            key={i}
            texture={texture}
            position={[spatial.x, spatial.y, initialZ]}
            scale={scale}
            material={material}
            caseData={caseData}
            groupRef={(el) => {
              groupRefs.current[i] = el;
            }}
          />
        );
      })}
    </>
  );
}

// Fallback plain layout for devices without WebGL support
function FallbackCases({ cases }: { cases: CaseItem[] }) {
  return (
    <div className="w-full bg-brand-light-gray/10 px-[var(--page-margin)] py-12">
      <div className="max-w-7xl mx-auto">
        <BentoGrid>
          {cases.map((c, i) => (
            <BentoCard
              key={i}
              className={c.className}
              href={c.href}
              background={
                <img src={c.image} alt={c.logo} className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105" />
              }
              logo={renderBrandLogo(c.logo)}
              type={c.type}
              text={formatTypography(c.text)}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}


export default function CasesGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const [webglSupported, setWebglSupported] = useState(true);

  const casesData: CaseItem[] = [
    {
      logo: "GIPPO",
      type: "smm, таргет",
      text: "Построили дерзкий street food-бренд в Instagram и TikTok: viral-контент, офлайн-активации и механики, которые давали х2 рост продаж за два дня.",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
    },
    {
      logo: "HIGHTOWER / DODO PIZZA",
      type: "сайт",
      text: "Лендинг для привлечения сотрудников и арендаторов помещений под пиццерии.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
    },
    {
      logo: "SENSATA GROUP",
      type: "продакшн",
      text: "Имиджевый продакшн полного цикла: от разработки концепции и сценария до съемок масштабных строительных объектов и финального монтажа.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
    },
    {
      logo: "Diskokras",
      type: "smm",
      text: "Построили личный бренд вокруг владельца, органический рост и живое комьюнити вместо обычной страницы автосервиса.",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
      href: "/cases/diskokras",
    },
    {
      logo: "Qazsip",
      type: "таргет",
      text: "Настроили таргет, отсеяли нецелевой трафик — и в первый месяц получили 3 крупные продажи при цене лида меньше $1.30.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
    },
    {
      logo: "LUKOIL",
      type: "smm",
      text: "Выстроили современную коммуникацию для крупнейшего бренда: Instagram, TikTok, YouTube, дизайн дрифт-кара и х2 рост охватов.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    },
    {
      logo: "ВИРАЖ ГРУППА",
      type: "таргет",
      text: "Таргет для автохолдинга: 40 000+ лидов для FAW Kazakhstan и 10 000+ заявок для UAZ Kazakhstan, стоимость лида от $2.2 до $3.7.",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    },
    {
      logo: "Я ТУТ",
      type: "лого",
      text: "Логотип с тёплой природной эстетикой и глубоким смыслом для базы отдыха.",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-1",
    },
    {
      logo: "METRO",
      type: "продакшн",
      text: "Продакшн рекламных и презентационных роликов для торговой сети: съемки торговых залов, новинок меню и крупных ритейл-эвентов.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1",
    },
    {
      logo: "Compass Consulting",
      type: "брендинг, сайт",
      text: "Комплексный брендинг и современный корпоративный сайт для одной из крупнейших консалтинговых компаний Узбекистана.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      className: "col-span-1 lg:col-span-1 lg:row-span-2",
    },
  ];


  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!webglSupported) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const totalScroll = totalHeight - viewportHeight;
      if (totalScroll <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, [webglSupported]);

  const totalScrollHeight = webglSupported ? `${200 + casesData.length * 15}vh` : "auto";

  return (
    <section
      ref={sectionRef}
      className="col-span-12 w-[calc(100%+2*var(--page-margin))] -ml-[var(--page-margin)] bg-white select-none overflow-visible"
      style={{ height: totalScrollHeight }}
      id="cases"
    >
      {webglSupported ? (
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-white border-b border-brand-gray/10">
          {/* Header Container (Normal flow at the top, centered, white background for maximum readability) */}
          <div className="swiss-grid pt-[clamp(3.5rem,7vw,7rem)] pb-10 text-center">
            <div className="col-span-12 flex flex-col items-center justify-center text-center">
              <h2 className="font-headline font-semibold text-brand-gray text-[clamp(1.6rem,2.91vw,2.5rem)] leading-[0.9] mb-6 select-none text-center no-invert">
                {formatTypography("За каждым кейсом стоят стратегия,")} <br />
                {formatTypography("сильная команда и конкретные показатели.")}
              </h2>
              <p className="font-sans font-medium text-brand-gray/80 text-[clamp(1.05rem,1.3vw,1.35rem)] leading-relaxed max-w-[1100px] select-none text-center mt-2 no-invert">
                {formatTypography(
                  "Мы работаем с бизнесом, который хочет расти, а не просто присутствовать в digital.",
                )}
              </p>
            </div>
          </div>

          {/* Canvas Wrapper (Uses flex-grow to automatically fill remaining viewport height inside sticky parent) */}
          <div
            ref={containerRef}
            className="w-full relative flex-grow overflow-hidden select-none cursor-default border-t border-brand-gray/10 bg-brand-light-gray/5"
          >
            <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <GalleryScene cases={casesData} scrollProgressRef={scrollProgressRef} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-hidden border-b border-brand-gray/10">
          {/* Header Container */}
          <div className="swiss-grid pt-[clamp(3.5rem,7vw,7rem)] pb-10 text-center">
            <div className="col-span-12 flex flex-col items-center justify-center text-center">
              <h2 className="font-headline font-semibold text-brand-gray text-[clamp(1.6rem,2.91vw,2.5rem)] leading-[0.9] mb-6 select-none text-center no-invert">
                {formatTypography("За каждым кейсом стоят стратегия,")} <br />
                {formatTypography("сильная команда и конкретные показатели.")}
              </h2>
              <p className="font-sans font-medium text-brand-gray/80 text-[clamp(1.05rem,1.3vw,1.35rem)] leading-relaxed max-w-[1100px] select-none text-center mt-2 no-invert">
                {formatTypography(
                  "Мы работаем с бизнесом, который хочет расти, а не просто присутствовать в digital.",
                )}
              </p>
            </div>
          </div>

          {/* Fallback List */}
          <div ref={containerRef} className="w-full relative h-auto overflow-hidden select-none border-t border-brand-gray/10">
            <FallbackCases cases={casesData} />
          </div>
        </div>
      )}
    </section>
  );
}
