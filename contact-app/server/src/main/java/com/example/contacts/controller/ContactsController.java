package com.example.contacts.controller;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class ContactsController {

    @Autowired
    ContactsService contactsService;

    @GetMapping("/")
    public ModelAndView index() {
        return contactsService.index();
    }

    @PostMapping("/getContacts")
    public List<ContactDetails> getContacts(@RequestHeader(value = "sessionToken") String sessionToken) {
        return contactsService.getContacts(sessionToken);
    }

    @PostMapping("/addContact")
    public void addContact(@RequestHeader(value = "sessionToken") String sessionToken,
            @RequestBody ContactDetails contact) {
        contactsService.addContact(sessionToken, contact);
    }

    @PostMapping("/updateContact")
    public void updateContact(@RequestHeader(value = "sessionToken") String sessionToken,
            @RequestBody ContactDetails contact) {
        contactsService.updateContact(sessionToken, contact);
    }

    @DeleteMapping("/deleteContact")
    public void deleteContact(@RequestHeader(value = "sessionToken") String sessionToken,
            @RequestParam(value = "contact_id") Integer contactId) {
        contactsService.deleteContact(sessionToken, contactId);
    }

}
