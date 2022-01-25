package com.example.contacts.service;

import com.example.contacts.db.AuthDB;
import com.example.contacts.model.User;
import com.example.contacts.model.SessionData;
import com.example.contacts.utils.SessionHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Repository
public class AuthService {

  @Autowired
  private AuthDB authDB;

  public SessionData createNewSession(User user) {
    String session_token = SessionHelper.generateRandomToken();
    authDB.addSession(user, session_token);
    SessionData sessionData = new SessionData();
    sessionData.setSessionToken(session_token);
    sessionData.setName(user.getName());
    sessionData.setEmail(user.getEmail());
    return sessionData;
  }

  public SessionData checkAuth(String sessionToken) {
    return authDB.checkAuth(sessionToken);
  }

  public SessionData login(User user) {
    user = authDB.login(user);
    return createNewSession(user);
  }

  public SessionData register(User user) {
    if (authDB.register(user)) return login(user);
    throw new ResponseStatusException(CONFLICT, "User Already Registered");
  }

  public void logout(String sessionToken) {
    authDB.logout(sessionToken);
  }
}
