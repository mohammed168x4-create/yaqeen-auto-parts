import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Yaqeen Auto Parts</h1>

        <Link to="/cart" className="bg-black text-white px-4 py-2 rounded">
          Cart
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow p-4 rounded-xl">
            <img
  src={
    product.image ||
    "https://via.placeholder.com/300x200?text=No+Image"
  }
  alt={product.name}
  className="w-full h-48 object-cover rounded"
/>

            <h3 className="font-bold text-lg">{product.name}</h3>

            <p className="text-gray-500">{product.brand}</p>

            <p className="font-bold text-xl">{product.price} QAR</p>

            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white px-4 py-2 rounded mt-3 w-full"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
