'use client';
import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextInput from '@/shared/ui/input/TextInput';
import Button from '@/shared/ui/button/Button';
import { H2, H3, H4 } from '@/shared/ui/headings';
import Sonner from '@/shared/ui/sonner/Sonner';
import { filterSwears } from '@/helpers';
import { remoteInstance } from '@/http/axios';
import { useMutation } from '@tanstack/react-query';
import ENDPOINTS from '@/http/endpoints';
import { ISonnerToast } from '@/types/global';
import { AxiosError } from 'axios';
import styles from '../_styles/FavoriteSection.module.css';
import clsx from 'clsx';

/* 
All Forms handled.
*/
interface IFavoriteAnimeProps {
  favorite_anime: string | null;
  toastHandler: (title: string, message: string) => void;
}
const favoriteAnimeSchema = z.object({
  favorite_anime: z
    .string()
    .min(1, 'Please enter your favorite anime name.')
    .max(150, 'Favorite anime should be less than 150 characters.')
    .nullable(),
});
type FavoriteAnimeForm = z.infer<typeof favoriteAnimeSchema>;

const FavoriteAnimeForm: React.FC<IFavoriteAnimeProps> = ({
  favorite_anime,
  toastHandler,
}: IFavoriteAnimeProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm<FavoriteAnimeForm>({
    resolver: zodResolver(favoriteAnimeSchema),
    defaultValues: {
      favorite_anime: favorite_anime || '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['favorite-anime'],
    mutationFn: async (data: FormData) => {
      const response = await remoteInstance.post(ENDPOINTS.postUserFavorite, data);
      return response.data;
    },
    onSuccess: () => {
      toastHandler('Success', 'Favorite anime updated successfully.');
      reset();
    },
    onError: (error: AxiosError) => {
      console.log('Error', error);
      toastHandler('Error', 'Failed to update favorite anime. Please try again.');
    },
  });

  const onSubmit = (data: FavoriteAnimeForm) => {
    if (!data.favorite_anime) return;

    if (filterSwears(data?.favorite_anime, 'en')) {
      console.warn('User swear attempt!');
      toastHandler('Warning', 'Please avoid using inappropriate language.');
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className={styles.sectionWrapper}>
      <H4>What is your favorite anime?</H4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <Controller
          control={control}
          name='favorite_anime'
          render={({ field }) => (
            <TextInput
              name='favorite_anime'
              label='Favorite Anime'
              value={field.value}
              onChange={field.onChange}
              placeholder='e.g., Onepiece'
              error={errors.favorite_anime?.message}
            />
          )}
        />
        <Button text='Update' type='submit' disabled={isSubmitting} isLoading={isLoading} />
      </form>
    </div>
  );
};

interface IFavoriteMangaProps {
  favorite_manga: string | null;
  toastHandler: (title: string, message: string) => void;
}

const favoriteMangaSchema = z.object({
  favorite_manga: z
    .string()
    .min(1, 'Please enter your favorite manga.')
    .max(150, 'Favorite manga should be less than 150 characters.')
    .nullable(),
});

type FavoriteMangaForm = z.infer<typeof favoriteMangaSchema>;

const FavoriteMangaForm = ({ favorite_manga, toastHandler }: IFavoriteMangaProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FavoriteMangaForm>({
    resolver: zodResolver(favoriteMangaSchema),
    defaultValues: {
      favorite_manga: favorite_manga || '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['favorite-manga'],
    mutationFn: async (data: FavoriteMangaForm) => {
      const response = await remoteInstance.post(ENDPOINTS.postUserFavorite, data);
      return response.data;
    },
    onSuccess: () => {
      toastHandler('Success', 'Favorite manga updated successfully.');
      reset();
    },
    onError: (error: AxiosError) => {
      console.error('Error submitting favorite manga:', error);
      toastHandler('Error', 'Failed to update favorite manga. Please try again.');
    },
  });

  const onSubmit = (data: FavoriteMangaForm) => {
    if (!data.favorite_manga) return;

    if (filterSwears(data?.favorite_manga, 'en')) {
      console.warn('Swear attempt');
      toastHandler('Warning', 'You are not funny, you cannot enter swears buddy!');
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className={styles.formWrapper}>
      <H4>What is your favorite manga?</H4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <Controller
          control={control}
          name='favorite_manga'
          render={({ field }) => (
            <TextInput
              name='favorite_manga'
              label='Favorite Manga'
              value={field.value}
              onChange={field.onChange}
              placeholder='e.g., Berserk'
              error={errors.favorite_manga?.message}
            />
          )}
        />
        <Button
          text='Update'
          type='submit'
          disabled={mutation.isPending}
          isLoading={mutation.isPending}
        />
      </form>
    </div>
  );
};

const FavoriteSection: React.FC = () => {
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    title: '',
    message: '',
  });

  const showToast = useCallback((title: string, message: string) => {
    setToast({ isOpen: true, title, message });
  }, []);

  return (
    <section className={clsx(styles.sectionBox)}>
      <div>
        <H2>Favorite Settings</H2>
        <H3>Let's, get to know each other better!</H3>
        <FavoriteAnimeForm toastHandler={showToast} favorite_anime={'One Piece'} />
        <FavoriteMangaForm toastHandler={showToast} favorite_manga={'Death Note'} />
      </div>

      <Sonner
        title={toast.title}
        message={toast.message}
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
};

export default FavoriteSection;
