import React from "react";
import { AddContact } from "../addContact/AddContact";
import { Sidebar } from "../sidebar/Sidebar";

import "./MainContent.css";
const MainContent = () => {
  return (
    <div className="body-wrapper">
      <Sidebar />
      <div className="main-wrapper">
        <AddContact />
      </div>
    </div>
  );
};

export { MainContent };
