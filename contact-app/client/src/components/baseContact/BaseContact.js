import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import "./BaseContact.css";
import { grey } from "@mui/material/colors";

const BaseContact = (props) => {
  const [contact, setContact] = useState(useSelector((state) => state.selectedContact.selectedContact));

  const validateEmail = (email) => {
    return true;
    // return email.match(
    //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    // TODO: 
  };

  const changeHandler = (prop) => {
    return (event) => {
      setContact({ ...contact, [prop]: event.target.value });
    };
  };

  const ContactHandler = () => {
    if (validateEmail(contact.email) && contact.name !== "") {
      props.ContactHandler(contact);
    } else {
      alert("Please Enter correct values");
    }
  };

  return (
    <Box className={props.rootStyle} border={1} borderColor={grey[400]}>
      <Typography variant="h3" color="#575757">{props.heading_text}</Typography>
      <form onSubmit={ContactHandler}>
        <Box className="contactinfo">
          <TextField
            fullWidth
            margin="normal"
            // required
            readOnly = {true}
            id="outlined-required"
            label="Name"
            // defaultValue="Name"
            value={contact.name}
            onChange={changeHandler("name")}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-required"
            label="Contact Number"
            value={contact.contact}
            onChange={changeHandler("contact")}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-required"
            label="Email Id"
            value={contact.email}
            // defaultValue="Email Id"
            onChange={changeHandler("email")}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-multiline-flexible"
            label="Address"
            value={contact.address}
            multiline
            maxRows={4}
            onChange={changeHandler("address") }
            // defaultValue="Address"
          />
        </Box>
        <Box className="contact-add">
          <Button id="base-contact-button" type="submit" variant="contained">
            {props.button_text}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export { BaseContact };