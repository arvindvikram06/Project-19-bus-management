package com.BITbus.BusManagement.AuthController;

import com.BITbus.BusManagement.AuthService.UserService;
import com.BITbus.BusManagement.Entity.User;
import com.BITbus.BusManagement.JwtUtil.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user, @RequestParam String role) {
        return ResponseEntity.ok(userService.saveUser(user, role));
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        // Generate the token after successful authentication
        String token = jwtService.generateToken(user.getUsername());
        return token;
        // Create a cookie with the JWT

    }

}
