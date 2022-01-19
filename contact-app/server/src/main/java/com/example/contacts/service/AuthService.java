package com.example.contacts.service;

import com.example.contacts.JdbcRepo;
import com.example.contacts.model.User;
import com.example.contacts.utils.SessionHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthService {
    
    @Autowired
    JdbcRepo jdbcRepo;

    public String createNewSession(User user) {
        String session_token = SessionHelper.generateRandomToken();
        jdbcRepo.addSession(user, session_token);
        return session_token;
    }
    
    public String login(User user) {
        return createNewSession(user);
    }
}
