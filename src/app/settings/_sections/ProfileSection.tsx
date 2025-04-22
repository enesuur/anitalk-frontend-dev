'use client';
import Button from '@/shared/ui/button/Button';
import ImageInput from '@/shared/ui/input/ImageInput';
import React, { useState } from 'react';
import styles from '../_styles/ProfileSection.module.css';

interface IProfileSectionProps {
  username: string;
  cover_img_url?: string;
  profile_img_url?: string;
}

const ProfileSection: React.FC<IProfileSectionProps> = ({
  username,
  cover_img_url,
  profile_img_url,
}: IProfileSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedImage(previewUrl);
  };

  const user = username || 'user';

  return (
    <React.Fragment>
      <section>
        <div className='container'>
          <h3 className='h-2'>Profile Settings</h3>
        </div>
        <div className={styles.profileBox}>
          <div className={styles.userBox}>
            <span>Username</span>
            <span>{username}</span>
          </div>

          <div className={styles.userBox}>
            <span>Display Name</span>
            <span>{username}</span>
          </div>

          <div className={styles.userBox}>
            <span>Joined At</span>
            <span>{username}</span>
          </div>

          <div className={styles.userBox}>
            <span>Biography</span>
            <span>{username}</span>
          </div>

          <div className={styles.userBox}>
            <span>Generation</span>
            <span>{username}</span>
          </div>
          {/* Input elemanı  */}
          <div className={styles.userBox}>
            <span>Country</span>
            <span>Flag + Turkey</span>
          </div>
        </div>
      </section>
      <section>
        <h2 className='h-3'>Profile Image</h2>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarHeader}>
              <picture>
                <img
                  src={selectedImage || profile_img_url || '/img/avatar.webp'}
                  alt={`${user} Profile Picture`}
                  className={styles.avatar}
                />
              </picture>
              <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
            </div>
            <Button text={'Upload'} isLoading={isLoading} isDisabled={false} />
          </div>
          <ImageInput onImageSelect={handleImageSelect} />
        </div>
      </section>

      <section>
        <h2 className='h-3'>Cover Image</h2>
        <div className={styles.coverWrapper}>
          <div className={styles.coverContainer}>
            <div className={styles.coverHeader}>
              <picture>
                <img
                  src={selectedImage || cover_img_url || '/img/bg-cover.webp'}
                  alt='Cover Image'
                  className={styles.cover}
                />
              </picture>
              <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
            </div>
            <Button text={'Upload'} isLoading={isLoading} isDisabled={false} />
          </div>
          <ImageInput onImageSelect={handleImageSelect} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProfileSection;
