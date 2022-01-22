package com.example.contacts.db;

import com.example.contacts.model.*;
import static com.example.contacts.utils.ObjectRowMapper.*;
import static com.example.contacts.utils.Constants.*;
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

    public Integer checkAuth(String sessionToken) {
        System.out.println(sessionToken);
        Timestamp current_time = Timestamp.from(Instant.now());
        Map<String, Object> sourceParams = new HashMap<>();
        sourceParams.put("session_token", sessionToken);
        Sessions session;
        try {
            session = jdbcTemplate.queryForObject(SQL_SESSION_SEL, sourceParams, SessionObjectRowMapper);
        } catch (EmptyResultDataAccessException e) {
            System.out.println(e);
            System.out.println("Session Not Found");
            throw new ResponseStatusException(NOT_FOUND);
        }
        if (session.getExpiryTime().getTime() < current_time.getTime()) {
            logout(sessionToken);
            System.out.println("TIME EXPIRED\n");
            throw new ResponseStatusException(NOT_FOUND); // redirect to login
        }
        return session.getUserId();
    }
    public boolean validateEmail( String email)
    {
        Pattern VALID_EMAIL_ADDRESS_REGEX =
                Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
        return matcher.find();
    }

    public String register(User user) {
        if(!validateEmail(user.getEmail()))
        {
            throw new ResponseStatusException(NOT_IMPLEMENTED);
        }

        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);
        int count = jdbcTemplate.queryForObject(SQL_USER_CNT, paramSource, Integer.class);
        if (count > 0)
            return "Error! User Already Registered";
        jdbcTemplate.update(SQL_USER_INS, paramSource);
        return "Registered";
    }

    public void addSession(User user, String session_token) {
        Map<String, Object> params = new HashMap<>();
        params.put("session_token", session_token);
        params.put("user_id", user.getId());
//        TIME_1_HOUR
        params.put("expiry_time", new Timestamp(System.currentTimeMillis() + TIME_1_DAY));
        System.out.println(params);
        jdbcTemplate.update(SQL_SESSION_INS, params);
    }

    public User login(User user) {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);

        try {
            user = jdbcTemplate.queryForObject(SQL_USER_SEL, paramSource, UserRowMapper);
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
        jdbcTemplate.update(SQL_SESSION_DEL, sourceParams);
    }
}
