import { useEffect, useState, useMemo, useCallback } from "react";
import ContactsService from "../../services/ContactsService.js";
import toast from "../../utils/toast.js";

export default function useHome() {
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
            setContacts([]);
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

    return {
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
    };
}
