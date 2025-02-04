package com.BITbus.BusManagement.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FacultyController {
    @GetMapping("/faculty/hello")
    public String Hello(){
        return "hello from Faculty";
    }
}
