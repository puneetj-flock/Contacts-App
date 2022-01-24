import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { setMenu } from "../../redux/menu";
import { useSelector, useDispatch } from "react-redux";
import { grey } from "@mui/material/colors";

import "./ShowContact.css";

const ShowContact = (props) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.selectedContact.selectedContact);

  const showContactHandler = contact => {
    dispatch(setMenu("EditContact"));
  };

  return (
    <Box className={props.rootStyle} border={1} borderColor={grey[400]}>
      <Typography variant="h3" color="#575757">{props.heading_text}</Typography>
      <form onSubmit={showContactHandler}>
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
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-required"
            label="Contact Number"
            value={contact.contact}
          />
          <TextField
            fullWidth
            margin="normal"
            // required
            id="outlined-required"
            label="Email Id"
            value={contact.email}
            // defaultValue="Email Id"
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
          // defaultValue="Address"
          />
        </Box>
        <Box className="contact-add">
          <Button id="base-contact-button" type="submit" variant="contained">
            Edit
          </Button>
        </Box>
      </form>
    </Box>
  )
};

// document.getElementById("outlined-required").setAttribute("readonly", "true");

export { ShowContact };
