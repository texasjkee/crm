import { Checkbox, styled } from "@mui/material";
import { memo } from "react";
import { EventType } from "../../store/slices/events/types";
import { format, parseISO } from "date-fns";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
interface IProp {
    task: EventType;
}

const Task = memo(function Task({ task }: IProp) {
    const { name, id, date, isDone, price } = task;

    const formattedDate = format(parseISO(date), "HH:mm");
    return (
        <Title key={id}>
            <DeleteIcon />
            <span>{name}</span>
            <span>{formattedDate}</span>
            <span>{price}</span>
            <Checkbox value={isDone} />
        </Title>
    );
});

export default Task;

const Title = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--blue);
    border-radius: 8px;
    padding: 0px 5px 0px;
    margin-top: 2px;
`;

const DeleteIcon = styled(DeleteOutlineIcon)`
    color: var(--red);
`;
