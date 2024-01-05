import { FC, lazy } from "react";
import { EvetsFormProps } from "./EventsForm";

export const EventsFormAsync = lazy<FC<EvetsFormProps>>(
    async () => await import("./EventsForm")
);
