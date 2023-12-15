import React from "react";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import { memo } from "react";
// import { Cell } from "./styles";
import { css } from "@emotion/react";
// import styled from "@emotion/styled";
import { Day } from "./styles";
import Icon from "./../../assets/svg/disabled.svg";

interface IProps {
    currentDate: number | Date;
    onShowModal: (day: Date) => void;
}
const Cells = memo(function Cells({ currentDate, onShowModal }: IProps) {
    const dateFormat = "d";
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push({ day });

            day = addDays(day, 1);
        }
    }

    return (
        <>
            {days.map((item) => (
                <Day
                    css={
                        !isSameMonth(new Date(item.day), monthStart)
                            ? dayStyle.disabled
                            : isSameDay(item.day, new Date())
                              ? dayStyle.selected
                              : ""
                    }
                    key={item.day.toString()}
                >
                    <span>{format(item.day, dateFormat)}</span>
                    <div>
                        <button onClick={() => onShowModal(item.day)}>
                            add
                        </button>
                    </div>
                </Day>
            ))}
        </>
    );
});

export default Cells;

export const dayStyle = {
    disabled: css({
        color: "rgba(#98a0a6, 0.6)",
        backgroundColor: "#ffffff",
        backgroundImage: ` url(${Icon})`,
    }),
    selected: css({
        backgroundColor: "var(--grey, 0.6)",
    }),
};
