const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchSections() {
  const res = await fetch(`${API_BASE}/home`);
  return res.json();
}

export function imageUrl(name) {
  return `${import.meta.env.VITE_API_URL}/assets/images/${name}`;
}



// Add these to your src/api.js
export async function addToCart(productName, quantity) {
  const res = await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productName, quantity }),
  });
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`);
  return res.json();
}

export async function removeFromCart(id) {
  return fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' });
}