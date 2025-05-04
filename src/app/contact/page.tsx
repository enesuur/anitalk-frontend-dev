import React from 'react';
import { z } from 'zod';
import InpMail from '@/shared/ui/input/mail/InpMail';
import TextArea from '@/shared/ui/input/textarea/TextArea';
import TextInput from '@/shared/ui/input/TextInput';
import { H1, H2 } from '@/shared/ui/headings';
import { X, Instagram, Youtube } from '@/assets/icons';
import { ISocialCardProps } from './_components/SocialCard';
import SocialCard from './_components/SocialCard';
import styles from './_styles/Page.module.css';

export const SOCIAL_ITEMS: readonly ISocialCardProps[] = [
  {
    title: 'Twitter',
    url: 'https://x.com',
    logo: <X />,
    platformName: 'Anitalk',
  },
  {
    title: 'Instagram',
    url: 'https://instagram.com',
    logo: <Instagram />,
    platformName: 'Anitalk',
  },
  {
    title: 'Youtube',
    url: 'https://youtube.com',
    logo: <Youtube />,
    platformName: 'Anitalk',
  },
];

Object.freeze(SOCIAL_ITEMS);

const Page = () => {
  return (
    <React.Fragment>
      <section>
        <div className='container'>
          <H1>React out us!</H1>
        </div>
      </section>

      <section>
        <div className='container'>
          <div className={styles.socialBox}>
            {SOCIAL_ITEMS.map((item: ISocialCardProps, index: number) => (
              <SocialCard
                key={index}
                title={item.title}
                url={item.url}
                logo={item.logo}
                platformName={item.platformName}
              />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Page;
