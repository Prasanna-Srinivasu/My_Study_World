package com.mystudyworld.backend.repository;

import com.mystudyworld.backend.model.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
}