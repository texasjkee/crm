export interface EventTResponseType {
    id?: number;
    name: string;
    date: Date;
    price: number;
    isDone: boolean;
    authorId: number;
}

export interface EventSchema {
    id: string;
    selectedDay: string | null;
    name: string;
    dateTime: string;
    price: number;
    isDone: boolean;
    error: string | undefined;
    isOpen: boolean;
    isLoading: boolean;
    events: EventTResponseType[];
}
