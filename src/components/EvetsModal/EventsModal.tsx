import { Suspense, memo } from "react";
import { Modal, ModalSize } from "../common/ui/Modal/Modal";
import { EventsFormAsync } from "../EventsForm/EventsFormAsync";
import Loader from "../Loader/Loader";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}
const title = "Add events";
const EventsModal = memo(function EventsModal(props: IProps) {
    const { isOpen, onClose } = props;
    console.log("Events modal rendered");

    return (
        <Modal
            title={title}
            width={ModalSize.SMALL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<Loader />}>
                <EventsFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
});

export default EventsModal;
