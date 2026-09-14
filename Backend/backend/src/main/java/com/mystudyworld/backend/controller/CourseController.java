package com.mystudyworld.backend.controller;

import com.mystudyworld.backend.model.CourseEntity;
import com.mystudyworld.backend.repository.CourseRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<CourseEntity> getCourses() {
        return courseRepository.findAll();
    }
}