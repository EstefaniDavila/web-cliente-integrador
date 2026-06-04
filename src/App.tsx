import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartFloatingButton from './components/layout/CartFloatingButton';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import HelpDeskPage from './pages/HelpDeskPage';
import { UserProvider } from './providers/UserProvider';
import { AlertDialogProvider } from './providers/AlertDialogProvider';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const hideNavFooter = pathname === '/login' || pathname === '/registro';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!hideNavFooter && <Navbar />}
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/:id" element={<ProductDetailPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/ayuda" element={<HelpDeskPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
        </Routes>
      </div>
      {!hideNavFooter && <Footer />}
      <CartFloatingButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AlertDialogProvider>
          <AppLayout />
        </AlertDialogProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
