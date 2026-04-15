import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Section: Brand & Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              HomeSphere<span className="text-blue-500">.</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              The smartest way to hire trusted local professionals. From home repairs to personal fitness, we bring the best experts directly to your doorstep.
            </p>
            {/* App Store Badges Placeholder */}
            <div className="flex gap-3">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700">
                 App Store
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700">
                ▶ Google Play
              </button>
            </div>
          </div>

          {/* Column 1: For Customers */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">For Customers</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Find a Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Customer FAQs</a></li>
            </ul>
          </div>

          {/* Column 2: For Partners */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">For Partners</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Register as a Pro</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Partner Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Partner Support</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">✉</span>
                <a href="mailto:prbansode1010@gmail.com" className="hover:text-white transition-colors">
                  prbansode1010@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">☏</span>
                <a href="tel:+911800123456" className="hover:text-white transition-colors">
                  1800-123-456 (Toll Free)
                </a>
              </li>
              <li className="flex items-start gap-2 mt-4">
                <span className="text-blue-500">📍</span>
                <span className="text-gray-400">Headquarters,<br/>Pune, Maharashtra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <span>© 2026 HomeSphere. All rights reserved.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          
          <div className="flex items-center gap-2 font-medium">
            <span>Designed & Built by</span>
            <span className="text-white bg-gray-800 px-3 py-1 rounded-full text-xs tracking-wide">
              Prathnmesh Bansode
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;