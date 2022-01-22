import React from "react";
import { Contact } from "../contact/Contact";

import "./ContactsList.css";

const ContactsList = (props) => {
    return (
      <div className="contacts-list">
        {props.contacts.map(contact => {
            return (<div  onClick={() => props.setContact(contact)}><Contact contact={contact}/> </div>)
        })}
        </div>
    );
};

export { ContactsList };
