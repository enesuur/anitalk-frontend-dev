'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from '@/lib/cn';
import { iconStyles } from '@/helpers';
import styles from './Swiper.module.css';

interface ISwiperOptions {
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  transitionDuration?: number;
  slidesPerView?: number;
  spacing?: number;
  showDots?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  responsive?: {
    [breakpoint: number]: {
      slidesPerView?: number;
      spacing?: number;
    };
  };
}

interface SwiperProps {
  count?: number;
  width?: number;
  height?: number;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  options?: ISwiperOptions;
}

const getSlidesPerView = (width: number): number => {
  if (width >= 992) return 4;
  if (width >= 768) return 3;
  if (width >= 576) return 3;
  if (width >= 480) return 2;
  return 1;
};

const Swiper: React.FC<SwiperProps> = ({
  count = 11,
  width = 1920,
  height = 1080,
  contentStyle,
  containerClassname,
  containerStyle,
  options = {
    loop: true,
    autoplay: false,
    autoplayDelay: 1500,
    transitionDuration: 500,
    slidesPerView: 1,
    spacing: 10,
    showDots: true,
    showArrows: true,
    pauseOnHover: true,
    responsive: {},
  },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesPerView, setSlidesPerView] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const slides = Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/id/${i + 10}/${width}/${height}`,
  );

  useEffect(() => {
    const handleResize = () => {
      const spv = getSlidesPerView(window.innerWidth);
      setSlidesPerView(spv);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxGroupIndex =
    slidesPerView !== null ? Math.max(0, Math.ceil(slides.length / slidesPerView) - 1) : 0;

  useEffect(() => {
    if (options.autoplay && !isHovered && slidesPerView !== null && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          options.loop
            ? (prevIndex + 1) % Math.ceil(slides.length / slidesPerView)
            : Math.min(prevIndex + 1, maxGroupIndex),
        );
      }, options.autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [
    options.autoplay,
    isHovered,
    slidesPerView,
    slides.length,
    options.loop,
    options.autoplayDelay,
    maxGroupIndex,
  ]);

  const handlePrev = useCallback(() => {
    if (slidesPerView === null) return;
    setCurrentIndex((prev) =>
      options.loop
        ? (prev - 1 + Math.ceil(slides.length / slidesPerView)) %
          Math.ceil(slides.length / slidesPerView)
        : Math.max(prev - 1, 0),
    );
  }, [options.loop, slides.length, slidesPerView]);

  const handleNext = useCallback(() => {
    if (slidesPerView === null) return;
    setCurrentIndex((prev) =>
      options.loop
        ? (prev + 1) % Math.ceil(slides.length / slidesPerView)
        : Math.min(prev + 1, maxGroupIndex),
    );
  }, [options.loop, slides.length, slidesPerView, maxGroupIndex]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (slidesPerView === null) return null;

  return (
    <div suppressHydrationWarning>
      <div
        className={styles.swiperWrapper}
        onMouseEnter={() => options.pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => options.pauseOnHover && setIsHovered(false)}
      >
        {options.showArrows && (
          <div className={styles.controlBox}>
            <button onClick={handlePrev} disabled={currentIndex === 0 && !options.loop}>
              <ChevronLeft {...iconStyles} />
            </button>
            <button onClick={handleNext} disabled={currentIndex === maxGroupIndex && !options.loop}>
              <ChevronRight {...iconStyles} />
            </button>
          </div>
        )}

        <div className={styles.viewport}>
          <div
            className={clsx(styles.container, containerClassname)}
            ref={containerRef}
            style={{
              width: `${(slides.length / slidesPerView) * 100}%`,
              transform: `translateX(-${(100 / (slides.length / slidesPerView)) * currentIndex}%)`,
              transition: `transform ${options.transitionDuration}ms ease`,
              ...containerStyle,
            }}
          >
            {slides.map((src, index) => (
              <Link
                href='/blogs/test'
                key={index}
                className={clsx(styles.slide)}
                style={{
                  width: `${100 / slides.length}%`,
                  paddingRight: `${options.spacing}px`,
                  paddingLeft: `${options.spacing}px`,
                }}
              >
                <div className={styles.slideImgWrapper}>
                  <div className={styles.slideOverlay}></div>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className={styles.slideImg}
                    quality={90}
                  />
                  <div className={styles.blogTitle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {options.showDots && (
          <div className={styles.dotsBox}>
            {Array.from({ length: Math.ceil(slides.length / slidesPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={clsx(styles.dot, {
                  [styles.active]: index === currentIndex,
                })}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Swiper);
