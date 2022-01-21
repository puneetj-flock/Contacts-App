import React, { useEffect } from "react";
import { AddContact } from "../addContact/AddContact";
import { Sidebar } from "../sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { ShowContact } from "../showContact/ShowContact";
import "./MainContent.css";
import { fn, fn2, getContacts } from "../../api/Index";
import { useNavigate } from "react-router-dom";
import { setSessionToken } from "../../redux/sessionToken";
import { GET_CONTACTS } from "../../api/contants";
import { setContacts } from "../../redux/contacts";

const MainContent = (props) => {
  const value = useSelector((state) => state.menu.value);
  const Menu = () => {
    if (value === "AddContact") return <AddContact />;
    if (value === "ShowContact") return <ShowContact />;
    if (value === "EditContact") return <ShowContact />;
    return <></>;
  };

  const sessionToken = useSelector((state) => state.sessionToken.token);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getContacts(GET_CONTACTS, sessionToken).then((res) => {
      dispatch(setContacts(res));
    });
  }, [dispatch, sessionToken]);

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
