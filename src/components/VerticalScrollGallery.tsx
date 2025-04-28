import { useGSAP } from "@gsap/react";
// import React, { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useRef } from "react";
import { projects } from "../data/projects";

const VerticalScrollGallery = () => {
  const verticalScrollContainer = useRef<HTMLDivElement | null>(null);
  const verticalScrollContent = useRef<HTMLDivElement | null>(null);
  const introSection = useRef<HTMLDivElement>(null);
  const introTitle = useRef<HTMLParagraphElement>(null);
  const introText = useRef<HTMLParagraphElement>(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(() => {
    const container = verticalScrollContainer.current;
    const content = verticalScrollContent.current;
    if (!container || !content) return;

    const totalScrollX = content.scrollWidth - window.innerWidth;
    container.style.height = `${content.scrollWidth}px`;

    const splitTextTitle = new SplitText(introTitle.current, {
      type: "words",
    });
    const splitTextIntro = new SplitText(introText.current, {
      type: "lines",
    });

    document.body.style.overflowX = "hidden";

    // Horizontal scroll
    const horizontalScroll = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalScrollX}`,
        scrub: true,
      },
    });
    horizontalScroll.to(content, {
      x: -totalScrollX,
      ease: "none",
    });

    const preventScroll = (event: WheelEvent) => {
      if (event.deltaX !== 0) {
        event.preventDefault();
      }
    };

    // Add event listener to prevent horizontal scroll
    window.addEventListener("wheel", preventScroll, { passive: false });

    const introScrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: introSection.current,
        start: "top 70%",
        end: "+=100%",
        scrub: true,
      },
    });
    introScrollTrigger.from(
      splitTextTitle.words,
      {
        yPercent: 100,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.5"
    );
    introScrollTrigger.fromTo(
      "#arrow path",
      {
        drawSVG: "0% 0%",
      },
      {
        drawSVG: "100% 0%",
        ease: "power1.inOut",
      },
      "-=0.4"
    );
    introScrollTrigger.from(
      splitTextIntro.lines,
      {
        yPercent: 300,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.1"
    );
    gsap.utils.toArray(".case-item").forEach((item) => {
      const element = item as HTMLElement;

      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          containerAnimation: horizontalScroll,
          start: "left 80%",
          toggleActions: "play none none reverse",
          markers: true,
        },
        x: 200,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      document.body.style.overflowX = ""; // Restore the default overflow
    };
  }, []);

  return (
    <section className="bg-black w-full">
      <div ref={verticalScrollContainer} className="">
        <div ref={verticalScrollContent} className="flex h-screen sticky top-0">
          <div
            ref={introSection}
            className="flex flex-col items-end shrink-0 h-screen w-screen p-16"
          >
            <div className="overflow-hidden">
              <p
                ref={introTitle}
                className="text-[clamp(2rem,7vw,8rem)] leading-snug text-green-200 font-semibold"
              >
                Work that moves.
              </p>
            </div>
            <svg
              viewBox="0 0 640 152"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="arrow"
              className="w-[clamp(200px,50vw,1300px)] h-auto"
            >
              <path
                d="M12.4257 2.28922C-2.13359 18.4662 0.382145 59.5375 12.5435 76.2593C56.9227 137.281 147.138 144.983 215.49 148.58C251.076 150.453 285.197 149.774 320.674 145.4C355.305 141.131 387.653 130.775 421.146 121.489C469.016 108.219 515.592 88.4731 564.139 78.1439C577.285 75.347 590.546 72.1809 603.48 68.4854C610.197 66.5664 620.29 68.1247 626.213 64.834C628.98 63.2966 638.908 63.8386 637.874 63.7739C632.537 63.4404 628.487 58.8205 623.975 57.5312C618.494 55.9652 616.686 52.7892 619.852 61.6538C621.756 66.9837 624.937 73.4746 625.153 79.0862C625.904 98.6104 633.633 73.597 633.633 65.8941"
                stroke="#B8F8CF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className="w-1/4 overflow-hidden mt-16">
              <p
                ref={introText}
                className="text-[clamp(1rem,4vw,1.5rem)] leading-[1.2] text-green-200 font-light text-right"
              >
                A curated selection of interactive builds, simpler websites, and
                digital experiments.
              </p>
            </div>
          </div>
          {/* Project slides */}
          {projects.map((project) => (
            <div
              key={project.title}
              className={`w-screen h-screen flex flex-col items-center shrink-0 p-16 case-item`}
            >
              <div className="grid grid-cols-12 gap-y-8">
                <div className="col-span-full">
                  <div className="flex justify-between col-span-full row-start-1 ">
                    <p className="text-6xl/snug text-white font-semibold ">
                      {project.title}
                    </p>
                  </div>
                </div>
                <p className="col-span-8 text-[clamp(1rem,4vw,1.5rem)] font-light leading-[1.2] text-[#6A7D75] ">
                  {project.intro}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-8 col-start-2 hover:-translate-x-8 transition-all duration-300"
                >
                  <picture className="h-fit mask-r-from-50% mask-r-to-90%">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-[clamp(200px,60vw,700px)] h-auto object-cover rounded-3xl"
                    />
                  </picture>
                </a>
                <div className="flex flex-row flex-wrap gap-2 row-start-4 col-span-full ">
                  {project.tags &&
                    project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-white text-[clamp(1rem,4vw,1.25rem)] leading-[1.2] font-light border border-white px-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-yellow-300 h-screen w-screen">Outro content</div>
    </section>
  );
};

export default VerticalScrollGallery;
