
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer';
import { loadState, saveState } from './localStorage';
const persistedState = loadState();
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState: persistedState
});
store.subscribe(() => {
  saveState(store.getState());
});

export default store;