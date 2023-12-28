import React, {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useState,
    memo,
} from "react";
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
import { DayContainer } from "./styles";
import { type TaskType } from "./Calendar";
import Task from "./Task";
import { TaskModalAsync } from "../TaskModal/TaskModalAsync";

interface IProps {
    currentDate: Date;
}
export interface DayWithTask {
    day: Date;
    tasks?: TaskType[];
}

const Cells = memo(function Cells({ currentDate }: IProps) {
    const [days, setDays] = useState<DayWithTask[]>([]);
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [isTaskModal, setIsTaskModal] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<Date>(currentDate);
    // const [number, setNumber] = useState(0);
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

    const onCloseModal = useCallback(() => {
        setIsTaskModal(false);
    }, []);

    const holdaTask = (values: Pick<TaskType, "priority" | "title">) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { id: selectedDay, priority: values.priority, title: values.title },
        ]);
    };

    const onShowModal = useCallback((day: Date) => {
        setSelectedDay(day);
        setIsTaskModal(true);
    }, []);

    const calculate = useMemo(() => {
        const result = cells.map((item) => ({
            day: item,
            tasks: tasks.filter((task) => isSameDay(new Date(task.id), item)),
        }));

        return result;
    }, [cells, tasks]);

    const checkIfSameMonth = (combinedItem: DayWithTask) => {
        return !isSameMonth(new Date(combinedItem.day), monthStart)
            ? dayStyle.disabled
            : isSameDay(combinedItem.day, new Date())
              ? dayStyle.selected
              : "";
    };

    const handleReorder = (newOrder: unknown[]) => {
        const typedTasks = newOrder as TaskType[];
        setTasks(typedTasks);
    };

    useEffect(() => {
        setDays(calculate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks, currentDate]);

    return (
        <>
            {days.map((day) => (
                <DayContainer
                    axis='y'
                    values={tasks}
                    onReorder={handleReorder}
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

            <Suspense fallback={""}>
                <TaskModalAsync
                    holdTask={holdaTask}
                    isOpen={isTaskModal}
                    onClose={onCloseModal}
                />
            </Suspense>
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
