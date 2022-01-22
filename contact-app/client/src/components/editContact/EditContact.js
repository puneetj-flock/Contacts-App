import React from "react";

import { BaseContact } from "../baseContact/BaseContact";

// import "./EditContact.css";

const EditContact = (props) => {
  return (
    <BaseContact {...props} heading_text="Edit Contact" button_text="Save" rootStyle="contact-wrapper-2"/>
  )
};

export { EditContact };