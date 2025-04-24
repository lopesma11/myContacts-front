import React from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";

export default function InputSearch({ value, onChange }) {
    return (
        <Container>
            <input
                value={value}
                type="text"
                placeholder="Pesquise pelo nome..."
                onChange={onChange}
            ></input>
        </Container>
    );
}

InputSearch.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
