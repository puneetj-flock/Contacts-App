package com.example.contacts.model;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class Sessions {
  @SerializedName("session_token")
  private String sessionToken;
  @SerializedName("user_id")
  private Integer userId;
  @SerializedName("expiry_time")
  private Timestamp expiryTime;

  public String getSessionToken() {
    return sessionToken;
  }

  public void setSessionToken(String sessionToken) {
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
