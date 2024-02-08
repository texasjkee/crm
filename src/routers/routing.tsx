import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { routeConfigArray } from "./routerConfig";
import Layout from "layout/layout";

export const Routing = createBrowserRouter([
    {
        element: <Layout />,
        path: "/",
        children: [...routeConfigArray],
    },
]);
