import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";
import { Alert, Button, Form, Modal, ModalBody } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css"
import { useState } from "react";
import { ConflictError } from "../errors/http_erros";
import { error } from "console";


interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {

    const[errorText, setErrorText] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitting} } =useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try{
            const newUser = await NoteApi.signUp(credentials)
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message)
            } else {
            alert(error)
            }
            console.error(error);            
        }
        
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Sign Up
            </Modal.Header>

            <ModalBody>
                {errorText &&  
                <Alert variant="danger">
                    {errorText}
                </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField 
                name="username"
                label="Username"
                type="text"
                placeholder="Username"
                register={register}
                registerOption={{required: "Required"}}
                error={errors.username}
                />
                <TextInputField 
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                register={register}
                registerOption={{required: "Required"}}
                error={errors.email}
                />
                <TextInputField 
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                register={register}
                registerOption={{required: "Required"}}
                error={errors.password}
                />
                <Button
                type="submit"
                disabled={isSubmitting}
                className={styleUtils.width100}>
                
                    Submit
                </Button>

                </Form>
            </ModalBody>
        </Modal>
     );
}
 
export default SignUpModal;