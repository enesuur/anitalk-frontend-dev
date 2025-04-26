'use client';
import React from 'react';
import styles from './Badge.module.css';
import { BADGE_MAP } from '@/helpers';
import type { LucideIcon } from 'lucide-react';
import type { BadgeMap } from '@/helpers';

interface IBadgeProps {
  type: number;
}

const Badge = ({ type }: IBadgeProps) => {
  const badge = BADGE_MAP[type as keyof BadgeMap] || BADGE_MAP[1];

  if (!badge) return null;

  const Icon = badge.icon as LucideIcon | undefined;

  return (
    <div className={styles.badgeBox}>
      {Icon && <Icon />}
      <span>{badge.title}</span>
    </div>
  );
};

export default React.memo(Badge);
