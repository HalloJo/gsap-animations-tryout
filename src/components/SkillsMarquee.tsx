import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const SkillsMarquee = () => {
  const skills = [
    ["Creative Development", "Graphic Design", "Illustration"],
    ["Web Animation", "GSAP", "ScrollTrigger", "Lottie"],
    ["React", "Next.js", "Angular", "TypeScript", "Tailwind", "HTML", "SCSS"],
    ["WordPress", "Elementor", "WooCommerce"],
    ["UX/UI Design", "Figma", "Adobe XD", "Prototyping"],
    ["Strapi", "Headless CMS", "Prismic", "REST API Integration"],
    ["Print Design", "Branding", "Logo Design", "Packaging"],
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLDivElement>(".skill-row");

      rows.forEach((row, index) => {
        const direction = index % 2 === 0 ? "-10%" : "10%";

        gsap.fromTo(
          row,
          { x: direction },
          {
            x: "0%",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom bottom",
              scrub: true,
              markers: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-black h-[200vh] w-full  py-28 ">
      <div className="sticky top-50 w-full h-dvh flex flex-col items-center justify-start overflow-hidden">
        <h2 className="text-6xl leading-[1.2] mb-8 text-white font-semibold">
          What I bring to the table.
        </h2>
        <div className="flex flex-col items-center overflow-hidden">
          {skills.map((skill, index) => {
            const randomWord = skill[Math.floor(Math.random() * skill.length)];

            return (
              <div
                key={index}
                className="skill-row flex gap-3 min-w-[100%] text-[clamp(2rem,4vw,5rem)] font-medium leading-tight tracking-tight whitespace-nowrap"
              >
                {[...Array(3)].map((_, repeatIndex) => (
                  <div key={repeatIndex} className="flex gap-3">
                    {skill.map((word, index) => (
                      <span
                        key={`${repeatIndex}-${index}`}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={`inline-block transition duration-300 ${
                            word === randomWord
                              ? "text-green-200 hover:text-white"
                              : "text-[#6A7D75] hover:text-green-200"
                          }`}
                        >
                          {word}
                        </span>
                        {index < skill.length - 1 && (
                          <span className="font-light text-[#6A7D75] select-none px-2">
                            |
                          </span>
                        )}
                      </span>
                    ))}
                    <span className="font-light text-[#6A7D75] select-none px-2">
                      |
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
