import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { useParams, useHistory } from "react-router-dom";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadContact() {
            try {
                const contactData = await ContactsService.getContactById(id);

                console.log(contactData);
                setIsLoading(false);
            } catch {
                history.push("/");
                toast({
                    type: "danger",
                    text: "Contato não encontrado!",
                });
            }
        }

        loadContact();
    }, [id, history]);

    function handleSubmit() {}

    return (
        <>
            <Loader isLoading={isLoading} />
            <PageHeader title="Editar Matheus Lopes" />
            <ContactForm
                buttonLabel="Salvar Alterações"
                onSubmit={handleSubmit}
            ></ContactForm>
        </>
    );
}
