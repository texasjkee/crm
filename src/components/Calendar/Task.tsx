import { AccordionDetails, AccordionSummary, Checkbox } from "@mui/material";
import { memo } from "react";
import { EventType } from "../../store/slices/events/types";
import { format, parseISO } from "date-fns";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IProp {
    task: EventType;
}

const Task = memo(function Task({ task }: IProp) {
    const { name, id, date, isDone, price } = task;
    const formattedDate = format(parseISO(date), "MM/dd/yyyy");
    return (
        <Accordion key={id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
            >
                <span>Nikname: {name}</span>
                <Checkbox aria-label='complete' value={isDone} />
            </AccordionSummary>
            <AccordionDetails>
                <span>{formattedDate}</span>
                <span>{price}</span>
            </AccordionDetails>
        </Accordion>
    );
});

export default Task;

// const TasksContainer = styled(Paper)`
//     display: flex;
//     flex-direction: column;
//     padding: 0 10px 10px 10px;
//     margin-bottom: 5px;
//     & span {
//         text-align: left;
//     }
// `;
