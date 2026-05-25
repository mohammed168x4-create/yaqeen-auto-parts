import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDocs,
  deleteDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function AdminDashboard() {

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [products, setProducts] =
  useState([]);
  const [editingId, setEditingId] =
  useState(null);
  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  const uploadImage = async () => {
    if (!image) return null;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Yaqeen Store");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzifhofv4/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploaded = await res.json();
    if (uploaded.secure_url) {
      return uploaded.secure_url;
    }

    throw new Error("Image upload failed");
  };

  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };

  const addProduct = async () => {
    if (!form.name || !form.brand || !form.price) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const imageUrl = await uploadImage();

      const productData = {
        name: form.name,
        brand: form.brand,
        price: Number(form.price),
      };

      if (imageUrl) {
        productData.image = imageUrl;
      }

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        alert("Product Updated 🎉");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "products"), productData);
        alert("Product Added 🎉");
      }

      await fetchProducts();
      setForm({ name: "", brand: "", price: "" });
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Failed to save product. See console for details.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const deleteProduct =
  async (id) => {

    await deleteDoc(
      doc(db, "products", id)
    );

    setProducts(
      products.filter(
        (p) => p.id !== id
      )
    );

  };

    const editProduct = (product) => {

  setForm({
    name: product.name,
    brand: product.brand,
    price: product.price,
  });

  setEditingId(product.id);

};
  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Navigation Buttons */}

      <div className="flex gap-3 mb-6">

        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/orders"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Orders
        </Link>

        <Link
          to="/"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Store
        </Link>

      </div>

      {/* Form */}

      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full mb-4 rounded"
      />
      <label className="block mb-3">
        <span className="text-sm text-gray-700">Product image (optional)</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1"
        />
      </label>
      {image && (
        <p className="text-sm text-gray-600 mb-3">
          Selected image: {image.name}
        </p>
      )}
      <button
        onClick={addProduct}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        {editingId ? "Update Product" : "Add Product"}
      </button>
      <div className="mt-10">

  <h2 className="text-2xl font-bold mb-4">
    Products
  </h2>

  <div className="space-y-4">

    {products.map((product) => (

      <div
        key={product.id}
        className="border p-4 rounded flex items-center gap-4"
      >

        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div className="flex-1">

          <h3 className="font-bold">
            {product.name}
          </h3>

          <p>
            {product.brand}
          </p>

          <p>
            {product.price} QAR
          </p>

        </div>

        <div className="flex gap-2">
          <button
            onClick={() => editProduct(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(product.id)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>

      </div>

    ))}

  </div>

</div>



    </div>
  );
}