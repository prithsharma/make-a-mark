import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import Home from './screens/Home';
import rootReducer from './state';

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
