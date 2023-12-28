import * as React from "react";
import { type ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "60%",
    background: "var(--primary-dark-white)",
    borderRadius: "12px",
    boxShadow: 24,
    p: 2,
};

export enum ModalSize {
    SMALL = "300px",
    MEDIUM = "500px",
    LARGE = "800px",
}

export interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    width?: ModalSize;
    lazy?: boolean;
    title: string;
}

export default function Modal(props: ModalProps) {
    const { children, isOpen, onClose, width, title } = props;

    const customStyle = {
        maxWidth: width ?? style.maxWidth,
    };

    return (
        <>
            <Dialog
                open={isOpen ?? false}
                onClose={onClose}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={customStyle} dividers>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}

// const IconContainer = styled("div")`
//     margin-bottom: 10px;
//     height: auto;
//     float: right;
// `;
