import { getNoteById } from "../models/notesModel.js";
const verifyNoteAction = async (req, res, next) => {
  const { noteId } = req.params;
  const user = req.user
  
  try {
    if (!user) {
      return res.status(404).json({ message: "user not found with ID" });
    }
    const note = await getNoteById(noteId);
    console.log("note: " + note)
    if (!note) {
      return res.status(404).json({ message: "note not found with note ID" });
    }
    if (note.user_id !== user.user_id) {
      return res
        .status(403)
        .json({ message: "you do not have permission to edit this note" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export default verifyNoteAction;
