import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Dashboard() {

  const [stats, setStats] = useState({
    orders: 0,
    sales: 0,
    products: 0,
    customers: 0,
  });

  useEffect(() => {

    const fetchData = async () => {

      const ordersSnap =
        await getDocs(
          collection(db, "orders")
        );

      const productsSnap =
        await getDocs(
          collection(db, "products")
        );

      const orders =
        ordersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      const totalSales =
  orders.reduce((sum, order) => {

    const value =
      typeof order.total === "number"
        ? order.total
        : parseFloat(order.total) || 0;

    return sum + value;

  }, 0);

      const customers =
        new Set(
          orders.map(
            (o) => o.userId
          )
        ).size;

      setStats({
        orders: orders.length,
        sales: totalSales,
        products:
          productsSnap.size,
        customers,
      });

    };

    fetchData();

  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Analytics
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.orders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Sales
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.sales} QAR
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Products
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.products}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Customers
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.customers}
          </p>
        </div>

      </div>

    </div>
  );
}