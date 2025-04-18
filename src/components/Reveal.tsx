import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

const Reveal = () => {
  const revealSection = useRef<HTMLElement>(null);
  const revealContainer = useRef<HTMLDivElement>(null);
  const staticImg = useRef<HTMLImageElement>(null);
  const overlayImg = useRef<HTMLImageElement>(null);
  const revealTitle = useRef<HTMLParagraphElement>(null);
  const revealIntro = useRef<HTMLParagraphElement>(null);
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

  useGSAP(
    () => {
      const splitTextTitle = new SplitText(revealTitle.current, {
        type: "words",
      });
      const splitTextIntro = new SplitText(revealIntro.current, {
        type: "lines",
      });

      const scrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: revealSection.current,
          start: "top 50%",
          end: "bottom bottom",
          scrub: 1,
          markers: true,
        },
      });

      scrollTrigger.fromTo(
        revealContainer.current,
        {
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // full reveal
          ease: "power2.out",
        }
      );
      scrollTrigger.from(
        splitTextTitle.words,
        {
          yPercent: 100,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.5"
      );
      scrollTrigger.fromTo(
        "#scribble path",
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "100% 0%",
          ease: "power1.inOut",
        },
        "-=0.2"
      );
      scrollTrigger.to(
        staticImg.current,
        {
          scale: 0.8,
          ease: "power1.out",
          borderRadius: "80px",
          y: "5%",
          opacity: 0,
        },
        "-=0.3"
      );
      scrollTrigger.to(
        overlayImg.current,
        {
          top: 0,
        },
        "-=0.3"
      );
      scrollTrigger.from(
        splitTextIntro.lines,
        {
          yPercent: 300,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.1"
      );

      scrollTrigger.to(
        overlayImg.current,
        {
          scale: 0.8,
          ease: "power1.out",
          borderRadius: "80px",
          y: "5%",
          opacity: 0.4,
        },
        "-=0.3"
      );

      ScrollTrigger.refresh();
    },
    { scope: revealSection }
  );

  return (
    <section ref={revealSection} className="black h-[300vh] w-full">
      <div
        ref={revealContainer}
        className="sticky top-0 w-full h-dvh will-change-transform origin-center overflow-hidden"
      >
        <img
          ref={staticImg}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="src/assets/jo_reveal_image.jpg"
          alt=""
        />
        <img
          ref={overlayImg}
          className="absolute top-full left-0 w-full h-full object-cover z-10"
          src="src/assets/cacti.jpg"
          alt=""
        />
        <div className="absolute inset-0 flex items-center flex-col justify-center z-10">
          <div className="w-3/4">
            <div className="overflow-hidden">
              <p
                ref={revealTitle}
                className="text-9xl/snug text-white font-semibold"
              >
                Code is my canvas.
              </p>
            </div>
            <svg
              width="1300"
              height="36"
              viewBox="0 0 1300 36"
              fill="none"
              id="scribble"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 34C171.253 34 340.895 18.633 510 14C597.732 11.5964 685.096 1.99999 773.111 1.99999C977.812 1.99999 1184.07 -2.0112 1388.22 13.1111C1470.83 19.2306 1556.08 22 1638.89 22C1706.98 22 1775.08 26 1842.89 26C1941.46 26 2039.39 30 2138 30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="overflow-hidden">
              <p
                ref={revealIntro}
                className="text-5xl leading-[1.2] text-white font-medium"
              >
                I build expressive, cacti-tough, and animated digital
                experiences.
                <br />
                Bridging creativity and logic—one scroll at a time.
                <br />
                But I also make simpler stuff, don't worry :)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reveal;
