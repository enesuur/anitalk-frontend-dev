import React from 'react';
import { H1 } from '@/shared/ui/headings';
import { X, Instagram, Youtube } from '@/assets/icons';
import { ISocialCardProps } from './_components/cards/SocialCard';
import SocialCard from './_components/cards/SocialCard';
import ContactForm from './_components/forms/ContactForm';
import BreadCrumb from '@/shared/ui/breadcrumb/BreadCrumb';
import styles from './_styles/Page.module.css';

const SOCIAL_ITEMS: readonly ISocialCardProps[] = [
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

const Page = () => {
  return (
    <React.Fragment>
      <section>
        <div className='container'>
          <H1>React out us!</H1>
          <BreadCrumb containerStyle={{ margin: '24px 0' }} />
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

      <section style={{ margin: '144px 0' }}>
        <div className='container'>
          <ContactForm />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Page;
