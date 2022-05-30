export type UseStateCom<T> = [T, (val: T | ((prevState: T) => T)) => void];
export type ResultType<T> = {
  status: number;
  message: T;
};
