import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { clearToken } from "../utils/auth";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const navigate = useNavigate();

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  // Create or update note
  const handleSaveNote = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please enter title and content");
      return;
    }

    try {
      if (editingNote) {
        // UPDATE
        const res = await API.put(`/notes/${editingNote.id}`, {
          title: newTitle,
          content: newContent,
        });
        setNotes(
          notes.map((n) => (n.id === editingNote.id ? res.data.note : n))
        );
      } else {
        // CREATE
        const res = await API.post("/notes", {
          title: newTitle,
          content: newContent,
        });
        setNotes([res.data.note, ...notes]);
      }

      setShowModal(false);
      setNewTitle("");
      setNewContent("");
      setEditingNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
    setShowModal(true);
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/notes/${noteId}`);
      setNotes(notes.filter((n) => n.id !== noteId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">QuickNotes</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Add Note button */}
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          + {editingNote ? "Edit Note" : "Add Note"}
        </button>
      </div>

      {/* Notes list */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Notes</h2>

        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-500">You have no notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-200"
              >
                <h3 className="font-bold text-lg">{note.title}</h3>
                <p className="text-gray-700 mt-2">
                  {note.content.length > 80
                    ? note.content.slice(0, 80) + "..."
                    : note.content}
                </p>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    className="px-2 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                    onClick={() => handleEditNote(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for create/edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingNote ? "Edit Note" : "Create Note"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Write your note..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 border rounded mb-3 h-32"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setShowModal(false);
                  setEditingNote(null);
                  setNewTitle("");
                  setNewContent("");
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSaveNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
