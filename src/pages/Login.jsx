import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      nav("/admin");
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-6 w-80">
        <h1 className="text-2xl font-bold mb-4">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}