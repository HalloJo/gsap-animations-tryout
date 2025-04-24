import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import SkillsMarquee from "./components/SkillsMarquee";
import VerticalScrollGallery from "./components/VerticalScrollGallery";

const App = () => {
  return (
    <main className="bg-black flex items-center justify-start flex-col">
      <Hero />
      <Reveal />
      <SkillsMarquee />
      <VerticalScrollGallery />
    </main>
  );
};

export default App;
