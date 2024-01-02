import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validationSchema } from "./validationSchema";
import { styled, Link, Button } from "@mui/material";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { css } from "@emotion/react";
import {
    DynamicModuleLoader,
    ReducerList,
} from "../../utils/DynamicModuleLoader";
import { loginReducer } from "../../store/slices/login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../store/store";
import { signUpByEmail } from "../../store/slices/login/signUpByEmail";
import { loginUpByEmail } from "../../store/slices/login/loginByEmail";
import { userActions } from "../../store/slices/user/userSlice";

import { TextField } from "@mui/material";
import { getLoginError } from "../../store/slices/user/selectors.ts/getLoginErrors";
import { SEVERITY } from "../../const/enums";
import { UIContext } from "../UIContext";
import WarnInfo from "../common/ui/Alert/WarnInfo";

const initialReducers: ReducerList = {
    login: loginReducer,
};

export interface FormType {
    email: string;
    password: string;
    confirmPassword?: string;
    isConfirm: boolean;
}

export interface LoginFormProps {
    onSuccess: () => void;
}
const defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
    isConfirm: false,
};
const LoginForm = (props: LoginFormProps) => {
    const { onSuccess } = props;
    const resolver = useYupValidationResolver(validationSchema);
    const {
        register,
        handleSubmit,
        unregister,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormType>({
        resolver,
        defaultValues,
    });
    const requestsErrors = useSelector(getLoginError);
    const dispatch = useDispatch<AppThunkDispatch>();
    const checked = watch("isConfirm");
    const { setAlert } = useContext(UIContext);

    const postLogin = async (values: FormType) => {
        const result = await dispatch(
            checked
                ? signUpByEmail({
                      email: values.email,
                      password: values.password,
                  })
                : loginUpByEmail({
                      email: values.email,
                      password: values.password,
                  })
        );
        if (result.meta.requestStatus === "fulfilled") {
            dispatch(userActions.setError("Successful"));
            onSuccess();
            setAlert({
                show: true,
                message: checked ? "Created succses" : "Login succses",
                severity: "success",
            });
            reset();
            dispatch(userActions.setError(""));
        }
    };

    const onSubmit = handleSubmit((data) => postLogin(data));

    const onSignUP = () => {
        setValue("isConfirm", !watch("isConfirm"));
        dispatch(userActions.setError(""));
    };

    const isSignUp = checked ? "Login" : "Sign up";
    const isLogin = !checked ? "Login" : "Sign up";

    useEffect(() => {
        if (checked) {
            register("confirmPassword");
        } else {
            unregister("confirmPassword");
        }
    }, [checked, register, unregister]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount={true}
            reducers={initialReducers}
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

                {checked ? (
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
                ) : null}

                {requestsErrors && (
                    <WarnInfo severity={SEVERITY.ERROR}>
                        {requestsErrors}
                    </WarnInfo>
                )}

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
                    <Link href={"#"} onClick={onSignUP}>
                        {isSignUp}
                    </Link>
                </div>
            </Form>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
const Form = styled("form")({
    "& div, Button": {
        marginBottom: 10,
    },
});
