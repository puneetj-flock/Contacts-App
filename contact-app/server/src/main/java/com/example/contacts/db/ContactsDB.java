package com.example.contacts.db;

import com.example.contacts.model.ContactDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.contacts.utils.DBConstants.ContactsQueries.*;
import static com.example.contacts.utils.ObjectRowMapper.ContactDetailsRowMapper;

@Repository
public class ContactsDB {

  @Autowired
  private NamedParameterJdbcTemplate jdbcTemplate;

  public List<ContactDetails> getContacts(Integer userId) {
    Map<String, Object> params = new HashMap<>();
    params.put("user_id", userId);
    return jdbcTemplate.query(CONTACT_SELECT, params, ContactDetailsRowMapper);
  }

  public ContactDetails addContact(ContactDetails contact) {
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
    KeyHolder keyHolder = new GeneratedKeyHolder();
    jdbcTemplate.update(CONTACT_INSERT, paramSource, keyHolder, new String[] { "id" });
    contact.setId(keyHolder.getKey().intValue());
    return contact;
  }

  public void updateContact(ContactDetails contact) {
    BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
    jdbcTemplate.update(CONTACT_UPDATE, paramSource);
  }

  public void deleteContact(Integer userId, Integer contactId) {
    Map<String, Object> params = new HashMap<>();
    params.put("user_id", userId);
    params.put("id", contactId);
    jdbcTemplate.update(CONTACT_DELETE, params);
  }
}
