package com.codetree.gamification.controller;

import com.codetree.gamification.model.UserProgress;
import com.codetree.gamification.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gamification")
public class GamificationController {

    @Autowired
    private UserProgressRepository userProgressRepository;

    @GetMapping("/progress/{userId}")
    public ResponseEntity<UserProgress> getUserProgress(@PathVariable String userId) {
        return userProgressRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/progress/{userId}/add-points")
    public ResponseEntity<UserProgress> addPoints(@PathVariable String userId, @RequestParam int points) {
        UserProgress progress = userProgressRepository.findByUserId(userId).orElse(new UserProgress(userId, 0, 1));
        
        progress.setPoints(progress.getPoints() + points);
        
        // Simple leveling logic: 100 points per level
        progress.setLevel((progress.getPoints() / 100) + 1);
        
        UserProgress saved = userProgressRepository.save(progress);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<UserProgress>> getLeaderboard() {
        return ResponseEntity.ok(userProgressRepository.findAll());
    }
}
