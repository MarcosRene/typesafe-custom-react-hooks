import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

type Destructor = ReturnType<EffectCallback>;

type UseAsyncEffectHook = {
  (
    effect: () => Promise<void>,
    desctructor?: Destructor,
    deps?: DependencyList
  ): void;
  (effect: () => Promise<void>, deps?: DependencyList): void;
};

export const useAsyncEffect: UseAsyncEffectHook = (
  effect: () => Promise<void>,
  desctructor?: Destructor | DependencyList,
  deps?: DependencyList
) => {
  const willDestroy = typeof desctructor === 'function';

  const dependencyList = willDestroy ? deps : (desctructor as DependencyList);

  const handler = useRef(effect);

  useLayoutEffect(() => {
    handler.current = effect;
  });

  useEffect(() => {
    handler.current();

    return () => {
      if (willDestroy) {
        desctructor();
      }
    };
  }, dependencyList);
};
