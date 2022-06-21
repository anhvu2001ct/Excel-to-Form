export type UseStateCom<T> = [T, (val: T | ((prevState: T) => T)) => void];
