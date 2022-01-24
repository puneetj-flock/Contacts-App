package com.example.contacts.utils;

import com.example.contacts.model.*;
import org.springframework.jdbc.core.RowMapper;

public class ObjectRowMapper {

  public static RowMapper<User> UserRowMapper = (rs, rowNum) -> {
    User user = new User();
    user.setId(rs.getInt("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
    return user;
  };

  public static RowMapper<ContactDetails> ContactDetailsRowMapper = (rs, rowNum) -> {
    ContactDetails contact = new ContactDetails();
    contact.setId(rs.getInt("id"));
    contact.setUserId(rs.getInt("user_id"));
    contact.setName(rs.getString("name"));
    contact.setContact(rs.getString("contact"));
    contact.setEmail(rs.getString("email"));
    contact.setAddress(rs.getString("address"));
    contact.setScore(rs.getInt("score"));
    return contact;
  };

  public static RowMapper<Sessions> SessionRowMapper = (rs, rowNum) -> {
    Sessions session = new Sessions();
    session.setUserId(rs.getInt("user_id"));
    session.setSessionToken(rs.getString("session_token"));
    session.setExpiryTime(rs.getTimestamp("expiry_time"));
    return session;
  };

  public static RowMapper<SessionData> SessionDataRowMapper = (rs, rowNum) -> {
    SessionData sessionData = new SessionData();
    sessionData.setSessionToken(rs.getString("session_token"));
    sessionData.setUserId(rs.getInt("user_id"));
    sessionData.setName(rs.getString("name"));
    sessionData.setEmail(rs.getString("email"));
    return sessionData;
  };
}
