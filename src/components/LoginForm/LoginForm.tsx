import React, { memo } from "react";
import { useFormik } from "formik";
import { validateSchema } from "./validationSchema";
import { Alert, Button, Link, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Modal, { ModalSize } from "../common/ui/MUIModal/Modal";
import { useSelector } from "react-redux";
import { getLoginError } from "../../store/slices/user/selectors.ts/getLoginErrors";
import { css } from "@emotion/react";
import SnackBar from "../common/ui/SnackBar/SnackBar";
import { SEVERITY } from "../../const/enums";

export interface FormType {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface LoginFormProps {
    handleSubmit: (values: FormType) => void;
    singUp?: boolean;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    setSignUp: () => void;
}

const LoginForm = memo(function LoginForm(props: LoginFormProps) {
    const { handleSubmit, singUp, isOpen, onClose, title, setSignUp } = props;
    const error = useSelector(getLoginError);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validateSchema,
        onSubmit: (values: FormType) => {
            handleSubmit(values);
        },
    });

    return (
        <Modal
            title={title}
            width={ModalSize.SMALL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id='email'
                    name='email'
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id='password'
                    name='password'
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                {singUp && (
                    <TextField
                        fullWidth
                        id='confirmPassword'
                        name='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                    />
                )}
                {error && <Alert severity={SEVERITY.ERROR}>{error}</Alert>}
                <Button
                    color='primary'
                    variant='contained'
                    fullWidth
                    type='submit'
                >
                    Submit
                </Button>
                <div
                    css={css`
                        float: right;
                    `}
                >
                    <Link href={"#"} onClick={setSignUp}>
                        {singUp ? "Login" : "Sign up"}
                    </Link>
                </div>
                <SnackBar message={error} isOpen={!!error} />
            </Form>
        </Modal>
    );
});

export default LoginForm;

const Form = styled("form")`
    & div,
    Button {
        margin-bottom: 10px;
    }
`;
