import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { memo } from "react";
import Labels from "./Labels";
import { type TaskType } from "./Calendar";
import { Reorder } from "framer-motion";

interface IProp {
    task: TaskType;
}

const Task = memo(function Task({ task }: IProp) {
    return (
        <Reorder.Item value={task}>
            <TasksContainer>
                <Labels colors={task.priority ?? []} />
                <span>{task.title}</span>
            </TasksContainer>
        </Reorder.Item>
    );
});

export default Task;

const TasksContainer = styled(Paper)`
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px 10px;
    margin-bottom: 5px;
    & span {
        text-align: left;
    }
`;
