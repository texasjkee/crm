import React, { useState } from "react";
import {
    addMonths,
    subMonths,
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
} from "date-fns";
import styled from "@emotion/styled";

const Test = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const renderCalendar = () => {
        const startOfMonthDate = startOfMonth(currentDate);
        const endOfMonthDate = endOfMonth(currentDate);
        const startOfCalendar = startOfWeek(startOfMonthDate, {
            weekStartsOn: 0,
        });
        const endOfCalendar = endOfWeek(endOfMonthDate, { weekStartsOn: 0 });

        const days = eachDayOfInterval({
            start: startOfCalendar,
            end: endOfCalendar,
        });

        // console.log(days, "days");
        return days.map((day, index) => (
            <DayContainer key={index} className='calendar-day'>
                {format(day, "d")}
            </DayContainer>
        ));
    };

    return (
        <div className='calendar'>
            <div className='calendar-header'>
                <button
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                >
                    Previous Month
                </button>
                <h2>{format(currentDate, "MMMM yyyy")}</h2>
                <button
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                    Next Month
                </button>
            </div>
            <div className='calendar-grid'>
                <div className='calendar-day'>Sun</div>
                <div className='calendar-day'>Mon</div>
                <div className='calendar-day'>Tue</div>
                <div className='calendar-day'>Wed</div>
                <div className='calendar-day'>Thu</div>
                <div className='calendar-day'>Fri</div>
                <div className='calendar-day'>Sat</div>
                {renderCalendar()}
            </div>
        </div>
    );
};

export default Test;
export const DayContainer = styled("div")`
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    text-align: right;
     padding:0 5px ;
    letter-spacing: 1px;
    font-size: 12px;
    box-sizing: border-box;
    color: #98a0a6;
    position: relative;
    z-index: 1;
    overflow-x: auto;
    

    &:nth-of-type(7n + 7) {
        border-right: 0;
    }

    &:nth-of-type(n + 1):nth-of-type(-n + 7) {
        grid-row: 2;
    }

    &:nth-of-type(n + 8):nth-of-type(-n + 14) {
        grid-row: 3;
    }

    &:nth-of-type(n + 15):nth-of-type(-n + 21) {
        grid-row: 4;
    }

    &:nth-of-type(n + 22):nth-of-type(-n + 28) {
        grid-row: 5;
    }

    &:nth-of-type(n + 29):nth-of-type(-n + 35) {
        grid-row: 6;
    }

    &:nth-of-type(7n + 1) {
        grid-column: 1/1;
    }

    &:nth-of-type(7n + 2) {
        grid-column: 2/2;
    }

    &:nth-of-type(7n + 3) {
        grid-column: 3/3;
    }

    &:nth-of-type(7n + 4) {
        grid-column: 4/4;
    }

    &:nth-of-type(7n + 5) {
        grid-column: 5/5;
    }

    &:nth-of-type(7n + 6) {
        grid-column: 6/6;
    }
    &:nth-of-type(7n + 7) {
        grid-column: 7/7;
    }

    &.disabled {
        color: rgba(152, 160, 166, 0.6);
        background-color: var(--primary-dark-white);
        background-image: url(./assets/svg/disabled.svg)
        cursor: not-allowed;
    }

    &.selected {
        background-color: var(--grey);
    }
`;
