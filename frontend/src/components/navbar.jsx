import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Pune"); // Default city
  
  const location = useLocation();
  const navigate = useNavigate(); // Added for the logout redirect
  const dropdownRef = useRef(null);

  // 1. THE SMART LOGIC: Check if a user is logged in
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // 2. LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsMobileMenuOpen(false); // Close mobile menu if open
    navigate("/login"); // Send them back to the login page
  };

  const cities = ["Pune", "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        
        {/* Left Section: Logo, Location, and Nav Links grouped together */}
        <div className="flex items-center gap-6 md:gap-10">
          
          <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
            HomeSphere<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Location Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full border border-gray-200 transition-colors"
            >
              <span>📍</span>
              <span className="font-medium">{selectedCity}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${isCityDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Select City</div>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${selectedCity === city ? "text-blue-600 font-medium bg-blue-50/50" : "text-gray-700"}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 pl-4 border-l border-gray-200">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors ${
                isActive("/") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`text-sm font-semibold transition-colors ${
                isActive("/services") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Services
            </Link>
          </div>

        </div>

        {/* Right Section: Auth Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            // LOGGED IN VIEW
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Hi, {user.name.split(" ")[0]}!
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-red-100 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            // LOGGED OUT VIEW
            <>
              <Link to="/login" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 hover:shadow-md transition-all active:scale-95"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg pb-6 px-4">
          <div className="flex flex-col space-y-4 mt-4">
            
            {/* Mobile Native City Selector */}
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">📍</span>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium outline-none appearance-none"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <svg className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold ${isActive("/") ? "text-blue-600" : "text-gray-900"}`}>
              Home
            </Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold ${isActive("/services") ? "text-blue-600" : "text-gray-900"}`}>
              Services
            </Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            {/* Mobile Auth Links */}
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900">
                  My Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-50 text-red-600 text-center font-semibold px-5 py-3 rounded-xl mt-2 w-full border border-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-gray-900">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-gray-900 text-white text-center font-semibold px-5 py-3 rounded-xl mt-2">
                  Sign up
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;