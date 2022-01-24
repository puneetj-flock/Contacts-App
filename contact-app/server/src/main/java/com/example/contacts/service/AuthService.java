package com.example.contacts.service;

import com.example.contacts.db.AuthDB;
import com.example.contacts.model.User;
import com.example.contacts.utils.SessionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Repository
public class AuthService {

  @Autowired
  private AuthDB authDB;

  public String createNewSession(User user) {
    String session_token = SessionHelper.generateRandomToken();
    authDB.addSession(user, session_token);
    return session_token;
  }

  public int checkAuth(String sessionToken) {
    return authDB.checkAuth(sessionToken);
  }

  public String login(User user) {
    user = authDB.login(user);
    return createNewSession(user);
  }

  public String register(User user) {
    if (authDB.register(user)) return login(user);
    throw new ResponseStatusException(CONFLICT); // user already registered
  }

  public void logout(String sessionToken) {
    authDB.logout(sessionToken);
  }
}
