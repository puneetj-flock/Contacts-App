package com.example.contacts.controller;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.JdbcRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {

    @Autowired
    JdbcRepo jdbcRepo;

    @GetMapping("/")
    public String check()
    {
        return "Hello";
    }

    @PostMapping("/addContact")
    public void addContact(@RequestHeader(value = "sessionToken") String sessionToken, @RequestBody ContactDetails contact)
    {
        Integer userId = jdbcRepo.check_auth(sessionToken);
        System.out.println(userId);
        jdbcRepo.insert(userId, contact);
    }

    @PostMapping("/getContacts")
    public List<ContactDetails> getContacts(@RequestHeader(value = "sessionToken") String sessionToken)
    {
        jdbcRepo.check_auth(sessionToken);
        return jdbcRepo.get();
    }

    @DeleteMapping("/deleteContact")
    public void deleteContact(@RequestHeader(value = "sessionToken") String sessionToken, @RequestParam Integer contactId)
    {
        Integer userId = jdbcRepo.check_auth(sessionToken);
        jdbcRepo.delete(userId, contactId);
    }

    @PostMapping("/updateContact")
    public void updateContact(@RequestHeader(value = "sessionToken") String sessionToken, @RequestBody ContactDetails contact)
    {
        jdbcRepo.check_auth(sessionToken);
        jdbcRepo.update(contact);
    }

}
