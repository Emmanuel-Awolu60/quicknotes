import { clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
