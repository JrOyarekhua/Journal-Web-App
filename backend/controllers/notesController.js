import {
  deleteNoteById,
  getNoteById,
  getNotesFromDB,
  insertNewNote,
  updateContentById,
  updateTitleById,
} from "../models/notesModel.js";
import { getUserById } from "../models/usersModel.js";

// get all notes belonging to a specific user
export const getAllNotes = async (req, res) => {
  //   get all possible values
  const {
    userId,
    cursor,
    sortBy = "date_created",
    sortOrder = "asc",
    limit = 10,
  } = req.params;

  try {
    const user = await getUserById(userId);
    // should return user information from the database
    if (!user) {
      return res.status(404).json({ message: "no user found with ID" });
    }
    const notes = await getNotesFromDB(
      userId,
      cursor,
      sortBy,
      sortOrder,
      limit
    );
    res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// get a single note
export const getSingleNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = getNoteById(noteId);
    return res.status(200).json({ note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.params;
  //   check id the user is in the database
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "no user found with ID" });
    }
    const newNote = await insertNewNote(userId, title, content);
    // will return the information after creating the new note
    return res
      .status(200)
      .json({ message: "note succesfully created", note: newNote });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// delete a note
export const deleteNote = async (req, res) => {
  const { userId, noteId } = req.params;
  try {
    await deleteNoteById(userId, noteId);
    return res.status(200).json({ message: "note succesfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// update the title
export const updateTitle = async (req, res) => {
  const { noteId } = req.params;
  const newTitle = req.body;
  try {
    await updateTitleById(noteId, newTitle);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// update content
export const updateContent = async (req, res) => {
  const { noteId } = req.params;
  const newContent = req.body;
  try {
    await updateContentById(noteId, newContent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
