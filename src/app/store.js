import {create} from 'zustand';

const useCounterStore = create(set => ({
  count: 5,
  increment: () =>
    set(state => ({
      count: state.count + 1,
    })),
  decrement: () =>
    set(state => ({
      count: state.count - 1,
    })),
  customDecrement: () =>
    set(state => ({
      count: state.count - 1,
    })),
}));

export default useCounterStore;
