export type UseStateCom<T> = [T, (prevState: (T ) => void ];

function setState(val: T | (prevState: T) => T) {

}

setState(newVal);
setState(oldVal => newVal)