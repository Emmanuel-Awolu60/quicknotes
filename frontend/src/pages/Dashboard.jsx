import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { getToken, clearToken } from "../utils/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 PROTECT ROUTE
  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    fetchNotes();
  }, []);

  // 📌 Fetch user notes
  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  if (loading) return <p style={{ padding: 20 }}>Loading dashboard...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <h2>Your Notes</h2>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong> — {note.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
