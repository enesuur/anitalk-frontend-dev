'use client';
import React, { useState } from 'react';
import Button from '@/shared/ui/button/Button';
import TextInput from '@/shared/ui/input/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { H2, H3 } from '@/shared/ui/headings';
import { Reddit, Mal, XVariant } from '@/assets/icons';
import { remoteInstance } from '@/http/axios';
import Sonner from '@/shared/ui/sonner/Sonner';
import { iconStyles } from '@/helpers';
import styles from '../_styles/SocialSection.module.css';

const socialSchema = z.object({
  x_username: z.string().min(1).max(24).nullable(),
  reddit_username: z.string().min(1).max(24).nullable(),
  mal_username: z.string().min(1).max(24).nullable(),
});

type SocialFormData = z.infer<typeof socialSchema>;

interface ISocialSectionProps {
  x_username?: string;
  reddit_username?: string;
  mal_username?: string;
}

const SocialSection: React.FC<ISocialSectionProps> = ({
  x_username,
  reddit_username,
  mal_username,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SocialFormData>({
    resolver: zodResolver(socialSchema),
    mode: 'all',
    defaultValues: {
      x_username: x_username || '',
      reddit_username: reddit_username || '',
      mal_username: mal_username || '',
    },
  });

  // TODO: Tanstack handler
  const onSubmit = async (data: SocialFormData) => {
    const test = true;
    try {
      // const res = await remoteInstance.post('/fancyendpoint', data);
      if (test) {
        setIsAlertOpen(true);
      }
      console.log('Form Submitted:', data);
    } catch (error) {
      console.error('Error -- > Social Section', error);
      setIsAlertOpen(true);
    }
  };

  // Render input fields
  const renderInput = (name: keyof SocialFormData, label: string, icon: React.ReactNode) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={styles.inputWrapper}>
          <div className={styles.iconBox}>{icon}</div>
          <TextInput
            label={label}
            name={name}
            value={field.value}
            onChange={field.onChange}
            error={errors[name]?.message}
          />
        </div>
      )}
    />
  );

  return (
    <section>
      <div className='container'>
        <H2>Social Settings</H2>
        <H3>Maybe girls want to stalk you :) </H3>
        {isAlertOpen && (
          <Sonner
            isOpen={isAlertOpen}
            message='An error occurred while submitting your data.'
            title='Error'
            onClose={() => setIsAlertOpen(false)}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
          {renderInput('x_username', 'X (Twitter) username', <XVariant {...iconStyles} />)}
          {renderInput('reddit_username', 'Reddit username', <Reddit {...iconStyles} />)}
          {renderInput('mal_username', 'MyAnimeList username', <Mal {...iconStyles} />)}
          <Button isDisabled={isSubmitting} isLoading={isSubmitting || isLoading} text={'Update'} />
        </form>

        {isAlertOpen && (
          <Sonner
            isOpen={true}
            message='You are not funny, you cannot enter swears buddy!'
            title='No swears!'
            onClose={() => setIsAlertOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default React.memo(SocialSection);
