import React from "react";
import { Container } from "../Home/styles";
import Loader from "../../components/Loader";
import useHome from "./useHome.js";
import InputSearch from "./components/InputSearch/index.js";
import Header from "./components/Header/index.js";
import ErrorStatus from "./components/ErrorStatus/index.js";
import EmptyList from "./components/EmptyList/index.js";
import SearchNotFound from "./components/SearchNotFound/index.js";
import ContactsList from "./components/ContactsList/index.js";
import Modal from "../../components/Modal/";

export default function Home() {
    const {
        isLoading,
        isLoadingDelete,
        isDeleteModalVisible,
        handleCloseDeleteModal,
        handleConfirmDeleteContact,
        contacts,
        searchTerm,
        handleChangeSearchTerm,
        hasError,
        filteredContacts,
        orderBy,
        handleToogleOrderBy,
        handleDeleteContact,
        contactBeingDeleted,
        handleTryAgain,
    } = useHome();

    const hasContacts = contacts.length > 0;
    const isListEmpty = !hasError && !isLoading && !hasContacts;
    const isSearchEmpty =
        !hasError && hasContacts && filteredContacts.length < 1;

    return (
        <Container>
            <Loader isLoading={isLoading} />

            {hasContacts && (
                <InputSearch
                    value={searchTerm}
                    onChange={handleChangeSearchTerm}
                />
            )}

            <Header
                hasError={hasError}
                qtyOfContacts={contacts.length}
                qtyOfFilteredContacts={filteredContacts.length}
            />

            {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
            {isListEmpty && <EmptyList />}
            {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

            {hasContacts && (
                <>
                    <ContactsList
                        filteredContacts={filteredContacts}
                        orderBy={orderBy}
                        onToogleOrderBy={handleToogleOrderBy}
                        onDeleteContact={handleDeleteContact}
                    />
                    <Modal
                        danger
                        isLoading={isLoadingDelete}
                        visible={isDeleteModalVisible}
                        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}" ?`}
                        confirmLabel="Deletar"
                        onCancel={handleCloseDeleteModal}
                        onConfirm={handleConfirmDeleteContact}
                    ></Modal>
                </>
            )}
        </Container>
    );
}
