import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextInput from '@/shared/ui/input/TextInput';
import Button from '@/shared/ui/button/Button';
import styles from '../_styles/FavoriteSection.module.css';
import { H2, H3, H4 } from '@/shared/ui/headings';
import Sonner from '@/shared/ui/sonner/Sonner';
import { filterSwears } from '@/helpers';
import { remoteInstance } from '@/http/axios';

interface IFavoriteAnimeProps {
  favorite_anime: string | null;
  isAlertOpen: boolean;
  setIsAlertOpen: (param: boolean) => void;
}

const FavoriteAnimeForm: React.FC<IFavoriteAnimeProps> = ({
  favorite_anime,
  isAlertOpen,
  setIsAlertOpen,
}: IFavoriteAnimeProps) => {
  const schema = z.object({
    favorite_anime: z
      .string()
      .min(1, 'Please enter your favorite anime name.')
      .max(150, 'Favorite anime should be less than 150 characters.')
      .nullable(),
  });

  type FormData = z.infer<typeof schema>;

  // Todo: form validasyonuna submit ederken küfür işini
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      favorite_anime: favorite_anime || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (filterSwears(data.favorite_anime || '', 'tr')) {
      console.log('test');
      setIsAlertOpen(true);
      console.log(isAlertOpen);
      return;
    }

    try {
      await remoteInstance.post('/api/favorite-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      reset();
      console.log('Favorite anime submitted:', data);
    } catch (error) {
      console.error('Error submitting favorite anime:', error);
    }
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

      {isAlertOpen && (
        <Sonner
          isOpen={true}
          message='You are not funny, you cannot enter swears buddy!'
          title='No swears!'
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </div>
  );
};

interface IFavoriteMangaProps {
  favorite_manga: string | null;
  isAlertOpen: boolean;
  setIsAlertOpen: (param: boolean) => void;
}

const FavoriteMangaForm = ({
  favorite_manga,
  setIsAlertOpen,
  isAlertOpen,
}: IFavoriteMangaProps) => {
  const schema = z.object({
    favorite_manga: z
      .string()
      .min(1, 'Please enter your favorite manga.')
      .max(150, 'Favorite manga should be less than 150 characters.')
      .nullable(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      favorite_manga: favorite_manga || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (filterSwears(data.favorite_manga || '', 'tr')) {
      console.log('test');
      setIsAlertOpen(true);
      console.log(isAlertOpen);
      return;
    }

    try {
      await remoteInstance.post('/api/favorite-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      reset();
      console.log('Favorite anime submitted:', data);
    } catch (error) {
      console.error('Error submitting favorite anime:', error);
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <H4>What is your favorite anime?</H4>
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
        <Button text='Update' type='submit' disabled={isSubmitting} isLoading={isLoading} />
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
  );
};

const FavoriteSection: React.FC = () => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  return (
    <section className={styles.favoriteSection}>
      <div className='container'>
        <H2>Favorite Settings</H2>
        <H3>Let's, get to know each other better!</H3>
        <FavoriteAnimeForm
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          favorite_anime={'One Piece'}
        />
        <FavoriteMangaForm
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          favorite_manga={'Kel Oğlan'}
        />
      </div>
    </section>
  );
};

export default FavoriteSection;
