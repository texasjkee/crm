import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import { Header } from "components/Header/Header";

const layout = () => {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </>
    );
};

export default layout;
const Main = styled("main")({
    margin: "1em auto 2em",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
});
