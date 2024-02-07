import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validationSchema } from "./validationSchema";
import { styled, Button, TextField } from "@mui/material";
import { useYupValidationResolver } from "../common/hooks/useYupValidationResolver";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../store/store";
import { getLoginError } from "../../store/slices/user/selectors.ts/getAuthErrors";
import { SEVERITY } from "../common/const/enums";
import { UIContext } from "../UIContext";
import WarnInfo from "../common/ui/Alert/WarnInfo";
import { RoutePath } from "routers/routerConfig";
import { useNavigate } from "react-router-dom";
import { getIsLoading } from "store/slices/user/selectors.ts/getIsLoading";
import { signUpByEmail } from "store/slices/user/signUpByEmail";
import { loginUpByEmail } from "store/slices/user/loginUpByEmail";
import { authActions } from "store/slices/user/userSlice";

export interface FormType {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
    isConfirm: boolean;
}

const defaultValues = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    isConfirm: false,
};
const AuthForm = () => {
    const resolver = useYupValidationResolver<FormType>(validationSchema);
    const navigate = useNavigate();
    const isLoading = useSelector(getIsLoading);
    const {
        register,
        handleSubmit,
        unregister,
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

    const postSignUp = async (values: FormType) => {
        const result = await dispatch(
            signUpByEmail({
                name: values.name,
                email: values.email,
                password: values.password,
            })
        );
        if (result.meta.requestStatus === "fulfilled") {
            setValue("isConfirm", !watch("isConfirm"));
            setAlert({
                show: true,
                message: "User Created now you can do login",
                severity: "success",
            });
        }
    };

    const postLogin = async (values: FormType) => {
        const result = await dispatch(
            loginUpByEmail({
                email: values.email,
                password: values.password,
            })
        );
        if (result.meta.requestStatus === "fulfilled") {
            navigate(RoutePath.main);

            setAlert({
                show: true,
                message: "Login success",
                severity: "success",
            });
        }
    };

    const postAuth = (values: FormType) => {
        checked ? postSignUp(values) : postLogin(values);
    };

    const onSubmit = handleSubmit((data) => postAuth(data));

    const onSignUP = () => {
        setValue("isConfirm", !watch("isConfirm"));
        dispatch(authActions.setError(""));
    };

    const isSignUp = checked ? "Login" : "Sign up";
    const isLogin = !checked ? "Login" : "Sign up";

    useEffect(() => {
        if (checked) {
            register("confirmPassword");
            register("name");
        } else {
            unregister("confirmPassword");
            unregister("name");
        }
    }, [checked, register, unregister]);

    return (
        <Form onSubmit={onSubmit}>
            {checked ? (
                <TextField
                    label='Name'
                    fullWidth
                    type='name'
                    error={Boolean(errors.name)}
                    helperText={errors?.name?.message}
                    {...register("name")}
                />
            ) : null}
            <TextField
                label='Email'
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors?.email?.message}
                {...register("email")}
            />
            <TextField
                fullWidth
                label='Password'
                type='password'
                error={Boolean(errors.password)}
                helperText={errors?.password?.message}
                {...register("password")}
            />

            {checked ? (
                <TextField
                    label='Confirm Password'
                    fullWidth
                    type='password'
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors?.confirmPassword?.message}
                    {...register("confirmPassword")}
                />
            ) : null}
            {requestsErrors && (
                <WarnInfo severity={SEVERITY.ERROR}>{requestsErrors}</WarnInfo>
            )}

            <Button
                color='secondary'
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
                <Button disabled={isLoading} color='inherit' onClick={onSignUP}>
                    {isSignUp}
                </Button>
            </div>
        </Form>
    );
};

export default AuthForm;
export const Form = styled("form")({
    "& .MuiTextField-root, .MuiPaper-elevation, .MuiButton-root,  .MuiInput-underline":
        {
            marginBottom: 10,
        },
});
