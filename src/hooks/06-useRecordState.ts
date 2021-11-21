import { useReducer } from 'react';

type AnyObject = Record<string, unknown>;

type StateAction<S> =
  | Partial<Record<keyof S, S[keyof S]>>
  | import('react').ReducerWithoutAction<S>;

export const useRecordState = <T extends AnyObject>(initialState: T) => {
  return useReducer((prevState: T, action: StateAction<T>) => {
    if (typeof action === 'function') {
      return {
        ...prevState,
        ...action(prevState),
      };
    }

    const hasUpadte = Object.entries(action).some(
      ([key, value]) => prevState[key] !== value
    );

    return hasUpadte ? { ...prevState, ...action } : prevState;
  }, initialState);
};
