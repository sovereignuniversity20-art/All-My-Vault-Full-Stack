package com.vault.demo.repositories;

import com.vault.demo.models.MediaItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaItemRepository extends JpaRepository<MediaItem, Long> {

}
