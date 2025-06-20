import React, { useState, useEffect } from "react";
import { Overlay, Container, Footer } from "./styles";
import Button from "../Button";
import PropTypes from "prop-types";
import ReactPortal from "../ReactPortal";

export default function Modal({
    danger,
    visible,
    isLoading,
    title,
    children,
    cancelLabel,
    confirmLabel,
    onCancel,
    onConfirm,
}) {
    const [shouldRender, setShouldRender] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
        }

        let timeoutId;

        if (!visible) {
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [visible]);

    if (!shouldRender) {
        return null;
    }

    let container = document.getElementById("modal-root");

    if (!container) {
        container = document.createElement("div");
        container.setAttribute("id", "modal-root");
        document.body.appendChild(container);
    }

    return (
        <ReactPortal containerId="modal-root">
            <Overlay isLeaving={!visible}>
                <Container danger={danger} isLeaving={!visible}>
                    <h1>{title}</h1>
                    <div className="modal-body">{children}</div>
                    <Footer>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onCancel}
                            disabled
                        >
                            {cancelLabel}
                        </button>
                        <Button
                            type="button"
                            danger={danger}
                            onClick={onConfirm}
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            {confirmLabel}
                        </Button>
                    </Footer>
                </Container>
            </Overlay>
        </ReactPortal>
    );
}

Modal.propTypes = {
    danger: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
    danger: false,
    isLoading: false,
    cancelLabel: "Cancelar",
    confirmLabel: "Confirmar",
};
