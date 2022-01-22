import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { setMenu } from "../../redux/menu";
import { useDispatch, useSelector } from "react-redux";

import "./AddContact.css";
import { addContact } from "../../api/Index";
import { ADD_CONTACT } from "../../api/contants";
import { ApiManager } from "../../api/Index";
const AddContact = () => {
  const sessionToken = useSelector((state) => state.sessionToken.token);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const changeHandler = (prop) => {
    return (event) => {
      setContactInfo({ ...contactInfo, [prop]: event.target.value });
    };
  };
  const addContactHandler = () => {
    if (
      validateEmail(contactInfo.email) &&
      contactInfo.name !== "" &&
      contactInfo.contact !== ""
    ) {
      const apiManager = new ApiManager();
      console.log(contactInfo);
      apiManager.addContact(contactInfo);
    } else {
      alert("Please Enter correct values");
    }
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
            onChange={changeHandler("name")}
          />
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Contact Number"
            onChange={changeHandler("contact")}
          />
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Email Id"
            onChange={changeHandler("email")}
          />
          <TextField
            margin="normal"
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
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
