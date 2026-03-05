import { NextRequest, NextResponse } from "next/server";

const RESPONSES: Record<string, string> = {
    project:
        "Priyanshu has built: an AI Prompt Enhancer (open-source NLP tool), a BTC/USDT Algo Trading Strategy (831 trades, +1,754 USDT P&L), a SmartSummarizer (Flask + HuggingFace), and this AI-Enhanced Portfolio. Each project showcases full-stack AI engineering from data pipelines to live deployments.",
    skill:
        "Priyanshu's core stack: Python (TensorFlow, PyTorch, Pandas), Next.js/TypeScript, Generative AI (OpenAI, LangChain, RAG), Quantitative Finance (Binance API, Markov Models, Pine Script), and advanced UI with GSAP, Three.js & Framer Motion.",
    tech:
        "Priyanshu works across the full stack: Next.js, React, FastAPI, Node.js on the web side — and TensorFlow, PyTorch, Scikit-learn, LangChain on the AI/ML side. He also builds quant systems with Python, Binance API, and TradingView Pine Script.",
    goal:
        "Priyanshu's goal is to build production-grade AI products at the intersection of machine learning and quantitative finance — developing GenAI-powered SaaS systems with intelligent, high-performance UX.",
    experience:
        "Priyanshu's journey: 2023 — Web Development (React, Next.js); 2024 — AI-integrated SaaS platforms; 2025 — Quant trading systems & real-time analytics dashboards; 2026 — Building LLM-powered SaaS and advanced algorithmic trading platforms.",
    trading:
        "Priyanshu built a BTC/USDT automated trading strategy using Markov Models + EMA on 15-min Binance data. Backtested Aug–Oct 2025: 831 trades, +1,754 USDT P&L, max equity drawdown of just 0.06%. He integrates Smart Money Concepts and risk-reward management.",
    ai:
        "Priyanshu specialises in Generative AI — building RAG systems, prompt engineering pipelines, and LLM-powered apps with OpenAI and LangChain. He also has deep expertise in classical ML: supervised/unsupervised learning, NLP, and model deployment.",
    contact:
        "You can reach Priyanshu on LinkedIn at linkedin.com/in/priyanshu-shukla-017ba42ba or via GitHub at github.com/Evil-138. He's open to AI/ML roles, quant research positions, and freelance full-stack AI projects.",
    default:
        "Priyanshu Shukla is an AI Developer and Data Science Engineer specialising in Machine Learning, Generative AI, Quantitative Systems, and High-Performance Web. He builds intelligent, data-driven systems with clean architecture and modern engineering practices. Ask me about his projects, skills, or experience!",
};

function matchResponse(message: string): string {
    const m = message.toLowerCase();
    if (m.includes("project") || m.includes("built") || m.includes("portfolio")) return RESPONSES.project;
    if (m.includes("trading") || m.includes("quant") || m.includes("btc") || m.includes("algo")) return RESPONSES.trading;
    if (m.includes("ai") || m.includes("ml") || m.includes("machine learning") || m.includes("llm") || m.includes("gpt")) return RESPONSES.ai;
    if (m.includes("skill") || m.includes("tech") || m.includes("stack") || m.includes("language")) return RESPONSES.skill;
    if (m.includes("goal") || m.includes("future") || m.includes("plan") || m.includes("ambition")) return RESPONSES.goal;
    if (m.includes("experience") || m.includes("timeline") || m.includes("journey") || m.includes("year")) return RESPONSES.experience;
    if (m.includes("contact") || m.includes("hire") || m.includes("email") || m.includes("linkedin")) return RESPONSES.contact;
    return RESPONSES.default;
}

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();
        const lastMessage = messages?.[messages.length - 1]?.content || "";
        const response = matchResponse(lastMessage);
        // Simulate a small delay for a more natural feel
        await new Promise((r) => setTimeout(r, 400));
        return NextResponse.json({ response });
    } catch {
        return NextResponse.json(
            { error: "Failed to get response" },
            { status: 500 }
        );
    }
}
