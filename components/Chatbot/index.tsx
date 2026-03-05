"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const SUGGESTIONS = [
    "What projects has he built?",
    "What is his tech stack?",
    "Can he build fintech dashboards?",
    "What are his future goals?",
];

function TypingIndicator() {
    return (
        <div style={{ display: "flex", gap: "5px", padding: "4px 0" }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
                    style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        opacity: 0.7,
                    }}
                />
            ))}
        </div>
    );
}

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi! I'm Priyanshu's AI assistant. Ask me anything about his skills, projects, or experience.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;
        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.response || "I couldn't get a response." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section
            id="chatbot"
            style={{
                background: "var(--bg-primary)",
                padding: "100px 0",
                position: "relative",
            }}
        >
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "48px" }}
                >
                    <span className="section-label" style={{ marginBottom: "12px", display: "block" }}>
                        AI Interface
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                            fontWeight: 800,
                            letterSpacing: "-1px",
                            color: "var(--text-primary)",
                        }}
                    >
                        AI Assistant — Ask Me Anything
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "15px" }}>
                        Powered by GPT-4. Ask about skills, projects, goals, and expertise.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ maxWidth: "720px", margin: "0 auto" }}
                >
                    {/* Chat container */}
                    <div
                        className="glass-card"
                        style={{
                            borderRadius: "16px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Header bar */}
                        <div
                            style={{
                                padding: "16px 20px",
                                borderBottom: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #4f8cff, #a78bfa)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                }}
                            >
                                🤖
                            </div>
                            <div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
                                    Priyanshu&apos;s AI
                                </div>
                                <div style={{ fontSize: "11px", color: "#34d399" }}>● Online</div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            style={{
                                height: "380px",
                                overflowY: "auto",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            display: "flex",
                                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: "78%",
                                                padding: "11px 16px",
                                                borderRadius:
                                                    msg.role === "user"
                                                        ? "14px 14px 4px 14px"
                                                        : "14px 14px 14px 4px",
                                                background:
                                                    msg.role === "user"
                                                        ? "linear-gradient(135deg, #4f8cff, #6366f1)"
                                                        : "rgba(255,255,255,0.06)",
                                                border:
                                                    msg.role === "assistant"
                                                        ? "1px solid rgba(255,255,255,0.07)"
                                                        : "none",
                                                fontSize: "14px",
                                                lineHeight: "1.6",
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}

                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ display: "flex", justifyContent: "flex-start" }}
                                    >
                                        <div
                                            style={{
                                                padding: "12px 16px",
                                                borderRadius: "14px 14px 14px 4px",
                                                background: "rgba(255,255,255,0.06)",
                                                border: "1px solid rgba(255,255,255,0.07)",
                                            }}
                                        >
                                            <TypingIndicator />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={bottomRef} />
                        </div>

                        {/* Suggestions */}
                        <div
                            style={{
                                padding: "8px 20px",
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                borderTop: "1px solid var(--border)",
                            }}
                        >
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => sendMessage(s)}
                                    style={{
                                        fontSize: "11px",
                                        padding: "5px 10px",
                                        borderRadius: "20px",
                                        background: "rgba(79,140,255,0.1)",
                                        border: "1px solid rgba(79,140,255,0.2)",
                                        color: "var(--accent)",
                                        cursor: "pointer",
                                        transition: "background 0.2s",
                                        fontFamily: "inherit",
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div
                            style={{
                                padding: "16px 20px",
                                borderTop: "1px solid var(--border)",
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                                placeholder="Ask anything about Priyanshu..."
                                style={{
                                    flex: 1,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "10px",
                                    padding: "11px 16px",
                                    color: "var(--text-primary)",
                                    fontSize: "14px",
                                    outline: "none",
                                    fontFamily: "inherit",
                                    transition: "border-color 0.2s",
                                }}
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={loading || !input.trim()}
                                style={{
                                    background: loading
                                        ? "rgba(79,140,255,0.3)"
                                        : "linear-gradient(135deg, #4f8cff, #6366f1)",
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "11px 20px",
                                    color: "#fff",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    cursor: loading ? "not-allowed" : "pointer",
                                    fontFamily: "inherit",
                                    transition: "opacity 0.2s",
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
