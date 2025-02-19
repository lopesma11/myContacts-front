import React from "react";
import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";

export default function EditContact() {
    return (
        <>
            <PageHeader title="Editar Matheus Lopes" />
            <ContactForm buttonLabel="Salvar Alterações"></ContactForm>
        </>
    );
}
