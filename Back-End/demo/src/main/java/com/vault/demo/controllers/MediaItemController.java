package com.vault.demo.controllers;

import com.vault.demo.models.MediaItem;
import com.vault.demo.repositories.MediaItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;


import java.util.List;

@RestController
@RequestMapping("/media-items")
public class MediaItemController {

    @Autowired
    private MediaItemRepository mediaItemRepository;


    @GetMapping("/{id}")
    public ResponseEntity<?> getMediaItemById(@PathVariable Long id) {
        MediaItem mediaItem = mediaItemRepository.findById(id).orElse(null);
        if (mediaItem != null) {
            return new ResponseEntity<>(mediaItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllMediaItems() {
        List<MediaItem> allMediaItems = mediaItemRepository.findAll();
        return new ResponseEntity<>(allMediaItems, HttpStatus.OK);
        }

    @PostMapping("")
    public ResponseEntity<?> createdMediaItem(@RequestBody MediaItem mediaItem){
        MediaItem createdMediaItem = mediaItemRepository.save(mediaItem);
        mediaItem.setDateAdded(java.time.LocalDate.now());
        return new ResponseEntity<>(createdMediaItem, HttpStatus.CREATED);
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








