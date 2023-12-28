import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
const Portal: React.FC<PortalProps> = (props) => {
    const { children, element = document.body } = props;
    return createPortal(children, element);
};

export default Portal;
