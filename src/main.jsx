import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import "slick-carousel/slick/slick.css";
import App from './App.jsx';
import { ContextApi } from './components/ContextApi.jsx';
import './index.css';
import Store from './store.js';


createRoot(document.getElementById('root')).render(
  <Provider >
    <ContextApi store={Store}>
      <App />
    </ContextApi>
  </Provider>
);
