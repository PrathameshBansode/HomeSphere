package com.homesphere.backend.controller;

import com.homesphere.backend.model.HomeService;
import com.homesphere.backend.repository.HomeServiceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173") 
public class HomeServiceController {

    private final HomeServiceRepository repository;

    public HomeServiceController(HomeServiceRepository repository) {
        this.repository = repository;
    }

    // ==========================================
    // 1. READ ALL (Get the full list)
    // ==========================================
    @GetMapping
    public List<HomeService> getAllServices() {
        return repository.findAll();
    }

    // ==========================================
    // 2. READ ONE (Get details for a single service)
    // ==========================================
    @GetMapping("/{id}")
    public HomeService getServiceById(@PathVariable Long id) {
        // Searches the DB for the ID. If it doesn't exist, it throws an error.
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }

    // ==========================================
    // 3. CREATE (Add a new service)
    // ==========================================
    @PostMapping
    public HomeService createService(@RequestBody HomeService newService) {
        return repository.save(newService); 
    }

    // ==========================================
    // 4. UPDATE (Edit an existing service)
    // ==========================================
    @PutMapping("/{id}")
    public HomeService updateService(@PathVariable Long id, @RequestBody HomeService updatedData) {
        // First, find the exact service the user wants to edit
        HomeService existingService = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));

        // Update the fields with the new data from React
        existingService.setTitle(updatedData.getTitle());
        existingService.setCategory(updatedData.getCategory());
        existingService.setPrice(updatedData.getPrice());
        existingService.setImage(updatedData.getImage());
        existingService.setShortDesc(updatedData.getShortDesc());
        existingService.setBestseller(updatedData.getBestseller());

        // Save the updated version back to PostgreSQL
        return repository.save(existingService);
    }

    // ==========================================
    // 5. DELETE (Remove a service forever)
    // ==========================================
    @DeleteMapping("/{id}")
    public String deleteService(@PathVariable Long id) {
        repository.deleteById(id);
        return "Service deleted successfully!";
    }
}