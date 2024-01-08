import { FC, lazy } from "react";
import { EventsFormProps } from "./EventsForm";

export const EventsFormAsync = lazy<FC<EventsFormProps>>(
    async () => await import("./EventsForm")
);
