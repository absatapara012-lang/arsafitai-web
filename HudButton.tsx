import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface HudButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  glow?: boolean;
}

export function HudButton({ 
  children, 
  className, 
  variant = "primary", 
  glow = true,
  ...props 
}: HudButtonProps) {
  const baseStyles = "relative px-8 py-4 font-bold uppercase tracking-widest transition-all duration-200 border group overflow-hidden";
  
  const variants = {
    primary: "bg-[#22D3EE] text-[#0F172A] border-[#0F172A] hover:bg-[#22D3EE]/90",
    secondary: "bg-white text-[#0F172A] border-[#22D3EE] hover:bg-[#F1F5F9]",
    danger: "bg-white text-destructive border border-destructive hover:bg-destructive hover:text-white"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles, 
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
