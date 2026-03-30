package com.skillforge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "subject", length = 100)
    private String subject;

    @Column(name = "difficulty_level", length = 20)
    private String difficultyLevel; // BEGINNER / INTERMEDIATE / ADVANCED

    @Column(name = "instructor_id", nullable = false)
    private Long instructorId; // FK to users.id where role=INSTRUCTOR

    public Course() {}

    public Course(String title, String subject, String difficultyLevel, Long instructorId) {
        this.title = title;
        this.subject = subject;
        this.difficultyLevel = difficultyLevel;
        this.instructorId = instructorId;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getSubject() { return subject; }

    public void setSubject(String subject) { this.subject = subject; }

    public String getDifficultyLevel() { return difficultyLevel; }

    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }

    public Long getInstructorId() { return instructorId; }

    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }
}
