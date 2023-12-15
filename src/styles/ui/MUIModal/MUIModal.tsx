import * as React from "react";
import { type ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

export interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function MUIModal(props: ModalProps) {
    const { children, isOpen, onClose } = props;

    return (
        <div>
            <Modal
                keepMounted
                open={isOpen ?? false}
                onClose={onClose}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
            >
                <Box sx={style}>{children}</Box>
            </Modal>
        </div>
    );
}
