import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  delay?: number;
}

export function TechCard({ title, children, icon, className, delay = 0 }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative bg-white border border-[#22D3EE] p-6 transition-all duration-300 group",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2 border border-[#22D3EE] text-[#22D3EE] transition-colors">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#22D3EE] transition-all">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="text-muted-foreground font-rajdhani text-lg leading-relaxed relative z-10">
        {children}
      </div>

      {/* Decorative tech markers */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 bg-primary/50" />
        <div className="w-1 h-1 bg-primary/30" />
        <div className="w-1 h-1 bg-primary/10" />
      </div>
    </motion.div>
  );
}
