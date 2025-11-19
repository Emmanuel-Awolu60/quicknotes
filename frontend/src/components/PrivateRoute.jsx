import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function PrivateRoute({ children }) {
  const token = getToken();

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists → show the protected page
  return children;
}
