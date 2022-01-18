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

    @PostMapping("/register")
    public String register(@RequestParam(value = "name") String name, @RequestParam(value = "email") String email, @RequestParam(value = "password") String password) {
        return jdbcRepo.register(name, email, password); 
    }

    @PostMapping("/login")
    public String login(@RequestParam(value = "email") String email, @RequestParam(value = "password") String password) {
        return jdbcRepo.login(email, password); 
    }

    // @PostMapping("/logout")
    // public String logout(@RequestParam(value = "session_key") String session_key) { jdbcRepo.logout(session_key); }

    @PostMapping("/addContact")
    public void addContact(@RequestBody ContactDetails contact) { jdbcRepo.insert(contact); }

    @PostMapping("/getContacts")
    public List<ContactDetails> getContacts(@RequestParam(value = "name") String name) { return jdbcRepo.get(name); }

    @DeleteMapping("/deleteContact")
    public void deleteContact(@RequestBody ContactDetails id) { jdbcRepo.delete(id); }

    @PostMapping("/updateContact")
    public void updateContact(@RequestBody ContactDetails contact) { jdbcRepo.update(contact); }

}
