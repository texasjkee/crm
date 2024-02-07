import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { styled } from "@mui/material";

const layout = () => {
    return (
        <>
            <Header></Header>
            <Main>
                <Outlet></Outlet>
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
