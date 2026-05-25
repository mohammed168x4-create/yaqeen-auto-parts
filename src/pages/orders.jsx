import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snap = await getDocs(
      collection(db, "orders")
    );

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), {
      status,
    });

    fetchOrders();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Orders Dashboard
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow rounded-xl p-4 mb-4"
        >
          <div className="mb-3">
            <p>
              <strong>Order ID:</strong>
              {" "}
              {order.id}
            </p>

            <p>
              <strong>Total:</strong>
              {" "}
              {order.total} QAR
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              {order.status}
            </p>
          </div>

          <div className="mb-4">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="border-b py-2"
              >
                <p>
                  {item.name}
                </p>

                <p>
                  Qty: {item.qty}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                updateStatus(
                  order.id,
                  "shipping"
                )
              }
              className="bg-yellow-500 text-white px-3 py-2 rounded"
            >
              Shipping
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order.id,
                  "delivered"
                )
              }
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}