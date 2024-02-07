import { USER_LOCAL_STORAGE_KEY } from "components/common/const/localStorage";
import React from "react";
import { LazyRouteFunction, RouteObject } from "react-router";
import { LoaderFunction, redirect } from "react-router-dom";

export enum AppRoutes {
    MAIN = "main",
    PROFILE = "profile",
    CALENDAR = "week",
    AUTH = "auth",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.CALENDAR]: "/week",
    [AppRoutes.AUTH]: "/login",
    // [AppRoutes.NOT_FOUND]: "*",
};

export interface RouteSchema {
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    lazy?: LazyRouteFunction<RouteObject>;
    loader?: LoaderFunction<unknown> | undefined;
}

const routeConfig: Record<AppRoutes, RouteSchema> = {
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        async lazy() {
            const { AuthPage } = await import("../pages/AuthPage");
            return { Component: AuthPage };
        },
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        index: true,
        async lazy() {
            const { MainPage } = await import("../pages/CalendarPage");
            return { Component: MainPage };
        },
        async loader() {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (!user) {
                throw redirect(RoutePath.auth);
            }
            return null;
        },
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        async lazy() {
            const { Profile } = await import("../pages/ProfilePage");
            return { Component: Profile };
        },
    },
    [AppRoutes.CALENDAR]: {
        path: RoutePath.week,
        async lazy() {
            const { WeekPage: LessonsPage } = await import("../pages/WeekPage");
            return { Component: LessonsPage };
        },
    },
};

const routeConfigArray: RouteSchema[] = Object.values(routeConfig);

export { routeConfig, routeConfigArray };
