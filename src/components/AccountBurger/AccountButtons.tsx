import * as React from "react";
import { Button } from "@mui/base";

interface IProps {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
}

const AccountButtons = ({ handleClick, open }: IProps) => {
    return (
        <Button
            id='basic-button'
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
        >
            Account
        </Button>
    );
};

export default AccountButtons;
