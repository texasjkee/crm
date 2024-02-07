import { format } from "date-fns";
import { memo } from "react";
import {
    ButtonContainer,
    HeaderContainer,
    arrowDownStyle,
    arrowUpStyle,
} from "./styles";
import { Button, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../routers/routerConfig";

interface IProps {
    prevMonth: () => void;
    currentDate: number | Date;
    nextMonth: () => void;
}

export const CalendarHeader = memo(function CalendarHeader({
    prevMonth,
    currentDate,
    nextMonth,
}: IProps) {
    const headerDateFormat = "MMMM yyyy";
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <ButtonContainer>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={prevMonth}
                >
                    <span css={arrowUpStyle}>{"<"}</span>
                </Button>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={nextMonth}
                >
                    <span css={arrowDownStyle}>{">"}</span>
                </Button>
            </ButtonContainer>
            <Typography variant='h3'>
                {format(currentDate, headerDateFormat)}
            </Typography>
            <div>
                <ButtonContainer>
                    <IconButton color='primary' aria-label='add event'>
                        <AddIcon />
                    </IconButton>
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={() => {
                            navigate(RoutePath.week);
                        }}
                    >
                        Week
                    </Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={() => {
                            console.log("day");
                        }}
                    >
                        Day
                    </Button>
                </ButtonContainer>
            </div>
        </HeaderContainer>
    );
});
