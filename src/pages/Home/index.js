import React from "react";
import {
    Container,
    InputSearchContainer,
    Header,
    ListContainer,
    Card,
} from "../Home/styles";
import arrow from "../../assets/images/icons/arrow.svg";
import trash from "../../assets/images/icons/trash-red.svg";
import edit from "../../assets/images/icons/note-pencil-blue.svg";
import { Link } from "react-router-dom";
// import Modal from "../../components/Modal";
// import Loader from "../../components/Loader";

export default function Home() {
    return (
        <Container>
            {/* <Modal danger /> */}

            {/* <Loader /> */}
            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome..."></input>
            </InputSearchContainer>
            <Header>
                <strong>3 Contatos</strong>
                <Link to="/new">Novo Contato</Link>
            </Header>
            <ListContainer>
                <header>
                    <button type="button" className="sort-button">
                        <span>Nome</span>
                        <img src={arrow} alt="Arrow" width="24px" />
                    </button>
                </header>
                <Card>
                    <div className="info">
                        <div className="contact-name">
                            <strong>Matheus Lopes</strong>
                            <small>instagram</small>
                        </div>
                        <span>matheuslopes@email.com</span>
                        <span>(19)98765-4321</span>
                    </div>
                    <div className="actions">
                        <Link to="/edit/123">
                            <img src={edit} alt="Edit Icon" width="20px"></img>
                        </Link>
                        <button onClick={() => {}}>
                            <img
                                src={trash}
                                alt="Delete Icon"
                                width="20px"
                            ></img>
                        </button>
                    </div>
                </Card>
            </ListContainer>
        </Container>
    );
}
