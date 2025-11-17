import React, { useState } from "react";
import { loginUser } from "../utils/api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      if (data?.error) {
        setMessage(data.error);
      } else {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token); // store JWT
        setEmail("");
        setPassword("");
        // Later: navigate to dashboard
      }
    } catch (error) {
      setMessage("Login failed. Try again later.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {message && <p className="mb-2 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
