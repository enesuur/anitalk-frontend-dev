'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CircleDot } from 'lucide-react';
import styles from './Carousel.module.css';
import Button from '@/shared/ui/button/Button';
import { Dot } from '@/assets/icons';

const Carousel: React.FC = () => {
  const slides = Array.from({ length: 5 }, (_, i) => ({
    url: `https://picsum.photos/seed/slide-${i}/1920/1080`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: useCallBack
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // TODO: useCallBack
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // TODO: useCallBack
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  // useRef ile tutabiliyorsan böyle yap.
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    
    return () => clearInterval(interval);
  }, []);

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
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <Button className={`${styles.carouselArrow} ${styles.left}`}
      text='222'
      onClick={prevSlide}>
        <ChevronLeft />
      </Button>
      <Button className={`${styles.carouselArrow} ${styles.right}`} onClick={nextSlide}>
        <ChevronRight />
      </Button>

      {/* Indicators */}
      <div className={styles.carouselIndicators}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`${styles.indicator} ${i === currentIndex ? 'selectedSlide' : ''}`}
          >
            <Dot width={20} height={20} color='red' />
          </button>
        ))}
      </div>

      {/* Title */}
      <div className={styles.carouselTitle}>Carousel Title</div>
    </div>
  );
};

export default Carousel;
