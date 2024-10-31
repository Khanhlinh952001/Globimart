import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BannerImage {
  src: string;
  alt: string;
  href: string;
}

interface BannerCarouselProps {
  items: BannerImage[];
  autoScrollInterval?: number;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ items, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 2 >= items.length ? 0 : prev + 2));
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? items.length - 2 : prev - 2));
  }, [items.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, autoScrollInterval);
    return () => clearInterval(intervalId);
  }, [nextSlide, autoScrollInterval]);

  return (
    <div className="relative mb-8">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
        >
          {Array.from({ length: Math.ceil(items.length / 2) }).map((_, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                {items.slice(index * 2, index * 2 + 2).map((image, imageIndex) => (
                  <Link key={imageIndex} href={image.href}>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        &#8594;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(items.length / 2) }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex / 2 ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
