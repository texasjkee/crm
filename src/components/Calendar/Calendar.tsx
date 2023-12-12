import React, { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    addDays,
    startOfWeek,
} from "date-fns";
import { css } from "@emotion/react";
import { CalendarHeader } from "./CalendarHeader";
import Days from "./Days";
import Cells from "./Cells";
import styled from "@emotion/styled";

// interface Task {
//     id: string;
//     title: string;
//     date: Date;
// }

interface CalendarProps {
    year: number;
    month: number;
}

const Calendar: React.FC<CalendarProps> = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    // const [tasks, setTasks] = useState<Task[]>([]);

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

    // const handleTaskCreation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         const inputValue = e.currentTarget.value.trim();
    //         if (inputValue !== "") {
    //             const newTask: Task = {
    //                 id: `task-${Date.now()}`,
    //                 title: inputValue,
    //                 date: new Date(),
    //             };
    //             setTasks([...tasks, newTask]);
    //             e.currentTarget.value = "";
    //         }
    //     }
    // };

    const daysToRender = renderDays();

    return (
        <Container
            css={css`
                height: 100vh;
            `}
        >
            <CalendarHeader
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <CalendarWrapper>
                {daysToRender.map((day, index) => (
                    <Days key={index} day={day} />
                ))}
                <Cells currentDate={currentDate} />
            </CalendarWrapper>
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
