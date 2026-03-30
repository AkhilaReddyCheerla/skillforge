package com.skillforge.controller;

import com.skillforge.dto.CourseDto;
import com.skillforge.model.Course;
import com.skillforge.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody CourseDto dto) {
        Long instructorId = 1L; // TEMP fixed instructor

        Course course = new Course(
                dto.getTitle(),
                dto.getSubject(),
                dto.getDifficultyLevel(),
                instructorId
        );

        Course saved = courseRepository.save(course);
        return ResponseEntity
                .created(URI.create("/api/courses/" + saved.getId()))
                .body(saved);
    }

    @GetMapping("/my")
    public List<Course> getMyCourses() {
        Long instructorId = 1L;
        return courseRepository.findByInstructorId(instructorId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody CourseDto dto
    ) {
        Long instructorId = 1L;

        return courseRepository.findById(id)
                .filter(c -> c.getInstructorId().equals(instructorId))
                .map(existing -> {
                    existing.setTitle(dto.getTitle());
                    existing.setSubject(dto.getSubject());
                    existing.setDifficultyLevel(dto.getDifficultyLevel());
                    Course updated = courseRepository.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        Long instructorId = 1L;

        return courseRepository.findById(id)
                .filter(c -> c.getInstructorId().equals(instructorId))
                .map(c -> {
                    courseRepository.delete(c);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
