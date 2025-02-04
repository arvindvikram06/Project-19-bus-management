package com.BITbus.BusManagement.AuthService;

import com.BITbus.BusManagement.Entity.User;
import com.BITbus.BusManagement.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User saveUser(User user, String role) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(Collections.singletonList(role));
        return repo.save(user);
    }
}