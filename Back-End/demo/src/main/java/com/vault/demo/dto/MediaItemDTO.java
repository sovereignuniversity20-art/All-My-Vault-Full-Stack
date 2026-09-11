package com.vault.demo.dto;

import com.vault.demo.models.MediaItem;
import java.time.LocalDate;

public class MediaItemDTO {

    private Long id;
    private String title;
    private String type;
    private String tags;
    private LocalDate dateAdded;
    private String fileName;
    private Long userId;
    private String contentType;

    public MediaItemDTO() {}

    public MediaItemDTO(Long id, String title, String type, String tags, LocalDate dateAdded, String fileName, Long userId, String contentType) {

        this.id = id;
        this.title = title;
        this.type = type;
        this.tags = tags;
        this.dateAdded = dateAdded;
        this.fileName = fileName;
        this.userId = userId;
        this.contentType = contentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getUserId() {
        return userId;
    }


    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public static MediaItemDTO from(MediaItem item){
        return new MediaItemDTO(
                item.getId(),
                item.getTitle(),
                item.getType(),
                item.getTags(),
                item.getDateAdded(),
                item.getFileName(),
                item.getUser() != null ? item.getUser().getId() : null,
                item.getContentType()
        );
    }
}
