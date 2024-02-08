import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns";

import { css } from "@emotion/react";
import Icon from "./../../assets/svg/disabled.svg";
import Day from "./Day";
import Task from "./Task";
import { AppThunkDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { eventAction } from "../../store/slices/events/eventSlice";
import { getEvents } from "../../store/slices/events/selectors/getEvents";
import { EventType } from "../../store/slices/events/types";
import { DayContainer } from "./styles";

interface IProps {
    currentDate: Date;
}
export interface DayWithTask {
    day: Date;
    tasks?: EventType[];
}

const Cells = memo(function Cells({ currentDate }: IProps) {
    const [days, setDays] = useState<DayWithTask[]>([]);
    const tasks = useSelector(getEvents);
    const dispatch = useDispatch<AppThunkDispatch>();
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startOfCalendar = startOfWeek(monthStart, {
        weekStartsOn: 0,
    });
    const endOfCalendar = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const cells = eachDayOfInterval({
        start: startOfCalendar,
        end: endOfCalendar,
    });

    const onShowModal = useCallback(
        (day: string) => {
            dispatch(eventAction.setSelectedDay(day));
        },
        [dispatch]
    );

    const calculate = useMemo(() => {
        const result = cells.map((item) => ({
            day: item,
            tasks: tasks.filter((task) => isSameDay(new Date(task.date), item)),
        }));

        return result;
    }, [cells, tasks]);

    const checkIfSameMonth = (combinedItem: DayWithTask) => {
        if (!isSameMonth(new Date(combinedItem.day), monthStart)) {
            return dayStyle.disabled;
        }
        return isSameDay(combinedItem.day, new Date()) ? dayStyle.selected : "";
    };

    useEffect(() => {
        return setDays(calculate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks, currentDate]);

    return (
        <>
            {days.map((day) => (
                <DayContainer
                    css={checkIfSameMonth(day)}
                    key={day.day.toString()}
                >
                    <Day item={day} onShowModal={onShowModal} />
                    {!!day.tasks &&
                        day.tasks.map((task, index) => (
                            <Task key={index} task={task} />
                        ))}
                </DayContainer>
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
