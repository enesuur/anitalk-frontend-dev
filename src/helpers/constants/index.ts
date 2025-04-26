/**
 * Placeholder URLs for avatar and background cover images.
 * These are used when user images are not available.
 *
 * @readonly
 * @type {Readonly<{ avatar_url: string, background_cover_url: string }>}
 */
const PLACE_HOLDERS: Readonly<{
  avatar_url: string;
  background_cover_url: string;
}> = {
  avatar_url: '/img/avatar.webp',
  background_cover_url: '/img/bg-cover.webp',
};

export { PLACE_HOLDERS };
