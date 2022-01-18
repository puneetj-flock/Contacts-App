package com.example.contacts;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public void addContact(@RequestBody ContactDetails contact) { jdbcRepo.insert(contact); }

    @PostMapping("/getContacts")
    public List<ContactDetails> getContacts(@RequestParam(value = "name", defaultValue = "") String name) { return jdbcRepo.get(name); }

    @DeleteMapping("/deleteContact")
    public void deleteContact(@RequestBody ContactDetails id) { jdbcRepo.delete(id); }

    @PostMapping("/updateContact")
    public void updateContact(@RequestBody ContactDetails contact) { jdbcRepo.update(contact); }

}
