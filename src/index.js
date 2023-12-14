import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './pages/App';
import store from './redux/store';
import { Provider } from 'react-redux';

window.store = store
// store.subscribe(()=> console.log(store.getState()))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);