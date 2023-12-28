import { type FC, lazy } from "react";
import { type TaskModalProps } from "./TaskModal";

export const TaskModalAsync = lazy<FC<TaskModalProps>>(
    async () => await import("./TaskModal")
);
