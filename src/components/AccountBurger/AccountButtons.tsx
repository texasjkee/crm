import * as React from "react";
import { User } from "../../store/slices/login/types/user";
import { Button } from "@mui/base";

interface IProps {
    authData: User | undefined;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
}

const AccountButtons = ({ authData, handleClick, open }: IProps) => {
    return (
        <>
            {authData?.token && (
                <Button
                    id='basic-button'
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    {" "}
                    Account
                </Button>
            )}
        </>
    );
};

export default AccountButtons;
