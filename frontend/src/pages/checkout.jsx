import React, { useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Mock data representing what was passed from the ServiceDetail page
  const bookingDetails = {
    title: "AC Service & Repair",
    date: "Tomorrow, 25th Oct",
    time: "10:00 AM",
    price: 499,
    tax: 45,
    discount: 50,
  };

  const totalAmount = bookingDetails.price + bookingDetails.tax - bookingDetails.discount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert(`Processing ${paymentMethod} payment for ₹${totalAmount}...`);
    // In the future, this will redirect to a Success/Tracking page
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24 font-sans">
      
      {/* Simple Header */}
      <div className="bg-white border-b border-stone-200 py-6 px-4 md:px-10 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link to="/services/1" className="text-stone-400 hover:text-teal-950 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </Link>
          <h1 className="text-2xl font-extrabold text-teal-950 tracking-tight">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT COLUMN: Forms & Selection */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* 1. Address Section */}
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
              <h2 className="text-xl font-bold text-teal-950 mb-6 flex items-center gap-3">
                <span className="bg-teal-50 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Service Address
              </h2>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-2">First Name</label>
                    <input type="text" placeholder="John" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-2">Phone Number</label>
                    <input type="tel" placeholder="+91" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-600 mb-2">House/Flat No., Building Name</label>
                  <input type="text" placeholder="e.g. Flat 402, Sea View Apartments" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-2">Landmark</label>
                    <input type="text" placeholder="Near XYZ Mall" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-600 mb-2">City</label>
                    <input type="text" defaultValue="Pune" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-stone-500" readOnly />
                  </div>
                </div>
              </form>
            </div>

            {/* 2. Payment Method Section */}
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
              <h2 className="text-xl font-bold text-teal-950 mb-6 flex items-center gap-3">
                <span className="bg-teal-50 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-emerald-500 bg-emerald-50/50' : 'border-stone-100 hover:border-stone-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-emerald-500' : 'border-stone-300'}`}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-950">UPI (GPay, PhonePe, Paytm)</h3>
                      <p className="text-sm text-stone-500">Pay instantly via your UPI app</p>
                    </div>
                  </div>
                  <div className="text-2xl">📱</div>
                </label>

                {/* Card Option */}
                <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50/50' : 'border-stone-100 hover:border-stone-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-emerald-500' : 'border-stone-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-950">Credit / Debit Card</h3>
                      <p className="text-sm text-stone-500">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                  <div className="text-2xl">💳</div>
                </label>

                {/* Cash Option */}
                <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50/50' : 'border-stone-100 hover:border-stone-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-emerald-500' : 'border-stone-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-950">Pay After Service</h3>
                      <p className="text-sm text-stone-500">Pay with cash or online after work is done</p>
                    </div>
                  </div>
                  <div className="text-2xl">💵</div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl sticky top-28">
              <h2 className="text-xl font-bold text-teal-950 mb-6">Booking Summary</h2>
              
              {/* Service Details Snippet */}
              <div className="flex gap-4 items-start mb-6 pb-6 border-b border-stone-100">
                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  ❄️
                </div>
                <div>
                  <h3 className="font-bold text-teal-950 leading-tight mb-1">{bookingDetails.title}</h3>
                  <p className="text-sm text-stone-500">{bookingDetails.date} at {bookingDetails.time}</p>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-stone-100">
                <div className="flex justify-between text-stone-600">
                  <span>Item Total</span>
                  <span className="font-medium text-teal-950">₹{bookingDetails.price}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Taxes & Fee</span>
                  <span className="font-medium text-teal-950">₹{bookingDetails.tax}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>HomeSphere Discount</span>
                  <span className="font-medium">-₹{bookingDetails.discount}</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-teal-950 text-lg">Total to Pay</span>
                <span className="font-black text-teal-950 text-3xl">₹{totalAmount}</span>
              </div>

              {/* Trust Badge */}
              <div className="bg-stone-50 p-4 rounded-xl mb-6 flex items-start gap-3 border border-stone-100">
                <span className="text-xl">🛡️</span>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Your payment is safe. HomeSphere holds your money securely until the service is successfully completed.
                </p>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
              >
                Place Order
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;    