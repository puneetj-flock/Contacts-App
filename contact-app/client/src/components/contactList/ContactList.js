import React from "react";
import { Contact } from "../contact/Contact";
import { useSelector, useDispatch } from "react-redux";

import "./ContactList.css";

const ContactList = () => {
  const allContacts = useSelector((state) => state.contacts.contacts);
  const searchText = useSelector((state) => state.searchText.searchText);
  let contactsToDisplay = [];
  if (searchText) {
    for (let index = 0; index < allContacts.length; index++) {
      const contact = allContacts[index];
      if (contact["name"].substring(0, searchText.length).toLowerCase() === searchText) {
        contactsToDisplay.push(contact);
      }
    }
  } else {
    for (let index = 0; index < allContacts.length; index++) {
      contactsToDisplay.push(allContacts[index]);
    }
  }
  contactsToDisplay.sort(function (a, b) { return a["name"] > b["name"] });
  return (
    <div className="contact-list">{contactsToDisplay.map(contact => {
      return (<Contact key={contact.id} contact={contact} />) // TODO: alternate shading for contacts
    })}
    </div>
  );
};

export { ContactList };
