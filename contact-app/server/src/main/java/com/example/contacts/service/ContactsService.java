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


  public List<ContactDetails> getContacts(String authorization) {
    Integer userId = authDB.checkAuth(authorization);
    return contactsDB.getContacts(userId);
  }

  public void addContact(String authorization, ContactDetails contact) {
    Integer userId = authDB.checkAuth(authorization);
//    System.out.println(userId);
    contact.setUserId(userId);
    contactsDB.addContact(contact);
  }

  public void deleteContact(String sessionToken, Integer contactId) {
    Integer userId = authDB.checkAuth(sessionToken);
    contactsDB.deleteContact(userId, contactId);
  }

  public void updateContact(String authorization, ContactDetails contact) {
    Integer userId = authDB.checkAuth(authorization);
    contact.setUserId(userId);
    contactsDB.updateContact(contact);
  }
}
