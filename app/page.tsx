import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SkillGraph from "@/components/SkillGraph";
import Projects from "@/components/Projects";
import GitHubPanel from "@/components/GitHubPanel";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SkillGraph />
      <Projects />
      <GitHubPanel />
      <Chatbot />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
