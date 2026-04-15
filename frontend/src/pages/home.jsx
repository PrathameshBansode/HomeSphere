import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for the new features
  const [activeTab, setActiveTab] = useState(0);
  const [estRooms, setEstRooms] = useState(2);
  const [estService, setEstService] = useState('cleaning');

  const marqueeItems = ["Expert Electricians", "Deep Cleaning", "Plumbing Fixes", "Math Tutors", "Personal Trainers", "AC Repair", "Pest Control", "Carpentry"];

  // Data for the Smart Tabs
  const tabServices = [
    { name: "Deep Cleaning", price: "Starts ₹999", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop", desc: "Top-to-bottom home sanitization." },
    { name: "Electrical", price: "Starts ₹199", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", desc: "Wiring, switchboards, and appliances." },
    { name: "Tutoring", price: "Starts ₹500/hr", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop", desc: "Expert math and science instructors." },
    { name: "AC Repair", price: "Starts ₹499", img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop", desc: "Filter cleaning and gas refills." }
  ];

  // Logic for the Quick Estimator
  const basePrices = { cleaning: 499, electrical: 199, painting: 1500 };
  const currentEstimate = basePrices[estService] * estRooms;

  return (
    <div className="bg-stone-50 min-h-screen font-sans overflow-hidden">
      
      {/* 1. COMPACT HERO SECTION (Shrunk from 85vh to 55vh) */}
      <div className="relative pt-28 pb-16 px-4 min-h-[55vh] flex flex-col justify-center items-center bg-teal-950 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-[80px]"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2"
          >
            HomeSphere<span className="text-emerald-500">.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-teal-200 font-medium italic tracking-wide mb-10"
          >
            Expert local services, booked instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-lg flex items-center gap-2 transition-all hover:bg-white/15"
          >
            <div className="pl-4 text-xl opacity-80">🔍</div>
            <input 
              type="text" 
              placeholder="Search 'AC Repair', 'Cleaning'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-2 text-white placeholder-teal-100 text-lg outline-none bg-transparent font-medium"
            />
            <Link to="/services" className="bg-emerald-500 text-teal-950 px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors whitespace-nowrap">
              Search
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 2. SLIM MARQUEE */}
      <div className="bg-emerald-500 py-3 overflow-hidden border-y border-emerald-400">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-6"
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-teal-950 font-bold text-lg uppercase tracking-wider">{item}</span>
              <span className="text-white text-sm">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. NEW: QUICK ESTIMATOR & SMART TABS (Replaces Giant Bento Box) */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side: Smart Tabs */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-stone-100">
            <h2 className="text-3xl font-black text-teal-950 mb-6">Popular Services</h2>
            
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
              {tabServices.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                    activeTab === idx ? "bg-teal-950 text-white shadow-md" : "bg-stone-50 text-stone-500 hover:bg-stone-100"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Changing Content Box */}
            <div className="relative h-64 rounded-2xl overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={tabServices[activeTab].img} 
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-black text-white">{tabServices[activeTab].name}</h3>
                  <p className="text-emerald-300 font-medium text-sm mt-1">{tabServices[activeTab].desc}</p>
                </div>
                <Link to="/services" className="bg-emerald-500 text-teal-950 px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-400 transition-colors">
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Estimator */}
          <div className="bg-teal-950 rounded-[2rem] p-6 md:p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="text-3xl font-black mb-2 relative z-10">Quick Estimate</h2>
            <p className="text-teal-200 mb-8 relative z-10">Get a rough idea before you book.</p>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold text-teal-100 mb-2">Select Service</label>
                <div className="flex gap-2">
                  {['cleaning', 'electrical', 'painting'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setEstService(type)}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm capitalize transition-all border ${
                        estService === type ? "bg-emerald-500 border-emerald-500 text-teal-950" : "bg-teal-900/50 border-teal-800 text-teal-100 hover:bg-teal-800"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-teal-100 mb-2">
                  <label>Scope of work (Rooms/Hours)</label>
                  <span>{estRooms} {estService === 'electrical' ? 'Hours' : 'Rooms'}</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={estRooms} onChange={(e) => setEstRooms(e.target.value)}
                  className="w-full accent-emerald-500 h-2 bg-teal-900 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-6 border-t border-teal-800 flex justify-between items-center">
                <div>
                  <p className="text-xs text-teal-300 font-bold uppercase tracking-wider">Estimated Cost</p>
                  <p className="text-4xl font-black text-white">₹{currentEstimate}</p>
                </div>
                <Link to="/services" className="bg-white text-teal-950 px-6 py-3 rounded-xl font-bold hover:bg-stone-100 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. COMPACT FEATURES & CTA ROW */}
      <div className="bg-white py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-black text-teal-950 mb-2">Verified Pros</h3>
            <p className="text-stone-500 text-sm">Every partner undergoes strict background checks.</p>
          </div>
          <div className="p-6">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-xl font-black text-teal-950 mb-2">Transparent Prices</h3>
            <p className="text-stone-500 text-sm">No hidden fees. See the exact price upfront.</p>
          </div>
          <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 flex flex-col justify-center">
            <h3 className="text-xl font-black text-teal-950 mb-2">Are you a pro?</h3>
            <p className="text-stone-500 text-sm mb-4">Grow your business with us.</p>
            <Link to="/signup" className="text-emerald-600 font-bold hover:text-emerald-700">Join HomeSphere →</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;