export type UseStateCom<T> = [T, (prevState: (T ) => void ];

function setState(val) {

}

setState(newVal);
setState(oldVal => newVal)