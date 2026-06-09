'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="text-center text-gray-400 py-20">Loading...</div>;
  }

const imageUrl = product.image || `https://placehold.co/600x400/1e1e1e/00a650?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-xl border border-gray-700">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-accent-400 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Experience the perfect blend of form and function. This premium {product.name.toLowerCase()} is designed to enhance your home office setup, delivering top-tier performance and style.
          </p>
          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}