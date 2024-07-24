import { Container } from "react-bootstrap";
import NoteLoggedInView from "../components/NotePageLoggedInView";
import NotePageLoggedOutView from "../components/NotePageLoggedOutView";
import styles from "../styles/NotePage.module.css";
import { User } from "../models/user";

interface NotesPageProps {
    loggedInUser: User | null,
}

const NotesPage = ({loggedInUser}: NotesPageProps) => {
    return ( 
        <Container className={styles.notesPage}>

        <>
        {
          loggedInUser
          ? <NoteLoggedInView />
          : <NotePageLoggedOutView />
        }
        </>

      </Container>

     );
}
 
export default NotesPage;