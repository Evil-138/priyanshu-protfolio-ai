"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface GitHubData {
    totalRepos: number;
    totalStars: number;
    followers: number;
    languages: { name: string; count: number }[];
    recentRepos: {
        name: string;
        description: string;
        url: string;
        language: string;
        stars: number;
        updatedAt: string;
    }[];
    username: string;
}

function AnimatedCount({ target }: { target: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [target]);

    return <>{count}</>;
}

const LANG_COLORS: Record<string, string> = {
    Python: "#4f8cff",
    TypeScript: "#a78bfa",
    JavaScript: "#fbbf24",
    "Jupyter Notebook": "#34d399",
    CSS: "#fb923c",
    HTML: "#f472b6",
    Other: "#b3b3bd",
};

export default function GitHubPanel() {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/github");
            const json = await res.json();
            setData(json);
        } catch {
            console.error("Failed to fetch GitHub data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const stats = data
        ? [
            { label: "Repositories", value: data.totalRepos, icon: "📁" },
            { label: "Stars Earned", value: data.totalStars, icon: "⭐" },
            { label: "Followers", value: data.followers, icon: "👥" },
        ]
        : [];

    return (
        <section
            id="github"
            style={{
                background: "var(--bg-secondary)",
                padding: "100px 0",
            }}
        >
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "56px" }}
                >
                    <span className="section-label" style={{ marginBottom: "12px", display: "block" }}>
                        Open Source
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                            fontWeight: 800,
                            letterSpacing: "-1px",
                            color: "var(--text-primary)",
                        }}
                    >
                        GitHub Intelligence Panel
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "15px" }}>
                        Live stats · Auto-refreshes every 5 minutes
                    </p>
                </motion.div>

                {loading ? (
                    <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0" }}>
                        Loading GitHub data...
                    </div>
                ) : (
                    <>
                        {/* Stat cards */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px",
                                marginBottom: "32px",
                            }}
                        >
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="glass-card"
                                    style={{
                                        borderRadius: "14px",
                                        padding: "28px",
                                        textAlign: "center",
                                    }}
                                >
                                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
                                    <div
                                        style={{
                                            fontSize: "36px",
                                            fontWeight: 800,
                                            color: "var(--accent)",
                                            letterSpacing: "-1px",
                                        }}
                                    >
                                        <AnimatedCount target={s.value} />
                                    </div>
                                    <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                                        {s.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "24px",
                            }}
                        >
                            {/* Language Chart */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="glass-card"
                                style={{ borderRadius: "14px", padding: "24px" }}
                            >
                                <h3
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Most Used Languages
                                </h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={data?.languages} layout="vertical" margin={{ left: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis
                                            type="category"
                                            dataKey="name"
                                            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                                            width={100}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: "rgba(22,22,28,0.95)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                borderRadius: "8px",
                                                color: "var(--text-primary)",
                                                fontSize: "12px",
                                            }}
                                            formatter={(v) => [`${v} repos`, "Count"]}
                                        />
                                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                            {data?.languages.map((l) => (
                                                <Cell
                                                    key={l.name}
                                                    fill={LANG_COLORS[l.name] || LANG_COLORS.Other}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </motion.div>

                            {/* Recent Repos */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="glass-card"
                                style={{ borderRadius: "14px", padding: "24px" }}
                            >
                                <h3
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                        marginBottom: "16px",
                                    }}
                                >
                                    Recent Repositories
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {data?.recentRepos.slice(0, 4).map((repo) => (
                                        <motion.a
                                            key={repo.name}
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 4 }}
                                            style={{
                                                textDecoration: "none",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                padding: "10px 12px",
                                                borderRadius: "8px",
                                                background: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.05)",
                                                transition: "background 0.2s",
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        fontSize: "13px",
                                                        fontWeight: 600,
                                                        color: "var(--accent)",
                                                        marginBottom: "2px",
                                                    }}
                                                >
                                                    {repo.name}
                                                </div>
                                                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                                                    {repo.description || "No description"}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "10px",
                                                        color: LANG_COLORS[repo.language] || "var(--text-muted)",
                                                        marginTop: "4px",
                                                    }}
                                                >
                                                    ● {repo.language}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "11px",
                                                    color: "var(--text-muted)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "3px",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                ⭐ {repo.stars}
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
