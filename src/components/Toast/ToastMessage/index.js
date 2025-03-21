import React, { useEffect } from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import xCircleIcon from "../../../assets/images/icons/x-circle.svg";

export default function ToastMessage({ onRemoveMessage, message }) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onRemoveMessage(message.id);
        }, message.duration || 7000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [message, onRemoveMessage]);

    function handleRemoveToast() {
        onRemoveMessage(message.id);
    }

    return (
        <Container
            type={message.type}
            onClick={handleRemoveToast}
            tabIndex={0}
            role="button"
        >
            {message.type === "danger" && (
                <img src={xCircleIcon} alt="xCircleIcon" />
            )}
            {message.type === "success" && (
                <img src={checkCircleIcon} alt="checkCircleIcon" />
            )}
            <strong>{message.text}</strong>
        </Container>
    );
}

ToastMessage.propTypes = {
    onRemoveMessage: PropTypes.func.isRequired,
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["default", "success", "danger"]),
        duration: PropTypes.number,
    }),
};
