import React, { useEffect } from "react";
import { AddContact } from "../addContact/AddContact";
import { ShowContact } from "../showContact/ShowContact";
import { EditContact } from "../editContact/EditContact";
import { Sidebar } from "../sidebar/Sidebar";
import { Navbar } from "../navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import "./MainContent.css";

import { setContacts } from "../../redux/contacts";
import { ApiManager } from "../../api/APIManager";
import { useNavigate } from "react-router-dom";
import { ContactService } from "../../service/ContactService";
import { AuthService } from "../../service/AuthService";

const emptyContact = {
  id: 0,
  name: "",
  contact: "",
  email: "",
  address: "",
  score: 0,
};

const MainContent = () => {
  const value = useSelector((state) => state.menu.value);
  const Menu = () => {
    if (value === "AddContact") return <AddContact />;
    if (value === "ShowContact") return <ShowContact />;
    if (value === "EditContact") return <EditContact />;
    return <></>;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.checkAuth().then((res) => {
      if (res) {
        ContactService.getContacts().then((res) => {
          dispatch(setContacts(res));
        });
      } else {
        navigate("/login", { replace: true });
      }
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="body-wrapper">
        <Sidebar />
        <div className="main-wrapper">
          <Menu />
        </div>

        {/* <Fab
          aria-label="add"
          style={logoutFabStyle}
          title="Logut"
          onClick={logoutHandler}
        >
          <LogoutIcon />
        </Fab> */}
      </div>
    </>
  );
};

export { MainContent, emptyContact };
