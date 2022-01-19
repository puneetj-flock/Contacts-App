package com.example.contacts.controller;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.JdbcRepo;
import com.example.contacts.model.loginInfo;
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

    @PostMapping("/register")
    public String register(@RequestBody loginInfo userRegister) {
        return jdbcRepo.register(userRegister);
    }

    @PostMapping("/login")
    public String login(@RequestBody loginInfo info) {
        return jdbcRepo.login(info);
    }

    @GetMapping("/logout")
    public void logout(@RequestHeader(value = "sessionToken") String sessionToken)
    {
        jdbcRepo.logout(sessionToken);
    }

    @PostMapping("/addContact")
    public void addContact(@RequestHeader(value = "sessionToken") String sessionToken, @RequestBody ContactDetails contact)
    {
        jdbcRepo.check_auth(sessionToken);
        jdbcRepo.insert(contact);
    }

    @PostMapping("/getContacts")
    public List<ContactDetails> getContacts(@RequestHeader(value = "sessionToken") String sessionToken)
    {
        jdbcRepo.check_auth(sessionToken);
        return jdbcRepo.get();
    }

    // do using request params
    @DeleteMapping("/deleteContact")
    public void deleteContact(@RequestHeader(value = "sessionToken") String sessionToken, @RequestBody ContactDetails id)
    {
        jdbcRepo.check_auth(sessionToken);
        jdbcRepo.delete(id);
    }

    @PostMapping("/updateContact")
    public void updateContact(@RequestHeader(value = "sessionToken") String sessionToken, @RequestBody ContactDetails contact)
    {
        jdbcRepo.check_auth(sessionToken);
        jdbcRepo.update(contact);
    }

}
