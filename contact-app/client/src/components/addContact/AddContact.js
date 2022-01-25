import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
import { addContact } from "../../redux/contacts";
import { ContactService } from "../../service/ContactService";

const AddContact = () => {
  const dispatch = useDispatch();

  const addContactHandler = (contact) => {
    ContactService.addContact(contact).then((res) => {
      const id = "id";
      dispatch(setSelectedContact(emptyContact));
      dispatch(addContact({ ...contact, [id]: res }));
      dispatch(setMenu(""));
    });
  };
  return (
    <BaseContact
      heading_text="Add New Contact"
      button_text="Save"
      rootStyle="contact-wrapper-add"
      ContactHandler={addContactHandler}
    />
  );
};

export { AddContact };
