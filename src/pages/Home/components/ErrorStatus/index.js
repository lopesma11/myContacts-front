import PropTypes from "prop-types";
import React from "react";
import { Container } from "./styles";
import sadsmile from "../../../../assets/images/icons/smiley-sad.svg";
import Button from "../../../../components/Button";

export default function ErrorStatus({ onTryAgain }) {
    return (
        <Container>
            <img src={sadsmile} alt="sad" />
            <div className="details">
                <span>Ocorreu um erro ao obter os seus contatos!</span>
                <Button type="button" onClick={onTryAgain}>
                    Tentar novamente
                </Button>
            </div>
        </Container>
    );
}

ErrorStatus.propTypes = {
    onTryAgain: PropTypes.func.isRequired,
};
