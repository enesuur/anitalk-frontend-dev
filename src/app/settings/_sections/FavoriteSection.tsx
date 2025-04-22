import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextInput from '@/shared/ui/input/TextInput';
import Button from '@/shared/ui/button/Button';
import styles from '../_styles/FavoriteSection.module.css';

const favoriteItemSchema = z.object({
  favoriteItem: z
    .string()
    .min(1, 'Please enter your favorite item')
    .max(50, 'Favorite item should be less than 50 characters'),
});

type FavoriteFormData = {
  favoriteItem: string;
};

const FavoriteSection: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FavoriteFormData>({
    resolver: zodResolver(favoriteItemSchema),
  });

  const [submittedItem, setSubmittedItem] = useState<string | null>(null);

  const onSubmit = (data: FavoriteFormData) => {
    setSubmittedItem(data.favoriteItem);
    reset();
    console.log(`Favorite Item Submitted: ${data.favoriteItem}`);
  };

  return (
    <section className={styles.favoriteSection}>
      <div className={styles.container}>
        <h2>What's Your Favorite Item?</h2>
        {!isSubmitSuccessful && !submittedItem ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <Controller
              control={control}
              name="favoriteItem"
              render={({ field }) => (
                <TextInput
                  label="Enter your favorite item"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="e.g., Favorite Movie, Food, etc."
                  error={errors.favoriteItem?.message}
                />
              )}
            />
            <Button
              text="Submit"
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '15px' }}
            />
          </form>
        ) : (
          <div className={styles.thankYouMessage}>
            <p>Thank you for sharing your favorite item!</p>
            <p>Your favorite item is: <strong>{submittedItem}</strong></p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoriteSection;
