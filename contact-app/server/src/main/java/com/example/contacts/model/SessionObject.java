package com.example.contacts.model;

import java.sql.Timestamp;

public class SessionObject {
    private String token;
    private String email;
    private Timestamp expire_time;

    public SessionObject() {

    }
    public SessionObject(String email, String token, Timestamp expire_time)
    {
        this.email = email;
        this.expire_time = expire_time;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getExpire_time() {
        return expire_time;
    }

    public void setExpire_time(Timestamp expire_time) {
        this.expire_time = expire_time;
    }
}
