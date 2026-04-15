package com.homesphere.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "services") // This tells PostgreSQL to name the table "services"
public class HomeService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Automatically generates 1, 2, 3...

    @Column(nullable = false)
    private String title;

    private String category;
    
    private Double rating;
    
    private Integer reviews;
    
    private BigDecimal price; // BigDecimal is the industry standard for handling exact money values
    
    private String icon;
    
    @Column(length = 1000) // Allows for longer image URLs
    private String image;
    
    @Column(name = "short_desc")
    private String shortDesc;

    @Column(columnDefinition = "TEXT") // TEXT allows for super long paragraphs
    private String longDesc;

    private Boolean bestseller;

    // --- GETTERS AND SETTERS ---
    // (In Java, we keep variables private and use public methods to access them safely)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getShortDesc() { return shortDesc; }
    public void setShortDesc(String shortDesc) { this.shortDesc = shortDesc; }

    public String getLongDesc() { return longDesc; }
    public void setLongDesc(String longDesc) { this.longDesc = longDesc; }

    public Boolean getBestseller() { return bestseller; }
    public void setBestseller(Boolean bestseller) { this.bestseller = bestseller; }
}