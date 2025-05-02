import React from "react";
import { Link } from "react-router-dom";

import arrow from "../../../../assets/images/icons/arrow.svg";
import trash from "../../../../assets/images/icons/trash-red.svg";
import edit from "../../../../assets/images/icons/note-pencil-blue.svg";

import { ListHeader, Card } from "./styles";
import PropTypes from "prop-types";

export default function ContactsList({
    filteredContacts,
    orderBy,
    onToogleOrderBy,
    onDeleteContact,
}) {
    return (
        <>
            {filteredContacts.length > 0 && (
                <ListHeader orderBy={orderBy}>
                    <button type="button" onClick={onToogleOrderBy}>
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
                            {contact.category.name && (
                                <small>{contact.category.name}</small>
                            )}
                        </div>
                        <span>{contact.email}</span>
                        <span>{contact.phone}</span>
                    </div>
                    <div className="actions">
                        <Link to={`/edit/${contact.id}`}>
                            <img src={edit} alt="Edit Icon" width="20px"></img>
                        </Link>
                        <button
                            type="button"
                            onClick={() => onDeleteContact(contact)}
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
    );
}

ContactsList.propTypes = {
    filteredContacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            phone: PropTypes.string,
            category: PropTypes.shape({
                name: PropTypes.string,
            }),
        })
    ).isRequired,
    orderBy: PropTypes.string.isRequired,
    onToogleOrderBy: PropTypes.func.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};
