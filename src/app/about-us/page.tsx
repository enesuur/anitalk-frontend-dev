'use client';
import React, { useRef } from 'react';
import { H1, H2, H3 } from '@/shared/ui/headings';
import { Fan, Newspaper, Share, Compass, HeartHandshake, Earth, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import clsx from '@/lib/cn';
import { iconStyles } from '@/helpers';
import { Link as ScrollLink } from 'react-scroll';
import styles from './_styles/page.module.css';

/* CONSTANTS */
const MARGIN_BOTTOM: string = '192px';
const ONBOARDING_IMAGE_URLS = {
  welcome: {
    src: '/img/onboarding.webp',
    alt: 'Anitalk Community',
  },
  enjoy: {
    src: '/img/enjoy.webp',
    alt: 'Anitalk Features',
  },
  community: {
    src: '/img/community.webp',
    alt: 'Anitalk Community',
  },
  tinkering: {
    src: '/img/tinkering.webp',
    alt: 'Join Anitalk',
  },
} as const;

const MOTION_CONFIG = {
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

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
    offset: ['start end', `end -92px`],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id={`section${sectionId}`}
      style={{ marginBottom: MARGIN_BOTTOM }}
      initial={MOTION_CONFIG.initial}
      whileInView={MOTION_CONFIG.whileInView}
      exit={MOTION_CONFIG.exit}
    >
      <div className='container'>
        <div className={clsx(styles.horizontalBox, imageLeft ? styles.leftBox : styles.rightBox)}>
          <motion.div className={styles.verticalBox} style={{ y: yText, opacity }}>
            {children}
          </motion.div>

          <motion.picture
            className={styles.sectionImageWrapper}
            style={{
              y: yImage,
              opacity,
            }}
          >
            <Image src={imageSrc} alt={alt} fill priority={true} loading={'eager'} quality={90} />
          </motion.picture>
        </div>
      </div>
    </motion.section>
  );
};

const Page = () => {
  return (
    <React.Fragment>
      <ParallaxSection
        sectionId={1}
        imageSrc={ONBOARDING_IMAGE_URLS.welcome.src}
        alt={ONBOARDING_IMAGE_URLS.welcome.alt}
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
          className={styles.scrollLink}
          to='section2'
          smooth={true}
          duration={1000}
          offset={-92}
        >
          <span aria-label='Go to next section'>Next Section</span>
          <ArrowRight />
        </ScrollLink>
      </ParallaxSection>

      <ParallaxSection
        sectionId={2}
        imageSrc={ONBOARDING_IMAGE_URLS.enjoy.src}
        alt={ONBOARDING_IMAGE_URLS.enjoy.alt}
      >
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
          className={styles.scrollLink}
          to='section3'
          smooth={true}
          duration={1000}
          offset={-92}
        >
          <span aria-label='Go to next section'>Next Section</span>
          <ArrowRight />
        </ScrollLink>
      </ParallaxSection>

      <ParallaxSection
        sectionId={3}
        imageSrc={ONBOARDING_IMAGE_URLS.community.src}
        alt={ONBOARDING_IMAGE_URLS.community.alt}
        imageLeft
      >
        <H2>Why Anitalk?</H2>
        <p>
          Anitalk is more than just a platform; it's a community. We believe that fans deserve a
          space to:
        </p>
        <ul className={styles.listBox}>
          <li className={clsx(styles.rowBox, styles.mobileListRow)}>
            <Share {...iconStyles} />
            Share their perspectives.
          </li>
          <li className={clsx(styles.rowBox, styles.mobileListRow)}>
            <Compass {...iconStyles} />
            Discover new content.
          </li>
          <li className={clsx(styles.rowBox, styles.mobileListRow)}>
            <HeartHandshake {...iconStyles} />
            Engage in discussions.
          </li>
          <li className={clsx(styles.rowBox, styles.mobileListRow)}>
            <Earth {...iconStyles} />
            Connect with others.
          </li>
        </ul>
        <ScrollLink
          className={styles.scrollLink}
          to='section4'
          smooth={true}
          duration={1000}
          offset={-92}
        >
          <span aria-label='Go to next section'>Next Section</span>
          <ArrowRight />
        </ScrollLink>
      </ParallaxSection>

      <ParallaxSection
        sectionId={4}
        imageSrc={ONBOARDING_IMAGE_URLS.tinkering.src}
        alt={ONBOARDING_IMAGE_URLS.tinkering.alt}
      >
        <div className={styles.verticalBox}>
          <H2>Ready to Join?</H2>
          <p>Anitalk is your space to celebrate, critique, and connect.</p>
          <Link href='/auth/sign-up'>Get Started!</Link>
        </div>
      </ParallaxSection>
    </React.Fragment>
  );
};

export default Page;
