package com.example.contacts.db;

import com.example.contacts.model.SessionData;
import com.example.contacts.model.Sessions;
import com.example.contacts.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.example.contacts.utils.DBConstants.AuthQueries.SESSION_SELECT;
import static com.example.contacts.utils.DBConstants.AuthQueries.USER_REGISTER;
import static com.example.contacts.utils.DBConstants.Constants.TIME_1_DAY;
import static com.example.contacts.utils.DBConstants.ContactsQueries.*;
import static com.example.contacts.utils.ObjectRowMapper.SessionRowMapper;
import static com.example.contacts.utils.ObjectRowMapper.UserRowMapper;
import static org.springframework.http.HttpStatus.*;

@Repository
public class AuthDB {

  @Autowired
  private NamedParameterJdbcTemplate jdbcTemplate;

  public SessionData checkAuth(String Authorization) {
//        System.out.println(Authorization);
    Timestamp current_time = Timestamp.from(Instant.now());
    Map<String, Object> sourceParams = new HashMap<>();
    sourceParams.put("session_token", Authorization);
    User user = new User();
    Sessions session;
    SessionData sessionData = new SessionData();
    try {
      session = jdbcTemplate.queryForObject(SESSION_SELECT, sourceParams, SessionRowMapper);
      sourceParams.put("id", session.getUserId());
      user = jdbcTemplate.queryForObject(USER_SELECT_WHERE_ID, sourceParams, UserRowMapper);
    } catch (EmptyResultDataAccessException e) {
      throw new ResponseStatusException(UNAUTHORIZED);
    }
    if (session.getExpiryTime().getTime() < current_time.getTime()) {
      logout(Authorization);
      System.out.println("TIME EXPIRED\n");
      throw new ResponseStatusException(UNAUTHORIZED);
    }
    sessionData.setSessionToken(session.getSessionToken());
    sessionData.setUserId(user.getId());
    sessionData.setName(user.getName());
    sessionData.setEmail(user.getEmail());
    return sessionData;
  }

//  public boolean validateEmail(String email) {
//    Pattern VALID_EMAIL_ADDRESS_REGEX =
//      Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
//
//    Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
//    return matcher.find();
//  }
// add to user class

  public boolean register(User user) {

    if(!user.validateEmail())
    {
      System.out.println("User email Wrong");
      throw new ResponseStatusException(FORBIDDEN);
    }
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);
    int count = jdbcTemplate.update(USER_REGISTER, paramSource);

    if (count == 0) {
      System.out.println("Error! User Already Registered");
      return false;
    }
    System.out.println("Registered");
    return true;
  }


  public void addSession(User user, String session_token) {
    Map<String, Object> params = new HashMap<>();
    params.put("session_token", session_token);
    params.put("user_id", user.getId());
//        TIME_1_HOUR
    params.put("expiry_time", new Timestamp(System.currentTimeMillis() + TIME_1_DAY));
//        System.out.println(params);
    jdbcTemplate.update(SESSION_INSERT, params);
  }

  public User login(User user) {
    if(!user.validateEmail())
    {
      System.out.println("User email Wrong");
     throw new ResponseStatusException(FORBIDDEN);
    }
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);

    try {
      user = jdbcTemplate.queryForObject(USER_SELECT, paramSource, UserRowMapper);
    } catch (EmptyResultDataAccessException e) {
      System.out.println(e);
      throw new ResponseStatusException(FORBIDDEN);
    }
    System.out.println(user.getEmail());
    return user;
  }

  public void logout(String sessionToken) {
    Map<String, Object> sourceParams = new HashMap<>();
    sourceParams.put("session_token", sessionToken);
    jdbcTemplate.update(SESSION_DELETE, sourceParams);
  }
}
