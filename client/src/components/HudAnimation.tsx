import { useEffect, useRef } from "react";

export function HudAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.width / 2;
    const h = () => canvas.height / 2;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, w(), h());

      const cx = w() / 2;
      const cy = h() / 2;
      const maxR = Math.min(cx, cy) * 0.85;

      ctx.strokeStyle = "#22D3EE";
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        const r = maxR * (0.5 + i * 0.2);
        ctx.globalAlpha = 0.2 + i * 0.15;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.6;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.5);
      const outerR = maxR * 0.9;
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const x1 = Math.cos(angle) * outerR * 0.7;
        const y1 = Math.sin(angle) * outerR * 0.7;
        const x2 = Math.cos(angle) * outerR;
        const y2 = Math.sin(angle) * outerR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.3);
      ctx.globalAlpha = 0.4;
      const hexR = maxR * 0.6;
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 6;
        const x = Math.cos(angle) * hexR;
        const y = Math.sin(angle) * hexR;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.8);
      ctx.globalAlpha = 0.5;
      const triR = maxR * 0.4;
      ctx.beginPath();
      for (let i = 0; i <= 3; i++) {
        const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
        const x = Math.cos(angle) * triR;
        const y = Math.sin(angle) * triR;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();

      const numDots = 24;
      for (let i = 0; i < numDots; i++) {
        const angle = (Math.PI * 2 * i) / numDots + time;
        const r = maxR * 0.75;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const pulse = Math.sin(time * 3 + i) * 0.5 + 0.5;
        ctx.globalAlpha = 0.3 + pulse * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#22D3EE";
        ctx.fill();
      }

      const scanY = cy + Math.sin(time * 2) * maxR * 0.8;
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.moveTo(cx - maxR, scanY);
      ctx.lineTo(cx + maxR, scanY);
      ctx.strokeStyle = "#22D3EE";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ maxWidth: "400px", maxHeight: "400px" }}
    />
  );
}
