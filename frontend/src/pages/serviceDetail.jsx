import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Added to route the user to checkout
  
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Synced with the high-quality images from your Services page
  const servicesData = [
    { 
      id: 1, title: "AC Service & Repair", category: "electrician", rating: 4.8, reviews: 1204, price: "₹499", icon: "❄️", 
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
      desc: "Expert cooling check, filter cleaning, and gas refill.",
      longDesc: "Keep your AC running at peak efficiency with our comprehensive servicing. Our verified technicians use high-pressure jet pumps to clean the indoor and outdoor units, ensuring up to 2x better cooling and lower electricity bills.",
      includes: ["Deep cleaning of indoor & outdoor units", "Cooling coil inspection", "Gas pressure check", "Drain pipe unblocking"],
      bestseller: true 
    },
    { 
      id: 2, title: "Expert Electrician", category: "electrician", rating: 4.7, reviews: 843, price: "₹299", icon: "⚡", 
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      desc: "Wiring, appliance repair, and panel upgrades.",
      longDesc: "Safe and reliable electrical solutions for your home. From fixing a simple switchboard to complete house rewiring, our certified electricians handle it all with strict safety protocols.",
      includes: ["Fault diagnosis", "Switch & socket replacement", "MCB panel inspection", "Appliance installation (TV, Geyser, etc.)"],
      bestseller: false 
    },
    { 
      id: 3, title: "Math & Science Tutor", rating: 4.9, reviews: 156, price: "₹500/hr", icon: "📐", 
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop",
      desc: "Personalized tutoring.", longDesc: "Detailed tutoring plans for maximum academic growth. Our verified tutors focus on fundamental concepts to ensure long-term retention.", includes: ["1-on-1 sessions", "Weekly mock tests", "Progress tracking"], bestseller: false 
    },
    { 
      id: 4, title: "Personal Trainer", rating: 4.9, reviews: 312, price: "₹800/session", icon: "🏋️", 
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      desc: "Customized workouts.", longDesc: "Transform your body with scientific workout routines and diet plans from certified fitness experts, right in your living room.", includes: ["Diet plan", "Posture correction", "Equipment provided"], bestseller: true 
    },
    { 
      id: 5, title: "Deep Home Cleaning", rating: 4.8, reviews: 2100, price: "₹1499", icon: "🧹", 
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
      desc: "Intensive cleaning.", longDesc: "Top to bottom deep clean of your entire house using industrial-grade, eco-friendly chemicals that are safe for pets and children.", includes: ["Floor scrubbing", "Bathroom descaling", "Kitchen degreasing", "Dusting of all fixtures"], bestseller: true 
    },
    { 
      id: 6, title: "Plumbing Fixes", rating: 4.6, reviews: 530, price: "₹199", icon: "🔧", 
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200&auto=format&fit=crop",
      desc: "Leak repairs.", longDesc: "Professional plumbing services to fix leaks, unclog drains, and install new fixtures. Fast, clean, and durable fixes.", includes: ["Leak detection", "Tap replacement", "Drain unblocking", "Pipe sealing"], bestseller: false 
    },
  ];

  const service = servicesData.find((s) => s.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookNow = () => {
    if (!selectedTime) {
      alert("Please select a time slot first!");
      return;
    }
    setIsBooking(true);
    
    // Simulate processing, then navigate to the checkout page!
    setTimeout(() => {
      setIsBooking(false);
      navigate('/checkout'); // Teleports the user to the checkout page
    }, 1000);
  };

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-stone-50">
        <h1 className="text-3xl font-black text-teal-950 mb-4">Service Not Found</h1>
        <Link to="/services" className="text-emerald-600 hover:text-emerald-700 font-bold">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-8">
        
        {/* Breadcrumbs */}
        <div className="text-sm text-stone-500 mb-8 flex items-center gap-2 font-medium">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
          <span>/</span>
          <span className="text-teal-950">{service.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT COLUMN: Service Details */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-stone-100 mb-8 overflow-hidden">
              
              {/* High-End Hero Image */}
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/60 to-transparent"></div>
                {service.bestseller && (
                  <span className="absolute top-4 left-4 bg-white text-teal-950 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    Bestseller
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-teal-950 mb-4 tracking-tight">
                    {service.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm font-bold">
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100">
                      ★ {service.rating}
                    </div>
                    <span className="text-stone-400 underline decoration-stone-200 underline-offset-4 cursor-pointer hover:text-teal-950 transition-colors">
                      {service.reviews} Verified Reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-8 mt-4">
                <h2 className="text-2xl font-black text-teal-950 mb-4">About this service</h2>
                <p className="text-stone-500 leading-relaxed text-lg">
                  {service.longDesc}
                </p>
              </div>

              <div className="border-t border-stone-100 pt-8 mt-8">
                <h2 className="text-2xl font-black text-teal-950 mb-6">What's included?</h2>
                <ul className="space-y-4">
                  {service.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <span className="text-stone-600 font-medium text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Premium Trust Banner */}
            <div className="bg-teal-950 text-white p-8 rounded-[2rem] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px]"></div>
              <div className="text-5xl relative z-10">🛡️</div>
              <div className="relative z-10 text-center sm:text-left">
                <h3 className="font-black text-2xl mb-2">HomeSphere Guarantee</h3>
                <p className="text-teal-200 text-sm leading-relaxed max-w-md">Verified professionals, secure payments, and a 30-day rework warranty if you aren't completely satisfied.</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Sticky Booking Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 sticky top-28">
              
              <div className="mb-8 pb-6 border-b border-stone-100">
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-2">Starting Price</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-teal-950">{service.price}</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="font-black text-teal-950 mb-4">Select Date</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSelectedDate("today")}
                    className={`py-3.5 rounded-xl border-2 font-bold transition-all ${
                      selectedDate === "today" ? "border-emerald-500 bg-emerald-50/50 text-teal-950" : "border-stone-100 text-stone-500 hover:border-stone-200"
                    }`}
                  >
                    Today
                  </button>
                  <button 
                    onClick={() => setSelectedDate("tomorrow")}
                    className={`py-3.5 rounded-xl border-2 font-bold transition-all ${
                      selectedDate === "tomorrow" ? "border-emerald-500 bg-emerald-50/50 text-teal-950" : "border-stone-100 text-stone-500 hover:border-stone-200"
                    }`}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-8">
                <h3 className="font-black text-teal-950 mb-4">Select Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["10:00 AM", "12:30 PM", "03:00 PM", "05:00 PM", "06:30 PM"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 text-sm rounded-xl border font-bold transition-all ${
                        selectedTime === time ? "border-emerald-500 bg-emerald-500 text-teal-950 shadow-md shadow-emerald-500/20" : "border-stone-100 text-stone-500 hover:border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleBookNow}
                disabled={isBooking}
                className="w-full bg-emerald-500 text-teal-950 py-5 rounded-xl font-black text-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 disabled:bg-stone-200 disabled:text-stone-400 flex justify-center items-center gap-2 uppercase tracking-wide"
              >
                {isBooking ? (
                  <span className="animate-pulse">Loading secure checkout...</span>
                ) : (
                  <>Book {service.category === 'tutor' || service.category === 'fitness' ? 'Session' : 'Service'}</>
                )}
              </button>
              <p className="text-center text-xs text-stone-400 font-medium mt-4">You won't be charged yet</p>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;