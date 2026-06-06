const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};