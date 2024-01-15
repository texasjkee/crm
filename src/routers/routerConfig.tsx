import React from "react";
import { LazyRouteFunction, RouteObject } from "react-router";

export enum AppRoutes {
    MAIN = "main",
    PROFILE = "profile",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.PROFILE]: "/profile",
    // [AppRoutes.NOT_FOUND]: "*",
};

export interface RouteSchema {
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    lazy?: LazyRouteFunction<RouteObject>;
}

const routeConfig: Record<AppRoutes, RouteSchema> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        index: true,
        async lazy() {
            const { MainPage } = await import("../pages/CalendarPage");
            return { Component: MainPage };
        },
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        async lazy() {
            const { Profile } = await import("../pages/ProfilePage");
            return { Component: Profile };
        },
    },
};

const routeConfigArray: RouteSchema[] = Object.values(routeConfig);

export { routeConfig, routeConfigArray };
