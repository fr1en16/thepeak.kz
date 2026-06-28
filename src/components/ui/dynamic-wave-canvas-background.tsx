"use client";

import React, { useEffect, useRef } from 'react';

const HeroWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mainCtx = canvas.getContext("2d");
    if (!mainCtx) return;

    // Small offscreen canvas — we render at 1/6 resolution then upscale
    const SCALE = 6;
    const offscreen = document.createElement("canvas");
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let imageData: ImageData;
    let data: Uint8ClampedArray;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = Math.ceil(canvas.width / SCALE);
      height = Math.ceil(canvas.height / SCALE);
      offscreen.width = width;
      offscreen.height = height;
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Lookup tables for fast trig
    const TABLE_SIZE = 512;
    const SIN_TABLE = new Float32Array(TABLE_SIZE);
    const COS_TABLE = new Float32Array(TABLE_SIZE);
    for (let i = 0; i < TABLE_SIZE; i++) {
      const angle = (i / TABLE_SIZE) * Math.PI * 2;
      SIN_TABLE[i] = Math.sin(angle);
      COS_TABLE[i] = Math.cos(angle);
    }

    const MASK = TABLE_SIZE - 1;
    const SCALE_TO_TABLE = TABLE_SIZE / (Math.PI * 2);

    const fastSin = (x: number) => {
      let idx = (x * SCALE_TO_TABLE) | 0;
      idx = ((idx % TABLE_SIZE) + TABLE_SIZE) & MASK;
      return SIN_TABLE[idx];
    };
    const fastCos = (x: number) => {
      let idx = (x * SCALE_TO_TABLE) | 0;
      idx = ((idx % TABLE_SIZE) + TABLE_SIZE) & MASK;
      return COS_TABLE[idx];
    };

    let animationFrameId: number;
    const startTime = performance.now();
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 24; // 24 fps cap

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (now - lastTime < FRAME_INTERVAL) return;
      lastTime = now;

      const time = (now - startTime) * 0.001;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const u_x = (2 * x - width) / height;
          const u_y = (2 * y - height) / height;

          let a = 0;
          let d = 0;

          for (let i = 0; i < 3; i++) {
            a += fastCos(i - d + time * 0.5 - a * u_x);
            d += fastSin(i * u_y + a);
          }

          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const intensity = 0.3 + 0.4 * wave;
          const baseVal = 0.1 + 0.15 * fastCos(u_x + u_y + time * 0.3);
          const blueAccent = 0.2 * fastSin(a * 1.5 + time * 0.2);
          const purpleAccent = 0.15 * fastCos(d * 2 + time * 0.1);

          const r = Math.max(0, Math.min(1, baseVal + purpleAccent * 0.8)) * intensity;
          const g = Math.max(0, Math.min(1, baseVal + blueAccent * 0.6)) * intensity;
          const b = Math.max(0, Math.min(1, baseVal + blueAccent * 1.2 + purpleAccent * 0.4)) * intensity;

          const idx = (y * width + x) * 4;
          data[idx]     = r * 255;
          data[idx + 1] = g * 255;
          data[idx + 2] = b * 255;
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Upscale to the visible canvas
      mainCtx.imageSmoothingEnabled = true;
      mainCtx.imageSmoothingQuality = "low";
      mainCtx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity: 0.45, filter: "blur(12px)" }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HeroWave;
