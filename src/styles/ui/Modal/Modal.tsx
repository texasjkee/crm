import React from "react";
import { css } from "@emotion/react";
import { useState, ReactNode, useRef, useEffect, useCallback } from "react";
import Portal from "../Portal/Portal";

export interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = (props): JSX.Element => {
    const { className, children, isOpen, onClose, lazy } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

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

    const overlayStyles = css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "var(--overlay-color)", // replace with your actual overlay color
    });

    const contentStyles = css({
        maxWidth: "60%",
        padding: "20px",
        background: "var(--bg-color)", // replace with your actual background color
        borderRadius: "12px",
        transform: `scale(${isClosing ? 0.2 : 1})`,
        transition: "transform 0.3s",
    });

    return (
        <Portal>
            <div
                css={css({
                    position: "fixed",
                    inset: "0",
                    zIndex: "-1",
                    opacity: "0",
                    pointerEvents: "none",
                })}
            >
                <div className={className}>
                    <div css={overlayStyles} onClick={closeHandler}>
                        <div css={contentStyles} onClick={onContentClick}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};
