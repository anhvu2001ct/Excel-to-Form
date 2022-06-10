export type UseStateCom<T> = [T, (val: T | ((prevState: T) => T)) => void];
export type ResultType<T> = {
  status: number;
  message: T;
};

export type ObjectType<T> = {
  [key: string]: T;
};
