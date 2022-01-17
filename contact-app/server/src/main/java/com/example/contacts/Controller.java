package com.example.contacts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class Controller {

    @Autowired
    JdbcRepo jdbcRepo;

    @PostMapping("/addContact")
    public void addContact(@RequestBody ContactDetails contact) { jdbcRepo.insert(contact); }

    @PostMapping("/getContacts")
    public void getContact(@RequestBody String name) { return jdbcRepo.get(name); }

    @PostMapping("/deleteContact")
    public void deleteContact(@RequestBody String contactID) { jdbcRepo.delete(contactID); }

    @PostMapping("/updateContact")
    public void updateContact(@RequestBody ContactDetails contact) { jdbcRepo.update(contact); }

}
