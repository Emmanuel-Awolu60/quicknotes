const { pool } = require("../config/db");

const createNote = async (userId, title, content) => {
  const query = `
    INSERT INTO notes (user_id, title, content)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const result = await pool.query(query, [userId, title, content]);
  return result.rows[0];
};

const getNotesByUser = async (userId) => {
  const query = `SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getNoteById = async (noteId, userId) => {
  const query = `SELECT * FROM notes WHERE id = $1 AND user_id = $2`;
  const result = await pool.query(query, [noteId, userId]);
  return result.rows[0];
};

const updateNote = async (noteId, userId, title, content) => {
  const query = `
    UPDATE notes
    SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3 AND user_id = $4
    RETURNING *
  `;
  const result = await pool.query(query, [title, content, noteId, userId]);
  return result.rows[0];
};

const deleteNote = async (noteId, userId) => {
  const query = `DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *`;
  const result = await pool.query(query, [noteId, userId]);
  return result.rows[0];
};

module.exports = {
  createNote,
  getNotesByUser,
  getNoteById,
  updateNote,
  deleteNote,
};
