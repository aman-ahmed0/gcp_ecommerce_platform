import { useEffect, useState } from "react";
import { getProducts } from "../api";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "20px" }}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
};

export default ProductList;