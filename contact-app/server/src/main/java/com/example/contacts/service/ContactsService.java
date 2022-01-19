package com.example.contacts.service;

import com.example.contacts.db.*;
import com.example.contacts.model.ContactDetails;
import com.example.contacts.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContactsService {

    @Autowired
    AuthDB authDB;

    @Autowired
    ContactsDB contactsDB;
    
    public String index() {
        return "Hello";
    }

    public void addContact(String sessionToken, ContactDetails contact) {
        Integer userId = authDB.checkAuth(sessionToken);
        System.out.println(userId);
        contactsDB.insert(userId, contact);
    }

    public List<ContactDetails> getContacts(String sessionToken) {
        Integer userId = authDB.checkAuth(sessionToken);
        return contactsDB.get(userId);
    }

    public void deleteContact(String sessionToken, Integer contactId) {
        Integer userId = authDB.checkAuth(sessionToken);
        contactsDB.delete(userId, contactId);
    }

    public void updateContact(String sessionToken, ContactDetails contact) {
        Integer userId = authDB.checkAuth(sessionToken);
        contactsDB.update(userId, contact);
    }
}
