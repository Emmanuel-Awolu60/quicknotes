import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setNote(res.data.note);
        setEditTitle(res.data.note.title);
        setEditContent(res.data.note.content);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const ok = confirm("Are you sure you want to delete this note?");
    if (!ok) return;

    try {
      await API.delete(`/notes/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await API.put(`/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });

      setNote(res.data.note);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  if (!note) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded"
      >
        ← Back
      </button>

      {/* EDIT MODE */}
      {isEditing ? (
        <div className="max-w-xl">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />

          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows="8"
            className="w-full p-2 border rounded"
          ></textarea>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
          <p className="text-gray-700 whitespace-pre-wrap mb-6">
            {note.content}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
