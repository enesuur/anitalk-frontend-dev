'use client';
import React, { useRef } from 'react';
import { H1, H2, H3 } from '@/shared/ui/headings';
import { Fan, Newspaper, Share, Compass, HeartHandshake, Earth, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import clsx from '@/lib/cn';
import styles from './_styles/page.module.css';
import { iconStyles } from '@/helpers';
import { Link as ScrollLink } from 'react-scroll';

const MARGIN_BOTTOM: string = '192px';

const ParallaxSection = ({
  imageSrc,
  alt,
  children,
  imageLeft = false,
  sectionId,
}: {
  imageSrc: string;
  alt: string;
  children: React.ReactNode;
  imageLeft?: boolean;
  sectionId: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id={`section${sectionId}`}
      style={{ marginBottom: MARGIN_BOTTOM }}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='container'>
        <div className={clsx(styles.horizontalBox, imageLeft ? styles.leftBox : styles.rightBox)}>
          <motion.div className={styles.verticalBox} style={{ y: yText, opacity }}>
            {children}
          </motion.div>

          <motion.picture
            style={{
              y: yImage,
              opacity,
              position: 'relative',
              width: '50%',
              height: 'calc(80vh - 32px)',
            }}
          >
            <Image src={imageSrc} alt={alt} fill />
          </motion.picture>
        </div>
      </div>
    </motion.section>
  );
};

const Page = () => {
  return (
    <>
      <ParallaxSection
        sectionId={1}
        imageSrc='/img/onboarding.webp'
        alt='Anitalk Community'
        imageLeft
      >
        <H1>What is anitalk?</H1>
        <p>
          Picture this: you know that feeling when you just need to talk about that amazing anime
          episode, that mind-blowing manga chapter, or that cosplayer who absolutely nailed it?
          We're building a place where that feeling isn't just a fleeting thought – it's the whole
          point! Think of it as your go-to spot to not only keep tabs on the creators you're
          obsessed with but also to really dive into their work with fellow fans.
        </p>
        <ScrollLink
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          to='section2'
          smooth={true}
          duration={1000}
        >
          <span>Next Section</span>
          <ArrowRight />
        </ScrollLink>
      </ParallaxSection>

      <ParallaxSection sectionId={2} imageSrc='/img/enjoy.webp' alt='Anitalk Features'>
        <H2>Voice of the Fans</H2>
        <div>
          <H3>Creator Reviews</H3>
          <p className={styles.rowBox}>
            <Share {...iconStyles} />
            <span>Share your honest opinions on the creators you follow.</span>
          </p>
        </div>
        <div>
          <H3>Engaging Blogs</H3>
          <p className={styles.rowBox}>
            <Newspaper {...iconStyles} />
            <span>Dive into fun and informative blog posts.</span>
          </p>
        </div>
        <div>
          <H3>Community</H3>
          <p className={styles.rowBox}>
            <Fan {...iconStyles} />
            <span>Connect with fans who share your passion.</span>
          </p>
        </div>
        <ScrollLink
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          to='section3'
          smooth={true}
          duration={1000}
        >
          <span>Next Section</span>
          <ArrowRight />
        </ScrollLink>
      </ParallaxSection>

      <ParallaxSection
        sectionId={3}
        imageSrc='/img/community.webp'
        alt='Anitalk Community'
        imageLeft
      >
        <H2>Why Anitalk?</H2>
        <p>
          Anitalk is more than just a platform; it's a community. We believe that fans deserve a
          space to:
        </p>
        <ul className={styles.listBox}>
          <li className={styles.rowBox}>
            <Share {...iconStyles} />
            Share their perspectives.
          </li>
          <li className={styles.rowBox}>
            <Compass {...iconStyles} />
            Discover new content.
          </li>
          <li className={styles.rowBox}>
            <HeartHandshake {...iconStyles} />
            Engage in discussions.
          </li>
          <li className={styles.rowBox}>
            <Earth {...iconStyles} />
            Connect with others.
          </li>
        </ul>
        <ScrollLink
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          to='section4'
          smooth={true}
          duration={1000}
        >
          <span>Next Section</span>
          <ArrowRight />
        </ScrollLink>
      </ParallaxSection>

      <ParallaxSection sectionId={4} imageSrc='/img/tinkering.webp' alt='Join Anitalk'>
        <div className={styles.verticalBox}>
          <H2>Ready to Join?</H2>
          <p>Anitalk is your space to celebrate, critique, and connect.</p>
          <Link href='/auth/sign-up'>Get Started!</Link>
        </div>
      </ParallaxSection>
    </>
  );
};

export default Page;
