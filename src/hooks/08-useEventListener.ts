import { useEffect, useLayoutEffect, useRef } from 'react';

type UserEventListenerOptions = {
  enabled?: boolean;
  target?: GlobalEventHandlers;
};

type useEventListenerHook = <
  EventType extends keyof GlobalEventHandlersEventMap
>(
  eventType: EventType,
  handler: (event: GlobalEventHandlersEventMap[EventType]) => void,
  options?: UserEventListenerOptions
) => void;

const DEFAULT_OPTIONS: UserEventListenerOptions = {
  enabled: true,
  target: document,
};

export const useEventListener: useEventListenerHook = (
  eventType,
  handler,
  options = DEFAULT_OPTIONS
) => {
  const { enabled = true, target = document } = options;

  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) {
      return () => null;
    }

    const eventHandler: typeof handlerRef.current = (event) => {
      handlerRef.current.call(target, event);
    };

    target.addEventListener(eventType, eventHandler);

    return () => {
      target.removeEventListener(eventType, eventHandler);
    };
  }, [eventType, target, enabled]);
};
