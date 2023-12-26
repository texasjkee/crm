import { FC, lazy } from "react";
import { TaskModalProps } from "./TaskModal";

export const LoginFormAsync = lazy<FC<TaskModalProps>>(
    async () => await import("./TaskModal")
);
