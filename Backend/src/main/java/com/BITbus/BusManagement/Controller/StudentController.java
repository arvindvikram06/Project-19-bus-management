package com.BITbus.BusManagement.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    @GetMapping("/student/hello")
    public String Hello(){
        return "hello from Student";
    }
}
