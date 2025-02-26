import React, { useEffect, useState, useMemo } from "react";
import {
    Container,
    InputSearchContainer,
    Header,
    ListHeader,
    Card,
} from "../Home/styles";
import arrow from "../../assets/images/icons/arrow.svg";
import trash from "../../assets/images/icons/trash-red.svg";
import edit from "../../assets/images/icons/note-pencil-blue.svg";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import delay from "../../utils/delay.js";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const filteredContacts = useMemo(
        () =>
            contacts.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [contacts, searchTerm]
    );

    useEffect(() => {
        async function loadContacts() {
            try {
                setIsLoading(true);

                const response = await fetch(
                    `http://localhost:3001/contacts?orderBy=${orderBy}`
                );

                await delay(500);

                const json = await response.json();
                setContacts(json);
            } catch (error) {
                console.log("error", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadContacts();
    }, [orderBy]);

    const handleToogleOrderBy = () => {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    };

    const handleChangeSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Container>
            <Loader isLoading={isLoading} />
            <InputSearchContainer>
                <input
                    value={searchTerm}
                    type="text"
                    placeholder="Pesquise pelo nome..."
                    onChange={handleChangeSearchTerm}
                ></input>
            </InputSearchContainer>
            <Header>
                <strong>
                    {filteredContacts.length}
                    {filteredContacts.length === 1 ? " contato" : " contatos"}
                </strong>
                <Link to="/new">Novo Contato</Link>
            </Header>

            {filteredContacts.length > 0 && (
                <ListHeader orderBy={orderBy}>
                    <button type="button" onClick={handleToogleOrderBy}>
                        <span>Nome</span>
                        <img src={arrow} alt="Arrow" width="24px" />
                    </button>
                </ListHeader>
            )}

            {filteredContacts.map((contact) => (
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
