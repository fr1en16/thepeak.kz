import React from "react";
import { cn } from "@/lib/utils";

interface OfferButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  href?: string;
  drawerTopText?: string;
  drawerBottomText?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const OfferButton = React.forwardRef<HTMLElement, OfferButtonProps>(
  (
    {
      text,
      href,
      drawerTopText = "акция истекает...",
      drawerBottomText = "...8 часов",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // Custom timing function for the smooth 300ms transition
    const drawerTransitionClass =
      "transition-[transform,opacity,filter] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]";

    const content = (
      <div className={cn("relative flex items-center justify-center group select-none w-full sm:w-auto", className)}>
        {/* Top Drawer */}
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 h-8 px-4 w-fit whitespace-nowrap flex items-center justify-center bg-[#060606] text-white text-[10px] uppercase font-bold tracking-wider opacity-0 pointer-events-none transform translate-y-0 rotate-0 z-0",
            "group-hover:translate-y-[-36px] group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:pointer-events-auto",
            drawerTransitionClass
          )}
          style={{ borderRadius: 0 }}
        >
          {drawerTopText}
        </div>

        {/* Bottom Drawer */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-8 px-4 w-fit whitespace-nowrap flex items-center justify-center bg-[#060606] text-white text-[10px] uppercase font-bold tracking-wider opacity-0 pointer-events-none transform translate-y-0 rotate-0 z-0",
            "group-hover:translate-y-[36px] group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:pointer-events-auto",
            drawerTransitionClass
          )}
          style={{ borderRadius: 0 }}
        >
          {drawerBottomText}
        </div>

        {/* Main Button */}
        {href ? (
          <a
            href={href}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            className={cn(
              "no-invert relative z-10 w-full min-w-[200px] min-h-[48px] px-8 py-3 border flex items-center justify-center cursor-pointer font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300",
              "bg-white text-black border-[#060606]/20",
              "hover:bg-[#FD4B32] hover:text-white hover:border-[#FD4B32] hover:scale-105"
            )}
            style={{ borderRadius: 0 }}
            {...props}
          >
            <span className="relative z-20">{text}</span>
          </a>
        ) : (
          <button
            onClick={onClick}
            ref={ref as React.ForwardedRef<HTMLButtonElement>}
            className={cn(
              "no-invert relative z-10 w-full min-w-[200px] min-h-[48px] px-8 py-3 border flex items-center justify-center cursor-pointer font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300",
              "bg-white text-black border-[#060606]/20",
              "hover:bg-[#FD4B32] hover:text-white hover:border-[#FD4B32] hover:scale-105"
            )}
            style={{ borderRadius: 0 }}
            type="button"
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            <span className="relative z-20">{text}</span>
          </button>
        )}
      </div>
    );

    return content;
  }
);

OfferButton.displayName = "OfferButton";
