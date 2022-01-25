import React from "react";
import { Contact } from "../contact/Contact";
import { useSelector, useDispatch } from "react-redux";

import "./ContactList.css";
import { setSelectedContact } from "../../redux/selectedContact";
import { setMenu } from "../../redux/menu";
import { emptyContact } from "../mainContent/MainContent";

const ContactList = () => {
  const allContacts = useSelector((state) => state.contacts.contacts);
  let searchText = useSelector((state) => state.searchText.searchText);
  let contactsToDisplay = [];

  if (searchText !== "") {
    searchText = searchText.toLowerCase();
    for (let index = 0; index < allContacts.length; index++) {
      const contact = allContacts[index];
      if (
        contact.name.substring(0, searchText.length).toLowerCase() ===
        searchText
      ) {
        contactsToDisplay.push(contact);
      }
    }
    contactsToDisplay.sort(function (a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return a.name.toLowerCase() < b.name.toLowerCase();
    });
  } else {
    for (let index = 0; index < allContacts.length; index++) {
      contactsToDisplay.push(allContacts[index]);
    }
    contactsToDisplay.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="contact-list">
      {contactsToDisplay.map((contact) => {
        return <Contact key={contact.id} contact={contact} />; // TODO: alternate shading for contacts
      })}
    </div>
  );
};

export { ContactList };
