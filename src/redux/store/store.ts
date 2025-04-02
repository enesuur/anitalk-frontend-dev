import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import counterReducer from '../slices/__counter/counterSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
