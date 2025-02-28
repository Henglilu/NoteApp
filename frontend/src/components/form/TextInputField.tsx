import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOption?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputField = ({name, label, register, registerOption, error, ...props}: TextInputFieldProps) => {
    return (  
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
            {...props}
            {...register(name, registerOption)}
            isValid={!!error}
            />
             <Form.Control.Feedback type="invalid">
             {error?.message}
             </Form.Control.Feedback>
        </Form.Group>
    );
}
 
export default TextInputField;