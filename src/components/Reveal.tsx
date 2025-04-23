import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import revealImage from "../assets/jo_reveal_image.jpg";
import overlayImage from "../assets/cacti.jpg";

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
      scrollTrigger.fromTo(
        "#heart path",
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "100% 0%",
          ease: "power1.inOut",
        },
        "-=0.4"
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
          src={revealImage}
          alt=""
        />
        <img
          ref={overlayImg}
          className="absolute top-full left-0 w-full h-full object-cover z-10"
          src={overlayImage}
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
            <div className="w-1/8 absolute right-20 bottom-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 525 551"
                fill="none"
                id="heart"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M198 180C192.667 179.333 194 161.192 194 157.778C194 136.888 200.406 115.695 208.889 96.6667C229.168 51.1761 271.39 -0.494623 326.111 2.11116C382.389 4.79106 443.942 34.8487 477.889 80.1112C496.539 104.978 516.064 133.811 519.556 165.556C521.82 186.142 525.877 210.72 517.556 230.444C499.932 272.218 472.86 298.019 435.556 322.889C400.824 346.044 361.719 364.512 323 380C277.814 398.075 239.152 426.375 205.111 460.889C183.686 482.612 167.165 506.433 152.111 532.778C149.391 537.538 144.889 553.038 144.889 547.556C144.889 542.614 147.92 536.354 149 531.556C160.037 482.502 144.025 434.063 126 389C119.01 371.526 110.535 353.66 100 338C87.7807 319.836 70.7693 304.653 57.7778 286.889C30.1213 249.073 2 201.294 2 152.444C2 112.469 25.3058 71.2909 58 49.2223C92.2233 26.1216 132.626 20.741 170 38.4445C181.599 43.9389 189.494 53.2063 197.111 63C200.275 67.068 203.235 71.3595 205.556 76C207.923 80.7356 207.193 85.79 210 90"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reveal;
