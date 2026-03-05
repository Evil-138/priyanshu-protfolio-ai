"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    { skill: "Web Dev", value: 88, full: "Web Development", desc: "Next.js, React, TypeScript, Node.js, FastAPI — full-stack systems.", icon: "🌐" },
    { skill: "AI/ML", value: 83, full: "Artificial Intelligence & ML", desc: "TensorFlow, PyTorch, Scikit-learn — model training, evaluation, and deployment.", icon: "🧠" },
    { skill: "Data Science", value: 82, full: "Data Science", desc: "Pandas, NumPy, Matplotlib — statistical analysis and predictive modeling.", icon: "📊" },
    { skill: "API Arch.", value: 83, full: "API Architecture", desc: "REST APIs, WebSockets, microservices, caching, and system design.", icon: "⚙️" },
    { skill: "UI/UX Eng.", value: 84, full: "UI/UX Engineering", desc: "Framer Motion, Three.js, GSAP — immersive, high-performance interfaces.", icon: "✨" },
    { skill: "Quant", value: 75, full: "Quantitative Trading", desc: "Algorithmic trading, backtesting, risk management, and technical analysis.", icon: "📈" },
    { skill: "GenAI", value: 78, full: "Generative AI", desc: "OpenAI, LangChain, RAG systems, prompt engineering, and AI product development.", icon: "🤖" },
];

const TIMELINE = [
    { year: "2023", label: "Web Development", detail: "React, Next.js, Node.js, REST APIs", icon: "🌱" },
    { year: "2024", label: "AI-Integrated Apps", detail: "SaaS platforms, AI dashboards, dynamic interfaces", icon: "⚡" },
    { year: "2025", label: "Trading & Analytics", detail: "Quant systems, real-time data visualization, risk tools", icon: "📈" },
    { year: "2026", label: "Quant + GenAI", detail: "LLM-powered SaaS, algorithmic trading platform", icon: "🚀" },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { skill: string; value: number; full: string; desc: string } }> }) => {
    if (active && payload && payload.length) {
        const d = payload[0].payload;
        return (
            <div style={{
                padding: "14px 18px",
                borderRadius: "16px",
                maxWidth: "260px",
                background: "rgba(8,11,20,0.95)",
                border: "1px solid rgba(91,156,255,0.2)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)", marginBottom: "4px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.3px" }}>
                    {d.full}
                </div>
                <div style={{ fontSize: "28px", fontWeight: 900, background: "linear-gradient(135deg,var(--accent),var(--violet))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "6px", letterSpacing: "-1px" }}>
                    {d.value}%
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.55 }}>{d.desc}</p>
            </div>
        );
    }
    return null;
};

export default function SkillGraph() {
    const [hovered, setHovered] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
            );
            // Chart
            gsap.fromTo(chartRef.current,
                { opacity: 0, x: -40, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: chartRef.current, start: "top 82%" } }
            );
            // Skill bars
            gsap.fromTo(barsRef.current,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: barsRef.current, start: "top 82%" } }
            );
            // Timeline cards
            const timelineCards = timelineRef.current?.querySelectorAll(".timeline-card");
            if (timelineCards) {
                gsap.fromTo(
                    timelineCards,
                    { opacity: 0, y: 36, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 0.6, ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: timelineRef.current, start: "top 85%" },
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            style={{
                background: "var(--bg-secondary)",
                padding: "120px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
            {/* Ambient blobs */}
            <div style={{
                position: "absolute", top: "20%", right: "-5%",
                width: "400px", height: "400px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)",
                pointerEvents: "none", filter: "blur(50px)",
            }} />

            <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <div ref={headingRef} style={{ textAlign: "center", marginBottom: "64px", opacity: 0 }}>
                    <span className="section-label" style={{ marginBottom: "14px", display: "block" }}>
                        Capabilities
                    </span>
                    <h2 style={{
                        fontSize: "clamp(2rem, 3.5vw, 3rem)",
                        fontWeight: 800,
                        letterSpacing: "-1.5px",
                        color: "var(--text-primary)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        Technical Intelligence Map
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginTop: "14px", fontSize: "15px", lineHeight: 1.7 }}>
                        Hover each axis to explore skill depth and specialization
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
                    {/* Radar Chart */}
                    <div
                        ref={chartRef}
                        style={{
                            borderRadius: "24px",
                            padding: "32px",
                            height: "430px",
                            background: "rgba(13,17,32,0.7)",
                            border: "1px solid var(--border)",
                            backdropFilter: "blur(20px)",
                            opacity: 0,
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={SKILLS} margin={{ top: 12, right: 36, bottom: 12, left: 36 }}>
                                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                                <PolarAngleAxis
                                    dataKey="skill"
                                    tick={{ fill: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}
                                />
                                <Radar
                                    name="Priyanshu"
                                    dataKey="value"
                                    stroke="url(#radarGrad)"
                                    fill="url(#radarFill)"
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                    dot={{ fill: "var(--accent)", r: 4, strokeWidth: 0 }}
                                    onMouseEnter={(d) => setHovered(d.skill)}
                                    onMouseLeave={() => setHovered(null)}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <defs>
                                    <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#5b9cff" />
                                        <stop offset="100%" stopColor="#a78bfa" />
                                    </linearGradient>
                                    <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#5b9cff" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Skill Bars */}
                    <div ref={barsRef} style={{ display: "flex", flexDirection: "column", gap: "16px", opacity: 0 }}>
                        {SKILLS.map((s) => (
                            <div
                                key={s.skill}
                                onMouseEnter={() => setHovered(s.skill)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    padding: "16px 18px",
                                    borderRadius: "16px",
                                    background: hovered === s.skill ? "rgba(91,156,255,0.06)" : "rgba(255,255,255,0.025)",
                                    border: hovered === s.skill ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                                    transition: "all 0.25s ease",
                                    cursor: "default",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ fontSize: "16px" }}>{s.icon}</span>
                                        <span style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            color: hovered === s.skill ? "var(--text-primary)" : "var(--text-secondary)",
                                            transition: "color 0.2s",
                                        }}>
                                            {s.full}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: "13px",
                                        fontWeight: 800,
                                        color: "var(--accent)",
                                        fontFamily: "'Inter', sans-serif",
                                    }}>
                                        {s.value}%
                                    </span>
                                </div>
                                <div style={{ height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
                                    <div
                                        style={{
                                            height: "100%",
                                            width: `${s.value}%`,
                                            background: "linear-gradient(90deg, var(--accent), var(--violet))",
                                            borderRadius: "10px",
                                            boxShadow: hovered === s.skill ? "0 0 10px var(--accent-glow)" : "none",
                                            transition: "box-shadow 0.3s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} style={{ marginTop: "96px" }}>
                    <h3 style={{
                        textAlign: "center",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "48px",
                        letterSpacing: "-0.5px",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        Journey Timeline
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", position: "relative" }}>
                        {/* Connecting line */}
                        <div style={{
                            position: "absolute",
                            top: "28px",
                            left: "12.5%",
                            right: "12.5%",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(91,156,255,0.35), rgba(167,139,250,0.35), transparent)",
                        }} />

                        {TIMELINE.map((item) => (
                            <div
                                key={item.year}
                                className="timeline-card"
                                style={{
                                    borderRadius: "20px",
                                    padding: "24px 18px",
                                    textAlign: "center",
                                    background: "rgba(13,17,32,0.6)",
                                    border: "1px solid var(--border)",
                                    backdropFilter: "blur(16px)",
                                    position: "relative",
                                    transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                                    opacity: 0,
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = "var(--border-accent)";
                                    el.style.boxShadow = "var(--shadow-accent)";
                                    el.style.transform = "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = "var(--border)";
                                    el.style.boxShadow = "none";
                                    el.style.transform = "translateY(0)";
                                }}
                            >
                                <div style={{
                                    width: "14px", height: "14px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, var(--accent), var(--violet))",
                                    margin: "0 auto 14px",
                                    boxShadow: "0 0 14px var(--accent-glow)",
                                }} />
                                <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
                                <div style={{
                                    fontSize: "24px",
                                    fontWeight: 800,
                                    color: "var(--accent)",
                                    marginBottom: "8px",
                                    letterSpacing: "-1px",
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}>
                                    {item.year}
                                </div>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
                                    {item.label}
                                </div>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    #skills .section-container > div:nth-child(3) {
                        grid-template-columns: 1fr !important;
                    }
                    #skills .section-container > div:nth-child(4) > div:last-child {
                        grid-template-columns: repeat(2,1fr) !important;
                    }
                }
            `}</style>
        </section>
    );
}
