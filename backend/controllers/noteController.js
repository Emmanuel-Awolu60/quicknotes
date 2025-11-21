import { pool } from "../config/db.js";

// ✅ Create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // from authenticateToken middleware

  try {
    const result = await pool.query(
      `INSERT INTO notes (user_id, title, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, title, content]
    );

    res.status(201).json({ note: result.rows[0] });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all notes for logged-in user
export const getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.json({ notes: result.rows });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single note by ID
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT * FROM notes WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Note not found" });

    res.json({ note: result.rows[0] });
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update a note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE notes
       SET title = $1, content = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [title, content, id, userId]
    );

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });

    res.json({ note: result.rows[0] });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, userId]
    );

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Server error" });
  }
};
