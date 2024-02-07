import { styled } from "@mui/material";
import AuthForm from "components/AuthForm/AuthForm";
import React from "react";

export const AuthPage = () => {
    return (
        <AuthContainer>
            <AuthForm />
        </AuthContainer>
    );
};
const AuthContainer = styled("div")({
    maxWidth: "400px",
    textAlign: "right",
    paddingTop: "10px",
    position: "relative",
    top: 50,
});
