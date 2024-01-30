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
import WeekDays from "./WeekDays";
import Cells from "./Cells";
import styled from "@emotion/styled";
import EventsModal from "../EvetsModal/EventsModal";
import { useDispatch, useSelector } from "react-redux";
import { getIsopen } from "../../store/slices/events/selectors/getIsOpen";
import { AppThunkDispatch } from "../../store/store";
import { eventAction } from "../../store/slices/events/eventSlice";

export interface TaskType {
    id: Date;
    title?: string;
    priority?: string[];
}

interface CalendarProps {
    year: number;
    month: number;
}

const Calendar: React.FC<CalendarProps> = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const isOpen = useSelector(getIsopen);
    const dispatch = useDispatch<AppThunkDispatch>();

    const onCloseModal = useCallback(() => {
        dispatch(eventAction.setCloseModal());
    }, [dispatch]);

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

    console.log("calendar");

    return (
        <Container>
            <CalendarHeader
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <CalendarWrapper>
                {daysToRender.map((day, index) => (
                    <WeekDays key={index} day={day} />
                ))}
                <Cells currentDate={currentDate} />
                {isOpen && (
                    <EventsModal isOpen={isOpen} onClose={onCloseModal} />
                )}
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
    width: 98%;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
`;
