package com.example.contacts.model;

import java.sql.Timestamp;

import com.google.gson.annotations.SerializedName;

public class Sessions {
    @SerializedName("session_token")
    private String sessionToken;
    @SerializedName("user_id")
    private Integer userId;
    @SerializedName("expiry_time")
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
