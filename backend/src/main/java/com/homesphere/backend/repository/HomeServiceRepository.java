package com.homesphere.backend.repository;

import com.homesphere.backend.model.HomeService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeServiceRepository extends JpaRepository<HomeService, Long> {
    // Believe it or not, this empty file gives you full CRUD power!
    // It automatically writes the SQL for findAll(), findById(), save(), and delete()
}