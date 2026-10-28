package com.vault.demo.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Long coverItemId;

    private LocalDate createdAt;

    public Collection() {}

    public Collection(String title, User user) {
        this.title = title;
        this.user = user;
        this.createdAt = LocalDate.now();
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Long getCoverItemId() { return coverItemId; }
    public void setCoverItemId(Long coverItemId) { this.coverItemId = coverItemId; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Collection that = (Collection) o;
        return Objects.equals(id, that.id) && Objects.equals(title, that.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title);
    }
}