package com.BITbus.BusManagement.AuthService;

import com.BITbus.BusManagement.Entity.User;
import com.BITbus.BusManagement.Model.UserPrincipal;
import com.BITbus.BusManagement.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MyUserDetailService implements UserDetailsService {

        @Autowired
        private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username);

        if (user == null) {
            System.out.println("User 404");
            throw new UsernameNotFoundException("User 404");
        }

        List<String> roles = user.getRoles(); // Assuming User has a getRoles() method
        return new UserPrincipal(user, roles); // Pass roles to UserPrincipal
    }

}
