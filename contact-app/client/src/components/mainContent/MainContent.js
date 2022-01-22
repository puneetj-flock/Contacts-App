import React from "react";
import { AddContact } from "../addContact/AddContact";
import { ShowContact } from "../showContact/ShowContact"; 
import { EditContact } from "../editContact/EditContact";
import { Sidebar } from "../sidebar/Sidebar";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import "./MainContent.css";

// const MainContent = () => {
//   return (
//     <div className="body-wrapper">
//       <Sidebar />
//       <div className="main-wrapper">
//         <AddContact />
//       </div>
//     </div>
//   );
// };

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const emptyContact = {
  id: null,
  name: "",
  contact: "",
  email: "",
  address: "",
};

class MainContent extends React.Component{
  constructor(props) {
    super(props);
    this.handleClickContact = this.handleClickContact.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      allContacts: Array(15).fill({
        id: 1,
        name: "Prashant Rawat",
        contact: "12345678",
        email: "prashant.rawat216@gmail.com",
        address: "home",
      }),
      selectedContact: emptyContact,
      selectedOperation: "",
      searchText: "",
    };
  }

  // handleSetSelectedContact(contact) {
  //   this.setState({ selectedContact: contact });
  // }

  handleSubmitEdit() {
    this.setState({ selectedOperation: "edit" });
  }

  handleClickAdd() {
    this.setState({
      selectedOperation: "add",
      selectedContact: emptyContact,
    });
  }

  handleSubmitAdd() {
    // add contact logic
  }

  handleSubmitUpdate() {
    // update contact logic
  }

  handleClickContact(contact) {
    console.log(contact);
    this.setState({
      selectedContact: contact,
      selectedOperation: "show",
    });
  }

  handleClickContactEdit(contact) {
    this.setState({
      selectedContact: contact,
      selectedOperation: "edit",
    });
  }

  handleSearch(text) {
    this.setState({ searchText: text });
  }

  render() {
    const selectedContact = this.state.selectedContact;
    const selectedOperation = this.state.selectedOperation;
    const allContacts = this.state.allContacts;
    const searchText = this.state.searchText.toLowerCase();
    let contactsToDisplay = null;
    let contentToDisplay = null;

    if (searchText) {
      console.log(searchText);
      contactsToDisplay = [];
      for (let index = 0; index < allContacts.length; index++) {
        const contact = allContacts[index];
        if (contact["name"].substring(0, searchText.length).toLowerCase() === searchText) {
          contactsToDisplay.push(contact);
        }
      }
      contactsToDisplay.sort(function (a, b) { return a["name"] < b["name"] });
    } else {
      contactsToDisplay = allContacts;
    }

    if (selectedOperation === "show") {
      console.log("CHECK");
      contentToDisplay = <ShowContact onClick={() => this.handleSubmitEdit()} contact={selectedContact}/>;
    } else if (selectedOperation === "add") {
      contentToDisplay = <AddContact onClick={() => this.handleSubmitAdd()} contact={selectedContact}/>;
    } else if (selectedOperation === "edit") {
      contentToDisplay = <EditContact onClick={() => this.handleSubmitUpdate()} contact={selectedContact}/>;
    }
    return (
      <div className="body-wrapper">
        <Sidebar contacts={contactsToDisplay} setContact={this.handleClickContact} handleSearch={this.handleSearch}/>
        <div className="main-wrapper">
          {contentToDisplay}
        </div>

        <Fab color="primary" aria-label="add" style={fabStyle} onClick={() => this.handleClickAdd()}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export { MainContent };
