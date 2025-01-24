"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define slides outside of the component
const slides = [
  {
    id: 1,
    title: "Classic Black Hooded Sweatshirt",
    description: "Elevate your casual wardrobe with our",
    img: "https://i.imgur.com/cSytoSD.jpeg",
    url: "/",
    bg: "bg-gradient-to-r from-gray-100 to-gray-300", // Light gray to medium gray for a soft look
  },
  {
    id: 2,
    title: "Classic Navy Blue Baseball Cap",
    description: "Step out in style with this sleek",
    img: "https://i.imgur.com/R3iobJA.jpeg",
    url: "/",
    bg: "bg-gradient-to-r from-blue-200 to-blue-400", // Soft blue to light blue for a calming effect
  },
  {
    id: 3,
    title: "Classic Blue Baseball Cap",
    description: "Top off your casual look",
    img: "https://i.imgur.com/wXuQ7bm.jpeg",
    url: "/",
    bg: "bg-gradient-to-r from-indigo-200 to-indigo-400",
  },
];

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden mt-20">
      {/* Slider Content */}
      <div
        className="w-max h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlideIndex * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* Text Section */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl font-semibold">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4">
                  SHOP NOW
                </button>
              </Link>
            </div>

            {/* Image Section */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              currentSlideIndex === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Slide ${index + 1}`}
          >
            {currentSlideIndex === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
