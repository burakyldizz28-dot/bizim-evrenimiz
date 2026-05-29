"use client";

import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.015 + 0.003,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(
        width * 0.5, height * 0.3, 0,
        width * 0.5, height * 0.5, width * 0.9
      );
      bg.addColorStop(0, "#0d1528");
      bg.addColorStop(0.5, "#080e1a");
      bg.addColorStop(1, "#060810");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const nebula1 = ctx.createRadialGradient(
        width * 0.15, height * 0.2, 0,
        width * 0.15, height * 0.2, width * 0.35
      );
      nebula1.addColorStop(0, "rgba(30, 20, 60, 0.18)");
      nebula1.addColorStop(1, "rgba(6, 8, 16, 0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.85, height * 0.75, 0,
        width * 0.85, height * 0.75, width * 0.4
      );
      nebula2.addColorStop(0, "rgba(15, 25, 50, 0.2)");
      nebula2.addColorStop(1, "rgba(6, 8, 16, 0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      const moonlight = ctx.createRadialGradient(
        width * 0.5, 0, 0,
        width * 0.5, 0, height * 0.6
      );
      moonlight.addColorStop(0, "rgba(240, 237, 230, 0.04)");
      moonlight.addColorStop(1, "rgba(6, 8, 16, 0)");
      ctx.fillStyle = moonlight;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 230, ${currentOpacity})`;
        ctx.fill();
        if (star.radius > 1.0) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 169, 110, ${currentOpacity * 0.12})`;
          ctx.fill();
        }
        star.y += star.speed;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}