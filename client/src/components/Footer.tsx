import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#22D3EE] bg-[#0F172A] py-6">
      <div className="container mx-auto px-4 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-[#22D3EE] w-5 h-5" />
          <span className="font-bold uppercase tracking-widest text-[#22D3EE] text-sm">
            Work in Progress
          </span>
          <AlertTriangle className="text-[#22D3EE] w-5 h-5" />
        </div>
        <p className="text-white/70 text-base max-w-2xl">
          Scaling our AI models on Google Cloud to bring this revolution to you very soon.
        </p>
        <div className="w-full max-w-md mt-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#22D3EE] rounded-full"
              style={{ width: "35%", animation: "loading-bar 3s ease-in-out infinite" }}
            />
          </div>
        </div>
        <p className="text-white/40 text-xs mt-3 font-mono">
          &copy; {new Date().getFullYear()} Arsa Fit AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
