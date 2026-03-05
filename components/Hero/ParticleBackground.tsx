"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    opacity: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const particles: Particle[] = [];
        const COUNT = 60;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticle(): Particle {
            if (!canvas) return { x: 0, y: 0, radius: 1, vx: 0, vy: 0, opacity: 0 };
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.05,
            };
        }

        function init() {
            particles.length = 0;
            for (let i = 0; i < COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function draw() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(79, 140, 255, ${p.opacity})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        }

        resize();
        init();
        draw();

        window.addEventListener("resize", () => { resize(); init(); });
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}
