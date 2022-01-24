package com.example.contacts.utils;

public interface DBConstants {

  interface TableNames {
    String Sessions = "sessions";
    String Contacts = "contacts";
    String Users = "users";
  }

  interface AuthQueries {
    String USER_INSERT = "INSERT INTO users(name, email, password) VALUES(:name, :email, :password)"; //IGNORE
    String USER_REGISTER = "INSERT IGNORE INTO users(name, email, password) VALUES(:name, :email, :password)";
    String SESSION_SELECT = "SELECT * FROM sessions WHERE session_token=:session_token";
    String USER_COUNT = "SELECT count(*) FROM users WHERE email=:email LIMIT 1";
  }

  interface Constants {
    long TIME_1_SEC = 1000;
    long TIME_1_MIN = 60 * TIME_1_SEC;
    long TIME_1_HOUR = 60 * TIME_1_MIN;
    long TIME_1_DAY = 24 * TIME_1_HOUR;
  }

  interface ContactsQueries {


    String SESSION_INSERT = "INSERT INTO sessions(session_token, user_id, expiry_time) VALUES(:session_token, :user_id, :expiry_time)";
    String USER_SELECT = "SELECT * FROM users WHERE email=:email AND password=:password LIMIT 1";
    String USER_SELECT_WHERE_ID = "SELECT * FROM users WHERE id=:id LIMIT 1";
    String SESSION_DELETE = "DELETE from sessions WHERE session_token=:session_token";
    String CONTACT_INSERT = "INSERT INTO contacts(user_id, name, contact, address, email, score)  VALUES(:userId, :name, :contact, :address, :email, :score)";
    String CONTACT_SELECT = "SELECT * FROM contacts WHERE user_id=:user_id";
    String CONTACT_UPDATE = "UPDATE contacts SET name=:name, contact=:contact, email=:email, address=:address, score=:score WHERE id=:id AND user_id=:userId";
    String CONTACT_DELETE = "DELETE from contacts WHERE user_id=:user_id AND id=:id";
  }
}
