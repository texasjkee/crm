import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from ".././layout/layoutElement";

import { routeConfig, RoutePath } from "./routerConfig";

export const Routing = createBrowserRouter([
    {
        element: <Layout />,
        path: "/",
        children: [...routeConfig],
    },
]);

console.log(routeConfig, RoutePath);
