"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: 1,
        title: "AI Prompt Enhancer",
        description:
            "Open-source tool that refines and elevates prompts for AI systems like ChatGPT, Claude, and other LLMs. Supports Professional, Creative, Detailed, and Simplified styles. Works fully offline — no paid services needed.",
        tech: ["Python", "spaCy", "NLTK", "Transformers", "Streamlit"],
        category: "GenAI · NLP · Open Source",
        demoUrl: "https://lnkd.in/ey7A5QDp",
        githubUrl: "https://lnkd.in/excBeR4B",
        linkedinUrl: "https://www.linkedin.com/posts/priyanshu-shukla-017ba42ba_ai-opensource-promptengineering-activity-7389959795967021056-zfcf",
        highlight: "🔥 Open Source",
        accentColor: "#a78bfa",
        icon: "🤖",
        stats: [
            { label: "Prompt Styles", value: "4+" },
            { label: "Deployment", value: "Offline" },
        ],
    },
    {
        id: 2,
        title: "AI-Enhanced Portfolio",
        description:
            "Full-stack developer portfolio with a dark futuristic theme, 3D interactive animations, smooth transitions, and responsive UI. Integrates AI + Data Analysis elements, showcasing skills in Web Dev, Data Analysis, Stock Market, and Pine Script.",
        tech: ["Next.js", "TypeScript", "3D Animations", "AI Integration", "GSAP"],
        category: "Web Dev · AI · Full Stack",
        demoUrl: "https://lnkd.in/dXU29KyE",
        githubUrl: "https://lnkd.in/d4BudRUx",
        linkedinUrl: "https://www.linkedin.com/posts/priyanshu-shukla-017ba42ba_webdevelopment-ai-portfolio-activity-7388891872188002304-5-H8",
        highlight: "🌐 Live",
        accentColor: "#5b9cff",
        icon: "🌐",
        stats: [
            { label: "Stack", value: "Full" },
            { label: "3D Engine", value: "R3F" },
        ],
    },
    {
        id: 3,
        title: "BTC/USDT Algo Trading",
        description:
            "Automated BTC-only trading strategy using Markov Models + EMA + RRR on 15-minute Binance data. Backtested Aug–Oct 2025: 831 trades, +1,754 USDT P&L, max equity drawdown of just 0.06%.",
        tech: ["Python", "Markov Models", "EMA", "Binance API", "Pine Script"],
        category: "Quant · Algo Trading · ML",
        demoUrl: "https://www.linkedin.com/posts/priyanshu-shukla-017ba42ba_bitcoin-cryptotrading-algorithmictrading-activity-7386684124163624960-fvVR",
        githubUrl: "https://www.linkedin.com/posts/priyanshu-shukla-017ba42ba_bitcoin-cryptotrading-algorithmictrading-activity-7386684124163624960-fvVR",
        linkedinUrl: "https://www.linkedin.com/posts/priyanshu-shukla-017ba42ba_bitcoin-cryptotrading-algorithmictrading-activity-7386684124163624960-fvVR",
        highlight: "📈 +1,754 USDT",
        accentColor: "#fbbf24",
        icon: "📈",
        stats: [
            { label: "Trades", value: "831" },
            { label: "Max DD", value: "0.06%" },
        ],
    },
    {
        id: 4,
        title: "SmartSummarizer",
        description:
            "AI-powered note summarizer web app that turns lengthy content into concise summaries in seconds. Paste or upload text, get a clean summary, compare side-by-side, and download. Built with Flask, HuggingFace Transformers & OpenAI.",
        tech: ["Flask", "Python", "HuggingFace", "OpenAI API", "Bootstrap"],
        category: "AI · Web App · Python",
        demoUrl: "https://lnkd.in/dt8FtJuA",
        githubUrl: "https://lnkd.in/dQdTndeD",
        linkedinUrl: "https://www.linkedin.com/posts/priyanshu-shukla-017ba42ba_ai-flask-python-activity-7383427802848595969-hTIE",
        highlight: "🤖 AI Powered",
        accentColor: "#34d399",
        icon: "✨",
        stats: [
            { label: "Backend", value: "Flask" },
            { label: "AI Core", value: "GPT+HF" },
        ],
    },
];

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 48, scale: 0.96 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.65,
                ease: "power3.out",
                delay: index * 0.12,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, [index]);

    return (
        <div
            ref={cardRef}
            style={{
                background: "rgba(13, 17, 32, 0.8)",
                border: "1px solid var(--border)",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                cursor: "default",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = project.accentColor + "55";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${project.accentColor}18, 0 0 0 1px ${project.accentColor}22`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
        >
            {/* Top accent bar */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, height: "3px",
                background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}00)`,
                borderRadius: "24px 24px 0 0",
            }} />

            {/* BG glow orb */}
            <div style={{
                position: "absolute",
                top: "-40px", right: "-40px",
                width: "200px", height: "200px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${project.accentColor}12 0%, transparent 70%)`,
                pointerEvents: "none",
                filter: "blur(20px)",
            }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        width: "44px", height: "44px",
                        borderRadius: "14px",
                        background: `linear-gradient(135deg, ${project.accentColor}25, ${project.accentColor}10)`,
                        border: `1px solid ${project.accentColor}35`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "20px",
                    }}>
                        {project.icon}
                    </div>
                    <span style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: project.accentColor,
                        background: `${project.accentColor}12`,
                        border: `1px solid ${project.accentColor}28`,
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.3px",
                    }}>
                        {project.category}
                    </span>
                </div>
                <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    fontFamily: "'Inter', sans-serif",
                }}>
                    {project.highlight}
                </span>
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "10px",
                letterSpacing: "-0.5px",
                lineHeight: 1.25,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                {project.title}
            </h3>

            {/* Description */}
            <p style={{
                fontSize: "13.5px",
                color: "var(--text-secondary)",
                lineHeight: "1.75",
                flex: 1,
                marginBottom: "20px",
            }}>
                {project.description}
            </p>

            {/* Stats */}
            {project.stats.length > 0 && (
                <div style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                }}>
                    {project.stats.map((s) => (
                        <div key={s.label} style={{
                            flex: 1,
                            padding: "12px 14px",
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textAlign: "center",
                        }}>
                            <div style={{
                                fontSize: "16px",
                                fontWeight: 800,
                                color: project.accentColor,
                                letterSpacing: "-0.3px",
                            }}>
                                {s.value}
                            </div>
                            <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px", fontFamily: "'Inter', sans-serif" }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tech stack */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                {project.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                ))}
            </div>

            {/* Floating action buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
                <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "11px 14px",
                        borderRadius: "100px",
                        background: `linear-gradient(135deg, ${project.accentColor}35, ${project.accentColor}18)`,
                        border: `1px solid ${project.accentColor}45`,
                        color: project.accentColor,
                        fontSize: "12px",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        letterSpacing: "0.2px",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 20px ${project.accentColor}30`;
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                >
                    Live Demo ↗
                </a>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "11px 14px",
                        borderRadius: "100px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        fontWeight: 700,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        transition: "transform 0.2s ease, background 0.2s ease",
                        fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                    }}
                >
                    GitHub ↗
                </a>
                <a
                    href={project.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Post"
                    style={{
                        width: "44px",
                        flexShrink: 0,
                        padding: "11px 0",
                        borderRadius: "100px",
                        background: "rgba(10,102,194,0.1)",
                        border: "1px solid rgba(10,102,194,0.22)",
                        color: "#0a66c2",
                        fontSize: "13px",
                        fontWeight: 800,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
                >
                    in
                </a>
            </div>
        </div>
    );
}

export default function Projects() {
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!headingRef.current) return;
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
            }
        );
    }, []);

    return (
        <section
            id="projects"
            style={{
                background: "var(--bg-primary)",
                padding: "120px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

            {/* Ambient glow */}
            <div style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "700px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(91,156,255,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
                filter: "blur(60px)",
            }} />

            <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <div ref={headingRef} style={{ textAlign: "center", marginBottom: "64px", opacity: 0 }}>
                    <span className="section-label" style={{ marginBottom: "14px", display: "block" }}>
                        Portfolio
                    </span>
                    <h2 style={{
                        fontSize: "clamp(2rem, 3.5vw, 3rem)",
                        fontWeight: 800,
                        letterSpacing: "-1.5px",
                        color: "var(--text-primary)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        Featured Projects
                    </h2>
                    <p style={{
                        color: "var(--text-secondary)",
                        marginTop: "14px",
                        fontSize: "15px",
                        maxWidth: "520px",
                        margin: "14px auto 0",
                        lineHeight: 1.7,
                    }}>
                        Real-world AI, quant, and web systems — each with live demos and source code
                    </p>
                </div>

                {/* Project Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                    gap: "24px",
                }}>
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center", marginTop: "60px" }}>
                    <a
                        href="https://www.linkedin.com/in/priyanshu-shukla-017ba42ba/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ fontSize: "14px" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 2h4v4H2V2zm0 8h4v4H2v-4zm8-8h4v4h-4V2zm0 8h4v4h-4v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        View all projects on LinkedIn ↗
                    </a>
                </div>
            </div>
        </section>
    );
}
