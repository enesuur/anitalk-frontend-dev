'use client';
import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BreadCrumb.module.css';
import clsx from '@/lib/cn';

interface IBreadCrumbItem {
  name: string;
  href: string;
}

interface IBreadCrumbProps {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
}

const breadcrumbTranslations: { [key: string]: string } = {
  '': 'Home',
  about: 'About',
  faq: 'FAQ',
  blogs: 'Blogs',
  profile: 'Profile',
  settings: 'Settings',
  notifications: 'Notifications',
  'create-talk': 'Create Talk',
  contact: 'Contact',
  'get-appointment': 'Get Appointment',
  support: 'Support',
  'terms-of-service': 'Terms of Service',
  'privacy-policy': 'Privacy Policy',
  socials: 'Socials',
  'filter-blogs': 'Filter Blogs',
};

const BreadCrumb: React.FC<IBreadCrumbProps> = ({
  containerClassname,
  containerStyle,
  contentClassname,
  contentStyle,
}) => {
  const pathname = usePathname();

  const generateBreadcrumbs = useCallback((path: string): IBreadCrumbItem[] => {
    const pathnames = path.split('/').filter(Boolean);
    const breadcrumbs: IBreadCrumbItem[] = [{ name: breadcrumbTranslations[''], href: '/' }];

    pathnames.forEach((name, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      breadcrumbs.push({
        name: breadcrumbTranslations[name] || name,
        href,
      });
    });

    return breadcrumbs;
  }, []);

  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [generateBreadcrumbs, pathname]);

  return (
    <nav
      className={clsx(styles.breadCrumbContainer, containerClassname)}
      style={containerStyle ? containerStyle : {}}
    >
      <ol>
        {breadcrumbs.map((breadcrumb: IBreadCrumbItem, index: number) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li
              key={breadcrumb.href}
              className={clsx(isLast ? styles.active : undefined, contentClassname)}
              style={contentStyle}
            >
              {isLast ? (
                <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
              ) : (
                <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default React.memo(BreadCrumb);
