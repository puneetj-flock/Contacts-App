package com.example.contacts.controller;

import com.example.contacts.model.User;
import com.example.contacts.model.SessionData;
import com.example.contacts.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthService authService;


  @PostMapping("/register")
  public SessionData register(@RequestBody User user) {
    return authService.register(user);
  }

  @PostMapping("/login")
  public SessionData login(@RequestBody User user) {
    return authService.login(user);
  }

  @GetMapping("/logout")
  public void logout(@RequestHeader String sessionToken) {
    authService.logout(sessionToken);
  }

  @GetMapping("/checkAuth")
  public SessionData checkAuth(@RequestHeader String sessionToken) {
    return authService.checkAuth(sessionToken);
  }

  @GetMapping("/welcome")
  public String hello() {
    return "Welcome";
  }
}
