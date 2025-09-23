import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { CartPage } from './pages/CartPage/CartPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { UserPage } from './pages/UserPage/UserPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { AuthContext } from './AuthContext/AuthContext';
import { useContext } from 'react';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { Footer } from './components/Footer/Footer';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <ScrollToTop />
      <div className='flex flex-col min-h-[100dvh] pt-16'>
        <Header />
        <main className='flex-1 pb-32'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<ProductsPage />} />
            <Route path='/productos/:section/:id' element={<ProductPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/usuarios/:id' element={<UserPage />} />
            <Route path='/usuarios/registro' element={<RegisterPage />} />
            <Route path='/usuarios/login' element={<LoginPage />} />
            <Route
              path='/admin'
              element={
                user?.rol === 'admin' ? (
                  <AdminPage />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
