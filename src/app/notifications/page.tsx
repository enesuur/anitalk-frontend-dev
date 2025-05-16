'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import NotificationCard from './_components/NotificationCard';
import { formatRelativeDate } from '@/lib/dateUtils';
import { iconStyles } from '@/helpers/index';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotifications } from './_services/notification.service';
import { H1 } from '@/shared/ui/headings';
import { BellActive, BellOld, NotFound } from '@/assets/icons/';
import clsx from '@/lib/cn';
import { useIsMobile, useIsMounted } from '@/hooks';
import { IUser } from '@/types/global';
import styles from './_styles/Page.module.css';

const PAGE_SIZE = 50;

// TODO : REFACTOR

type Notification = {
  users: Partial<IUser>[];
  totalCount: number;
  type: number;
  target: string;
  date: string;
};

type NotificationsData = Notification[];

const Page = () => {
  const [tabState, setTabState] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);

  /* 
  HOOKS!
  */
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();
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
    count: hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 30,
  });

  // TODO: It will be global hook!!
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem.index === items.length && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, items.length, rowVirtualizer, fetchNextPage]);

  const handleTabSwitch = useCallback((tab: boolean) => {
    setTabState(tab);
    return;
  }, []);

  if (!isMounted) return null;

  return (
    <React.Fragment>
      <section>
        <div className={clsx(styles.mainBox, 'container')}>
          <H1 style={{ margin: 0 }}>Notifications</H1>
          <p>Stay updated on votes, comments, and activities related to the content you follow.</p>
          <nav className={styles.tabBox}>
            <button
              aria-label='Recent notifications tab clicker'
              className={`${styles.btnTab} ${!tabState ? styles.active : ''}`}
              onClick={() => handleTabSwitch(false)}
            >
              <BellActive {...iconStyles} />
              Recents
            </button>
            <button
              aria-label='Recent notifications tab clicker'
              className={`${styles.btnTab} ${tabState ? styles.active : ''}`}
              onClick={() => handleTabSwitch(true)}
            >
              <BellOld {...iconStyles} />
              Olds
            </button>
          </nav>

          <div
            ref={parentRef}
            className={styles.notificationBox}
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
                  const spacing = isMobile ? 16 : 2;
                  const style = {
                    position: 'absolute' as const,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size - spacing}px`,
                    transform: `translateY(${virtualRow.start + spacing * virtualRow.index}px)`,
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
