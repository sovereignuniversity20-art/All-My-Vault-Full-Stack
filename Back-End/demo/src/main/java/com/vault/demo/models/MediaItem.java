package com.vault.demo.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Objects;


@Entity
public class MediaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private String title;
    private String type;
    private String tags;
    private LocalDate dateAdded;
    private String fileName;

    @Lob
    private byte[] fileData;

    public MediaItem() {}

    public MediaItem(String title, String type, String tags, LocalDate dateAdded, String fileName, byte[] fileData) {
        this.title = title;
        this.type = type;
        this.tags = tags;
        this.dateAdded = dateAdded;
        this.fileName = fileName;
        this.fileData = fileData;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }
    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MediaItem mediaItem = (MediaItem) o;
        return Objects.equals(id, mediaItem.id) && Objects.equals(title, mediaItem.title) && Objects.equals(type, mediaItem.type)
                && Objects.equals(tags, mediaItem.tags) && Objects.equals(dateAdded, mediaItem.dateAdded)
                && Objects.equals(fileName, mediaItem.fileName) && Arrays.equals(fileData, mediaItem.fileData);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, type, tags, dateAdded, fileName, Arrays.hashCode(fileData));
    }

}
