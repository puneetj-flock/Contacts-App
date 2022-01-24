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
  public List<ContactDetails> getContacts(@RequestAttribute Integer userId) {
//    System.out.println("Reached Controller\n");
    return contactsService.getContacts(userId);
  }

  @PostMapping("/add")
  public void addContact(@RequestAttribute Integer userId,
                         @RequestBody ContactDetails contact) {
    System.out.println("Reached here with userId " + userId);
    contactsService.addContact(userId, contact);
  }

  @PutMapping("/update")
  public void updateContact(@RequestAttribute Integer userId,
                            @RequestBody ContactDetails contact) {
    contactsService.updateContact(userId, contact);
  }

  @DeleteMapping("/delete")
  public void deleteContact(@RequestAttribute Integer userId,
                            @RequestParam(value = "id") int contactId) {
    contactsService.deleteContact(userId, contactId);
  }

}
