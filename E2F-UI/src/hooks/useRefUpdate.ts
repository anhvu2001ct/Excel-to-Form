import { useRef } from "react";

export default function useRefUpdate<T>(val: T) {
  const ref = useRef(val);
  ref.current = val;
  return ref;
}
