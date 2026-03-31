"use client";

import { useEffect, useRef } from "react";

function flowAngle(x: number, y: number, t: number): number {
  const s = 0.003;
  return (
    (Math.sin(x * s + t * 0.3) * Math.cos(y * s * 1.3 + t * 0.2) +
      Math.sin((x + y) * s * 0.7 + t * 0.15) * 0.5 +
      Math.cos(x * s * 0.5 - y * s * 0.8 + t * 0.1) * 0.3) *
    Math.PI
  );
}

export default function AlgorithmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // More particles — fast fade prevents visual clutter
    const count = Math.min(Math.floor((w * h) / 6000), 350);

    // SoA: positions + velocities
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      px[i] = Math.random() * w;
      py[i] = Math.random() * h;
      const a = Math.random() * Math.PI * 2;
      vx[i] = Math.cos(a) * 0.5;
      vy[i] = Math.sin(a) * 0.5;
    }

    // Mouse tracking (pointermove on window — works regardless of pointer-events:none on canvas)
    let mouseX = -1000;
    let mouseY = -1000;
    const onPointer = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onPointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Theme detection
    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const maxSpeed = 2;
    const maxSpeedSq = maxSpeed * maxSpeed;
    const sepRadius = 25;
    const sepRadiusSq = sepRadius * sepRadius;
    const mouseRadius = 200;
    const mouseRadiusSq = mouseRadius * mouseRadius;

    let time = 0;
    let frame = 0;
    let animId = 0;
    let running = true;

    function animate() {
      if (!running) return;
      animId = requestAnimationFrame(animate);
      if (++frame & 1) return; // 30fps cap
      time += 0.033;

      // Fast fade — trails last ~4 frames, creating short comet tails instead of static texture
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.fillStyle = "rgba(0,0,0,0.15)";
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "source-over";

      ctx!.strokeStyle = isDark
        ? "rgba(251,146,60,0.35)"
        : "rgba(239,68,68,0.25)";
      ctx!.lineWidth = 2;
      ctx!.beginPath();

      for (let i = 0; i < count; i++) {
        // Flow field steering force
        const angle = flowAngle(px[i], py[i], time);
        vx[i] += Math.cos(angle) * 0.15;
        vy[i] += Math.sin(angle) * 0.15;

        // Separation — push away from nearby particles (boids-like spacing)
        for (let j = i + 1; j < count; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const dSq = dx * dx + dy * dy;
          if (dSq < sepRadiusSq && dSq > 0.01) {
            const f = 0.03 / dSq;
            const fx = dx * f;
            const fy = dy * f;
            vx[i] += fx;
            vy[i] += fy;
            vx[j] -= fx;
            vy[j] -= fy;
          }
        }

        // Mouse repulsion — particles flee from cursor
        const mdx = px[i] - mouseX;
        const mdy = py[i] - mouseY;
        const mSq = mdx * mdx + mdy * mdy;
        if (mSq < mouseRadiusSq && mSq > 1) {
          const mDist = Math.sqrt(mSq);
          const mForce = (1 - mDist / mouseRadius) * 2;
          vx[i] += (mdx / mDist) * mForce;
          vy[i] += (mdy / mDist) * mForce;
        }

        // Damping (smooth direction changes) + speed limit
        vx[i] *= 0.95;
        vy[i] *= 0.95;
        const sSq = vx[i] * vx[i] + vy[i] * vy[i];
        if (sSq > maxSpeedSq) {
          const sc = maxSpeed / Math.sqrt(sSq);
          vx[i] *= sc;
          vy[i] *= sc;
        }

        // Store previous, update position
        const prevX = px[i];
        const prevY = py[i];
        px[i] += vx[i];
        py[i] += vy[i];

        // Edge wrapping — skip draw if wrapped to avoid cross-screen lines
        let wrapped = false;
        if (px[i] < -10) {
          px[i] += w + 20;
          wrapped = true;
        } else if (px[i] > w + 10) {
          px[i] -= w + 20;
          wrapped = true;
        }
        if (py[i] < -10) {
          py[i] += h + 20;
          wrapped = true;
        } else if (py[i] > h + 10) {
          py[i] -= h + 20;
          wrapped = true;
        }

        if (!wrapped) {
          ctx!.moveTo(prevX, prevY);
          ctx!.lineTo(px[i], py[i]);
        }
      }

      ctx!.stroke();
    }

    animate();

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animId);
      } else {
        running = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
