import { useCallback, useRef } from "react";
import useRefUpdate from "./useRefUpdate";
import useUpdate from "./useUpdate";

type Return<T> = (newValue: T) => void;

export default function useDebounce<T = any>(
  fn: (isPending: boolean, value: T) => void,
  ms = 400
): Return<T> {
  const timeoutId = useRef<number>();
  const reset = useRef<() => void>();
  const pending = useRef(false);
  const callback = useRefUpdate(fn);

  const update = (newValue: T) => {
    reset.current = () => {
      clearTimeout(timeoutId.current);
      if (!pending.current) fn((pending.current = true), undefined as any);
      timeoutId.current = setTimeout(
        () => callback.current((pending.current = false), newValue),
        ms
      );
    };
    reset.current();
  };

  useUpdate(() => {
    if (pending.current && reset.current) reset.current();
    return () => clearTimeout(timeoutId.current);
  }, [ms]);

  return update;
}
