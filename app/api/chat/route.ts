import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant representing Priyanshu Shukla's professional portfolio. 
Answer questions about Priyanshu concisely, professionally, and intelligently.

ABOUT PRIYANSHU SHUKLA:
Priyanshu Shukla is an AI-focused developer and data science enthusiast with deep expertise in:

TECHNICAL SKILLS:
- Artificial Intelligence & Machine Learning (TensorFlow, PyTorch, Scikit-learn)
- Data Science & Analytics (Pandas, NumPy, Matplotlib, Seaborn)
- Generative AI (OpenAI GPT, LangChain, Prompt Engineering, RAG systems)
- Web Development (Next.js, React, TypeScript, Node.js, FastAPI)
- Quantitative Trading & Finance (Algorithmic trading, backtesting, risk management, technical analysis)
- API Architecture & System Design (REST APIs, WebSockets, microservices)
- UI/UX Engineering (Framer Motion, Three.js, D3.js, Tailwind CSS)
- Database (PostgreSQL, MongoDB, Redis)

PROJECTS BUILT:
1. AI Trading Analytics Dashboard - Real-time trading dashboard with ML-powered signals, risk metrics, and portfolio analytics
2. Risk Management Calculator - Advanced quant risk calculator for position sizing, VaR, and drawdown analysis
3. 3D Interactive SaaS Website - Immersive web experience with React Three Fiber and GSAP animations
4. AI Resume Analyzer - Natural language processing tool that analyzes resumes and gives actionable feedback using OpenAI
5. Quant Backtesting Simulator - Full-featured algorithmic trading strategy backtester with performance analytics

EXPERIENCE & TIMELINE:
- 2023: Learned Web Development (React, Next.js, Node.js)
- 2024: Built AI-integrated websites and SaaS platforms
- 2025: Developed Trading Analytics & AI Dashboards
- 2026: Building Quant + GenAI systems

GOALS:
- Build production-grade AI products that solve real-world problems
- Develop high-performance fintech and quant analytics platforms
- Contribute to the intersection of AI and quantitative finance
- Create AI-powered SaaS applications with intelligent UX

PERSONALITY:
Confident, detail-oriented, technical, always learning. Focused on clean architecture, performance, and modern engineering practices.

Answer all questions as if you are a knowledgeable AI assistant about Priyanshu. Keep answers concise (2-4 sentences max unless more detail is explicitly requested). Be professional and technical when appropriate.`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
            // Return a demo response if no API key
            const demoResponses: Record<string, string> = {
                default: "Priyanshu is an AI developer specializing in Machine Learning, Data Science, and Quantitative Systems. He builds high-performance dashboards, AI-integrated SaaS platforms, and fintech analytics tools. Set your OPENAI_API_KEY in .env.local for live AI responses!",
            };

            const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
            let response = demoResponses.default;

            if (lastMessage.includes("project")) {
                response = "Priyanshu has built: an AI Trading Analytics Dashboard, Risk Management Calculator, 3D Interactive SaaS Website, AI Resume Analyzer, and a Quant Backtesting Simulator. Each project showcases his full-stack AI engineering capabilities.";
            } else if (lastMessage.includes("skill") || lastMessage.includes("tech")) {
                response = "Priyanshu's core stack includes Python (TensorFlow, PyTorch), Next.js/TypeScript, Generative AI (OpenAI, LangChain), Quantitative Finance tools, and advanced data visualization with D3.js and Three.js.";
            } else if (lastMessage.includes("goal") || lastMessage.includes("future")) {
                response = "Priyanshu's goal is to build production-grade AI products at the intersection of machine learning and quantitative finance, developing GenAI-powered SaaS systems with intelligent, high-performance UX.";
            }

            return NextResponse.json({ response });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages,
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        const response = completion.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";
        return NextResponse.json({ response });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Failed to get response" },
            { status: 500 }
        );
    }
}
