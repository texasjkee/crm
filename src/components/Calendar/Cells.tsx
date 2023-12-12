import React, { useState } from "react";
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
import { Modal } from "../../styles/ui/Modal/Modal";

interface IProps {
    currentDate: number | Date;
}
const Cells = memo(function Cells({ currentDate }: IProps) {
    const dateFormat = "d";
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [isOpen, setIsOpen] = useState(false);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(day);

            day = addDays(day, 1);
        }
    }

    const handleOpen = () => {
        console.log("click");
        setIsOpen(!isOpen);
    };

    return (
        <>
            {days.map((item) => (
                <Day
                    css={
                        !isSameMonth(new Date(item), monthStart)
                            ? dayStyle.disabled
                            : isSameDay(item, new Date())
                              ? dayStyle.selected
                              : ""
                    }
                    key={item.toString()}
                >
                    <span>{format(item, dateFormat)}</span>
                    <div>
                        <button onClick={handleOpen}>add</button>
                        <Modal lazy isOpen={isOpen}>
                            test
                        </Modal>
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
        cursor: "not-allowed",
    }),
    selected: css({
        backgroundColor: "var(--grey, 0.6)",
    }),
};
