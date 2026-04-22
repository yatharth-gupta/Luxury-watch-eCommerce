import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';

function MainApp() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-white/20">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
      <Cart />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
