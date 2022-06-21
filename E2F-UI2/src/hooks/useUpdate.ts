import { useEffect, useRef } from "react";

const useUpdate: typeof useEffect = (effect, deps) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return effect();
  }, deps);
};

export default useUpdate;
