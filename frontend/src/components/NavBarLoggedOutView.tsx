import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClick: () => void,
    onLoginClick: () => void,
}

const NavBarLoggedOutView = ({onSignUpClick, onLoginClick}: NavBarLoggedOutViewProps) => {
    return ( 
        <>
            <Button onClick={onSignUpClick}>Sign Up</Button>
            <Button onClick={onLoginClick}>Login</Button>

        </>
     );
}
 
export default NavBarLoggedOutView;