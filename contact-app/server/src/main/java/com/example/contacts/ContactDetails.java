package com.example.contacts;

import java.util.Date;

public class ContactDetails {
    private Integer id;
    private User user;
    private String name;
    private String email;
//    private String address;
//    private Date date;
    private Integer score;

    public ContactDetails(Integer id, User user, String name, String email, Integer score) {
        this.id = id;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
