package com.vault.demo.controllers;

import com.vault.demo.dto.MediaItemDTO;
import com.vault.demo.models.MediaItem;
import com.vault.demo.models.User;
import com.vault.demo.repositories.MediaItemRepository;
import com.vault.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/media-items")
public class MediaItemController {
    
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
    @Autowired
    private MediaItemRepository mediaItemRepository;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadMediaItem(@RequestPart("file") MultipartFile file, @RequestPart("title") String title, @RequestPart(value = "tags", required = false) String tags, Principal principal) {
        try {
            MediaItem mediaItem = new MediaItem(title, deriveType(file.getContentType()), tags, LocalDate.now(), file.getOriginalFilename(), file.getBytes());
            mediaItem.setContentType(file.getContentType());
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            mediaItem.setUser(user);
            mediaItemRepository.save(mediaItem);
            return new ResponseEntity<>(MediaItemDTO.from(mediaItem), HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("Principal name: " + principal.getName());
            return new ResponseEntity<>("Error uploading media item: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllMediaItems(Principal principal) {
        List<MediaItemDTO> allMediaItems = mediaItemRepository.findByUserEmail(principal.getName()).stream().map(MediaItemDTO::from).toList();
        return new ResponseEntity<>(allMediaItems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMediaItemById(@PathVariable("id") Long id, Principal principal) {
        MediaItem mediaItem = mediaItemRepository.findById(id).orElse(null);
        if (mediaItem != null && mediaItem.getUser() != null && mediaItem.getUser().getEmail().equals(principal.getName())) {
            return new ResponseEntity<>(MediaItemDTO.from(mediaItem), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> getMediaBytesById(@PathVariable("id") Long id) {
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
    public ResponseEntity<?> updateMediaItem(@PathVariable("id") Long id, @RequestBody MediaItem mediaItem, Principal principal){
        MediaItem existingMediaItem = mediaItemRepository.findById(id).orElse(null);
        if (existingMediaItem != null && existingMediaItem.getUser() != null && existingMediaItem.getUser().getEmail().equals(principal.getName())) {
            if (mediaItem.getTitle() !=null) existingMediaItem.setTitle(mediaItem.getTitle());
            if (mediaItem.getType() !=null) existingMediaItem.setType(mediaItem.getType());
            if (mediaItem.getTags() !=null) existingMediaItem.setTags(mediaItem.getTags());
            if (mediaItem.getFileName() !=null)existingMediaItem.setFileName(mediaItem.getFileName());
            mediaItemRepository.save(existingMediaItem);
            return new ResponseEntity<>("Media item updated successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMediaItem(@PathVariable("id") Long id, Principal principal){
        MediaItem existingMediaItem = mediaItemRepository.findById(id).orElse(null);
        if (existingMediaItem != null && existingMediaItem.getUser() != null && existingMediaItem.getUser().getEmail().equals(principal.getName())) {
            mediaItemRepository.delete(existingMediaItem);
            return new ResponseEntity<>("Media item deleted successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Media item not found.", HttpStatus.NOT_FOUND);
        }
    }
}

