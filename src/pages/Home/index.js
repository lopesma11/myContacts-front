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

export default function Home() {
    return (
        <Container>
            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome..."></input>
            </InputSearchContainer>
            <Header>
                <strong>3 Contatos</strong>
                <a href="">Novo Contato</a>
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
                        <a href="/">
                            <img src={edit} alt="Edit Icon" width="20px"></img>
                        </a>
                        <button onClick={() => {}}>
                            <img
                                src={trash}
                                alt="Delete Icon"
                                width="20px"
                            ></img>
                        </button>
                    </div>
                </Card>

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
                        <a href="/">
                            <img src={edit} alt="Edit Icon" width="20px"></img>
                        </a>
                        <button onClick={() => {}}>
                            <img
                                src={trash}
                                alt="Delete Icon"
                                width="20px"
                            ></img>
                        </button>
                    </div>
                </Card>

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
                        <a href="/">
                            <img src={edit} alt="Edit Icon" width="20px"></img>
                        </a>
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
