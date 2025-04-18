import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import SkillsMarquee from "./components/SkillsMarquee";

const App = () => {
  return (
    <main className="bg-black flex items-center justify-start flex-col">
      <Hero />
      <Reveal />
      <SkillsMarquee />
    </main>
  );
};

export default App;
