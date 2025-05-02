import React from "react";
import { Container } from "./styles";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";
import PropTypes from "prop-types";

export default function SearchNotFound({ searchTerm }) {
    return (
        <Container>
            <img
                src={magnifyingGlass}
                alt="Magnifier Question"
                width="40px"
            ></img>

            <span>
                Nenhum resultado foi encontrado para{" "}
                <strong> {searchTerm} </strong>{" "}
            </span>
        </Container>
    );
}

SearchNotFound.propTypes = {
    searchTerm: PropTypes.string.isRequired,
};
