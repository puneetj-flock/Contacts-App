package com.example.contacts.db;

import com.example.contacts.model.ContactDetails;

import static com.example.contacts.utils.DBConstants.ContactsQueries.*;
import static com.example.contacts.utils.ObjectRowMapper.ContactDetailsRowMapper;


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

  public List<ContactDetails> getContacts(Integer userId) {
    Map<String, Object> params = new HashMap<>();
    params.put("user_id", userId);
    return jdbcTemplate.query(CONTACT_SELECT, params, ContactDetailsRowMapper);
  }

  public void addContact(ContactDetails contact) {
    System.out.println("Contact Added here \n");
    System.out.println(contact);
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
    System.out.println(paramSource);
    int c = jdbcTemplate.update(CONTACT_INSERT, paramSource);

  }

  public void updateContact(ContactDetails contact) {
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
    jdbcTemplate.update(CONTACT_UPDATE, paramSource);
  }

  public void deleteContact(Integer userId, Integer contactId) {
    System.out.println("Contact Deleted\n");
    Map<String, Object> params = new HashMap<>();
    params.put("user_id", userId);
    params.put("id", contactId);
    jdbcTemplate.update(CONTACT_DELETE, params);
  }
}
