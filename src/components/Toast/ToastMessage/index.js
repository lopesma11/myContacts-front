import React from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import xCircleIcon from "../../../assets/images/icons/x-circle.svg";

export default function ToastMessage({ text, type }) {
    return (
        <Container type={type}>
            {type === "danger" && <img src={xCircleIcon} alt="xCircleIcon" />}
            {type === "success" && (
                <img src={checkCircleIcon} alt="checkCircleIcon" />
            )}
            <strong>{text}</strong>
        </Container>
    );
}

ToastMessage.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["default", "success", "danger"]),
};

ToastMessage.defaultProps = {
    type: "default",
};
