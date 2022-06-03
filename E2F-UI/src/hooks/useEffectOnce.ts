import { EffectCallback, useEffect } from "react";

export default function useEffectOnce(fn: EffectCallback) {
  useEffect(fn, []);
}
