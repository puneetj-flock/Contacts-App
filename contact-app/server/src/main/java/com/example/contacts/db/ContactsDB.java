package com.example.contacts.db;

import com.example.contacts.model.ContactDetails;
import static com.example.contacts.utils.ObjectRowMapper.ContactDetailsRowMapper;
import static com.example.contacts.utils.Constants.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ContactsDB {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;
    
    public void insert(int userId, ContactDetails contact) {
        contact.setUserId(userId);
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        System.out.println(paramSource);
        jdbcTemplate.update(SQL_CONTACT_INS, paramSource);
    }

    public List<ContactDetails> get(Integer userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        return jdbcTemplate.query(SQL_CONTACT_SEL, params, ContactDetailsRowMapper);
    }

    public void update(Integer userId, ContactDetails contact) {
        contact.setUserId(userId);
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        jdbcTemplate.update(SQL_CONTACT_UPD, paramSource);
    }

    // check authorisation
    public void delete(Integer userId, Integer contactId) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        params.put("id", contactId);

        System.out.println("Printed here" + contactId);
        jdbcTemplate.update(SQL_CONTACT_DEL, params);
    }
}
