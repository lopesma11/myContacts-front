import React from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

export default function NewContact() {
    return (
        <>
            <PageHeader title="Novo Contato" />
            <Input type="text" placeholder="Nome" />
            <Select>
                <option value={123}>Instagram</option>
            </Select>
            <Button type="button"> Salvar Alterações </Button>
        </>
    );
}
