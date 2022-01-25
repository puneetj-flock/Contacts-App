import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedContact } from "../../redux/selectedContact";

import "./BaseContact.css";
import { grey } from "@mui/material/colors";

const BaseContact = (props) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.selectedContact.selectedContact);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validateName = (name) => {
    return name.match(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    );
  };

  const validateContactNumber = (contactNumber) => {
    return contactNumber.match(
      /^[0-9]{15}$/
    );
  };

  const changeHandler = (prop) => {
    return (event) => {
      if (props.button_text !== "Edit") {
        dispatch(
          setSelectedContact({ ...contact, [prop]: event.target.value })
        );
      }
    };
  };

  const ContactHandler = () => {
    props.ContactHandler(contact);
  };

  return (
    <Box className={props.rootStyle} border={1} borderColor={grey[400]}>
      <Typography variant="h4" color="#575757">
        {props.heading_text}
      </Typography>
      <form onSubmit={ContactHandler}>
        <Box className="contactinfo">
          <TextField
            fullWidth
            margin="normal"
            // required
            readOnly={true}
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
            minRows={2}
            maxRows={2}
            onChange={changeHandler("address")}
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
