import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-primary/20 bg-black/40 backdrop-blur-sm py-4 fixed bottom-0 left-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm md:text-base">
        <AlertTriangle className="text-yellow-500 w-5 h-5 animate-pulse" />
        <span className="font-mono text-primary/80 uppercase tracking-widest">
          System Status: Scaling Neural Networks on Google Cloud
        </span>
        <span className="hidden md:inline text-muted-foreground mx-2">|</span>
        <span className="hidden md:inline text-muted-foreground text-xs font-mono">
          EST. REL: T-MINUS SOON
        </span>
      </div>
      
      {/* Decorative progress bar */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20">
        <div className="h-full bg-primary/60 w-1/3 animate-[loading_3s_ease-in-out_infinite]" />
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); width: 20%; }
          50% { width: 50%; }
          100% { transform: translateX(400%); width: 20%; }
        }
      `}</style>
    </footer>
  );
}
