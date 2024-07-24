import { RequestHandler } from "express";
import NoteModel from "../models/note"
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefine } from "../util/assertIsDefine";

// get every note in mongo NoteModel which is mongodb database
export const getNotes: RequestHandler = async(req, res, next) => {
    const authenticatedUserId = req.session.userId //just to check that it not null

    try{
        assertIsDefine(authenticatedUserId);

      const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
      res.status(200).json(notes);
    } catch(error) {
      next(error);
    }
    }

    //get specific note by id
export const getNote: RequestHandler = async(req, res, next) => {
    const authenticatedUserId = req.session.userId 
    const noteId = req.params.noteId;

    try{
        assertIsDefine(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404, "Note not found")
        }

        if(!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You can't acess this note")
        }

        res.status(200).json(note)
    } catch(error) {
        next(error);
    }
}



//create note
interface CreateNoteBody {
    title?: string, // ? mean there can be undefied
    text?: string,
}
export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req, res, next ) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId 


    try {
        assertIsDefine(authenticatedUserId);

        if(!title) {
            throw createHttpError(400, "Note must have a title")
        }
    
        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch(error) {
        next(error);
    }
}


// update note
interface UpdateNoteParams {
    noteId: string,
}

//An interface in TypeScript defines the structure of an object, specifying the types of its properties. Interfaces are used to define the shape of data
interface UpdateNoteBody{
    title?: string,
    text?: string,
}
                                       // all of this to check the type
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next)=> {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId 


    try {
        assertIsDefine(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }
        if(!newTitle) {
            throw createHttpError(400, "Note must have a title")
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404, "Note not found")
        }

        if(!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You can't acess this note")
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
}

//route to delete
export const deleteNotes: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId 


    try{
        assertIsDefine(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, "Note not found")
        }

        if(!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You can't acess this note")
        }

        await NoteModel.findByIdAndDelete(noteId);

        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}