package com.vault.demo.controllers;

import com.vault.demo.models.MediaItem;
import com.vault.demo.repositories.MediaItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.time.LocalDate;


import java.util.List;

@RestController
@RequestMapping("/media-items")
public class MediaItemController {

    @Autowired
    private MediaItemRepository mediaItemRepository;


    private String deriveType (String contentType) {
        if (contentType == null) {
            return "doc";
            } else if (contentType.startsWith("image/")) {
                return "image";
            } else if (contentType.startsWith("video/")) {
                return "video";
            } else if (contentType.startsWith("audio/")) {
                return "audio";
            } else if (contentType.equals("application/pdf")) {
                return "pdf";
            } else {
                return "doc";
            }
        }

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadMediaItem(@RequestPart("file") MultipartFile file, @RequestPart("title") String title, @RequestPart("tags") String tags) {
        try {
            MediaItem mediaItem = new MediaItem(title, deriveType(file.getContentType()), tags, LocalDate.now(), file.getOriginalFilename(), file.getBytes());
            mediaItem.setContentType(file.getContentType());
            mediaItemRepository.save(mediaItem);
            return new ResponseEntity<>(mediaItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error uploading media item: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllMediaItems() {
        List<MediaItem> allMediaItems = mediaItemRepository.findAll();
        return new ResponseEntity<>(allMediaItems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMediaItemById(@PathVariable Long id) {
        MediaItem mediaItem = mediaItemRepository.findById(id).orElse(null);
        if (mediaItem != null) {
            return new ResponseEntity<>(mediaItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> getMediaBytesById(@PathVariable Long id) {
        MediaItem mediaItem = mediaItemRepository.findById(id).orElse(null);
        MediaType mediaType;
        if (mediaItem != null) {
            if (mediaItem.getContentType() == null) {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            } else  {
               mediaType =  MediaType.parseMediaType(mediaItem.getContentType());
            }
            return ResponseEntity.ok().contentType(mediaType).body(mediaItem.getFileData());
            } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMediaItem(@PathVariable Long id, @RequestBody MediaItem mediaItem){
        MediaItem existingMediaItem = mediaItemRepository.findById(id).orElse(null);
        if (existingMediaItem != null) {
            existingMediaItem.setTitle(mediaItem.getTitle());
            existingMediaItem.setType(mediaItem.getType());
            existingMediaItem.setTags(mediaItem.getTags());
            existingMediaItem.setFileName(mediaItem.getFileName());
            mediaItemRepository.save(existingMediaItem);
            return new ResponseEntity<>("Media item updated successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMediaItem(@PathVariable Long id){
        MediaItem existingMediaItem = mediaItemRepository.findById(id).orElse(null);
        if (existingMediaItem != null) {
            mediaItemRepository.delete(existingMediaItem);
            return new ResponseEntity<>("Media item deleted successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }
}













