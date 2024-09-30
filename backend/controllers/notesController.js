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
  console.log("get all notes route hit !")
  
  const {
    cursor = null,
    sortBy = "date_created",
    sortOrder = "asc",
    limit = 10,
  } = req.params;
  
  const user = req.user
  console.log("user: " + user.user_id)
  try {
    // const user = await getUserById(userId);
    // should return user information from the database
    if (!user) {
      console.log("user not found from passport authentication")
      return res.status(404).json({ message: "no user found with ID" });
    }
    console.log("attempting to get notes from db...")
    const notes = await getNotesFromDB(
      user.user_id,
      cursor,
      sortBy,
      sortOrder,
      limit
    );
    res.status(200).json({message: "data succesfully retrived", notes: notes});
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// get a single note
export const getSingleNote = async (req, res) => {
  const { noteId } = req.params;
  console.log("NOTE ID IN THE GET SINGLE NOTE FUNCTION: " + noteId)
  try {
    const note = await getNoteById(noteId);
    return res.status(200).json({ note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

// create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const { user_id } = req.user;
  console.log("route hit")
  console.log(req.user)
  //   check id the user is in the database
  try {
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "no user found with ID" });
    }
    console.log("user: " + user )

    const newNoteId = await insertNewNote(user_id, title, content);
    // will return the information after creating the new note
    return res
      .status(200)
      .json({ message: "note succesfully created", note_id: newNoteId });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// delete a note
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  console.log('route hit. attempting to delete note with ' + noteId)
  try{
    await deleteNoteById(noteId);
    return res.status(200).json({ message: "note succesfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// update the title
// export const updateTitle = async (req, res) => {
//   const { noteId } = req.params;
//   const newTitle = req.body;
//   try {
//     await updateTitleById(noteId, newTitle);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "internal server error", error: error.message });
//   }
// };

// update content
export const updateContent = async (req, res) => {
  const { noteId } = req.params;
  const {new_title,new_content} = req.body
  console.log("NOTE ID IN THE UPDATE CONTENT ROUTE: " + noteId)
  console.log("new title: " + new_title)
  console.log("new_content: " + new_content)
  console.log("route hit. Attempting to update note...")
  try {
    if(new_content){
      console.log("attempting to update content...")
      await updateContentById(noteId, new_content);
    }
    if(new_title){
      console.log("attempting to update title...")
      await updateTitleById(noteId, new_title)
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};
