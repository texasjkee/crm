import React from "react";
import { useFormik } from "formik";
import { validateSchema } from "./validationSchema";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

export interface FormType {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface LoginFormProps {
    handleSubmit: (values: FormType) => void;
    singUp?: boolean;
}

function LoginForm({ handleSubmit, singUp }: LoginFormProps) {
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
        <>
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

                <Button
                    color='primary'
                    variant='contained'
                    fullWidth
                    type='submit'
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default LoginForm;

const Form = styled("form")`
    padding: 10px;
    & div {
        margin-bottom: 10px;
    }
`;
