import React from "react";
import { Container } from "./styles";
import emptyBox from "../../../../assets/images/icons/package.svg";

export default function EmptyList() {
    return (
        <Container>
            <img src={emptyBox} alt="Empty Box" width="100px" />
            <p>
                Você ainda não tem nenhum contato cadastrado Clique no botão{" "}
                <strong>Novo Contato</strong>
                acima para cadastrar o seu primeiro!
            </p>
        </Container>
    );
}
