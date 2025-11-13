import { pool } from "../config/db.js";

// ✅ Create a note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, content]
    );
    res
      .status(201)
      .json({ message: "Note created successfully", note: result.rows[0] });
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json({ message: "Server error while creating note" });
  }
};

// ✅ Get all notes for logged-in user
export const getNotes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ message: "Server error while fetching notes" });
  }
};

// ✅ Update a note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, id, req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Note not found or not yours" });

    res.json({ message: "Note updated", note: result.rows[0] });
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ message: "Server error while updating note" });
  }
};

// ✅ Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Note not found or not yours" });

    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ message: "Server error while deleting note" });
  }
};
