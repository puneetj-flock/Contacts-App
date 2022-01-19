package com.example.contacts;

import com.example.contacts.model.ContactDetails;
import com.example.contacts.model.SessionObject;
import com.example.contacts.model.User;
import com.example.contacts.model.loginInfo;
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
            contact.setName(rs.getString("name"));
            contact.setEmail(rs.getString("email"));
            contact.setScore(rs.getInt("score"));
            return contact;
    };

    RowMapper<SessionObject> SessionObjectRowMapper = (rs, rowNum) -> {
        SessionObject s = new SessionObject();
        s.setEmail(rs.getString("user_id"));
        s.setToken(rs.getString("token"));
        s.setExpire_time(rs.getTimestamp("expire"));
        return s;
    };

    public boolean check_auth(String sessionToken)
    {
        System.out.println(sessionToken);
        Timestamp current_time = Timestamp.from(Instant.now());
        String auth_check = "select * from sessions where token = :token";
        Map sourceParams = new HashMap<>();
        sourceParams.put("token", sessionToken);
        SessionObject obj;
        try {
             obj = jdbcTemplate.queryForObject(auth_check, sourceParams, SessionObjectRowMapper);
        }
        catch (EmptyResultDataAccessException e)
        {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        if(obj.getExpire_time().getTime() < current_time.getTime())
        {
            logout(sessionToken);
            return false;
            //redirect to login
        }
        return true;
    }
    public String register(loginInfo userRegister)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(userRegister);

        String sql_query = "insert into users(name, email, password) values(:name, :email, :password)";

        String user_exists = "SELECT count(*) FROM users WHERE email = :email LIMIT 1" ;

        int count = jdbcTemplate.queryForObject(user_exists, paramSource , Integer.class);

        if(count > 0) return "Already Registered";

        jdbcTemplate.update(sql_query,paramSource);
        return "Registered";

        // how to redirect to home page or login page

    }

    public String generateSessionToken(String email)
    {
        Timestamp current_time = Timestamp.from(Instant.now());
        String token = email+ current_time;

        Timestamp  expire_time = new Timestamp(current_time.getTime());

        expire_time.setTime(expire_time.getTime() + ((1 * 60 * 60)* 1000)); // add to constant

        SessionObject session_info = new SessionObject(email, token, expire_time);
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(session_info);

        String add_session_token = "insert into sessions (user_id, token, expire) VALUES(:email, :token, :expire_time)";

        System.out.println('\n' + token + ' ' + expire_time + '\n');

        jdbcTemplate.update(add_session_token, paramSource);
        return token;
    }
    public String login(loginInfo info)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(info);

        String sql_query = "select * from users where email = :email and password = :password LIMIT 1";

        try {
            User user = jdbcTemplate.queryForObject(sql_query, paramSource,  UserRowMapper);
        }
        catch (EmptyResultDataAccessException e)
        {
            System.out.println(e);
            return "Error";
        }

        return generateSessionToken(info.getEmail());

    }

    public void logout(String sessionToken)
    {
        String logout_query = "delete from sessions where token = :token";
        Map sourceParams = new HashMap<>();
        sourceParams.put("token" , sessionToken);
        jdbcTemplate.update(logout_query, sourceParams);
    }

    public void insert(ContactDetails contact)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        String sql_insert = "insert into contacts(id, name, email, score)  VALUES(:id, :name, :email, :score)";
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
        String sql_update = "update contacts SET id = :id, name = :name, email = :email, score = :score where id = :id ";
        jdbcTemplate.update(sql_update, paramSource);
    }

    public void delete(ContactDetails contactID)
    {

        Map params = new HashMap<>();
        params.put("id", contactID.getId());

        System.out.println("Printed here" + contactID);

        String sql_delete = "delete from contacts where id = :id ";
        jdbcTemplate.update(sql_delete, params);
    }
}
