import React from "react";
import styled from "@emotion/styled";
import { Suspense, useCallback, useState } from "react";
import { type FormType } from "../LoginForm/LoginForm";
import { LoginFormAsync } from "../LoginForm/LoginFormAsync";
import { useDispatch, useSelector } from "react-redux";
import { type AppThunkDispatch } from "../../store/store";
import { userActions } from "../../store/slices/user/userSlice";
import { getUserAuthData } from "../../store/slices/user/selectors.ts/getAuthData";
import LoginButtons from "../LoginForm/LoginButtons";
import { loginUpByEmail } from "../../store/slices/login/loginByEmail";
import { signUpByEmail } from "../../store/slices/login/signUpByEmail";

function Header() {
    const [isOpen, setIsopen] = useState(false);
    const [singUp, setSignUp] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch<AppThunkDispatch>();

    const onSubmit = useCallback(
        async (values: FormType) => {
            console.log(singUp, "sign up");
            const result = await dispatch(
                singUp
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
                setIsopen(false);
                dispatch(userActions.setError(""));
            }
        },
        [dispatch, singUp]
    );

    const onCloseModal = useCallback(() => {
        setIsopen(false);
        dispatch(userActions.setError(""));
    }, [dispatch]);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const holdTitle = singUp ? "Sign up" : "Enter";

    return (
        <HeaderWrapper>
            <h1>CRM</h1>
            <LoginButtons
                login={() => setIsopen(true)}
                authData={authData}
                logOut={onLogout}
            />
            <Suspense fallback={""}>
                <LoginFormAsync
                    isOpen={isOpen}
                    onClose={onCloseModal}
                    handleSubmit={onSubmit}
                    singUp={singUp}
                    title={holdTitle}
                    setSignUp={() => setSignUp((prev) => !prev)}
                />
            </Suspense>
        </HeaderWrapper>
    );
}

export default Header;

const HeaderWrapper = styled("div")`
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--yellow);
`;
