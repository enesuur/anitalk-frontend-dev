export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import notifications from '@/data/notifications.json';

interface User {
  username: string;
  avatar_url: string;
}
interface Notification {
  users: User[];
  totalCount: number;
  type: number;
  target: string;
  date: string;
}

interface NotificationsData {
  [key: string]: Notification[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const typeParam = searchParams.get('type') || '';
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const key =
    typeParam === 'old' ? 'oldNotifications' : typeParam === 'recent' ? 'recentNotifications' : '';

  const typedNotifications = notifications as NotificationsData;
  const data = Array.isArray(typedNotifications[key]) ? typedNotifications[key] : [];

  const paginated = data.slice(offset, offset + limit);

  const hasMore = data.length > offset + limit;

  return NextResponse.json({
    data: {
      items: paginated,
      total: data.length,
      hasMore,
    },
  });
}
