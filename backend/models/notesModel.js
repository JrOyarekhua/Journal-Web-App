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
export const getNoteById = async (note_id) => {};

// create a new note
export const insertNewNote = async (user_id, note, content) => {};

// delete a note
export const deleteNoteById = async (user_id, note_id) => {};

// update title
export const updateTitleById = async (note_id, newTitle) => {};

// update content
export const updateContentById = (note_id, newContent) => {};
