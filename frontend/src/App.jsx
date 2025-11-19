import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">QuickNotes</h1>
        <nav className="mt-2 space-x-4">
          <Link className="text-blue-500 hover:underline" to="/login">
            Login
          </Link>
          <Link className="text-blue-500 hover:underline" to="/signup">
            Signup
          </Link>
        </nav>
      </header>

      <main className="w-full max-w-md px-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} /> {/* default route */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
