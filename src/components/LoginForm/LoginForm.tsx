import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { validationSchema } from "./validationSchema";
import { Button, TextField, styled, Link, Alert } from "@mui/material";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { css } from "@emotion/react";
import Modal, { ModalSize } from "../common/ui/Modal/Modal";
import { SEVERITY } from "../../const/enums";

export interface FormType {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface LoginFormProps {
    handleSubmit: (values: FormType) => void;
    signUp?: boolean;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    setSignUp: () => void;
    error?: string;
}

const LoginForm = memo(function LoginForm(props: LoginFormProps) {
    const {
        handleSubmit: onHandleSubmit,
        signUp,
        isOpen,
        onClose,
        title,
        setSignUp,
        error,
    } = props;

    const resolver = useYupValidationResolver(validationSchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({ resolver });
    const onSubmit = handleSubmit((data) => onHandleSubmit(data));

    const isSignUp = signUp ? "Login" : "Sign up";
    const isLogin = !signUp ? "Login" : "Sign up";

    console.log("react hook form rerender");
    return (
        <Modal
            title={title}
            width={ModalSize.SMALL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form onSubmit={onSubmit}>
                <TextField
                    label='Email'
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    {...register("email")}
                />
                <TextField
                    fullWidth
                    label='Password'
                    type='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
                    {...register("password")}
                />
                {signUp && (
                    <>
                        <TextField
                            label='Confirm Password'
                            fullWidth
                            type='password'
                            error={Boolean(errors.confirmPassword)}
                            helperText={
                                errors.confirmPassword &&
                                errors.confirmPassword.message
                            }
                            {...register("confirmPassword")}
                        />
                    </>
                )}
                {error && <Alert severity={SEVERITY.ERROR}>{error}</Alert>}
                <Button
                    color='primary'
                    variant='contained'
                    fullWidth
                    type='submit'
                >
                    {isLogin}
                </Button>
                <div
                    css={css`
                        float: right;
                    `}
                >
                    <Link href={"#"} onClick={setSignUp}>
                        {isSignUp}
                    </Link>
                </div>
            </Form>
        </Modal>
    );
});

export default LoginForm;
const Form = styled("form")({
    "& div, Button": {
        marginBottom: 10,
    },
});
