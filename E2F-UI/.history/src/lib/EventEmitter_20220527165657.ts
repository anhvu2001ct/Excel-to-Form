class EventEmiiter<T> {
  subscribers: ((val: T) => void)[];

  constructor() {
    this.subscribers = [];
  }

  emit(val: T) {
    for (const trigger of this.subscribers) trigger(val);
  }

  subscribe(trigger: (val: T) => void) {
    this.subscribers.push(trigger);
  }

  unSubscribe(trigger: (val: T) => void) {
    this.subscribers = this.subscribers.filter((s) => s != trigger);
  }
}
