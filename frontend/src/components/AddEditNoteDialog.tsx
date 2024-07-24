import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/notes_api"
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void, 
    onNoteSaved: (note: Note) => void,

}

const AddEditNoteDialog = ({noteToEdit, onDismiss, onNoteSaved}: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });

    async function onSubmit(input: NoteInput) {
        console.log("Submitting note:", input);
        try {
            let noteRes: Note;
            if(noteToEdit) {
                noteRes = await NotesApi.updateNote(noteToEdit._id, input)
            }   else {
                noteRes = await NotesApi.createNote(input)
            }
            onNoteSaved(noteRes)
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit? "EditNote" : "Add note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                    name="title"
                    label="Title"
                    type="text"
                    placeholder="Title"
                    register={register} //from react form hook
                    registerOption={{ required: "Required"}}
                    error={errors.title}
                    />

                    <TextInputField 
                    name="text"
                    label="Text"
                    as="Textarea"
                    rows={5}
                    placeholder="Text"
                    register={register}
                    /> 


                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                type="submit"
                form="addEditNoteForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

      );
}
 
export default AddEditNoteDialog