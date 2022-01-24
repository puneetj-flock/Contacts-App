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
  console.log("searchText 1", searchText);
  console.log("searchText 1", allContacts);
  if (searchText !== null && searchText !== "") {
    console.log("searchText 2", searchText);
    searchText = searchText.toLowerCase();
    // for (let index = 0; index < allContacts.length; index++) {
    //   const contact = allContacts[index];
    //   if (contact["name"].substring(0, searchText.length).toLowerCase() === searchText ||
    //       contact["contact"].substring(0, searchText.length) === searchText) {
    //     contactsToDisplay.push(contact);
    //   }
    // }
    // contactsToDisplay.sort(function (a, b) {
    //   // if (a["score"] === b["score"])
    //     return a["name"].toLowerCase() < b["name"].toLowerCase();
    //   // return a["score"] < b["score"];
    // });
  } else {
    console.log("searchText 3", searchText);
    for (let index = 0; index < allContacts.length; index++) {
      contactsToDisplay.push(allContacts[index]);
    }
    contactsToDisplay.sort(function (a, b) { return a["name"].toLowerCase() > b["name"].toLowerCase() });
  }

  console.log("searchText 4", contactsToDisplay);

  return (
    <div className="contact-list">{contactsToDisplay.map(contact => {
      return (<Contact key={contact.id} contact={contact} />) // TODO: alternate shading for contacts
    })}
    </div>
  );
};

export { ContactList };
