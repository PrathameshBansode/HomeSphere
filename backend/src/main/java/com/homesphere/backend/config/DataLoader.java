package com.homesphere.backend.config;

import com.homesphere.backend.model.HomeService;
import com.homesphere.backend.repository.HomeServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(HomeServiceRepository repository) {
        return args -> {
            // Check if the database is empty before adding data
            if (repository.count() == 0) {
                
                HomeService acRepair = new HomeService();
                acRepair.setTitle("AC Service & Repair");
                acRepair.setCategory("electrician");
                acRepair.setRating(4.8);
                acRepair.setReviews(1204);
                acRepair.setPrice(new BigDecimal("499.00"));
                acRepair.setImage("https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop");
                acRepair.setShortDesc("Expert cooling check, filter cleaning, and gas refill.");
                acRepair.setBestseller(true);

                HomeService cleaning = new HomeService();
                cleaning.setTitle("Deep Home Cleaning");
                cleaning.setCategory("cleaning");
                cleaning.setRating(4.8);
                cleaning.setReviews(2100);
                cleaning.setPrice(new BigDecimal("1499.00"));
                cleaning.setImage("https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop");
                cleaning.setShortDesc("Intensive whole-home cleaning with professional gear.");
                cleaning.setBestseller(true);

                HomeService tutor = new HomeService();
                tutor.setTitle("Math & Science Tutor");
                tutor.setCategory("tutor");
                tutor.setRating(4.9);
                tutor.setReviews(156);
                tutor.setPrice(new BigDecimal("500.00"));
                tutor.setImage("https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop");
                tutor.setShortDesc("Personalized tutoring for K-12 and competitive exams.");
                tutor.setBestseller(false);

                // Save them to PostgreSQL!
                repository.saveAll(List.of(acRepair, cleaning, tutor));
                
                System.out.println("✅ Successfully seeded database with real images!");
            }
        };
    }
}