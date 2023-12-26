import * as React from "react";
import { type ReactNode } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "60%",
    padding: "20px",
    background: "var(--primary-dark-white)",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
};

export enum ModalSize {
    SMALL = "30%",
    MEDIUM = "60%",
    LARGE = "80%",
}

export interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    width?: ModalSize;
    lazy?: boolean;
}

export default function MUIModal(props: ModalProps) {
    const { children, isOpen, onClose, width, lazy } = props;
    const [isMounted, setIsMounted] = React.useState(false);

    const customStyle = {
        ...style,
        maxWidth: width || style.maxWidth,
    };

    React.useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    if (lazy && !isMounted) {
        return <></>;
    }

    return (
        <div>
            <Modal keepMounted open={isOpen ?? false} onClose={onClose}>
                <Box sx={customStyle}>
                    <IconButton
                        aria-label='close'
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
