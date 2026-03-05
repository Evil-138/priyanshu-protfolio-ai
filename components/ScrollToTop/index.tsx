"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, {
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.7,
            pointerEvents: visible ? "all" : "none",
            duration: 0.35,
            ease: "back.out(1.5)",
        });
    }, [visible]);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            ref={btnRef}
            onClick={handleClick}
            title="Back to top"
            style={{
                position: "fixed",
                bottom: "36px",
                right: "36px",
                zIndex: 200,
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, var(--accent), var(--violet))",
                boxShadow: "0 4px 24px rgba(91,156,255,0.4), 0 1px 0 rgba(255,255,255,0.15) inset",
                color: "#fff",
                opacity: 0,
                backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -4, scale: 1.08, duration: 0.22, ease: "back.out(1.7)" });
            }}
            onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.22, ease: "power2.out" });
            }}
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 14V4M4 9l5-5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}
