import React from 'react';
import clsx from '@/lib/cn';
import styles from './styles.module.css';

interface ILabelObject {
  title: string;
  color: string;
}

interface BlogBadgeProps {
  label: ILabelObject;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
}

export const CATEGORY_COLORS = {
  Anime: 'blue',
  Manga: 'green',
  Donghua: 'red',
  'Light Novels': 'yellow',
  AMV: 'purple',
  Cosplay: 'brown',
  Blogs: 'cyan',
} as const;

type CategoryTitle = keyof typeof CATEGORY_COLORS;

const BlogBadge: React.FC<BlogBadgeProps> = ({
  label,
  containerClassname,
  containerStyle,
  contentClassname,
  contentStyle,
}) => {
  return (
    <div
      className={clsx(styles.badgeBox, containerClassname)}
      style={{ backgroundColor: label.color, ...containerStyle }}
    >
      <span className={clsx(contentClassname)} style={contentStyle}>
        {label.title}
      </span>
    </div>
  );
};

export default React.memo(BlogBadge);
