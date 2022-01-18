package com.example.contacts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class JdbcRepo {
    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    class ContactDetailsRowMapper implements RowMapper<ContactDetails> {
        @Override
        public ContactDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
            ContactDetails contact = new ContactDetails();
            contact.setId(rs.getInt("id"));
            contact.setName(rs.getString("name"));
            contact.setEmail(rs.getString("email"));
            // contact.setUser(rs.getString("user"));
            contact.setScore(rs.getInt("score"));
            return contact;
        }
    }

    public void insert(ContactDetails contact)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        String sql_insert = "insert into contacts(id, name, email, score)  VALUES(:id, :name, :email, :score)";
        jdbcTemplate.update(sql_insert, paramSource);
    }

    public List<ContactDetails> get(String name)
    {
        String sql_get = "select * from contacts where name like '" + name + "%'";
        return jdbcTemplate.query(sql_get, new ContactDetailsRowMapper());
    }

    public void update(ContactDetails contact)
    {
        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        String sql_update = "update contacts SET id = :id, name = :name, email = :email,score = :score where id = :id ";
        jdbcTemplate.update(sql_update, paramSource);
    }

    public void delete(ContactDetails contactID)
    {
//        BeanPropertySqlParameterSource paramSource = new BeanPropertySqlParameterSource(contact);
        Map params = new HashMap<>();
        params.put("id", contactID.getId());

        System.out.println("Printed here" + contactID);

        String sql_delete = "delete from contacts where id = :id ";
        jdbcTemplate.update(sql_delete, params);
    }
}
