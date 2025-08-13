import React from "react";
import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import useToastContainer from "./useToastContainer";

export default function ToastContainer() {
    const {
        items: messages,
        handleRemoveMessage,
        pendingRemovalMessagesIds,
        handleAnimationEnd,
        renderList,
    } = useToastContainer();

    return (
        <Container>
            {renderList((message) => (
                <ToastMessage
                    key={message.id}
                    message={message}
                    onRemoveMessage={handleRemoveMessage}
                    isLeaving={pendingRemovalMessagesIds.includes(message.id)}
                    onAnimationEnd={handleAnimationEnd}
                />
            ))}
        </Container>
    );
}
