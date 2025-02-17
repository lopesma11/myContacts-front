import React from "react";
import { Container, InputSearchContainer } from "./styles";
import logo from "../../assets/images/logo.png";

export default function Header() {
    return (
        <Container>
            <img src={logo} alt="MyContacts" width="201px"></img>
            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome..."></input>
            </InputSearchContainer>
        </Container>
    );
}
