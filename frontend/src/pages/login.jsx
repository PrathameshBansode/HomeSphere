import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('email');
  const [otpSent, setOtpSent] = useState(false);

  // 1. Setup State for the inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. The Logic to hit our Java Backend!
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the email and password to Java
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success! The backend returned the user object
        console.log("Logged in successfully:", data);
        alert(`Welcome back, ${data.name}!`);
        
        // Optional: Save user data to localStorage so the app remembers they are logged in
        localStorage.setItem("user", JSON.stringify(data));
        // Save the JWT token and user info to the browser's memory!
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Send them to the homepage or dashboard
        navigate("/"); 
      } else {
        // Handle incorrect password or email not found
        setErrorMsg(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg("Cannot connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setOtpSent(true); 
  };

  const handleGoogleLogin = () => {
    console.log("Google Login button clicked!");
    alert("Initiating Google Login...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
        </div>

        {/* Error Message Display */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {errorMsg}
          </div>
        )}

        {/* Method Toggle (Email vs Phone) */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              loginMethod === 'email' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => { setLoginMethod('phone'); setOtpSent(false); }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              loginMethod === 'phone' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Phone Number
          </button>
        </div>

        {/* Dynamic Form Section */}
        {loginMethod === 'email' ? (
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handlePhoneSubmit}>
            {!otpSent ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg text-sm">
                    +1
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Send OTP
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <input
                  type="text"
                  placeholder="6-digit code"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center tracking-widest"
                  maxLength="6"
                />
                <button className="w-full mt-4 bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Verify & Login
                </button>
                <button 
                  type="button" 
                  onClick={() => setOtpSent(false)} 
                  className="w-full mt-2 text-sm text-gray-500 hover:text-gray-800"
                >
                  Wrong number? Go back
                </button>
              </div>
            )}
          </form>
        )}

        {/* Divider */}
        <div className="mt-8 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Google Login */}
        <button 
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 active:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        
      </div>
    </div>
  );
}

export default Login;