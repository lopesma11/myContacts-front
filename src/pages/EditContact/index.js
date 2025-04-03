import React, { useState, useEffect, useRef } from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { useParams, useHistory } from "react-router-dom";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast";

export default function EditContact() {
    const [isLoading, setIsLoading] = useState(true);
    const contactFormRef = useRef(null);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadContact() {
            try {
                const contact = await ContactsService.getContactById(id);

                contactFormRef.current.setFielsValues(contact);

                console.log(contact);
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
                ref={contactFormRef}
                buttonLabel="Salvar Alterações"
                onSubmit={handleSubmit}
            ></ContactForm>
        </>
    );
}
