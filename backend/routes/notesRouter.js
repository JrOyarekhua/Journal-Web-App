import express from "express";
import passport from "passport";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateContent,
  updateTitle,
} from "../controllers/notesController.js";
import verifyNoteAction from "../middleware/verifyNoteAction.js";

const router = express.Router();

router.use(passport.authenticate({ session: false }));

router.post("/new", createNote);

router.get("/", getAllNotes);

router.use("/:noteId", verifyNoteAction);
router.route("/:noteId").get(getSingleNote).delete(deleteNote);

router.put("/:noteId/title", updateTitle);

router.put("/:noteid/content", updateContent);

export default router;
