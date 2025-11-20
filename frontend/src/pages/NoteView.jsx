import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch note by id
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setNote(res.data.note);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!note) return <p className="p-6">Note not found.</p>;

  // Start editing note
  const startEdit = () => {
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
      const res = await API.put(`/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setNote(res.data.note);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete note
  const handleDeleteNote = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
      >
        ← Back
      </button>

      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={startEdit}
            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteNote}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>

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
