import React from 'react';
import ForgotPassword from '../forms/ForgotPassword';
import styles from './styles.module.css';

export const revalidate = 86400;

const Page = async () => {
  return (
    <section>
      <ForgotPassword />
    </section>
  );
};

export default Page;
