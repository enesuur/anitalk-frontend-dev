import React from 'react';
import Button from '@/shared/ui/button/Button';
import TextInput from '@/shared/ui/input/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from '../_styles/SocialSection.module.css';

const socialSchema = z.object({
  x_username: z
    .string()
    .min(1, 'Username must be at least one character.')
    .max(24, 'Username can be max 24 characters.'),
  reddit_username: z
    .string()
    .min(1, 'Username must be at least one character.')
    .max(24, 'Username can be max 24 characters.'),
  mal_username: z
    .string()
    .min(1, 'Username must be at least one character.')
    .max(24, 'Username can be max 24 characters.'),
});

type SocialFormData = {
  x_username: string;
  reddit_username: string;
  mal_username: string;
};

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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SocialFormData>({
    resolver: zodResolver(socialSchema),
    mode: 'all',
    defaultValues: {
      x_username: x_username ?? '',
      reddit_username: reddit_username ?? '',
      mal_username: mal_username ?? '',
    },
  });

  const onSubmit = (data: SocialFormData) => {
    console.log('Form Submitted:', data);
  };

  return (
    <section>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.socialFormContainer}>
          <h2 className='setting-text-header'>Social Profiles</h2>
          <Controller
            name={'x_username'}
            control={control}
            render={({ field }) => (
              <TextInput
                label={'X (Twitter) Username'}
                name={'x_username'}
                value={field.value}
                onChange={field.onChange}
                error={errors.x_username?.message}
              />
            )}
          />
          <Controller
            name={'reddit_username'}
            control={control}
            render={({ field }) => (
              <TextInput
                label={'Reddit Username'}
                name={'reddit_username'}
                value={field.value}
                onChange={field.onChange}
                error={errors.reddit_username?.message}
              />
            )}
          />
          <Controller
            name={'mal_username'}
            control={control}
            render={({ field }) => (
              <TextInput
                label={'MyAnimeList'}
                name={'mal_username'}
                value={field.value}
                onChange={field.onChange}
                error={errors.mal_username?.message}
              />
            )}
          />
          <Button isDisabled={isSubmitting} isLoading={isLoading} text={'Update Profile'} />
        </form>
      </div>
    </section>
  );
};

export default React.memo(SocialSection);
