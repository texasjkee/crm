import { format } from "date-fns";
import { memo } from "react";
import {
    ButtonContainer,
    HeaderContainer,
    arrowDownStyle,
    arrowUpStyle,
} from "./styles";
import { Button, Typography } from "@mui/material";

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
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={() => {
                            console.log("week");
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
