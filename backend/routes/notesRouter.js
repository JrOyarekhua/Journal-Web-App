import express from "express";
import passport from "passport";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateContent,
  updateTitle,
} from "../controllers/notesController";

const router = express.Router();

router.use(passport.authenticate({ session: false }));
router.get("/", getAllNotes);
router.post("/new", createNote);

router.route("/:noteId").get(getSingleNote).delete(deleteNote);

router.put("/title", updateTitle);

router.put("/content", updateContent);

module.exports = router;
