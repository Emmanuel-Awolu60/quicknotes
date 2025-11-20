import { useEffect, useState } from "react";
import API from "../utils/api";
import { clearToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Create note modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Edit note modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch notes on page load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes");
        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  // Create note
  const handleCreateNote = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please enter title and content");
      return;
    }
    try {
      const res = await API.post("/notes", {
        title: newTitle,
        content: newContent,
      });
      setNotes([res.data.note, ...notes]);
      setShowCreateModal(false);
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Start editing a note
  const startEditNote = (note) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setShowEditModal(true);
  };

  // Save edited note
  const handleEditNote = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Please enter title and content");
      return;
    }
    try {
      const res = await API.put(`/notes/${editingNoteId}`, {
        title: editTitle,
        content: editContent,
      });
      setNotes(
        notes.map((note) => (note.id === editingNoteId ? res.data.note : note))
      );
      setShowEditModal(false);
      setEditingNoteId(null);
      setEditTitle("");
      setEditContent("");
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">QuickNotes</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* ADD NOTE BUTTON */}
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          + Add Note
        </button>
      </div>

      {/* NOTES LIST */}
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
                className="p-4 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-200 relative"
              >
                <h3 className="font-bold text-lg">{note.title}</h3>
                <p className="text-gray-700 mt-2">
                  {note.content.length > 80
                    ? note.content.slice(0, 80) + "..."
                    : note.content}
                </p>

                {/* Edit & Delete buttons */}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition">
                  <button
                    className="px-2 py-1 bg-yellow-400 rounded text-white text-sm hover:bg-yellow-500"
                    onClick={() => startEditNote(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded text-white text-sm hover:bg-red-600"
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

      {/* CREATE NOTE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Note</h2>
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
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleCreateNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT NOTE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
            <input
              type="text"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Write your note..."
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border rounded mb-3 h-32"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                onClick={handleEditNote}
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
