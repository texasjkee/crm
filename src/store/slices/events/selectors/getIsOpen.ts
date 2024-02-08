import { StateSchema } from "store/types/stateSchema";

export const getIsOpen = (state: StateSchema) => state.event.isOpen;
