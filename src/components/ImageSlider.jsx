import { useEffect, useState } from "react";

import blade from "../assets/blade.jpeg";
import blower from "../assets/blower.jpeg";
import industrialHeater from "../assets/industrial.jpeg";
import industrialTools from "../assets/industrial-tool.jpeg";

const images = [blade, blower, industrialHeater, industrialTools];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Image Slider */}
      <div className="relative h-[350px] overflow-hidden rounded-2xl md:h-[470px]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / images.length)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="h-full"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image}
                alt={`Industrial engineering equipment ${index + 1}`}
                className="h-full w-full object-cover bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Information */}
      <div className="absolute bottom-3 left-3 rounded-xl bg-white p-4 shadow-xl sm:-bottom-5 sm:-left-5 sm:p-5">
        <p className="text-sm font-semibold text-slate-900">
          Industrial Product Solutions
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Quality • Reliability • Performance
        </p>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-7 bg-blue-600"
                : "w-2.5 bg-white/80 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
