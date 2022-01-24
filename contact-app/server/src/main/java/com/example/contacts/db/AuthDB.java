package com.example.contacts.db;

import com.example.contacts.model.*;

import static com.example.contacts.utils.DBConstants.AuthQueries.*;
import static com.example.contacts.utils.DBConstants.ContactsQueries.*;
import static com.example.contacts.utils.ObjectRowMapper.*;
import static com.example.contacts.utils.DBConstants.Constants.*;
import static org.springframework.http.HttpStatus.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
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

@Repository
public class AuthDB {

  @Autowired
  NamedParameterJdbcTemplate jdbcTemplate;

  public Integer checkAuth(String Authorization) {
//        System.out.println(sessionToken);
    Timestamp current_time = Timestamp.from(Instant.now());
    Map<String, Object> sourceParams = new HashMap<>();
    sourceParams.put("session_token", Authorization);
    Sessions session;
    try {
      session = jdbcTemplate.queryForObject(SESSION_SELECT, sourceParams, SessionObjectRowMapper);
    } catch (EmptyResultDataAccessException e) {
      System.out.println(e);
//            System.out.println("Session Not Found");
      return null;
//            throw new ResponseStatusException(UNAUTHORIZED);
    }
    if (session.getExpiryTime().getTime() < current_time.getTime()) {
      logout(Authorization);
      System.out.println("TIME EXPIRED\n");
      return null;
//            throw new ResponseStatusException(UNAUTHORIZED); // redirect to login
    }
    return session.getUserId();
  }

  public boolean validateEmail(String email) {
    Pattern VALID_EMAIL_ADDRESS_REGEX =
      Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
    return matcher.find();
  }
// add to user class

  public boolean register(User user) {

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
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);

    try {
      user = jdbcTemplate.queryForObject(USER_SELECT, paramSource, UserRowMapper);
    } catch (EmptyResultDataAccessException e) {
      System.out.println(e);
      throw new ResponseStatusException(NOT_FOUND);
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
