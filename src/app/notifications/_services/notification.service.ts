import { baseInstance } from '@/http/axios';

export const getNotifications = async (
  limit: number,
  offset = 0,
  tabState: boolean,
  PAGE_SIZE: number = 5
) => {
  const type = tabState ? 'old' : 'recent';

  try {
    const response = await baseInstance.get('notifications', {
      params: {
        type,
        offset,
        limit: limit || PAGE_SIZE,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};
