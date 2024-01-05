export interface EventSchema {
    id: string;
    selectedDay: string | null;
    name: string;
    dateTime: string;
    price: number;
    isDone: boolean;
    error: string;
    isOpen: boolean;
}
