package com.skillforge.dto;

public class CourseDto {

    private String title;
    private String subject;
    private String difficultyLevel;

    public CourseDto() {}

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getSubject() { return subject; }

    public void setSubject(String subject) { this.subject = subject; }

    public String getDifficultyLevel() { return difficultyLevel; }

    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
}
