import React from 'react';
import styles from './RecommendCard.module.css';
import { truncateWithTrail } from '@/helpers/index';
import Link from 'next/link';
import Image from 'next/image';
import getBlurDataURL from "@/libs/base64ph";

interface IRecommendCardProps {
  _id:string;
  title: string;
  date: Date;
  img_url: string;
  slug:string;
}

// TODO: Pass blog's data with navigation do not request once more.

const RecommendCard: React.FC<IRecommendCardProps> = async (props: IRecommendCardProps ) => {
  const {_id,title,date,img_url,slug} = props;

  const blurUrl = await getBlurDataURL(img_url);
  return (
    <Link href={`/${slug}`} className={styles.container}>
      <figure>
        <picture>
          <Image
            src={img_url || '/img/bg-cover.webp'}
            alt={title}
            fill={true}
            objectFit={'cover'}
            className={styles.img}
            objectPosition={'center'}
            quality={90}
            placeholder={'blur'}
            blurDataURL={blurUrl}
          />
        </picture>
      </figure>

      <div className={styles.cardContent}>
        <h3>{truncateWithTrail(title, 50) || 'Title'}</h3>
        <span>{date ? date.toDateString() : new Date().toDateString()}</span>
      </div>
    </Link>
  );
};

export default React.memo(RecommendCard);
