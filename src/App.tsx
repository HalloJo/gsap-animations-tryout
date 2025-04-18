import Hero from "./components/Hero";

const App = () => {
  return (
    <main className="bg-black flex items-center justify-start flex-col">
      <Hero />
      <section className="bg-pink-400 h-[200vh] w-full">
        <h2>Second section</h2>
      </section>
    </main>
  );
};

export default App;
