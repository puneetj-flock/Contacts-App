package com.example.contacts.controller;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContactsController {

    @Autowired
    ContactsService conatctsService;

    @GetMapping("/")
    public String index() {
        return conatctsService.index();
    }

    @PostMapping("/addContact")
    public void addContact(@RequestHeader(value = "sessionToken") String sessionToken,
            @RequestBody ContactDetails contact) {
        conatctsService.addContact(sessionToken, contact);
    }

    @PostMapping("/getContacts")
    public List<ContactDetails> getContacts(@RequestHeader(value = "sessionToken") String sessionToken) {
        return conatctsService.getContacts(sessionToken);
    }

    @DeleteMapping("/deleteContact")
    public void deleteContact(@RequestHeader(value = "sessionToken") String sessionToken,
            @RequestParam(value = "contact_id") Integer contactId) {
        conatctsService.deleteContact(sessionToken, contactId);
    }

    @PostMapping("/updateContact")
    public void updateContact(@RequestHeader(value = "sessionToken") String sessionToken,
            @RequestBody ContactDetails contact) {
        conatctsService.updateContact(sessionToken, contact);
    }

}
