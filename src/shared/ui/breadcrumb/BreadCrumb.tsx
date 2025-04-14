import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./BreadCrumb.module.css";

interface BreadCrumbItem {
  name: string;
  href: string;
}

interface BreadCrumbProps {
  customStyles?:React.CSSProperties;
}

const breadcrumbTranslations: { [key: string]: string } = {
  "": "Anasayfa",
  "about-us": "Hakkımızda",
  "treatments": "Tedaviler",
  "blogs": "Blog",
  "contact": "İletişim",
  "get-appointment": "Randevu Al",
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({customStyles}) => {
  const { pathname } = useRouter();

  const generateBreadcrumbs = (): BreadCrumbItem[] => {
    const pathnames = pathname.split("/").filter((item) => item);
    const breadcrumbs: BreadCrumbItem[] = [
      { name: breadcrumbTranslations[""], href: "/" },
    ];

    pathnames.forEach((name, index) => {
      const href = `/${pathnames.slice(0, index + 1).join("/")}`;
      breadcrumbs.push({
        name: breadcrumbTranslations[name] || name,
        href,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className={`${styles.breadCrumbContainer}`} style={customStyles}>
      <ol>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={breadcrumb.href} className={isLast ? styles.active : ""}>
              {!isLast ? (
                <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
              ) : (
                <span>{breadcrumb.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;