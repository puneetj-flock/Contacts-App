import React, { useEffect } from "react";
import { AddContact } from "../addContact/AddContact";
import { Sidebar } from "../sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { ShowContact } from "../showContact/ShowContact";
import "./MainContent.css";

import { setContacts } from "../../redux/contacts";
import { ApiManager } from "../../api/Index";
const MainContent = (props) => {
  const value = useSelector((state) => state.menu.value);
  const Menu = () => {
    if (value === "AddContact") return <AddContact />;
    if (value === "ShowContact") return <ShowContact />;
    if (value === "EditContact") return <ShowContact />;
    return <></>;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const a = new ApiManager();
    a.getContacts().then((res) => {
      dispatch(setContacts(res));
    });
  }, [dispatch]);

  return (
    <div className="body-wrapper">
      <Sidebar />
      <div className="main-wrapper">
        <Menu />
      </div>
    </div>
  );
};

export { MainContent };
