import React, { useCallback, useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    addDays,
    startOfWeek,
} from "date-fns";
import { CalendarHeader } from "./CalendarHeader";
import Days from "./Days";
import Cells from "./Cells";
import styled from "@emotion/styled";
import TaskModal from "../TaskModal/TaskModal";

export interface Task {
    id?: Date;
    title?: string;
    priority?: string[];
}

interface CalendarProps {
    year: number;
    month: number;
}

const Calendar: React.FC<CalendarProps> = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isTaskModal, setIsTaskModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const onCloseModal = useCallback(() => {
        setIsTaskModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsTaskModal(true);
    }, []);

    const nextMonth = () => {
        setCurrentDate((prevDate) => addMonths(prevDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate((prevDate) => subMonths(prevDate, 1));
    };

    const renderDays = () => {
        const dateFormat = "eeee";
        const days = [];
        const startDate = startOfWeek(startOfMonth(currentDate));

        for (let i = 0; i < 7; i++) {
            days.push(format(addDays(startDate, i), dateFormat));
        }

        return days;
    };

    const daysToRender = renderDays();
    const holdaTask = (value: Task) => {
        setTasks((prev) => [
            ...prev,
            { id: new Date(), priority: value.priority, title: value.title },
        ]);
    };
    console.log(tasks, "tasks");
    return (
        <Container>
            <CalendarHeader
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <CalendarWrapper>
                {daysToRender.map((day, index) => (
                    <Days key={index} day={day} />
                ))}
                <Cells onShowModal={onShowModal} currentDate={currentDate} />
            </CalendarWrapper>
            {isTaskModal && (
                <TaskModal
                    holdTask={holdaTask}
                    isOpen={isTaskModal}
                    onClose={onCloseModal}
                />
            )}
        </Container>
    );
};

export default Calendar;

export const CalendarWrapper = styled("div")`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows: 120px;
    overflow: auto;
`;
export const Container = styled.div`
    width: 90%;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
    max-width: 1200px;
`;
