import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface HudButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function HudButton({
  children,
  className,
  variant = "primary",
  ...props
}: HudButtonProps) {
  const base =
    "relative px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 border overflow-hidden lift-hover";

  const variants = {
    primary:
      "bg-[#22D3EE] text-[#0F172A] border-[#22D3EE] hover:bg-[#22D3EE]/90 cyan-glow",
    secondary:
      "bg-white text-[#0F172A] border-[#22D3EE] hover:bg-[#F1F5F9] cyan-glow",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
