package com.BITbus.BusManagement.Repository;
import com.BITbus.BusManagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
