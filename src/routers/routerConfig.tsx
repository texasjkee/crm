import React from "react";
import { RouteObject } from "react-router-dom";
import Calendar from "../components/Calendar/Calendar";
import Profile from "../pages/ProfilePage";

export enum AppRoutes {
    MAIN = "main",
    PROFILE = "profile",
}

export interface RouteScheme {
    path?: string;
    element: React.ReactNode;
    index?: boolean;
}

export const RoutePath: Record<AppRoutes, RouteScheme> = {
    [AppRoutes.MAIN]: {
        element: <Calendar year={2023} month={1} />,
        index: true,
    },
    [AppRoutes.PROFILE]: {
        element: <Profile />,
        path: "/user-page",
    },
};

const mainRouter: RouteObject = {
    element: RoutePath.main.element,
    index: RoutePath.main.index,
};
const profileRouter: RouteObject = {
    element: RoutePath.profile.element,
    path: RoutePath.profile.path,
};

export const routeConfig = [mainRouter, profileRouter];
