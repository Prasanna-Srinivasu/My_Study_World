package com.mystudyworld.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/video")
@CrossOrigin(origins = "http://localhost:5173")
public class VideoController {

    @PostMapping("/description")
    public Map<String, Object> generateDescription(
            @RequestBody Map<String, String> request
    ) {

        String videoUrl = request.get("videoUrl");

        return Map.of(
                "success", true,
                "videoUrl", videoUrl,
                "message", "Video description service is ready."
        );
    }
}