import React from "react";

import { BaseContact } from "../baseContact/BaseContact";

// import "./AddContact.css"

const AddContact = (props) => {
  return (
    <BaseContact {...props} heading_text="Add New Contact" button_text="Save" rootStyle="contact-wrapper-1"/>
  )
};

export { AddContact };