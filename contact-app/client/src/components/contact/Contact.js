import { Avatar, IconButton } from "@mui/material";
import React from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";

// import IconButton from "@mui/material/IconButton";

import "./Contact.css";

const Contact = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="contact-box"
      onClick={() => dispatch(setMenu("ShowContact"))}
    >
      <div className="contact-avatar">
        <Avatar {...stringAvatar("Test Name")} />
      </div>
      <div className="contact-name">Test Name</div>
      <div className="contact-edit">
        <IconButton
          onClick={() => {
            dispatch(setMenu("EditContact"));
          }}
        >
          <ModeEditRoundedIcon />
        </IconButton>
      </div>
      <div className="contact-delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export { Contact };

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
