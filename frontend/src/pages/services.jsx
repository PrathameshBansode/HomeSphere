import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Services() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  
  // 1. We replaced the hardcoded array with an empty state basket
  const [servicesData, setServicesData] = useState([]);

  // 2. We added the useEffect to fetch real data from PostgreSQL!
  useEffect(() => {
    fetch('http://localhost:8080/api/services')
      .then(response => response.json())
      .then(data => {
        setServicesData(data);
        console.log("Loaded from Database:", data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const categories = [
    { id: "all", label: "All Services" },
    { id: "Appliance", label: "Electrical" }, // Updated to match Java DB categories
    { id: "Cleaning", label: "Cleaning" },    // Updated to match Java DB categories
    { id: "plumber", label: "Plumbing" },
    { id: "tutor", label: "Tutoring" },
    { id: "fitness", label: "Fitness" },
  ];

  let filteredServices = servicesData.filter((service) => {
    // 3. Updated this logic to match the new database fields (like shortDesc instead of desc)
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    
    // Safety check: Make sure shortDesc isn't null before trying to search it
    const descText = service.shortDesc ? service.shortDesc.toLowerCase() : "";
    const titleText = service.title ? service.title.toLowerCase() : "";
    
    const matchesSearch = titleText.includes(search.toLowerCase()) || descText.includes(search.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "rating") filteredServices.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "price_low") filteredServices.sort((a, b) => a.price - b.price); // DB uses 'price'

  return (
    <div className="bg-stone-50 min-h-screen pb-24 font-sans">
      
      {/* 1. DARK HERO HEADER */}
      <div className="bg-teal-950 pt-16 pb-28 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-teal-200/60 mb-4 flex items-center gap-2 font-medium tracking-wide">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Explore Services
          </h1>
        </div>
      </div>

      {/* 2. OVERLAPPING CONTROL PANEL */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col gap-4">
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-stone-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="What do you need help with?"
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-transparent rounded-2xl text-teal-950 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-medium"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[200px]">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-full px-5 py-3.5 bg-stone-50 border border-transparent rounded-2xl text-teal-950 font-medium outline-none appearance-none cursor-pointer focus:bg-white focus:border-emerald-500 transition-all"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price_low">Price: Low to High</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-teal-950 text-white shadow-md"
                    : "bg-transparent text-stone-500 hover:bg-stone-100 hover:text-teal-950"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 3. FLUID SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        
        <div className="mb-6 flex justify-between items-end border-b border-stone-200 pb-4">
          <p className="text-stone-500 font-bold tracking-wider uppercase text-xs">
            {filteredServices.length} {filteredServices.length === 1 ? 'Result' : 'Results'} Found
          </p>
        </div>

        {filteredServices.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Link 
                    to={`/services/${service.id}`}
                    className="block group h-full"
                  >
                    <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
                      
                      {/* Image Container */}
                      <div className="relative h-52 overflow-hidden bg-stone-100 flex items-center justify-center">
                        {/* Fallback if no image URL exists yet */}
                        {service.image ? (
                           <img 
                             src={service.image} 
                             alt={service.title}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                           />
                        ) : (
                           <span className="text-6xl">{service.icon === 'Sparkles' ? '✨' : '🔧'}</span>
                        )}
                        
                        {service.bestseller && (
                          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-teal-950 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                            Bestseller
                          </span>
                        )}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-teal-950/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                          <span className="text-emerald-400">★</span> {service.rating} 
                          <span className="text-teal-200 text-xs font-semibold ml-1">({service.reviews})</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-black text-teal-950 mb-2 group-hover:text-emerald-600 transition-colors">
                          {service.title}
                        </h3>
                        
                        <p className="text-stone-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-2">
                          {service.shortDesc} {/* DB uses shortDesc */}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                          <div>
                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-0.5">Starts at</p>
                            <p className="text-lg font-black text-teal-950">₹{service.price}</p> {/* DB uses price */}
                          </div>
                          <span className="text-teal-950 font-bold text-sm bg-stone-100 px-5 py-2.5 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                            Book Now
                          </span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-16 text-center border border-stone-100 shadow-sm mt-8"
          >
            <div className="text-5xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-black text-teal-950 mb-2">No services found</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto mb-6">
              We couldn't find any services matching your current filters.
            </p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory('all'); setSortBy('recommended'); }}
              className="bg-stone-100 text-teal-950 px-6 py-3 rounded-xl font-bold hover:bg-stone-200 transition-colors text-sm"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
}

export default Services;