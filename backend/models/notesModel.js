import db from "../db.js";

// get all notes from DB
export const getNotesFromDB = async (
  userId,
  cursor,
  sortBy,
  sortOrder,
  limit
) => {
  //   validate queries
  const validOrder = ["asc", "desc"];
  const validSortColumns = ["title", "content", "date_created", "note_id"];
  if (!validOrder.includes(sortOrder)) {
    throw new Error(`invalid sort order. must be one of asc or desc`);
  }
  if (!validSortColumns.includes(sortBy)) {
    throw new Error(
      `invalid sort column must be one of ${validSortColumns.join(", ")}`
    );
  }
  //   dynamically build query
  let query = "SELECT * FROM notes WHERE user_id=$1";
  let params = [userId];

  if (cursor) {
    query += ` AND created_at > $${params.length + 1}`;
    params.push(cursor);
  }

  if (sortBy) {
    query += ` ORDER BY ${sortBy.toUpper()} ${sortOrder.toUpper()}`;
  }

  query += ` LIMIT $${params.length + 1}`;
  params.push(limit);
  try {
    const result = await db.query(query, params);
    return result.rows;
  } catch (error) {
    throw new Error(
      "error retrieving notes from the database: " + error.message
    );
  }
};

// get a single note from the DB
export const getNoteById = async (note_id) => {
  try {
    const result = await db.query(
      "SELECT * FROM notes WHERE note_id=$1",
      note_id
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("error retriving note: " + error.message);
  }
};

// create a new note
export const insertNewNote = async (user_id, title, content) => {
  try {
    const result = await db.query(
      "INSERT INTO notes (title,content,user_id) VALUES ($1,$2,$3);",
      [title, content, user_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("error inserting note: " + error.message);
  }
};

// delete a note
export const deleteNoteById = async (user_id, note_id) => {
  try {
    await db.query("DELETE FROM notes WHERE note_id=$1 and user_id=$2", [
      note_id,
      user_id,
    ]);
    return;
  } catch (error) {
    throw new Error("error deleting note " + error.message);
  }
};

// update title
export const updateTitleById = async (note_id, newTitle) => {
  try {
    await db.query("UPDATE users SET title=$1 WHERE note_id=$2", [
      newTitle,
      note_id,
    ]);
  } catch (error) {
    throw new Error("error updating title " + error.message);
  }
};

// update content
export const updateContentById = async (note_id, newContent) => {
  try {
    await db.query("UPDATE users SET content=$1 WHERE note_id=$2", [
      newContent,
      note_id,
    ]);
  } catch (error) {
    throw new Error("error updating title " + error.message);
  }
};
