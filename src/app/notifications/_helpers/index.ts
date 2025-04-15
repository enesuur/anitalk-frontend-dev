
export const fakeNotifications = [
  {
    users: [{ username: 'Galadriel', avatarUrl: '/avatars/galadriel.jpg' }],
    totalCount: 1,
    type: 'follow',
    target: 'you',
    date: new Date(), // just now
  },
  {
    users: [
      { username: 'Aragorn', avatarUrl: '/avatars/aragorn.jpg' },
      { username: 'Legolas', avatarUrl: '/avatars/legolas.jpg' },
    ],
    totalCount: 2,
    type: 'comment',
    target: 'your profile',
    date: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    users: [
      { username: 'Frodo', avatarUrl: '/avatars/frodo.jpg' },
      { username: 'Samwise', avatarUrl: '/avatars/sam.jpg' },
      { username: 'Merry', avatarUrl: '/avatars/merry.jpg' },
    ],
    totalCount: 25,
    type: 'upvote',
    target: 'your talk on the One Ring',
    date: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
  {
    users: [{ username: 'Boromir', avatarUrl: '/avatars/boromir.jpg' }],
    totalCount: 4,
    type: 'follow',
    target: 'you',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    users: [
      { username: 'Sauron', avatarUrl: '/avatars/sauron.jpg' },
      { username: 'Gollum', avatarUrl: '/avatars/gollum.jpg' },
    ],
    totalCount: 87,
    type: 'comment',
    target: 'your post about Mordor',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    users: [
      { username: 'Elrond', avatarUrl: '/avatars/elrond.jpg' },
      { username: 'Thranduil', avatarUrl: '/avatars/thranduil.jpg' },
    ],
    totalCount: 2,
    type: 'upvote',
    target: 'your elven poetry',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    users: [{ username: 'Bilbo', avatarUrl: '/avatars/bilbo.jpg' }],
    totalCount: 1,
    type: 'comment',
    target: 'your travel blog',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
];
