import {
    ADD_CONTACT,
    DELETE_CONTACT,
    GET_CONTACTS,
    UPDATE_CONTACT,
    GET,
    POST,
    PUT,
    DELETE,
} from "../service/constants";

import { APIManager } from "../api/APIManager";

export class ContactService{

    static getContacts() {
      return APIManager.request(GET_CONTACTS, GET, null, true);
        // return await fetch(GET_CONTACTS, {
        //     method: "GET",
        //     headers: myHeaders,
        // }).then((data) => {
        //     if (data.status === 401) {
        //         throw new Error("Token Expired");
        //     } else {
        //         return data.json();
        //     }
        // });
    }

  static addContact(contact) {
      return APIManager.request(ADD_CONTACT, POST, JSON.stringify(contact), true, true).then((res) => {
        const resp = res;
        console.log("RESP", resp);
        return resp.id;
      });
        // let myHeaders = new Headers();
        // myHeaders.append("sessionToken", this.sessionToken);
        // myHeaders.append("Content-Type", "application/json");
        // return await fetch(ADD_CONTACT, {
        //     method: "POST",
        //     headers: myHeaders,
        //     body: JSON.stringify(contact),
        // }).then((data) => {
        //     if (data.status === 200) {
        //         return data.text();
        //     }
        //     if (data.status === 402) {
        //         throw new Error("Token Expired");
        //     } // TODO: return contact id and update contact
        // });
    }

    static updateContact(contact) {
        return APIManager.request(UPDATE_CONTACT, PUT, JSON.stringify(contact), true, true, false);
        // let myHeaders = new Headers();
        // myHeaders.append("sessionToken", this.sessionToken);
        // myHeaders.append("Content-Type", "application/json");
        // return await fetch(UPDATE_CONTACT, {
        //     method: "PUT",
        //     headers: myHeaders,
        //     body: JSON.stringify(contact),
        // }).then((data) => {
        //     if (data.status === 401) {
        //         throw new Error("Token Expired");
        //     }
        // });
    }

    static deleteContact(contactId) {
        var formData = new FormData();
        formData.append("id", contactId);
        return APIManager.request(DELETE_CONTACT, DELETE, formData, true, false, false);
        // let myHeaders = new Headers();
        // myHeaders.append("sessionToken", this.sessionToken);
        // var formData = new FormData();
        // formData.append("id", contactId);
        // return await fetch(DELETE_CONTACT, {
        //     method: "DELETE",
        //     headers: myHeaders,
        //     body: formData,
        // }).then((data) => {
        //     if (data.status === 200) {
        //         console.log("DELETE_CONTACT", contactId);
        //     }
        // });
    }
}
