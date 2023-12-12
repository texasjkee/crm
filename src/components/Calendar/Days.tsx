import { daysName } from "./styles";

interface IProps {
    day: string;
}

function Days({ day }: IProps) {
    return <span css={daysName}>{day}</span>;
}

export default Days;
