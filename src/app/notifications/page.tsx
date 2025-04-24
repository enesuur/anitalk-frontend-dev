'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './_styles/Page.module.css';
import { BellActive, BellOld, NotFound } from '@/assets/icons/';
import NotificationCard from './_components/NotificationCard';
import { formatRelativeDate } from '@/lib/dateUtils';
import { iconStyles } from '@/helpers/index';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotifications } from './_services/notification.service';
import { H1 } from '@/shared/ui/headings';

const PAGE_SIZE = 50;

// TODO : REFACTOR

type User = {
  username: string;
  avatar_url: string;
};

type Notification = {
  users: User[];
  totalCount: number;
  type: number;
  target: string;
  date: string;
};

type NotificationsData = Notification[];

const Page = () => {
  const [tabState, setTabState] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['notifications', tabState],
    queryFn: ({ pageParam = 0 }) => getNotifications(PAGE_SIZE, pageParam, tabState),
    getNextPageParam: (lastPage) => {
      return lastPage.items.length < PAGE_SIZE ? undefined : lastPage.nextOffset;
    },
    initialPageParam: 0,
  });

  const items = data?.pages.flatMap((page) => page.items) || [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length, // Add a placeholder for loading
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimating the size of each row for virtual rendering
    overscan: 5, // Preload additional rows for smoother scrolling
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    // If the last item is reached and there's more data, fetch the next page
    if (lastItem.index === items.length && hasNextPage) {
      fetchNextPage(); // Fetch the next batch of notifications
    }
  }, [hasNextPage, items.length, rowVirtualizer, fetchNextPage]);

  // Switch tabs (recent vs old notifications)
  const handleTabSwitch = (tab: boolean) => {
    setTabState(tab);
  };

  return (
    <React.Fragment>
      <section>
        <div className='container' style={{ maxWidth: '1024px' }}>
          <H1>Notifications</H1>
          <nav className={styles.tabContainer}>
            <button
              className={`${styles.btnTab} ${!tabState ? styles.active : ''}`}
              onClick={() => handleTabSwitch(false)}
            >
              <BellActive {...iconStyles} />
              Recents
            </button>
            <button
              className={`${styles.btnTab} ${tabState ? styles.active : ''}`}
              onClick={() => handleTabSwitch(true)}
            >
              <BellOld {...iconStyles} />
              Olds
            </button>
          </nav>

          <div
            ref={parentRef}
            className={styles.notificationContainer}
            style={{ height: '500px', overflow: 'auto' }}
          >
            {items.length === 0 ? (
              <div className={styles.notFoundBox}>
                <NotFound {...iconStyles} width={32} height={32} />
                <span>No {tabState ? 'old' : 'recent'} notifications.</span>
              </div>
            ) : (
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: 'relative',
                  width: '100%',
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const isLoaderRow = virtualRow.index === items.length;
                  const style = {
                    position: 'absolute' as const,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  };

                  return (
                    <div key={virtualRow.key} style={style}>
                      {isLoaderRow ? (
                        isFetchingNextPage ? (
                          <div className={styles.loader}>Loading more…</div>
                        ) : (
                          <div className={styles.loader}>No more notifications</div>
                        )
                      ) : (
                        <NotificationCard
                          users={items[virtualRow.index].users}
                          totalCount={items[virtualRow.index].totalCount}
                          type={items[virtualRow.index].type}
                          target={items[virtualRow.index].target}
                          date={formatRelativeDate(items[virtualRow.index].date)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Page;
