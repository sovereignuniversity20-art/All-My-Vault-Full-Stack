package com.vault.demo.services;

import com.vault.demo.models.Collection;
import com.vault.demo.models.MediaItem;
import com.vault.demo.models.User;
import com.vault.demo.repositories.CollectionRepository;
import com.vault.demo.repositories.MediaItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final MediaItemRepository mediaItemRepository;

    public CollectionService(CollectionRepository collectionRepository,
                             MediaItemRepository mediaItemRepository) {
        this.collectionRepository = collectionRepository;
        this.mediaItemRepository = mediaItemRepository;
    }

    public List<Collection> getCollectionsByUser(Long userId) {
        return collectionRepository.findByUserId(userId);
    }

    public Collection createCollection(String title, User user) {
        Collection collection = new Collection(title, user);
        return collectionRepository.save(collection);
    }

    public Collection updateCollection(Long id, String title, Long coverItemId) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        if (title != null) collection.setTitle(title);
        if (coverItemId != null) collection.setCoverItemId(coverItemId);

        return collectionRepository.save(collection);
    }

    public void deleteCollection(Long id) {
        List<MediaItem> items = mediaItemRepository.findByCollectionId(id);
        items.forEach(item -> item.setCollection(null));
        mediaItemRepository.saveAll(items);
        collectionRepository.deleteById(id);
    }

    public MediaItem assignItemToCollection(Long itemId, Long collectionId) {
        MediaItem item = mediaItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Media item not found"));

        if (collectionId == null) {
            item.setCollection(null);
        } else {
            Collection collection = collectionRepository.findById(collectionId)
                    .orElseThrow(() -> new RuntimeException("Collection not found"));
            item.setCollection(collection);
        }

        return mediaItemRepository.save(item);
    }
}