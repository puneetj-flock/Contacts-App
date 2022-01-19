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
        contact.setEmail(rs.getString("email"));
        contact.setScore(rs.getInt("score"));
        return contact;
    };

    public static RowMapper<Sessions> SessionObjectRowMapper = (rs, rowNum) -> {
        Sessions sessionObject = new Sessions();
        sessionObject.setUserId(rs.getInt("user_id"));
        sessionObject.setToken(rs.getString("session_token"));
        sessionObject.setExpiryTime(rs.getTimestamp("expiry_time"));
        return sessionObject;
    };
}
