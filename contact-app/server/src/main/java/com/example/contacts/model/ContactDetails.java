package com.example.contacts.model;

public class ContactDetails {
    private Integer id;
    private Integer userId;
    private String name;
    private String email;
//    private String address;
//    private Date date;
    private Integer score;

    public ContactDetails() {}

    public ContactDetails(Integer id, Integer userId, String name, String email, Integer score) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.score = score;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
