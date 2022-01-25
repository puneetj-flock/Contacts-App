package com.example.contacts.model;

import com.google.gson.annotations.SerializedName;

public class SessionData {
  @SerializedName("session_token")
  private String sessionToken;
  @SerializedName("user_id")
  private Integer userId;
  @SerializedName("name")
  private String name;
  @SerializedName("email")
  private String email;

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

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
