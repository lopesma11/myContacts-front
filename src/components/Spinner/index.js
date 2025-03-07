import React from "react";
import { StyledSpinner } from "./styles";
import PropTypes from "prop-types";

export default function Spinner({ size }) {
    return <StyledSpinner size={size} />;
}

Spinner.propTypes = {
    size: PropTypes.number,
};

Spinner.defaultProp = {
    size: 32,
};
