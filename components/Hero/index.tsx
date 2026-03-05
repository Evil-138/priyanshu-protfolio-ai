"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { gsap } from "gsap";
import ParticleBackground from "./ParticleBackground";

const GlobeScene = dynamic(() => import("@/components/Globe/GlobeScene"), {
    ssr: false,
    loading: () => (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="glow-ring" style={{ width: "300px", height: "300px" }} />
        </div>
    ),
});

const stats = [
    { label: "Projects Built", value: "15+", icon: "🚀" },
    { label: "Domains", value: "6", icon: "⚡" },
    { label: "Experience", value: "3 Yrs", icon: "🧠" },
];

export default function Hero() {
    const [text] = useTypewriter({
        words: [
            "Building Intelligent Systems",
            "Developing AI Solutions",
            "Engineering Data Pipelines",
            "Crafting Quant Strategies",
        ],
        loop: true,
        delaySpeed: 2000,
        deleteSpeed: 38,
        typeSpeed: 55,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(labelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
            .fromTo(headingRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75 }, 0.5)
            .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
            .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.92)
            .fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1.1)
            .fromTo(globeRef.current,
                { opacity: 0, scale: 0.88, x: 30 },
                { opacity: 1, scale: 1, x: 0, duration: 1.0 },
                0.4);

        // Floating animation on buttons ref
        gsap.to(buttonsRef.current, {
            y: -6,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2,
        });
    }, []);

    // Subtle globe float
    useEffect(() => {
        if (!globeRef.current) return;
        gsap.to(globeRef.current, {
            y: -14,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.5,
        });
    }, []);

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                background: "var(--bg-primary)",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <ParticleBackground />

            {/* Ambient blobs */}
            <div style={{
                position: "absolute",
                top: "15%",
                left: "-10%",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(91,156,255,0.07) 0%, transparent 65%)",
                pointerEvents: "none",
                filter: "blur(40px)",
            }} />
            <div style={{
                position: "absolute",
                bottom: "10%",
                right: "-5%",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)",
                pointerEvents: "none",
                filter: "blur(40px)",
            }} />

            <div
                ref={containerRef}
                className="section-container"
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    alignItems: "center",
                    minHeight: "100vh",
                    padding: "110px 28px 70px",
                }}
            >
                {/* Left: Text */}
                <div>
                    {/* Label badge */}
                    <span
                        ref={labelRef}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "24px",
                            opacity: 0,
                        }}
                    >
                        <span
                            style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "var(--emerald)",
                                boxShadow: "0 0 10px var(--emerald)",
                                animation: "pulse 2s ease-in-out infinite",
                            }}
                        />
                        <span className="section-label">
                            AI Developer · Data Science · Quant Research
                        </span>
                    </span>

                    <h1
                        ref={headingRef}
                        style={{
                            fontSize: "clamp(2.4rem, 4.2vw, 4rem)",
                            fontWeight: 800,
                            lineHeight: 1.12,
                            letterSpacing: "-2px",
                            color: "var(--text-primary)",
                            marginBottom: "20px",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            opacity: 0,
                        }}
                    >
                        {text}
                        <Cursor cursorColor="var(--accent)" />
                        <br />
                        <span className="gradient-text">
                            with Code &amp; Data
                        </span>
                    </h1>

                    <p
                        ref={paraRef}
                        style={{
                            fontSize: "16px",
                            color: "var(--text-secondary)",
                            lineHeight: "1.8",
                            maxWidth: "460px",
                            marginBottom: "40px",
                            opacity: 0,
                        }}
                    >
                        AI Developer focused on Data Science, Machine Learning, Generative AI,
                        Quant Research &amp; High-Performance Web Systems.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={buttonsRef}
                        style={{ display: "flex", gap: "14px", flexWrap: "wrap", opacity: 0 }}
                    >
                        <a href="#projects" className="btn-float">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            View Projects
                        </a>
                        <a href="#chatbot" className="btn-ghost">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 5c0-1.1-.9-2-2-2H4C2.9 3 2 3.9 2 5v5c0 1.1.9 2 2 2h1v3l3-3h4c1.1 0 2-.9 2-2V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                            Ask AI About Me
                        </a>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        style={{
                            display: "flex",
                            gap: "32px",
                            marginTop: "52px",
                            opacity: 0,
                        }}
                    >
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                style={{
                                    padding: "16px 20px",
                                    borderRadius: "16px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    backdropFilter: "blur(8px)",
                                    minWidth: "90px",
                                    textAlign: "center",
                                }}
                            >
                                <div style={{ fontSize: "18px", marginBottom: "4px" }}>{stat.icon}</div>
                                <div
                                    style={{
                                        fontSize: "26px",
                                        fontWeight: 800,
                                        background: "linear-gradient(135deg, var(--accent), var(--violet))",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        letterSpacing: "-1px",
                                        lineHeight: 1,
                                        marginBottom: "4px",
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: "11px",
                                        color: "var(--text-muted)",
                                        textTransform: "uppercase",
                                        letterSpacing: "1.5px",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Globe */}
                <div
                    ref={globeRef}
                    style={{ height: "540px", position: "relative", opacity: 0 }}
                >
                    <GlobeScene />
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    opacity: 0.5,
                    animation: "scrollBounce 2s ease-in-out infinite",
                }}
            >
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
                    Scroll
                </span>
                <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
                    <rect x="6.5" y="1" width="5" height="16" rx="2.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                    <circle cx="9" cy="6" r="2" fill="var(--accent)">
                        <animate attributeName="cy" values="6;12;6" dur="2s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>

            <style>{`
                @keyframes scrollBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(8px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.85); }
                }
                @media (max-width: 900px) {
                    #hero .section-container {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
