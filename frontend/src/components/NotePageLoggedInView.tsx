import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotePage.module.css";
import stylesUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";


const NoteLoggedInView = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

    useEffect(() => {
        //use to import another fuction
        async function loadNotes() {
          try {
            setShowNotesLoadingError(false);
            setNotesLoading(true);
            const notes = await NotesApi.fetchNote();
            setNotes(notes);
          } catch (error) {
            console.error(error);
            setShowNotesLoadingError(true);
          } finally {
            setNotesLoading(false);
          }
        }
        loadNotes();
      }, []);
    
      async function deleteNote(note: NoteModel) {
        try {
          await NotesApi.deleteNote(note._id); //delete note in delete endpoint if it success check and remove the one with id that match
          setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }
    
      const notesGrid = (
        <Row xs={1} md={2} lg={3} className={`g-4 ${styles.noteGrid}`}>
          {notes.map((note) => (
            <Col key={note._id}>
              <Note
                note={note}
                className={styles.note}
                onNoteClick={setNoteToEdit}
                onDeleteNoteClicked={deleteNote}
              />
            </Col>
          ))}
        </Row>
      );

    return ( 
        <>
               <Button
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
          onClick={() => setShowAddNoteDialog(true)}
        >
          <FaPlus />
          Add net note
        </Button>
        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && (
          <p>Sometihng went wrong. Please refresh the page</p>
        )}
        {!notesLoading && !showNotesLoadingError && (
          <>{notes.length > 0 ? notesGrid : <p>You don't have any note </p>}</>
        )}
        {showAddNoteDialog && (
          <AddEditNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]); //notes is from usestate all the note from old data
              setShowAddNoteDialog(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddEditNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updateNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updateNote._id
                    ? updateNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )}
        </>
     );
}
 
export default NoteLoggedInView;