import { DependencyList, useRef } from "react";

export default function useDiff(deps: DependencyList) {
  const prev = useRef(deps);
  let result = false;

  if (prev.current.length !== deps.length) result = true;
  for (let i = 0; i < deps.length; ++i) {
    if (!Object.is(prev.current[i], deps[i])) {
      result = true;
      break;
    }
  }

  prev.current = deps;
  return result;
}
