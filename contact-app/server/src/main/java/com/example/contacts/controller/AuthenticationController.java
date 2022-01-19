package com.example.contacts.controller;

import com.example.contacts.JdbcRepo;
import com.example.contacts.User;
import com.example.contacts.utils.SessionHelper;

import org.springframework.beans.factory.annotation.Autowired;

public class AuthenticationController {
    
    @Autowired
    JdbcRepo jdbcRepo;

    public String createNewSession(User user) {
        String session_token = SessionHelper.generateNewToken();
        jdbcRepo.addSession(user, session_token);
        return session_token;
    }
}
