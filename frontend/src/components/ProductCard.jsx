const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <div className="product-image">
      <img 
        src={product.image_url} 
        alt={product.name} 
        onError={(e) => {
          e.target.src = "https://picsum.photos/seed/placeholder/200/150";
        }}
      />
    </div>
    <div className="product-info">
      <h4 className="product-name">{product.name}</h4>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;