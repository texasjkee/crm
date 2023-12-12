import { format } from "date-fns";
import { memo } from "react";
import { ButtonGray } from "../../styles/ui";
import {
    ButtonContainer,
    HeaderContainer,
    arrowDownStyle,
    arrowUpStyle,
} from "./styles";

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
                <ButtonGray onClick={prevMonth}>
                    <span css={arrowUpStyle}>{"<"}</span>
                </ButtonGray>
                <ButtonGray onClick={nextMonth}>
                    <span css={arrowDownStyle}>{">"}</span>
                </ButtonGray>
            </ButtonContainer>
            <h5>{format(currentDate, headerDateFormat)}</h5>
            <div>
                <ButtonContainer>
                    <ButtonGray onClick={() => console.log("week")}>
                        Week
                    </ButtonGray>
                    <ButtonGray onClick={() => console.log("day")}>
                        Day
                    </ButtonGray>
                </ButtonContainer>
            </div>
        </HeaderContainer>
    );
});
