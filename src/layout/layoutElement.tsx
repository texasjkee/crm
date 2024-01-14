import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const layout = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
};

export default layout;
