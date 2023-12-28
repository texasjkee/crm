import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface SnackBarProps {
    isOpen: boolean;
    // setOpen: () => void;
    message: string;
}

export default function SnackBar({ isOpen, message }: SnackBarProps) {
    const [open, setOpen] = React.useState(false);
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(isOpen);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    );
}
