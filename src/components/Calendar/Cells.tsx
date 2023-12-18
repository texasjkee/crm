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
import { css } from "@emotion/react";
import { Day } from "./styles";
import Icon from "./../../assets/svg/disabled.svg";
import { Task } from "./Calendar";
import Labels from "./Labels";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Paper } from "@mui/material";

interface IProps {
    currentDate: number | Date;
    onShowModal: (day: Date) => void;
    tasks: Task[];
}
const Cells = memo(function Cells({ currentDate, onShowModal, tasks }: IProps) {
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
                    <div css={addContainer}>
                        <IconButton
                            onClick={() => onShowModal(item.day)}
                            color='primary'
                            aria-label='add to shopping cart'
                        >
                            <AddIcon />
                        </IconButton>
                        <div>
                            <span>{format(item.day, dateFormat)}</span>
                        </div>
                    </div>

                    {!!tasks &&
                        tasks.map((task, index) => {
                            if (isSameDay(new Date(task.id), item.day)) {
                                return (
                                    <TasksContainer key={index}>
                                        <Labels colors={task.priority ?? []} />
                                        <span>{task.title}</span>
                                    </TasksContainer>
                                );
                            }
                            return null;
                        })}
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
const TasksContainer = styled(Paper)`
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px 10px;
    margin-bottom: 5px;
    & span {
        text-align: left;
    }
`;
const addContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
