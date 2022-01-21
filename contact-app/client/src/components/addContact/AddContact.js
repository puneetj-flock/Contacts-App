import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { setMenu } from "../../redux/menu";
import { useDispatch, useSelector } from "react-redux";

import "./AddContact.css";
import { addContact } from "../../api/Index";
import { ADD_CONTACT } from "../../api/contants";

const AddContact = () => {
  const sessionToken = useSelector((state) => state.sessionToken.token);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  const changeHandler = (prop) => {
    return (event) => {
      setContactInfo({ ...contactInfo, [prop]: event.target.value });
    };
  };
  const addContactHandler = () => {
    console.log(contactInfo);
    addContact(ADD_CONTACT, sessionToken, contactInfo);
  };
  return (
    <div className="addcontact-wrapper">
      <form>
        <div className="contactinfo">
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Name"
            defaultValue="Name"
            onChange={changeHandler("name")}
          />
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Contact Number"
            defaultValue="Contact Number"
            onChange={changeHandler("contact")}
          />
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Email Id"
            defaultValue="Email Id"
            onChange={changeHandler("email")}
          />
          <TextField
            margin="normal"
            required
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            defaultValue="Address"
            onChange={changeHandler("address")}
          />
        </div>
        <div className="contact-add">
          <Button type="submit" variant="outlined" onClick={addContactHandler}>
            Add Contact
          </Button>
        </div>
      </form>
    </div>
  );
};

export { AddContact };
