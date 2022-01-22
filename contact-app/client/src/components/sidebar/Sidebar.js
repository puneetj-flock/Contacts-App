import React, { useState } from "react";
import { ContactsList } from "../contactsList/ContactsList";

import "./Sidebar.css";
const Sidebar = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="sidebar">
      <div className="navbar">
        {/* <div className="get-contacts">
          <Button variant="contained">All Contacts</Button>
        </div> */}
        <div className="search-bar">
          <input placeholder="Search Contact" value={searchText} onChange={e => {
            setSearchText(e.target.value);
            props.handleSearch(e.target.value);
          }} />
        </div>
      </div>
      <ContactsList contacts={props.contacts} setContact={props.setContact} />
      {/* {...props} */}
    </div>
  );
};

export { Sidebar };
