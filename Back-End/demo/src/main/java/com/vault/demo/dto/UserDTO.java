package com.vault.demo.dto;

import java.sql.Timestamp;

public class UserDTO {

    private String email;
    private String firstname;
    private String lastname;
    private String password;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public UserDTO(){}

    public UserDTO(String email, String firstname, String lastname, String password ) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;

    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
