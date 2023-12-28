import { css } from "@emotion/react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import { memo } from "react";
import { type DayWithTask } from "./Cells";

interface IProps {
    // item: Record<string, Date>;
    item: DayWithTask;
    onShowModal: (day: Date) => void;
}

const Day = memo(function Day({ item, onShowModal }: IProps) {
    const dateFormat = "d";
    return (
        <div css={addContainer}>
            <IconButton
                onClick={() => {
                    onShowModal(item.day);
                }}
                color='primary'
                aria-label='add to shopping cart'
            >
                <AddIcon />
            </IconButton>
            <div>
                <span>{format(item.day, dateFormat)}</span>
            </div>
        </div>
    );
});

export default Day;
const addContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
