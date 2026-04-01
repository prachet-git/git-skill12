package com.klu.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klu.model.Student;
import com.klu.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    public List<Student> getAllStudents(){
        return repo.findAll();
    }

    public Student saveStudent(Student student){
        return repo.save(student);
    }

    public Student updateStudent(Long id, Student student){
        student.setId(id);
        return repo.save(student);
    }

    public void deleteStudent(Long id){
        repo.deleteById(id);
    }
}