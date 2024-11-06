// import { StrictMode } from 'react'
// src/main.jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';  // Import your store here

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  {/* Wrap the app with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
