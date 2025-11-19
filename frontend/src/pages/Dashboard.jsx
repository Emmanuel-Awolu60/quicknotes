// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10">QuickNotes</h1>

          <nav className="space-y-4">
            <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-200">
              📝 Notes
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-6">Welcome Back 👋</h2>

        <div className="p-6 bg-white shadow rounded-lg">
          <p className="text-gray-600">Your notes will appear here...</p>
        </div>
      </main>
    </div>
  );
}
