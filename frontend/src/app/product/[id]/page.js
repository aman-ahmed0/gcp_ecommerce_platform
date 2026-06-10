'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="text-center text-gray-400 py-20">Loading product...</div>;
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const imageUrl = product.image || `https://placehold.co/600x400/1e1e1e/00a650?text=${encodeURIComponent(product.name)}`;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-accent-400 transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image with zoom effect */}
        <div className="overflow-hidden rounded-xl border border-gray-700 group">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-125"
          />
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-accent-400 mb-6">
            ${product.price.toFixed(2)}
          </p>

          {product.description && (
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              {product.description}
            </p>
          )}

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-300 font-medium">Quantity:</span>
            <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors rounded-l-lg"
              >
                −
              </button>
              <span className="px-4 py-2 text-white font-bold min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors rounded-r-lg"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full md:w-auto bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-10 rounded-lg transition-colors flex items-center gap-2"
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