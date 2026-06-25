import Link from "next/link";
import { cn } from "@/lib/utils";

type PrivacyConsentCheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  variant?: "light" | "dark";
};

export default function PrivacyConsentCheckbox({
  checked,
  onCheckedChange,
  disabled,
  variant = "dark",
}: PrivacyConsentCheckboxProps) {
  const isDark = variant === "dark";

  return (
    <label
      className={cn(
        "no-invert flex items-start gap-3 font-sans text-xs font-medium leading-relaxed",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        isDark ? "text-white/60" : "text-brand-gray/60"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded-none border bg-transparent accent-[#FD4B32]",
          isDark ? "border-white/25" : "border-brand-gray/25"
        )}
      />
      <span>
        Я согласен с{"\u00a0"}
        <Link
          href="/privacy"
          target="_blank"
          className={cn(
            "underline underline-offset-4 transition-colors",
            isDark ? "hover:text-white" : "hover:text-brand-red"
          )}
        >
          политикой конфиденциальности
        </Link>
      </span>
    </label>
  );
}
