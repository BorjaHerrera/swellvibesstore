import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from './components/MusicPlayer/MusicProvider.jsx';
import { SearchProvider } from './components/SearchInput/SearchProvider.jsx';
import { CartProvider } from './components/Cart/CartProvider.jsx';
import { FilterProvider } from './components/Filter/FilterProvider.jsx';
import { LoadingProvider } from './components/Loading/LoadingProvider.jsx';
import { AuthProvider } from './AuthContext/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MusicProvider>
          <SearchProvider>
            <CartProvider>
              <LoadingProvider>
                <FilterProvider>
                  <App />
                </FilterProvider>
              </LoadingProvider>
            </CartProvider>
          </SearchProvider>
        </MusicProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
