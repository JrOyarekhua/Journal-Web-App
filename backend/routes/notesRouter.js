import express from "express";

const router = express.Router();

router.get("/", getAllNotes);

router.route("/:noteId").get(getNote).post(createNote).delete(deleteNote);

router.put("/title", updateTitle);

router.put("/content", updateContent);

module.exports = router;
