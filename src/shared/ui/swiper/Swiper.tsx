'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from '@/lib/cn';
import styles from './Swiper.module.css';
import { iconStyles } from '@/helpers';

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
  if (width >= 1600) return 5;
  if (width >= 1200) return 5;
  if (width >= 992) return 4;
  if (width >= 768) return 4;
  if (width >= 576) return 3;
  if (width >= 480) return 2;
  return 1;
};

const Swiper: React.FC<SwiperProps> = ({
  count = 12,
  width = 1920,
  height = 1080,
  contentStyle,
  containerClassname,
  containerStyle,
  options = {
    loop: true,
    autoplay: true,
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

  const maxIndex = Math.max(0, slides.length - (slidesPerView || 1));

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (options.autoplay && !isHovered && slidesPerView !== null) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          options.loop ? (prevIndex + 1) % slides.length : Math.min(prevIndex + 1, maxIndex),
        );
      }, options.autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [
    options.autoplay,
    isHovered,
    maxIndex,
    slides.length,
    options.loop,
    options.autoplayDelay,
    slidesPerView,
  ]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      options.loop ? (prev - 1 + slides.length) % slides.length : Math.max(prev - 1, 0),
    );
  }, [options.loop, slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      options.loop ? (prev + 1) % slides.length : Math.min(prev + 1, maxIndex),
    );
  }, [options.loop, maxIndex, slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div suppressHydrationWarning>
      {slidesPerView === null ? null : (
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
              <button onClick={handleNext} disabled={currentIndex === maxIndex && !options.loop}>
                <ChevronRight {...iconStyles} />
              </button>
            </div>
          )}

          <div className={styles.viewport}>
            <div
              className={clsx(styles.container, containerClassname)}
              ref={containerRef}
              style={{
                width: `${(slides.length * 100) / slidesPerView}%`,
                transform: `translateX(-${(100 / slides.length) * currentIndex}%)`,
                transition: `transform ${options.transitionDuration}ms ease`,
                ...containerStyle,
              }}
            >
              {slides.map((src, index) => (
                <Link
                  href='/blogs/test'
                  key={index}
                  className={clsx(styles.slide)}
                  style={{ width: `${100 / slides.length}%` }}
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
              {slides.map((_, index) => (
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
      )}
    </div>
  );
};

export default React.memo(Swiper);
