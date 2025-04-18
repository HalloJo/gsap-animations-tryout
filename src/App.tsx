import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

const App = () => {
  const hero = useRef<HTMLDivElement>(null);
  const heroImgContainer = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);
  const heroTextTitle = useRef<HTMLHeadingElement>(null);
  const heroTextName = useRef<HTMLHeadingElement>(null);
  const heroTextSlogan = useRef<HTMLHeadingElement>(null);
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

  useGSAP(
    () => {
      const splitTextJob = new SplitText(heroTextTitle.current, {
        type: "words",
      });
      const splitTextName = new SplitText(heroTextName.current, {
        type: "words",
      });
      const splitTextSlogan = new SplitText(heroTextSlogan.current, {
        type: "lines",
      });

      const scrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          markers: true,
        },
      });
      gsap.fromTo(
        splitTextName.words,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.05,
          ease: "power2.out",
          duration: 1,
        }
      );
      scrollTrigger.fromTo(
        heroImgContainer.current,
        {
          scale: 1,
        },
        {
          scale: 0.8,
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
      scrollTrigger.from(
        splitTextJob.words,
        {
          yPercent: 100,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      );
      scrollTrigger.to(
        splitTextName.words,
        {
          yPercent: -100,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      );
      scrollTrigger.fromTo(
        "#arrow-path path",
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "100% 0%",
          ease: "power1.inOut",
        },
        "<"
      );
      scrollTrigger.from(
        splitTextSlogan.lines,
        {
          yPercent: 200,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<+0.2"
      );
    },
    { scope: hero }
  );

  return (
    <main className="bg-black flex items-center justify-start flex-col">
      <section
        ref={hero}
        className=" w-full flex flex-col items-center h-[250vh]"
      >
        <div
          ref={heroImgContainer}
          className="sticky top-0 w-full bg-green-200 h-dvh will-change-transform origin-center"
        >
          <div className="overflow-hidden absolute top-10 left-10 z-10 mix-blend-exclusion">
            <p ref={heroTextName} className="text-9xl/snug text-white">
              Jorik van Ruiswijk
            </p>
          </div>
          <div className="overflow-hidden absolute top-10 left-10 z-10 mix-blend-exclusion">
            <p
              ref={heroTextTitle}
              className=" text-9xl/snug text-white font-semibold"
            >
              Creative developer
            </p>
          </div>
          <div className="overflow-hidden absolute bottom-10 left-10 z-10 mix-blend-exclusion w-1/2">
            <p
              ref={heroTextSlogan}
              className="text-5xl leading-[1.2] text-white"
            >
              He'll help you with identity, logo design, websites, applications,
              illustrations, icon design and more.
            </p>
          </div>
          <img
            className="object-cover w-full h-full absolute top-0 left-0"
            ref={heroImg}
            src="src/assets/Mesh_gradient_jo.png"
            alt=""
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              width="1809"
              height="958"
              viewBox="0 0 1809 958"
              id="arrow-path"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 817.638C12.7184 784.325 33.9765 756.981 56.2942 730.377C101.021 677.06 154.209 627.961 212.161 589.315C239.024 571.402 266.347 553.042 297.365 543.244C316.792 537.107 337.309 537.416 357.454 537.549C411.522 537.904 464.778 548.288 514.846 569.076C549.676 583.538 581.578 604.064 613.572 623.792C665.415 655.759 719.386 681.767 776.353 703.324C931.411 762 1104.06 752.594 1265.31 729.665C1369.5 714.849 1469.16 686.987 1563.11 638.743C1654.68 591.723 1723.46 520.74 1767.07 427.303C1795.72 365.923 1810.95 297.977 1806.11 230.203C1802.79 183.664 1792.38 136.86 1760.46 101.346C1724.14 60.9398 1670.92 39.1099 1619.03 27.2047C1540.81 9.25924 1459.18 4.34855 1379.18 2.1858C1252.78 -1.23153 1123.79 8.82499 1002.68 47.3418C953.292 63.0485 904.445 83.1186 858.303 106.736C825.079 123.742 789.778 142.542 763.542 169.69C696.529 239.033 755.129 342.779 791.096 412.658C806.288 442.173 822.899 470.712 840.917 498.597C853.941 518.754 868.372 537.266 878.638 559.11C891.427 586.322 896.939 611.749 896.939 641.794C896.939 683.1 876.41 715.235 858.1 749.904C844.003 776.595 817.945 795.944 794.451 813.57C772.709 829.881 747.843 842.69 724.499 856.488C709.35 865.442 694.141 875.202 680.169 885.779C666.974 895.767 650.762 905.952 641.634 920.154C636.785 927.7 629.212 934.225 625.265 942.122C624.121 944.41 620.588 956.03 620.588 949.444C620.588 940.538 622.418 931.388 622.418 922.188C622.418 916.804 620.588 900.748 620.588 914.662C620.588 920.789 618.898 926.509 618.758 932.562C618.656 936.953 620.588 940.644 620.588 944.868C620.588 947.443 620.433 957.139 624.248 955.343C630.231 952.527 635.545 948.49 641.634 945.783C653.668 940.433 667.868 940.443 679.152 934.799"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className="bg-pink-400 h-[200vh] w-full">
        <h2>Second section</h2>
      </section>
    </main>
  );
};

export default App;
