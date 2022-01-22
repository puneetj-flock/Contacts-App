import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

import "./BaseContact.css";
import { grey } from "@mui/material/colors";

const BaseContact = (props) => {
  console.log(props);
  const [name, setName] = useState(props.contact.name);
  const [contactNumber, setContactNumber] = useState(props.contact.contactNumber);
  const [email, setEmail] = useState(props.contact.email);
  const [address, setAddress] = useState(props.contact.address);

  return (
    <Box className={props.rootStyle} border={1} borderColor={grey[400]}>
      <Typography variant="h3" color="#575757">{props.heading_text}</Typography>
      <form onSubmit={props.onClick}>
        <Box className="contactinfo">
          <TextField
            fullWidth
            margin="normal"
            // required
            readOnly = {true}
            id="outlined-required"
            label="Name"
            // defaultValue="Name"
            value={name}
            onChange={e => { setName(e.target.value) }}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-required"
            label="Contact Number"
            // value={props.contact.contact}
            onChange={e => { setContactNumber(e.target.value) }}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-required"
            label="Email Id"
            // value={props.contact.email}
            // defaultValue="Email Id"
            onChange={e => { setEmail(e.target.value) }}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-multiline-flexible"
            label="Address"
            // value={props.contact.address}
            multiline
            maxRows={4}
            onChange={e => { setAddress(e.target.value) }}
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
