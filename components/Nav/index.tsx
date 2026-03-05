"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const navLinks = [
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "GitHub", href: "#github" },
    { label: "AI Chat", href: "#chatbot" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GSAP entrance animation
    useEffect(() => {
        if (!navRef.current) return;
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    return (
        <>
            <motion.nav
                ref={navRef as React.RefObject<HTMLElement>}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: scrolled ? "0 28px" : "10px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {/* Frosted glass pill */}
                <motion.div
                    animate={{
                        maxWidth: scrolled ? "960px" : "100%",
                        margin: scrolled ? "12px auto" : "0 auto",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: scrolled
                            ? "rgba(8, 11, 20, 0.82)"
                            : "transparent",
                        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                        border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
                        borderRadius: scrolled ? "100px" : "0",
                        padding: scrolled ? "12px 24px" : "0",
                        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(91,156,255,0.05)" : "none",
                        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                >
                    {/* Logo */}
                    <a
                        href="#hero"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                            textDecoration: "none",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "20px",
                                fontWeight: 800,
                                color: "var(--text-primary)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            PS
                        </span>
                        <span
                            style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, var(--accent), var(--violet))",
                                display: "inline-block",
                                marginLeft: "3px",
                                boxShadow: "0 0 8px var(--accent)",
                            }}
                        />
                    </a>

                    {/* Desktop links */}
                    <div
                        style={{
                            display: "flex",
                            gap: "4px",
                            alignItems: "center",
                        }}
                        className="nav-desktop"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: "14px",
                                    color: "var(--text-secondary)",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    padding: "6px 14px",
                                    borderRadius: "100px",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                                }}
                            >
                                {link.label}
                            </a>
                        ))}

                        <a
                            href="mailto:priyanshu@example.com"
                            className="btn-float"
                            style={{ fontSize: "13px", padding: "9px 20px", marginLeft: "8px" }}
                        >
                            Contact ✦
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-mobile"
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            color: "var(--text-primary)",
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                            {mobileOpen ? (
                                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            ) : (
                                <>
                                    <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </>
                            )}
                        </svg>
                    </button>
                </motion.div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "fixed",
                            top: "70px",
                            left: "16px",
                            right: "16px",
                            zIndex: 99,
                            background: "rgba(8, 11, 20, 0.95)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "20px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    fontSize: "15px",
                                    color: "var(--text-secondary)",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    padding: "10px 14px",
                                    borderRadius: "12px",
                                    transition: "all 0.2s",
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="mailto:priyanshu@example.com"
                            className="btn-float"
                            style={{ textAlign: "center", marginTop: "8px" }}
                        >
                            Contact ✦
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-mobile { display: none !important; }
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .nav-mobile { display: flex !important; }
                }
            `}</style>
        </>
    );
}
