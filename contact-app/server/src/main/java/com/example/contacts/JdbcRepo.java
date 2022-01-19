package com.example.contacts;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.model.Sessions;
import com.example.contacts.model.User;
import com.example.contacts.utils.Constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;


import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class JdbcRepo {
    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    RowMapper<User> UserRowMapper = (rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            return user;
        };

    RowMapper<ContactDetails> ContactDetailsRowMapper = (rs, rowNum) -> {
            ContactDetails contact = new ContactDetails();
            contact.setId(rs.getInt("id"));
            contact.setUserId(rs.getInt("user_id"));
            contact.setName(rs.getString("name"));
            contact.setEmail(rs.getString("email"));
            contact.setScore(rs.getInt("score"));
            return contact;
    };

    RowMapper<Sessions> SessionObjectRowMapper = (rs, rowNum) -> {
        Sessions sessionObject = new Sessions();
        // s.setEmail(rs.getString("email"));
        sessionObject.setUserId(rs.getInt("user_id"));
        sessionObject.setToken(rs.getString("session_token"));
        sessionObject.setExpiryTime(rs.getTimestamp("expiry_time"));
        return sessionObject;
    };

    // public String generateSessionToken(String email)
    // {
    //     Timestamp current_time = Timestamp.from(Instant.now());
    //     String token = email + current_time;

    //     Timestamp expire_time = new Timestamp(current_time.getTime());

    //     expire_time.setTime(expire_time.getTime() + ((1 * 60 * 60) * 1000)); // add to constant

    //     SessionObject session_info = new SessionObject(email, token, expire_time);
    //     BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(session_info);

    //     String add_session_token = "insert into sessions (user_id, token, expire) VALUES(:email, :token, :expire_time)";

    //     System.out.println('\n' + token + ' ' + expire_time + '\n');

    //     jdbcTemplate.update(add_session_token, paramSource);
    //     return token;
    // }

    public Integer check_auth(String sessionToken)
    {
        System.out.println(sessionToken);
        Timestamp current_time = Timestamp.from(Instant.now());
        String auth_check = "select * from sessions where session_token = :session_token";
        Map<String, Object> sourceParams = new HashMap<>();
        sourceParams.put("session_token", sessionToken);
        Sessions session;
        try {
            session = jdbcTemplate.queryForObject(auth_check, sourceParams, SessionObjectRowMapper);
        } catch (EmptyResultDataAccessException e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        if (session.getExpiryTime().getTime() < current_time.getTime()) {
            logout(sessionToken);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            // return false;
            //redirect to login
        }
        return session.getUserId();
    }

    public String register(User user)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);
        String sql_query = "insert into users(name, email, password) values(:name, :email, :password)";
        String user_exists = "SELECT count(*) FROM users WHERE email = :email LIMIT 1";

        int count = jdbcTemplate.queryForObject(user_exists, paramSource , Integer.class);
        if(count > 0) return "Error! User Already Registered";
        jdbcTemplate.update(sql_query, paramSource);
        return "Registered";

        // how to redirect to home page or login page

    }

    public void addSession(User user, String session_token) {
        Map<String, Object> params = new HashMap<>();
        params.put("session_token", session_token);
        params.put("user_id", user.getId());
        params.put("expiry_time", new Timestamp(System.currentTimeMillis() + Constants.TIME_30_MIN));
        System.out.println(params);
        String sql_query = "INSERT INTO sessions(session_token, user_id, expiry_time) VALUES(:session_token, :user_id, :expiry_time)";
        jdbcTemplate.update(sql_query, params);
    }

    public User login(User user)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(user);

        String sql_query = "select * from users where email = :email and password = :password LIMIT 1";

        try {
            user = jdbcTemplate.queryForObject(sql_query, paramSource,  UserRowMapper);
        }
        catch (EmptyResultDataAccessException e)
        {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        System.out.println(user.getEmail());
        return user;
    }

    public void logout(String sessionToken)
    {
        String logout_query = "delete from sessions where session_token = :session_token";
        Map<String, Object> sourceParams = new HashMap<>();
        sourceParams.put("session_token" , sessionToken);
        jdbcTemplate.update(logout_query, sourceParams);
    }

    public void insert(int userId, ContactDetails contact)
    {
        contact.setUserId(userId);
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        String sql_insert = "insert into contacts(user_id, name, email, score)  VALUES(:userId, :name, :email, :score)";
        jdbcTemplate.update(sql_insert, paramSource);
    }

    public List<ContactDetails> get()
    {
        String sql_get = "select * from contacts";
        return jdbcTemplate.query(sql_get, ContactDetailsRowMapper);
    }

    public void update(ContactDetails contact)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        String sql_update = "update contacts SET name = :name, email = :email, score = :score where id = :id ";
        jdbcTemplate.update(sql_update, paramSource);
    }

    //check authorisation
    public void delete(Integer userId, Integer contactId)
    {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        params.put("id", contactId);

        System.out.println("Printed here" + contactId);

        String sql_delete = "delete from contacts where user_id = :user_id and id = :id";
        jdbcTemplate.update(sql_delete, params);
    }
}
