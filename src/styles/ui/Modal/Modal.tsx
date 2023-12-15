import React from "react";
import {
    useState,
    type ReactNode,
    useRef,
    useEffect,
    useCallback,
} from "react";
// import Portal from "../Portal/Portal";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = (props): JSX.Element => {
    const { children, isOpen, onClose, lazy } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    console.log(isClosing, "isclosing");
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback((): void => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);
    const onContentClick = (e: React.MouseEvent): void => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback(
        (e: KeyboardEvent): void => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (lazy && !isMounted) {
        return <></>;
    }

    const addStyles = () =>
        isOpen ? cls.opened : isClosing ? cls.isClosing : "";
    return (
        // <Portal>
        <ModalContainer css={addStyles}>
            <div css={cls.overlay} onClick={closeHandler}>
                <div css={cls.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </ModalContainer>
        // </Portal>
    );
};

const cls = {
    overlay: css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "var(--overlay-color)",
    }),
    content: css({
        maxWidth: "60%",
        padding: "20px",
        background: "var(--primary-dark-white)",
        borderRadius: "12px",
        transform: "scale(0.5)",
        transition: "0.3s transform",
    }),
    opened: css({
        zIndex: "var(--modal-z-index)",
        opacity: "1",
        pointerEvents: "auto",
        "& .content": {
            transform: "scale(1)",
        },
    }),
    isClosing: css({
        "& .content": {
            transform: "scale(0.2)",
        },
    }),
};
const ModalContainer = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
`;
