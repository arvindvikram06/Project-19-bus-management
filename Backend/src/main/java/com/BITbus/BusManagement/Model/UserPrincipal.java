package com.BITbus.BusManagement.Model;

import com.BITbus.BusManagement.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {

    private static final long serialVersionUID = 1L;

    private User user;
    private List<String> roles; // Add a field for roles

    public UserPrincipal(User user, List<String> roles) { // Update constructor
        this.user = user;
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // Return the encoded password
    }

    @Override
    public String getUsername() {
        return user.getUsername(); // Return the username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // You can implement logic to check if the account is expired
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // You can implement logic to check if the account is locked
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // You can implement logic to check if credentials are expired
    }

    @Override
    public boolean isEnabled() {
        return true; // You can implement logic to check if the account is enabled
    }

    public User getUser() {
        return user; // Return the User entity if needed
    }
}
