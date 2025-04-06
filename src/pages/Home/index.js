import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Container,
    InputSearchContainer,
    Header,
    ListHeader,
    Card,
    ErrorContainer,
    EmptyListContainer,
    SearchNotFoundContainer,
} from "../Home/styles";
import arrow from "../../assets/images/icons/arrow.svg";
import trash from "../../assets/images/icons/trash-red.svg";
import edit from "../../assets/images/icons/note-pencil-blue.svg";
import sadsmile from "../../assets/images/icons/smiley-sad.svg";
import emptyBox from "../../assets/images/icons/package.svg";
import magnifyingGlass from "../../assets/images/icons/magnifying-glass.svg";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import ContactsService from "../../services/ContactsService.js";
import Modal from "../../components/Modal/";
import toast from "../../utils/toast.js";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [contactBeingDeleted, setContacBeingDeleted] = useState(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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

    function handleToogleOrderBy() {
        setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
    }

    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    function handleTryAgain() {
        loadContacts();
    }

    function handleDeleteContact(contact) {
        setContacBeingDeleted(contact);
        setIsDeleteModalVisible(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalVisible(false);
        setContacBeingDeleted(null);
    }

    async function handleConfirmDeleteContact() {
        try {
            setIsLoadingDelete(true);
            await ContactsService.deleteContact(contactBeingDeleted.id);

            setContacts((prevState) =>
                prevState.filter((contact) => {
                    contact.id !== contactBeingDeleted.id;
                })
            );

            handleCloseDeleteModal();

            toast({
                type: "success",
                text: "Contato deletado com sucesso",
            });
        } catch {
            toast({
                type: "danger",
                text: "Ocorreu um erro ao deletar o contato",
            });
        } finally {
            setIsLoadingDelete(false);
        }
    }

    return (
        <Container>
            <Loader isLoading={isLoading} />

            {isDeleteModalVisible && (
                <Modal
                    danger
                    isLoading={isLoadingDelete}
                    visible={isDeleteModalVisible}
                    title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}" ?`}
                    confirmLabel="Deletar"
                    onCancel={handleCloseDeleteModal}
                    onConfirm={handleConfirmDeleteContact}
                >
                    <p>Esta ação não poderá ser desfeita</p>
                </Modal>
            )}

            {contacts.length > 0 && (
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

                    {contacts.length > 0 && filteredContacts.length < 1 && (
                        <SearchNotFoundContainer>
                            <img
                                src={magnifyingGlass}
                                alt="Magnifier Question"
                                width="40px"
                            ></img>

                            <span>
                                Nenhum resultado foi encontrado para{" "}
                                <strong> {searchTerm} </strong>{" "}
                            </span>
                        </SearchNotFoundContainer>
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
                                <button
                                    type="button"
                                    onClick={() => handleDeleteContact(contact)}
                                >
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
