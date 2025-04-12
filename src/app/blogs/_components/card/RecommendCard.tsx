import React from 'react'
import styles from './RecommendCard.module.css'
import { truncateWithTrail } from '@/helpers/index'
import Link from 'next/link';
import Image from 'next/image';

interface IRecommendCardProps {
  title: string;
  date: Date;
  img_url: string;
}

const RecommendCard: React.FC<IRecommendCardProps> = ({ title, date, img_url }) => {
  return (
    <Link href={'#'} className={styles.container}>
      <figure>
        <picture>
          <Image
            src={img_url || 'https://picsum.photos/144/144'}
            alt={title}
            width={144}   // Provide width and height for next/image
            height={144}  // You can adjust these based on your design requirements
            objectFit="cover"  // Ensures the image maintains its aspect ratio
            objectPosition="center" // Centers the image within the container
          />
        </picture>
      </figure>

      <div className={styles.cardContent}>
        <h3>{truncateWithTrail(title, 150) || 'Title'}</h3>
        <span>{date ? date.toISOString() : new Date().toISOString()}</span>
      </div>
    </Link>
  )
}

export default React.memo(RecommendCard)
