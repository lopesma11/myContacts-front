import React, { useEffect, useState } from "react";
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
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/contacts")
            .then(async (response) => {
                const json = await response.json();
                console.log("response", response);
                json.forEach((contact) => {
                    console.log("contactName", contact.name);
                });
                setContacts(json);
            })
            .catch((error) => {
                console.log("erro", error);
            });
    }, []);
    return (
        <Container>
            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome..."></input>
            </InputSearchContainer>
            <Header>
                <strong>
                    {contacts.length}
                    {contacts.length === 1 ? " contato" : " contatos"}
                </strong>
                <Link to="/new">Novo Contato</Link>
            </Header>
            <ListContainer>
                <header>
                    <button type="button" className="sort-button">
                        <span>Nome</span>
                        <img src={arrow} alt="Arrow" width="24px" />
                    </button>
                </header>
            </ListContainer>

            {contacts.map((contact) => (
                <Card key={contact.id}>
                    <div className="info">
                        <div className="contact-name">
                            <strong>{contact.name}</strong>
                            {contact.category_name && (
                                <small>{contact.category_name}</small>
                            )}
                        </div>
                        <span>{contact.email}</span>
                        <span>{contact.phone}</span>
                    </div>
                    <div className="actions">
                        <Link to={`/edit/${contact.id}`}>
                            <img src={edit} alt="Edit Icon" width="20px"></img>
                        </Link>
                        <button>
                            <img
                                src={trash}
                                alt="Delete Icon"
                                width="20px"
                            ></img>
                        </button>
                    </div>
                </Card>
            ))}
        </Container>
    );
}
