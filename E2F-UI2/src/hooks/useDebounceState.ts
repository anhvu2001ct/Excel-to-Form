import { DependencyList, useRef } from "react";
import useDiff from "./useDiff";
import useRefUpdate from "./useRefUpdate";
import useUpdate from "./useUpdate";

export default function useDebounceState(
  fn: () => void,
  deps: DependencyList,
  ms = 400
) {
  const pending = useRef(false);
  const timeoutId = useRef<number>();
  const callback = useRefUpdate(fn);

  const update = () => {
    clearTimeout(timeoutId.current);
    pending.current = true;
    timeoutId.current = setTimeout(() => {
      pending.current = false;
      callback.current();
    }, ms);
  };

  const diff = useDiff(deps);
  if (diff) update();

  useUpdate(() => {
    if (pending.current) update();
    return () => clearTimeout(timeoutId.current);
  }, [ms]);

  return pending.current;
}
