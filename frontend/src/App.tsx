import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NoteFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css"


function App() {

  const[loggedInUser, setLogedInUser] = useState<User|null>(null)

  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLogInModal, setShowLogInModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoginUser()
        setLogedInUser(user);
      }catch(error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, [])

  return (
    <BrowserRouter>
    <div>
      <NavBar 
      loggedInUser={loggedInUser} 
      onLogInClick={() => setShowLogInModal(true)} 
      onSignUpClick={() => setShowSignUpModal(true)}
      onLogOutSuccessFul={() => setLogedInUser(null)}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route 
          path="/"
          element={<NotesPage loggedInUser={loggedInUser}/>}
          />
          <Route 
          path="/privacy"
          element={<PrivacyPage />}
          />
          <Route 
          path="/*"
          element={<NoteFoundPage />}
          />
        </Routes>
      </Container>
      {showSignUpModal && (
          <SignUpModal onDismiss={() => setShowSignUpModal(false)} 
          onSignUpSuccessful={(user) => {
            setLogedInUser(user);
            setShowSignUpModal(false);
          }}
           />
        )}
        {showLogInModal && (
          <LoginModal onDismiss={() => setShowLogInModal(false)} 
          onLoginSuccessful={(user) => {
            setLogedInUser(user);
            setShowLogInModal(false);
          }} 
          />

        )}
    </div>
    </BrowserRouter>
  );
}

export default App;
