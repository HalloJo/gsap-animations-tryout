import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

const App = () => {
  const hero = useRef<HTMLDivElement>(null);
  const heroImgContainer = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);
  const heroText = useRef<HTMLHeadingElement>(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(
    () => {
      // const splitText = new SplitText(heroText.current, { type: "chars" });

      const scrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          markers: true,
        },
      });
      scrollTrigger.fromTo(
        heroImgContainer.current,
        {
          scale: 1,
        },
        {
          scale: 0.6,
          borderRadius: "100px",
        }
      );
      scrollTrigger.fromTo(
        heroImg.current,
        {
          scale: 1,
          rotate: 0,
        },
        {
          scale: 0.6,
          rotate: 2,
          borderRadius: "80px",
        },
        "<"
      );
      scrollTrigger.fromTo(
        heroText.current,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
        },
        "-=0.5"
      );
    },
    { scope: hero }
  );

  return (
    <main className="bg-black flex items-center justify-start flex-col">
      <section
        ref={hero}
        className=" w-full flex flex-col items-center h-[200vh]"
      >
        <div
          ref={heroImgContainer}
          className="sticky top-0 w-full bg-amber-100 will-change-transform origin-center"
        >
          <div className="overflow-hidden absolute top-10 left-10 z-10">
            <p ref={heroText} className=" text-9xl font-black">
              JORIK VAN RUISWIJK
            </p>
          </div>
          <img
            className="object-cover sepia"
            ref={heroImg}
            src="src/assets/MFAD_Bureau.jpg"
            alt=""
          />
        </div>
      </section>
      <section className="bg-pink-400 h-[200vh] w-full">
        <h2>Second section</h2>
      </section>
    </main>
  );
};

export default App;
