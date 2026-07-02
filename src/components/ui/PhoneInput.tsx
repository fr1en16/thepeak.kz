"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

const countries: Country[] = [
  { code: "KZ", name: "Казахстан", flag: "🇰🇿", prefix: "+7" },
  { code: "RU", name: "Россия", flag: "🇷🇺", prefix: "+7" },
  { code: "BY", name: "Беларусь", flag: "🇧🇾", prefix: "+375" },
  { code: "UA", name: "Украина", flag: "🇺🇦", prefix: "+380" },
  { code: "KG", name: "Кыргызстан", flag: "🇰🇬", prefix: "+996" },
  { code: "UZ", name: "Узбекистан", flag: "🇺🇿", prefix: "+998" },
  { code: "US", name: "США", flag: "🇺🇸", prefix: "+1" },
  { code: "DE", name: "Германия", flag: "🇩🇪", prefix: "+49" },
  { code: "GB", name: "Великобритания", flag: "🇬🇧", prefix: "+44" },
  { code: "FR", name: "Франция", flag: "🇫🇷", prefix: "+33" },
  { code: "OTHER", name: "Другая", flag: "🌏", prefix: "+" },
];

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  theme?: "light" | "dark";
  required?: boolean;
  variant?: "bottom" | "box";
  disabled?: boolean;
}

export default function PhoneInput({ value, onChange, theme = "light", required = true, variant = "bottom", disabled = false }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const didDetectCountryRef = useRef(false);
  const initialOnChangeRef = useRef(onChange);
  const initialValueRef = useRef(value);

  // 1. Automatic Country Selection by User Location/Timezone/Locale on Mount
  useEffect(() => {
    if (didDetectCountryRef.current) {
      return;
    }

    didDetectCountryRef.current = true;

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const lang = navigator.language || "";
      let detectedCountry = countries[0]; // Default to Kazakhstan

      if (tz.includes("Minsk") || lang.includes("BY")) {
        detectedCountry = countries.find((c) => c.code === "BY") || countries[0];
      } else if (tz.includes("Kyiv") || tz.includes("Kiev") || tz.includes("Uzhgorod") || tz.includes("Zaporozhye") || lang.includes("UA")) {
        detectedCountry = countries.find((c) => c.code === "UA") || countries[0];
      } else if (tz.includes("Bishkek") || lang.includes("KG")) {
        detectedCountry = countries.find((c) => c.code === "KG") || countries[0];
      } else if (tz.includes("Tashkent") || tz.includes("Samarkand") || lang.includes("UZ")) {
        detectedCountry = countries.find((c) => c.code === "UZ") || countries[0];
      } else if (tz.includes("America") || lang.includes("US") || lang.includes("en-US")) {
        detectedCountry = countries.find((c) => c.code === "US") || countries[0];
      } else if (tz.includes("Berlin") || tz.includes("Busingen") || lang.includes("DE")) {
        detectedCountry = countries.find((c) => c.code === "DE") || countries[0];
      } else if (tz.includes("London") || lang.includes("GB") || lang.includes("en-GB")) {
        detectedCountry = countries.find((c) => c.code === "GB") || countries[0];
      } else if (tz.includes("Paris") || lang.includes("FR")) {
        detectedCountry = countries.find((c) => c.code === "FR") || countries[0];
      } else if (
        tz.includes("Almaty") ||
        tz.includes("Qostanay") ||
        tz.includes("Qyzylorda") ||
        tz.includes("Aqtobe") ||
        tz.includes("Atyrau") ||
        tz.includes("Oral") ||
        tz.includes("Aqtau") ||
        lang.includes("KZ")
      ) {
        detectedCountry = countries.find((c) => c.code === "KZ") || countries[0];
      } else if (
        tz.includes("Moscow") ||
        tz.includes("Novosibirsk") ||
        tz.includes("Yekaterinburg") ||
        tz.includes("Vladivostok") ||
        tz.includes("Krasnoyarsk") ||
        tz.includes("Irkutsk") ||
        tz.includes("Yakutsk") ||
        tz.includes("Khabarovsk") ||
        tz.includes("Kaliningrad") ||
        tz.includes("Samara") ||
        lang.includes("RU")
      ) {
        detectedCountry = countries.find((c) => c.code === "RU") || countries[0];
      }

      setSelectedCountry(detectedCountry);
      const initialValue = initialValueRef.current;
      if (!initialValue || initialValue === "+7" || initialValue === "+") {
        initialOnChangeRef.current(detectedCountry.prefix + " ");
      }
    } catch {
      // Fail silently
    }
  }, []);

  // 2. Click outside dropdown handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Phone local formatter (excludes prefix from the input box)
  const formatLocalPhone = (rawVal: string, country: Country) => {
    let clean = rawVal.replace(/\D/g, "");
    const getNationalDigitLimit = (code: string) => {
      if (code === "KZ" || code === "RU" || code === "US" || code === "DE" || code === "GB") return 10;
      if (code === "BY" || code === "UA" || code === "UZ" || code === "KG" || code === "FR") return 9;
      return 20;
    };
    
    // Strip dial code only when the user typed/pasted a full international number.
    // A single leading 7 is a valid first local digit for Kazakhstan numbers.
    const dialCodeNoPlus = country.prefix.replace("+", "");
    const hasExplicitCountryCode =
      rawVal.trim().startsWith("+") ||
      (clean.length > getNationalDigitLimit(country.code) && clean.startsWith(dialCodeNoPlus));

    if (dialCodeNoPlus && hasExplicitCountryCode) {
      clean = clean.substring(dialCodeNoPlus.length);
    }
    
    if ((country.code === "KZ" || country.code === "RU") && clean.length === 11 && clean.startsWith("8")) {
      clean = clean.substring(1);
    }

    if (country.code === "KZ" || country.code === "RU" || country.code === "US" || country.code === "DE" || country.code === "GB") {
      clean = clean.substring(0, 10);
      let formatted = "";
      if (clean.length > 0) {
        formatted += "(" + clean.substring(0, 3);
      }
      if (clean.length >= 3) {
        formatted += ") " + clean.substring(3, 6);
      }
      
      if (country.code === "US" || country.code === "DE" || country.code === "GB") {
        if (clean.length >= 6) {
          formatted += "-" + clean.substring(6, 10);
        }
      } else {
        if (clean.length >= 6) {
          formatted += "-" + clean.substring(6, 8);
        }
        if (clean.length >= 8) {
          formatted += "-" + clean.substring(8, 10);
        }
      }
      return formatted;
    }

    if (country.code === "BY" || country.code === "UA" || country.code === "UZ") {
      clean = clean.substring(0, 9);
      let formatted = "";
      if (clean.length > 0) {
        formatted += "(" + clean.substring(0, 2);
      }
      if (clean.length >= 2) {
        formatted += ") " + clean.substring(2, 5);
      }
      if (clean.length >= 5) {
        formatted += "-" + clean.substring(5, 7);
      }
      if (clean.length >= 7) {
        formatted += "-" + clean.substring(7, 9);
      }
      return formatted;
    }

    if (country.code === "KG") {
      clean = clean.substring(0, 9);
      let formatted = "";
      if (clean.length > 0) {
        formatted += "(" + clean.substring(0, 3);
      }
      if (clean.length >= 3) {
        formatted += ") " + clean.substring(3, 6);
      }
      if (clean.length >= 6) {
        formatted += "-" + clean.substring(6, 9);
      }
      return formatted;
    }

    if (country.code === "FR") {
      clean = clean.substring(0, 9);
      let formatted = "";
      if (clean.length > 0) {
        formatted += "(" + clean.substring(0, 1);
      }
      if (clean.length >= 1) {
        formatted += ") " + clean.substring(1, 3);
      }
      if (clean.length >= 3) {
        formatted += "-" + clean.substring(3, 5);
      }
      if (clean.length >= 5) {
        formatted += "-" + clean.substring(5, 7);
      }
      if (clean.length >= 7) {
        formatted += "-" + clean.substring(7, 9);
      }
      return formatted;
    }

    return clean;
  };

  const getLocalPart = (fullVal: string, country: Country) => {
    if (!fullVal) return "";
    if (fullVal.startsWith(country.prefix)) {
      return fullVal.substring(country.prefix.length).trim();
    }
    return fullVal;
  };

  const localValue = getLocalPart(value, selectedCountry);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    
    // BACKSPACE BUG FIX
    if (rawValue.length < localValue.length) {
      const lastCharDeleted = localValue[rawValue.length];
      if (/\D/.test(lastCharDeleted)) {
        const newDigits = rawValue.replace(/\D/g, "");
        if (newDigits.length > 0) {
          const cleanDigits = newDigits.substring(0, newDigits.length - 1);
          rawValue = cleanDigits;
        }
      }
    }
    
    const formattedLocal = formatLocalPhone(rawValue, selectedCountry);
    const fullNumber = formattedLocal ? `${selectedCountry.prefix} ${formattedLocal}` : "";
    onChange(fullNumber);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    onChange(country.prefix + " ");
  };

  const isDark = theme === "dark";
  const isBox = variant === "box";

  const getPlaceholder = (code: string) => {
    switch (code) {
      case "KZ":
      case "RU":
        return "(700) 000-00-00";
      case "US":
      case "DE":
      case "GB":
        return "(555) 000-0000";
      case "BY":
      case "UA":
      case "UZ":
        return "(29) 000-00-00";
      case "KG":
        return "(500) 000-000";
      case "FR":
        return "(6) 00-00-00-00";
      default:
        return "0000000000";
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`no-invert flex items-center relative transition-colors duration-200 ${
        isBox
          ? isDark
            ? "bg-white/5 border border-white/10 focus-within:border-white/30 px-3 py-2.5 rounded-none"
            : "bg-black/5 border border-black/10 focus-within:border-black/30 px-3 py-2.5 rounded-none"
          : `border-b py-1.5 ${
              isDark
                ? "border-white/20 focus-within:border-[#FD4B32]"
                : "border-brand-gray/30 focus-within:border-brand-red"
            }`
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Country Selector Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2 py-1 select-none cursor-pointer text-sm font-sans disabled:cursor-not-allowed ${
          isDark ? "text-white hover:bg-white/5" : "text-brand-gray hover:bg-black/5"
        }`}
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="font-semibold text-xs opacity-80">{selectedCountry.prefix}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
      </button>

      {/* Vertical Divider */}
      <div className={`w-px h-6 mx-1 ${isDark ? "bg-white/10" : "bg-brand-gray/20"}`} />

      {/* Text Input */}
      <input
        type="text"
        required={required}
        disabled={disabled}
        value={localValue}
        onChange={handleInputChange}
        placeholder={getPlaceholder(selectedCountry.code)}
        className={`flex-grow bg-transparent text-sm font-sans px-2.5 py-1 outline-none rounded-none border-none disabled:cursor-not-allowed ${
          isDark ? "text-white placeholder-white/20" : "text-brand-gray placeholder-brand-gray/30"
        }`}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 top-full mt-1.5 z-50 border rounded-none w-56 shadow-lg py-1 max-h-60 overflow-y-auto ${
            isDark ? "bg-[#0c0c0c] border-white/10 text-white" : "bg-white border-brand-gray/15 text-brand-gray"
          }`}
        >
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              disabled={disabled}
              onClick={() => handleCountrySelect(country)}
              className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-xs font-sans transition-colors cursor-pointer disabled:cursor-not-allowed ${
                isDark ? "hover:bg-white/5" : "hover:bg-brand-light-gray"
              }`}
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span className="font-semibold w-12 shrink-0">{country.prefix}</span>
              <span className="opacity-80 truncate">{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
