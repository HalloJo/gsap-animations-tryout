import Hero from "./components/Hero";
import Reveal from "./components/Reveal";

const App = () => {
  return (
    <main className="bg-black flex items-center justify-start flex-col">
      <Hero />
      <Reveal />
    </main>
  );
};

export default App;
