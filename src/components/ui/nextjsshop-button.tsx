import React from 'react';
import { cn } from '@/lib/utils';

interface Button01Props extends React.AllHTMLAttributes<HTMLElement> {
  text: string;
  href?: string;
  className?: string;
  variant?: 'light' | 'dark';
  onClick?: React.MouseEventHandler<any>;
}

export const Button01 = React.forwardRef<HTMLElement, Button01Props>(
  ({ text, href, className, onClick, type = 'button', variant = 'light', disabled, ...props }, ref) => {
    const isDark = variant === 'dark';
    const buttonClass = cn(
      "button01", 
      isDark && "dark", 
      disabled && "opacity-50 pointer-events-none",
      className
    );

    const content = (
      <>
        <span className="button01_bg">
          <span className="button01_bg-mid"></span>
          <span className="button01_bg-right">
            {[...Array(25)].map((_, index) => {
              // Deterministic pseudo-random index to prevent SSR hydration mismatches
              const delayIndex = (index * 7 + 3) % 4;
              return (
                <span
                  key={`pixel-${index}`}
                  style={{ '--index': delayIndex } as React.CSSProperties}
                  className="button01_bg-pixel"
                ></span>
              );
            })}
          </span>
          <span className="button01_bg-right-overlay">
            {[...Array(11)].map((_, index) => {
              // Deterministic pseudo-random index to prevent SSR hydration mismatches
              const delayIndex = 4 + ((index * 13 + 5) % 4);
              return (
                <span
                  key={`overlay-${index}`}
                  style={{ '--index': delayIndex } as React.CSSProperties}
                  className="button01_bg-pixel"
                ></span>
              );
            })}
          </span>
        </span>
        <span data-text={text} className="button01_inner">
          <span className="button01_text">{text}</span>
        </span>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={buttonClass}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          style={{ '--characters': text.length } as React.CSSProperties}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        type={type as any}
        className={buttonClass}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={disabled}
        style={{ '--characters': text.length } as React.CSSProperties}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button01.displayName = 'Button01';
