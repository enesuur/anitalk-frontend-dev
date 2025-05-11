'use client';
import { useEffect } from 'react';

/**
 * A mapping of key names to their corresponding event handlers.
 */
type KeyHandlers = {
  [key: string]: (event: KeyboardEvent) => void;
};

/**
 * Props for the `useKeyDownListener` hook.
 */
interface UseKeyDownListenerProps {
  /**
   * Whether the keydown listener is active.
   */
  active: boolean;

  /**
   * Object mapping key values (e.g., 'Enter', 'Escape') to handler functions.
   */
  handlers: KeyHandlers;

  /**
   * Optional target for listening to keydown events.
   * Defaults to `window` if not provided.
   */
  target?: HTMLElement | Document;
}

/**
 * A React hook that listens for specific keydown events and invokes corresponding handlers.
 *
 * @example
 * ```tsx
 * useKeyDownListener({
 *   active: true,
 *   handlers: {
 *     Escape: () => closeModal(),
 *     Enter: (e) => { if (e.ctrlKey) submitForm(); }
 *   }
 * });
 * ```
 *
 * @param {UseKeyDownListenerProps} props - Configuration for the listener.
 */
export const useKeyDownListener = ({ active, handlers, target }: UseKeyDownListenerProps) => {
  useEffect(() => {
    if (!active) return;
    if (typeof window === 'undefined') return;

    const onKeyDown: EventListener = (event) => {
      const keyEvent = event as KeyboardEvent;
      const handler = handlers[keyEvent.key];
      if (typeof handler === 'function') {
        handler(keyEvent);
      }
    };

    const eventTarget: HTMLElement | Document | Window = target ?? window;

    eventTarget.addEventListener('keydown', onKeyDown);
    return () => {
      eventTarget.removeEventListener('keydown', onKeyDown);
    };
  }, [active, handlers, target]);
};
