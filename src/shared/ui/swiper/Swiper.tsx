'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Swiper.module.css';
import Image from 'next/image';
import Link from 'next/link';

// TODO: Swiper left and right corner side transition.

interface EmblaCarouselProps {
  count?: number;
  width?: number;
  height?: number;
  options?: Parameters<typeof useEmblaCarousel>[0];
}

const getSlidesPerView = (width: number): number => {
  switch (true) {
    case width >= 1600:
      return 5;
    case width >= 1200:
      return 5;
    case width >= 992:
      return 4;
    case width >= 768:
      return 4;
    case width >= 576:
      return 3;
    case width >= 480:
      return 2;
    default:
      return 1;
  }
};

const Swiper: React.FC<EmblaCarouselProps> = ({
  count = 5,
  width = 100,
  height = 425,
  options,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    loop: true,
    align: 'center' as const,
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView(window.innerWidth));

  const slides = Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/id/${i + 10}/${width}/${height}`,
  );

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handleResize = useCallback(() => {
    setSlidesPerView(getSlidesPerView(window.innerWidth));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div className={styles.embla}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((src, index) => (
            <Link
              href={'yourmom'}
              className={styles.slide}
              key={index}
              style={{ flex: `0 0 ${100 / slidesPerView}%` }}
            >
              <div className={styles.slideImgWrapper}>
                <div className={styles.slideOverlay}></div> {/* Overlay */}
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill={true}
                  objectFit={'cover'}
                  objectPosition={'center'}
                  loading={'lazy'}
                  className={styles.slideImg}
                  quality={100}
                />
                <div className={styles.blogTitle}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, ad!
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Swiper);
