import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Container,
    InputSearchContainer,
    Header,
    ListHeader,
    Card,
    ErrorContainer,
    EmptyListContainer,
} from "../Home/styles";
import arrow from "../../assets/images/icons/arrow.svg";
import trash from "../../assets/images/icons/trash-red.svg";
import edit from "../../assets/images/icons/note-pencil-blue.svg";
import sadsmile from "../../assets/images/icons/smiley-sad.svg";
import emptyBox from "../../assets/images/icons/package.svg";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Button from "../../components/Button.js";
import ContactsService from "../../services/ContactsService.js";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const filteredContacts = useMemo(
        () =>
            contacts.filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [contacts, searchTerm]
    );

    const loadContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const contactsList = await ContactsService.listContacts(orderBy);

            setHasError(false);
            setContacts(contactsList);
        } catch (error) {
            console.log("Caiu no catch", error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    const handleToogleOrderBy = () => {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    };

    const handleChangeSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTryAgain = () => {
        loadContacts();
    };

    return (
        <Container>
            <Loader isLoading={isLoading} />

            {contacts.length >
            (
                <InputSearchContainer>
                    <input
                        value={searchTerm}
                        type="text"
                        placeholder="Pesquise pelo nome..."
                        onChange={handleChangeSearchTerm}
                    ></input>
                </InputSearchContainer>
            )}

            <Header
                justifyContent={
                    hasError
                        ? "flex-end"
                        : contacts.length > 0
                        ? "space-between"
                        : "center"
                }
            >
                {!hasError && contacts.length > 0 && (
                    <strong>
                        {filteredContacts.length}
                        {filteredContacts.length === 1
                            ? " contato"
                            : " contatos"}
                    </strong>
                )}
                <Link to="/new">Novo Contato</Link>
            </Header>

            {hasError && (
                <ErrorContainer>
                    <img src={sadsmile} alt="sad" />
                    <div className="details">
                        <span>Ocorreu um erro ao obter os seus contatos!</span>
                        <Button type="button" onClick={handleTryAgain}>
                            Tentar novamente
                        </Button>
                    </div>
                </ErrorContainer>
            )}

            {!hasError && (
                <>
                    {contacts.length < 1 && !isLoading && (
                        <EmptyListContainer>
                            <img src={emptyBox} alt="Empty Box" width="100px" />
                            <p>
                                Você ainda não tem nenhum contato cadastrado
                                Clique no botão <strong>Novo Contato</strong>
                                acima para cadastrar o seu primeiro!
                            </p>
                        </EmptyListContainer>
                    )}
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
                                    <img
                                        src={edit}
                                        alt="Edit Icon"
                                        width="20px"
                                    ></img>
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
                </>
            )}
        </Container>
    );
}
