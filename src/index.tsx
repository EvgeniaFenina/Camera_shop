import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {fetchCameras, fetchPromo} from './store/api-actions';
import {store} from './store/store';
import {ToastContainer} from 'react-toastify';
import Notification from './components/notification/notification';

store.dispatch(fetchPromo());
store.dispatch(fetchCameras());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Notification />
      <App />
    </Provider>
  </React.StrictMode>
);
