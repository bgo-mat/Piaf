import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MyContextProvider} from './context';
import { ThemeProvider } from './themeContext';
import DevelopmentMessage from './DevelopmentMessage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <MyContextProvider>
          <ThemeProvider>
              <DevelopmentMessage />
              <App />
          </ThemeProvider>
          </MyContextProvider>
  </React.StrictMode>
);

reportWebVitals();
