import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import Orders from "./pages/orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      <Route path="/success" element={<Success />} />
    </Routes>
  );
}