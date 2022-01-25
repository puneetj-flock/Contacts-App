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
  public String status() {
    return "authorization";
  }


  @GetMapping("/get")
  public List<ContactDetails> getContacts( @RequestHeader String sessionToken) {
    return contactsService.getContacts(sessionToken);
  }

  @PostMapping("/add")
  public ContactDetails addContact( @RequestHeader String sessionToken,
                         @RequestBody ContactDetails contact) {
    return contactsService.addContact(sessionToken, contact);
  }

  @PutMapping("/update")
  public void updateContact( @RequestHeader String sessionToken,
                            @RequestBody ContactDetails contact) {
    contactsService.updateContact(sessionToken, contact);
  }

  @DeleteMapping("/delete")
  public void deleteContact( @RequestHeader String sessionToken,
                            @RequestParam(value = "id") int contactId) {
    contactsService.deleteContact(sessionToken, contactId);
  }

}
