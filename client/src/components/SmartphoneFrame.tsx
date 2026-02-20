import { ReactNode } from "react";

interface SmartphoneFrameProps {
  children: ReactNode;
  label?: string;
}

export function SmartphoneFrame({ children, label }: SmartphoneFrameProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-64 bg-gradient-to-b from-gray-100 to-white border-2 border-[#0F172A] rounded-3xl p-2 shadow-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0F172A] rounded-b-xl" />
        <div className="mt-4 rounded-2xl border border-[#22D3EE]/30 bg-white overflow-hidden min-h-96">
          {children}
        </div>
        <div className="mt-2 mb-1 flex justify-center">
          <div className="w-10 h-1 bg-[#0F172A]/20 rounded-full" />
        </div>
      </div>
      {label && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#22D3EE]">
          {label}
        </p>
      )}
    </div>
  );
}
