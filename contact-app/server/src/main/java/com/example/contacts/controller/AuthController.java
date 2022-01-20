package com.example.contacts.controller;

import com.example.contacts.model.User;
import com.example.contacts.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return authService.login(user);
    }

    @GetMapping("/logout")
    public void logout(@RequestHeader(value = "sessionToken") String sessionToken) {
        authService.logout(sessionToken);
    }

    @GetMapping("/welcome")
    public String hello() {
        return "Welcome";
    }
}
