import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function TechCard({ title, children, icon, className }: TechCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300 group lift-hover cyan-glow",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2 border border-[#22D3EE] text-[#22D3EE]">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#22D3EE] transition-colors">
          {title}
        </h3>
      </div>
      <div className="text-[#0F172A]/70 font-sans text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}
