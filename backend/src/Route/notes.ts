import express from "express";
import * as NotesController from "../controllers/notesController" // or also can import getNotes but is a specific call 

const router = express.Router()

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote)

router.post("/", NotesController.createNotes)

router.patch("/:noteId", NotesController.updateNote)

router.delete("/:noteId", NotesController.deleteNotes)

export default router;