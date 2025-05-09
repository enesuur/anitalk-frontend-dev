'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/shared/ui/input/TextInput';
import InpPassword from '@/shared/ui/input/InpPassword';
import Button from '@/shared/ui/button/Button';
import styles from './Signin.module.css';
import Divider from '@/shared/ui/hr/Divider';
import GoogleIcon from '@/assets/icons/Google';
import { useRouter } from 'next/navigation';
import { Key, Cat } from 'lucide-react';

const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(30, { message: 'Username must be less than 30 characters' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Za-z]/, { message: 'Password must contain letters' })
    .regex(/[0-9]/, { message: 'Password must contain numbers' }),
});

type FormData = {
  username: string;
  password: string;
};

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted:', data);
  };

  const navigateToForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const navigateToSignUp = () => {
    router.push('/auth/sign-up');
  };

  return (
    <section>
      <div className={`${styles.formWrapper} container`}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <h1>Sign in</h1>
          <p>Hey, welcome back, we missed you a lot!</p>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <TextInput
                label='Username'
                name='username'
                placeholder='Enter your username'
                value={field.value}
                onChange={field.onChange}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <InpPassword
                label='Password'
                name='password'
                placeholder='Enter your password'
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Button isLoading={isLoading} isDisabled={isSubmitting} text='Sign in' />
          <Divider text={'or'} />
          <a href={'#'} className={styles.googleContainer}>
            <GoogleIcon width={24} height={24} color='#FFFFFF' opacity={0.8} />
            <span>Sign in with google</span>
          </a>
          <div className={styles.formFooter}>
            <div className={styles.footerWrapper}>
              <div className={styles.footerLeft}>
                <Key width={16} height={16} color={'#FFFFFF'} opacity={0.8} />
                <span onClick={navigateToForgotPassword} className={styles.link}>
                  Forgot password?
                </span>
              </div>

              <div className={styles.footerRight}>
                <Cat width={16} height={16} color={'#FFFFFF'} opacity={0.8} />
                <span onClick={navigateToSignUp} className={styles.link}>
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
