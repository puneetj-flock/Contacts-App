package com.example.contacts.controller;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/contact")

public class ContactsController {

  @Autowired
  private ContactsService contactsService;


  @GetMapping("/status")
  public String status(@RequestAttribute String authorization) {
    return authorization;
  }


  @GetMapping("/get")
  public List<ContactDetails> getContacts(@RequestHeader String sessionToken) {
    return contactsService.getContacts(sessionToken);
  }

  @PostMapping("/add")
  public void addContact(@RequestHeader String authorization,
                         @RequestBody ContactDetails contact) {
    contactsService.addContact(authorization, contact);
  }

  @PutMapping("/update")
  public void updateContact(@RequestHeader String authorization,
                            @RequestBody ContactDetails contact) {
    contactsService.updateContact(authorization, contact);
  }

  @DeleteMapping("/delete")
  public void deleteContact(@RequestHeader String sessionToken,
                            @RequestParam(value = "id") int contactId) {
    contactsService.deleteContact(sessionToken, contactId);
  }

}
