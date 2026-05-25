import { useEffect } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default function Success() {

  useEffect(() => {

    const saveOrder = async () => {

      const cart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const total =
        JSON.parse(
          localStorage.getItem("total")
        ) || 0;

      if (cart.length === 0) return;

      await addDoc(
        collection(db, "orders"),
        {
          userId:
            auth.currentUser?.uid || "guest",

          items: cart,

          total: total,

          status: "paid",

          createdAt: new Date(),
        }
      );

      localStorage.removeItem("cart");

      localStorage.removeItem("total");
    };

    saveOrder();

  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-xl text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p>
          Your order has been saved successfully.
        </p>

      </div>

    </div>
  );
}