import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { truncateWithTrail } from '@/helpers/index';
import getBlurDataURL from '@/lib/base64ph';
import { H3 } from '@/shared/ui/headings';
import styles from './RecommendCard.module.css';

interface IRecommendCardProps {
  _id: string;
  title: string;
  date: Date;
  img_url: string;
  slug: string;
}

const RecommendCard: React.FC<IRecommendCardProps> = async (props: IRecommendCardProps) => {
  const { _id, title, date, img_url, slug } = props;

  const blurUrl = await getBlurDataURL(img_url);
  return (
    <Link href={`/blogs/${slug}`} className={styles.cardBox}>
      <figure>
        <picture>
          <Image
            src={img_url}
            alt={`${title}'s photo`}
            fill={true}
            quality={90}
            placeholder={'blur'}
            blurDataURL={blurUrl}
          />
        </picture>
      </figure>

      <div className={styles.cardContent}>
        <H3 style={{ margin: '0' }}>{truncateWithTrail(title, 50) || 'Awesome Blog Title'}</H3>
        <span>{date ? date.toDateString() : new Date().toDateString()}</span>
      </div>
    </Link>
  );
};

export default React.memo(RecommendCard);
