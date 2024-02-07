import { daysName } from "./styles";

interface IProps {
    day: string;
}

function WeekDays({ day }: Readonly<IProps>) {
    return <span css={daysName}>{day}</span>;
}

export default WeekDays;
