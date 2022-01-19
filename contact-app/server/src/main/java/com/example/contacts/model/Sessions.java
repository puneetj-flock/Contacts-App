package com.example.contacts.model;

import java.sql.Timestamp;

public class Sessions {
    private String sessionToken;
    private Integer userId;
    private Timestamp expiryTime;

    public String getToken() {
        return sessionToken;
    }

    public void setToken(String sessionToken) {
        this.sessionToken = sessionToken;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Timestamp getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Timestamp expiryTime) {
        this.expiryTime = expiryTime;
    }
}
