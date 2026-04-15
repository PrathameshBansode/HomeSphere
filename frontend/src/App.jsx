import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Services from "./pages/services";
import ServiceDetail from "./pages/serviceDetail";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Checkout from "./pages/checkout";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Chatbot from "./components/chatbot";
import SplashScreen from "./components/splashscreen"; // 1. Import the Splash Screen

function App() {
  // 2. Add state to track if the app is still "loading"
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <>
      {/* 3. If loading is true, show the Splash Screen on top of everything */}
      {isAppLoading && (
        <SplashScreen onFinish={() => setIsAppLoading(false)} />
      )}

      {/* Your normal app structure (always rendered in the background) */}
      <div className="flex flex-col min-h-screen">
        <Navbar /> 
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} /> 
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Chatbot />
        <Footer />
      </div>
    </>
  );
}

export default App;