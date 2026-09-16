package com.vault.demo.dto;

import java.sql.Timestamp;

public class UserResponseDTO {

    private String email;
    private String name;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public UserResponseDTO(){}

    public UserResponseDTO(String email, String name, Timestamp createdAt, Timestamp updatedAt) {
        this.email = email;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}


