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
    
    const outerClass = cn(
      "no-invert group inline-flex items-stretch border p-0 cursor-pointer select-none rounded-none w-fit transition-colors duration-300",
      isDark
        ? "border-white/20 hover:border-[#FD4B32]"
        : "border-[#060606]/20 hover:border-[#FD4B32]",
      className
    );

    const leftSquareClass = cn(
      "w-12 h-12 flex items-center justify-center border-r transition-colors duration-300 shrink-0",
      isDark
        ? "bg-white text-black border-white/20 group-hover:bg-[#FD4B32] group-hover:text-white"
        : "bg-[#060606] text-white border-[#060606]/20 group-hover:bg-[#FD4B32] group-hover:text-white"
    );

    const rightRectClass = cn(
      "px-6 flex items-center font-sans text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 flex-grow justify-center",
      isDark
        ? "bg-[#060606] text-white group-hover:text-[#FD4B32]"
        : "bg-white text-black group-hover:text-[#FD4B32]"
    );

    const ArrowIcon = () => (
      <svg 
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    );

    const splitContent = (
      <>
        <div className={leftSquareClass}>
          <ArrowIcon />
        </div>
        <div className={rightRectClass}>
          <span>{text}</span>
        </div>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={outerClass}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          style={{ borderRadius: 0 }}
        >
          {splitContent}
        </a>
      );
    }

    return (
      <button
        type={type}
        className={outerClass}
        onClick={onClick}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...props}
        style={{ borderRadius: 0 }}
      >
        {splitContent}
      </button>
    );
  }
);

Button01.displayName = 'Button01';
