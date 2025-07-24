import React, { useEffect, useRef } from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import xCircleIcon from "../../../assets/images/icons/x-circle.svg";

export default function ToastMessage({
    onRemoveMessage,
    message,
    isLeaving,
    onAnimationEnd,
}) {
    const animatedElementRef = useRef(null);

    useEffect(() => {
        function handleAnimationEnd() {
            onAnimationEnd(message.id);
        }

        const elementRef = animatedElementRef.current;
        if (isLeaving) {
            elementRef.addEventListener("animationEnd", handleAnimationEnd);
        }

        return () => {
            elementRef.removeEventListener("animationEnd", handleAnimationEnd);
        };
    }, [isLeaving, message.id, onAnimationEnd]);

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
            isLeaving={isLeaving}
            ref={animatedElementRef}
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
    isLeaving: PropTypes.bool.isRequired,
    onAnimationEnd: PropTypes.func.isRequired,
};
