import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

CustomEase.create("hop", "0.9,0,0.1,1");
CustomEase.create("glide", "0.8,0,0.2,1");

const App = () => {
  function shuffleImage() {
    const imgs = document.querySelectorAll(".img");
    imgs.forEach((img, mainIdx) => {
      let i = 0;
      const interval = setInterval(() => {
        img.src = `/image${mainIdx + 1}_${(i % 4) + 1}.png`;
        i++;
        if (i === 21) {
          clearInterval(interval);
        }
      }, 178);
    });
  }

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".main-img-cpy", {
      autoAlpha: 0,
    });

    tl.from(".logo", {
      opacity: 0.2,
      duration: 1.5,
    })
      .from([".project-item-header-1", ".project-item-header-2"], {
        opacity: 0,
        onStart: shuffleImage,
        onComplete: () => {
          gsap.set(".logo", {
            display: "none",
          });
        },
      })
      .fromTo(
        ".project-item-1",
        {
          opacity: 0,
        },
        {
          opacity: 0.4,
          stagger: 0.05,
        },
        "<",
      )
      .fromTo(
        ".project-item-2",
        {
          opacity: 0,
        },
        {
          opacity: 0.4,
          stagger: 0.05,
        },
        "<",
      )
      .from(
        ".img",
        {
          clipPath: "inset(0 0 100% 0)",
          ease: "glide",
        },
        "<",
      )
      .to(".project-item-1", {
        opacity: 1,
        stagger: 0.08,
      })
      .to(
        ".project-item-2",
        {
          opacity: 1,
          stagger: 0.08,
        },
        "<",
      )
      .to(".project-item-header-1", {
        clipPath: "inset(0 0 100% 0)",
      })
      .to(
        ".project-item-header-2",
        {
          clipPath: "inset(0 0 100% 0)",
        },
        "<",
      )
      .to(
        ".project-item-1",
        {
          clipPath: "inset(0 0 100% 0)",
          stagger: 0.05,
        },
        "<",
      )
      .to(
        ".project-item-2",
        {
          clipPath: "inset(0 0 100% 0)",
          stagger: 0.05,
        },
        "<",
      )
      .to(
        ".img:not(.main-img)",
        {
          clipPath: "inset(0 0 100% 0)",
        },
        "<",
      )
      .to(".main-img", {
        yPercent: -20,
      })
      .to(
        ".main",
        {
          backgroundColor: "white",
        },
        "<",
      )
      .fromTo(
        ".main-img",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        {
          scale: 3,
          clipPath: "polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)",
          ease: "glide",
          immediateRender: false,
          onComplete: () => {
            const mainImage = document
              .querySelector(".main-img")
              .getBoundingClientRect();
            gsap.set(".main-img-cpy", {
              left: mainImage.left,
              top: mainImage.top,
              width: mainImage.width,
              autoAlpha: 1,
              height: mainImage.height,
              clipPath: "polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)",
            });

            gsap.to(".preloader", {
              display: "none",
            });
          },
        },
      )
      .fromTo(
        ".navbar",
        {
          yPercent: -100,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
        },
        "<",
      )
      .to(".main-img-cpy:nth-child(1)", {
        rotate: 20,
        xPercent: 50,
        scale: 0.8,
        ease: "hop",
      })
      .to(
        ".main-img-cpy:nth-child(2)",
        {
          rotate: -20,
          scale: 0.8,
          xPercent: -50,
          ease: "hop",
        },
        "<",
      )
      .fromTo(
        ".appear",
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      );
  });

  const songsArtist = [
    { song: "Billie Converse", artist: "Zoe Donahue" },
    { song: "Guest In Residence", artist: "Sean Thomas" },
    { song: "Genesis", artist: "Bergh // Moder" },
    { song: "Netflix The Mother", artist: "Jason Bergh" },
    { song: "Katseye", artist: "Bergh // Weinberger" },
    { song: "Lenny Kravitz", artist: "Marlow // Bergh" },
    { song: "Converse Skate", artist: "Joe Bressler" },
    { song: "Eilish No. 2", artist: "Harper // Dealy" },
    { song: "JLO Beauty", artist: "Bergh // Midenge // Kroes" },
    { song: "Tinder", artist: "Pol Kurucz" },
    { song: "King Kong", artist: "Nabil" },
    { song: "Xeomin", artist: "Daniella Midenge" },
    { song: "Coach", artist: "Bergh // Porat // Rizzi" },
    { song: "JLO Beauty", artist: "Bergh // Midenge // Kroes" },
    { song: "Eilish No.3", artist: "Harper // Dealy" },
    { song: "BMW", artist: "Joe Bressler" },
    { song: "YSL x Sasha Calle", artist: "Marlow // Bergh" },
    { song: "Inkd", artist: "Clennon // Lamar" },
  ];

  const projectLocations = [
    "Los Angeles, CA",
    "Private Residence Malibu, CA",
    "Los Angeles, CA",
    "Line 204 - Los Angeles, CA",
    "Dust Studios - Los Angeles, CA",
    "Vasquez Rocks",
    "Paris, FR",
    "Quixote Studios - Los Angeles, CA",
    "Hubble Studios - Los Angeles, CA",
    "Line 204 Studios - Los Angeles, CA",
    "Tom of Finland House - Los Angeles, CA",
    "Malibu, CA",
    "USA",
    "Hubble Studios - Los Angeles, CA",
    "Los Angeles, CA",
    "On Location Santa Monica, CA",
    "On Location Santa Monica, CA",
    "Four Seasons Hotel, Beverly Hills, CA",
  ];
  return (
    <>
      <div className="fixed navbar w-full top-0 z-60 bg-transparent h-16">
        <div className="container mx-auto px-5 h-full flex w-full items-center justify-between">
          <div className="flex gap-6">
            <p className="text-4xl font-black italic">Nite Riot</p>
          </div>
          <div className="flex gap-6 text-2xl font-semibold">
            <p>About</p>
            <p>Services</p>
            <p>Projects</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
      <div className="fixed left-0 z-50 bottom-5 w-full">
        <div className="px-5">
          <p className="text-2xl font-semibold appear">Appearing Soon</p>
        </div>
      </div>
      <div className="main relative bg-black w-full h-screen overflow-hidden">
        <div className="absolute top-0 left-0 main-img-cpy">
          <img
            src="./image2_1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 main-img-cpy">
          <img
            src="./image3_1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 main-img-cpy">
          <img
            src="./image5_1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="preloader h-full">
          <div className="bg-inherit h-full flex justify-center items-center">
            <h1 className="logo font-black italic uppercase text-4xl text-white leading-[0.9] tracking-tighter text-center">
              Nite <br />
              Riot
            </h1>
          </div>
          <div className="absolute inset-0 w-full p-15 pr-30">
            <div className="flex justify-center lg:justify-between w-full h-full">
              <div className="hidden lg:flex flex-col md:gap-12 gap-3">
                <div className="project-item-header-1 flex md:gap-42 gap-14 text-[clamp(0.5rem,1vw,1.3rem)] text-white uppercase">
                  <p>Project</p>
                  <p>Director // photographer</p>
                </div>
                <div className="flex flex-col gap-3">
                  {songsArtist.map((item, index) => (
                    <div
                      key={index}
                      className="project-item-1 flex justify-between uppercase text-white"
                    >
                      <p>{item.song}</p>
                      <p>{item.artist}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-10 py-18">
                {Array.from({ length: 9 }, (_, i) => (
                  <div
                    key={i}
                    className="img-wrapper w-[min(160px,20vw)] h-[min(160px,20vw)]"
                  >
                    <img
                      src={`/image${i + 1}_1.png`}
                      alt=""
                      className={`img w-full h-full object-cover ${i === 4 ? "main-img" : ""}`}
                    />
                  </div>
                ))}
              </div>
              <div className="hidden lg:flex flex-col md:gap-12 gap-3 text-white">
                <p className="project-item-header-2 uppercase">Project</p>
                <div className="flex flex-col gap-3 uppercase text-[clamp(0.5rem,1vw,1.3rem)]">
                  {projectLocations.map((item, index) => (
                    <p key={index} className="project-item-2">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
