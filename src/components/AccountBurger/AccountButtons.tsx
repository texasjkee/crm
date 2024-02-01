import * as React from "react";
import { ButtonWhite } from "../../styles/ui/buttons/buttons";

interface IProps {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
}

const AccountButtons = ({ handleClick, open }: IProps) => {
    return (
        <ButtonWhite
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
        >
            Account
        </ButtonWhite>
    );
};

export default AccountButtons;
