package com.homesphere.backend.repository;

import com.homesphere.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Custom database search: Finds a user by their exact email!
    Optional<User> findByEmail(String email);
}