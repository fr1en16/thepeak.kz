import React from 'react';
import { cn } from '@/lib/utils';

interface Button01Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href?: string;
  className?: string;
  variant?: 'light' | 'dark';
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Button01 = React.forwardRef<HTMLElement, Button01Props>(
  ({ text, href, className, onClick, type = 'button', variant = 'light', ...props }, ref) => {
    const isDark = variant === 'dark';
    
    const commonClass = cn(
      "no-invert inline-flex items-center justify-between gap-3 px-5 py-5 whitespace-nowrap transition-all duration-300 group font-sans text-xs uppercase tracking-[0.2em] font-semibold border cursor-pointer select-none",
      isDark
        ? "border-white/20 text-white hover:border-[#FD4B32] hover:text-[#FD4B32] hover:bg-white/5"
        : "border-black/20 text-[#1a1a1a] hover:border-[#FD4B32] hover:text-[#FD4B32] hover:bg-black/5",
      className
    );

    const ArrowIcon = () => (
      <svg 
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    );

    const innerContent = (
      <>
        <span>{text}</span>
        <ArrowIcon />
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={commonClass}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          style={{ borderRadius: 0 }}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button
        type={type}
        className={commonClass}
        onClick={onClick}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...props}
        style={{ borderRadius: 0 }}
      >
        {innerContent}
      </button>
    );
  }
);

Button01.displayName = 'Button01';
