import styles from "../styles/Note.module.css"
import stylesUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap"
import { Note as NoteModel} from "../models/note"
import { formatDate } from "../utils/formatDate";
import { MdDelete} from "react-icons/md"

interface NoteProps{ //props to take data from other file 
    note: NoteModel, //we need to pass css class to note componets
    onDeleteNoteClicked: (note: NoteModel) => void,
    onNoteClick: (note: NoteModel) => void,
    className?: string,
}


const Note = ({note,onNoteClick, onDeleteNoteClicked, className } : NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note; // use to unpack noteprop so no need to write note.title just title but i will keep use in in case of confuse

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " +formatDate(createdAt);
    }

    return ( 
        <Card className={`${styles.noteCard} ${className}`}
        onClick={() => onNoteClick(note)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={stylesUtils.flexCenter}>
                    {note.title}
                    <MdDelete 
                    className="text-muted ms-auto"
                    onClick={(e) => {
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                    {createdUpdatedText}
                </Card.Footer>
        </Card>
    )
}

export default Note