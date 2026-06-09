import './globals.css';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';

export const metadata = {
  title: 'HomeOffice Hub',
  description: 'Premium work-from-home electronics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}