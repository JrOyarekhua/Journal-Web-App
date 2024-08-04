import { getUserById } from "../models/usersModel.js";

export const verifyNoteAction = async (req, res, next) => {
  const { userId, noteId } = req.params;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found with ID" });
    }
    const note = await getNoteById(noteId);
    if (!note) {
      return res.status(404).json({ message: "note not found with note ID" });
    }
    if (note.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "you do not have permission to delete this note" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export default verifyNoteAction;
