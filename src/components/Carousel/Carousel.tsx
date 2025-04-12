'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Carousel.module.css';
import { Minus } from 'lucide-react';
import Link from 'next/link';
import { truncateWithTrail } from '@/helpers/index';

// TODO: State management.
interface ICarouselProps {
  _id?: string;
  title: string;
  snippet: string;
  slug: string;
  img_url: string;
}

const Carousel: React.FC<ICarouselProps> = (props: ICarouselProps) => {
  const { _id, title, snippet, slug, img_url } = props;

  const slides = Array.from({ length: 5 }, (_, i) => ({
    url: `https://picsum.photos/seed/slide-${i}/1920/1080`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselWrapper}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image
              src={slide.url}
              alt={`Slide ${index + 1}`}
              layout='fill'
              objectFit='cover'
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <ChevronLeft
        role={'button'}
        className={`${styles.carouselArrow} ${styles.left}`}
        onClick={prevSlide}
      />
      <ChevronRight
        role={'button'}
        className={`${styles.carouselArrow} ${styles.right}`}
        onClick={nextSlide}
      />

      <div className={styles.carouselIndicators}>
        {slides.map((_, i) => (
          <>
            <Minus
              width={24}
              height={24}
              color={i === currentIndex ? '#ffa500' : '#ffffff33'}
              className={styles.indicator}
              onClick={() => goToSlide(i)}
            />
          </>
        ))}
      </div>
      <Link href={'#'} className={styles.carouselContent}>
        <div className={styles.carouselTitle}>
          {truncateWithTrail(
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis nobis aut voluptates dolore natus tempora corporis nam autem totam quae ipsam voluptas at molestiae, sed facere exercitationem voluptatum odio sit!',
            150,
          )}
        </div>
        <div className={styles.carouselSnippet}>
          {truncateWithTrail(
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis nobis aut voluptates dolore natus tempora corporis nam autem totam quae ipsam voluptas at molestiae, sed facere exercitationem voluptatum odio sit!',
            200,
          )}
        </div>
      </Link>
    </div>
  );
};

export default Carousel;
