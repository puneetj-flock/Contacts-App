import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import "./AddContact.css";
const AddContact = () => {
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
          />
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Contact Number"
            defaultValue="Contact Number"
          />
          <TextField
            margin="normal"
            required
            id="outlined-required"
            label="Email Id"
            defaultValue="Email Id"
          />
          <TextField
            margin="normal"
            required
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            defaultValue="Address"
          />
        </div>
        <div className="contact-add">
          <Button type="submit" variant="outlined">
            Add Contact
          </Button>
        </div>
      </form>
    </div>
  );
};

export { AddContact };
