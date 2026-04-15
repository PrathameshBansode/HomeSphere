package com.homesphere.backend.controller;

import com.homesphere.backend.model.User;
import com.homesphere.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    
    // The Secret Key used to stamp our JWT tokens!
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already taken!");
        }

        // ---> MAGIC: Hash the password before saving! <---
        String hashedPassword = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashedPassword);

        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();

            // ---> MAGIC: Check the typed password against the hashed database password <---
            if (BCrypt.checkpw(loginRequest.getPassword(), existingUser.getPassword())) {
                
                // GENERATE THE JWT TOKEN
                String token = Jwts.builder()
                        .setSubject(existingUser.getEmail())
                        .claim("name", existingUser.getName())
                        .claim("role", existingUser.getRole())
                        .signWith(secretKey)
                        .compact();

                // Send both the Token and the User Data back to React
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", existingUser);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Error: Incorrect password!"));
            }
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Error: User not found!"));
    }
}