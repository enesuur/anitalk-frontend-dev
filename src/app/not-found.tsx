import React from 'react';
import Link from 'next/link';
import styles from './_styles/NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.sectionContainer}>
      <article className='container'>
        <h1>404!</h1>
        <h3>Oops! Something went wrong :/ </h3>
        <p className={styles.notFoundDesc}>
        Lost your way? No worries, we're here to help you find your path again!
        </p>
        <Link href='/' className={styles.btnLink}>
          Go back to route
        </Link>

        <p className={styles.supportContainer}>
          <span>Need help?</span>
          <a
            href='mailto:support@dummysite.kick'
            aria-label='Contact support via email'
            rel='noopener noreferrer'
          >
            Reach out to us at support@dummysite.kick
          </a>
        </p>
      </article>
    </section>
  );
};

export const revalidate = 86400;

export default NotFound;
