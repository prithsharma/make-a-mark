import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import Home from './screens/Home';
import rootReducer from './state';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger],
});

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
