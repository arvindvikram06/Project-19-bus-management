package com.BITbus.BusManagement.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/admin/hello")
    public String hello(){
        return "hello from admin";
    }
}
