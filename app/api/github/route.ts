import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "priyanshushukla";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-site",
};

if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
}

export const revalidate = 300; // Cache for 5 minutes

export async function GET(_request: NextRequest) {
    try {
        // Fetch all repos
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { headers, next: { revalidate: 300 } }
        );

        if (!reposRes.ok) {
            // Return mock data if GitHub API fails (e.g. rate limited, user not found)
            return NextResponse.json(getMockData());
        }

        const repos = await reposRes.json();

        // Calculate language stats
        const languages: Record<string, number> = {};
        let totalStars = 0;

        for (const repo of repos) {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
            totalStars += repo.stargazers_count || 0;
        }

        // Sort languages by count
        const sortedLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([name, count]) => ({ name, count }));

        // Get recent repos
        const recentRepos = repos.slice(0, 6).map((r: {
            name: string;
            description: string | null;
            html_url: string;
            language: string | null;
            stargazers_count: number;
            updated_at: string;
        }) => ({
            name: r.name,
            description: r.description || "",
            url: r.html_url,
            language: r.language || "Other",
            stars: r.stargazers_count,
            updatedAt: r.updated_at,
        }));

        // Fetch user info for total public repos
        const userRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            { headers, next: { revalidate: 300 } }
        );
        const userData = await userRes.json();

        return NextResponse.json({
            totalRepos: userData.public_repos || repos.length,
            totalStars,
            followers: userData.followers || 0,
            languages: sortedLanguages,
            recentRepos,
            username: GITHUB_USERNAME,
            avatarUrl: userData.avatar_url || "",
        });
    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json(getMockData());
    }
}

function getMockData() {
    return {
        totalRepos: 28,
        totalStars: 47,
        followers: 12,
        languages: [
            { name: "Python", count: 12 },
            { name: "TypeScript", count: 8 },
            { name: "JavaScript", count: 5 },
            { name: "Jupyter Notebook", count: 3 },
        ],
        recentRepos: [
            { name: "ai-trading-dashboard", description: "Real-time AI trading analytics dashboard", url: "#", language: "TypeScript", stars: 8, updatedAt: "2026-03-01" },
            { name: "risk-calculator", description: "Quantitative risk management calculator", url: "#", language: "Python", stars: 5, updatedAt: "2026-02-20" },
            { name: "ai-resume-analyzer", description: "NLP-powered resume analyzer with OpenAI", url: "#", language: "Python", stars: 12, updatedAt: "2026-02-10" },
        ],
        username: "priyanshushukla",
        avatarUrl: "",
    };
}
