package com.example.contacts.utils;

public class Constants {

    static public long TIME_1_SEC = 1000;
    static public long TIME_1_MIN = 60 * TIME_1_SEC;
    static public long TIME_1_HOUR = 60 * TIME_1_MIN;
    static public long TIME_1_DAY = 24 * TIME_1_HOUR;

    static public String SQL_SESSION_SEL = "SELECT * FROM sessions WHERE session_token=:session_token";
    static public String SQL_USER_INS = "INSERT INTO users(name, email, password) VALUES(:name, :email, :password)"; //IGNORE
    static public String SQL_USER_CNT = "SELECT count(*) FROM users WHERE email=:email LIMIT 1";
    static public String SQL_USER_REGISTER = "INSERT IGNORE INTO users(name, email, password) VALUES(:name, :email, :password)";
    static public String SQL_SESSION_INS = "INSERT INTO sessions(session_token, user_id, expiry_time) VALUES(:session_token, :user_id, :expiry_time)";
    static public String SQL_USER_SEL = "SELECT * FROM users WHERE email=:email AND password=:password LIMIT 1";
    static public String SQL_SESSION_DEL = "DELETE from sessions WHERE session_token=:session_token";
    static public String SQL_CONTACT_INS = "INSERT INTO contacts(user_id, name, contact, address, email, score)  VALUES(:userId, :name, :contact, :address, :email, :score)";
    static public String SQL_CONTACT_SEL = "SELECT * FROM contacts WHERE user_id=:user_id";
    static public String SQL_CONTACT_UPD = "UPDATE contacts SET name=:name, contact=:contact, email=:email, address=:address, score=:score WHERE id=:id AND user_id=:userId";
    static public String SQL_CONTACT_DEL = "DELETE from contacts WHERE user_id=:user_id AND id=:id";
}
//static import