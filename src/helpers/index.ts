import { PartialUser } from "@/types/user";

export const calculateAge = (birthDate: Date): number => {
  const currentDate = new Date();

  if (birthDate > currentDate) return 0;

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let age = currentYear - birthYear;

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return Math.max(age, 0);
};


export const filter_followers = (
  my_followers: PartialUser[],
  other_followers: PartialUser[]
): (PartialUser & { is_following: boolean })[] => {
  const my_followers_set = new Set(my_followers.map((follower) => follower._id));

  return other_followers.map((user) => ({
    ...user,
    is_following: my_followers_set.has(user._id),
  }));
};

