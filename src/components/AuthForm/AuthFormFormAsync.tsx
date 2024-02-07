import { lazy } from "react";

export const AuthFormAsync = lazy(async () => await import("./AuthForm"));
