package com.vault.demo.controllers;

import com.vault.demo.models.Collection;
import com.vault.demo.models.MediaItem;
import com.vault.demo.models.User;
import com.vault.demo.services.CollectionService;
import com.vault.demo.services.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    private final CollectionService collectionService;
    private final UserServiceImpl userService;

    public CollectionController(CollectionService collectionService,
                                UserServiceImpl userService) {
        this.collectionService = collectionService;
        this.userService = userService;
    }

    // GET /collections — all collections for logged-in user
    @GetMapping
    public ResponseEntity<List<Collection>> getCollections(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        List<Collection> collections = collectionService.getCollectionsByUser(user.getId());
        return ResponseEntity.ok(collections);
    }

    // POST /collections — create a new collection
    @PostMapping
    public ResponseEntity<Collection> createCollection(@RequestBody Map<String, String> body,
                                                       Principal principal) {
        User user = userService.findByEmail(principal.getName());
        Collection created = collectionService.createCollection(body.get("title"), user);
        return ResponseEntity.ok(created);
    }

    // PUT /collections/{id} — rename or change cover
    @PutMapping("/{id}")
    public ResponseEntity<Collection> updateCollection(@PathVariable Long id,
                                                       @RequestBody Map<String, Object> body) {
        String title = (String) body.get("title");
        Long coverItemId = body.get("coverItemId") != null
                ? Long.valueOf(body.get("coverItemId").toString())
                : null;

        Collection updated = collectionService.updateCollection(id, title, coverItemId);
        return ResponseEntity.ok(updated);
    }

    // DELETE /collections/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long id) {
        collectionService.deleteCollection(id);
        return ResponseEntity.noContent().build();
    }

    // PATCH /media-items/{id}/collection — assign or remove item from collection
    @PatchMapping("/media-items/{id}/collection")
    public ResponseEntity<MediaItem> assignToCollection(@PathVariable Long id,
                                                        @RequestBody Map<String, Object> body) {
        Long collectionId = body.get("collectionId") != null
                ? Long.valueOf(body.get("collectionId").toString())
                : null;

        MediaItem updated = collectionService.assignItemToCollection(id, collectionId);
        return ResponseEntity.ok(updated);
    }
}