'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

const imageUrl = product.image || `https://placehold.co/400x300/1e1e1e/00a650?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-accent-500">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
            <span className="text-white text-sm font-medium">Quick View</span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-white hover:text-accent-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-accent-400 font-bold text-xl mt-1">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}