import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { makeServer } from './mirage/config';
import { EventsContextProvider } from './context/EventsContext';

makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventsContextProvider>
      <App />
    </EventsContextProvider>
  </React.StrictMode>
);
