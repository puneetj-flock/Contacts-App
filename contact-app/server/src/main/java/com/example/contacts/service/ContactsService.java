package com.example.contacts.service;

import com.example.contacts.db.*;
import com.example.contacts.model.ContactDetails;
import com.example.contacts.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Repository
public class ContactsService {

    @Autowired
    AuthDB authDB;

    @Autowired
    ContactsDB contactsDB;
    
    public ModelAndView index() {
        return new ModelAndView("redirect:/welcome");
    }

    public List<ContactDetails> getContacts(String sessionToken) {
        Integer userId = authDB.checkAuth(sessionToken);
        return contactsDB.getContacts(userId);
    }

    public void addContact(String sessionToken, ContactDetails contact) {
        Integer userId = authDB.checkAuth(sessionToken);
        System.out.println(userId);
        contact.setUserId(userId);
        contactsDB.addContact(contact);
    }

    public void deleteContact(String sessionToken, Integer contactId) {
        Integer userId = authDB.checkAuth(sessionToken);
        contactsDB.deleteContact(userId, contactId);
    }

    public void updateContact(String sessionToken, ContactDetails contact) {
        Integer userId = authDB.checkAuth(sessionToken);
        contact.setUserId(userId);
        contactsDB.updateContact(contact);
    }
}
