import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/layoutElement";

import { routeConfigArray } from "./routerConfig";

export const Routing = createBrowserRouter([
    {
        element: <Layout />,
        path: "/",
        children: [...routeConfigArray], // Add routeConfigArray
    },
]);
