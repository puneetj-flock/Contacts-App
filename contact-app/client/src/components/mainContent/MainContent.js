import React, { useEffect } from "react";
import { AddContact } from "../addContact/AddContact";
import { ShowContact } from "../showContact/ShowContact"; 
import { EditContact } from "../editContact/EditContact";
import { Sidebar } from "../sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import "./MainContent.css";

import { setContacts } from "../../redux/contacts";
import { ApiManager } from "../../api/Index";
import { useNavigate } from "react-router-dom";

const fabStyle = {
  margin: 0,
  bottom: 'auto',
  // color: "#ff0000",
  right: 20,
  top: 20,
  left: 'auto',
  position: 'fixed',
};

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
    const apiManager = new ApiManager();
    apiManager.getContacts().then((res) => {
      dispatch(setContacts(res));
    }).catch((err) => {
      localStorage.removeItem("sessionToken");
      navigate("/login", { replace: true });
    })
  }, [dispatch]);

  return (
    <div className="body-wrapper">
      <Sidebar />
      <div className="main-wrapper">
        <Menu />
      </div>

      <Fab aria-label="add" style={fabStyle} onClick={() => {
        const apiManager = new ApiManager();
        apiManager.logoutUser();
        localStorage.removeItem("sessionToken");
        navigate("/login");
      }}>
        <LogoutIcon />
      </Fab>
    </div>
  );
};

export { MainContent, emptyContact };
