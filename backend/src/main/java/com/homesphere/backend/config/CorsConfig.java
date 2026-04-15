package com.homesphere.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply this rule to EVERY url in our app
                        .allowedOrigins("http://localhost:5173") // Allow your React frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // CRITICAL: Allow the OPTIONS preflight ping!
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}