import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setNote(res.data.note);
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <p className="p-6">Loading note...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>

        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {note.content}
        </p>

        {/* Placeholder for future Edit feature */}
        <div className="mt-6">
          <button
            onClick={() => alert("Edit feature coming soon")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
}
