import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 Welcome to HomeSphere. How can I help you today?", sender: "bot" }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add user's message
    const newUserMsg = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulate network delay and bot response
    setTimeout(() => {
      setIsTyping(false);
      
      // Simple keyword routing for the mock frontend
      let botReply = "Thanks for reaching out! A support agent will review this shortly.";
      const lowerInput = newUserMsg.text.toLowerCase();
      
      if (lowerInput.includes('book') || lowerInput.includes('price')) {
        botReply = "You can view all our starting prices and book directly on our Services page. Need help finding a specific service?";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botReply = "Hello! Looking for a professional today?";
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, text: botReply, sender: "bot" }]);
    }, 1500); // 1.5 second simulated delay
  };

  return (
    <>
      {/* Floating Action Button (The Chat Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center ${
          isOpen ? 'bg-stone-200 text-stone-600 scale-90 hover:bg-stone-300' : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-110 shadow-emerald-600/30'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>

      {/* The Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] sm:w-96 h-[500px] max-h-[75vh] bg-white rounded-3xl shadow-2xl border border-stone-100 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-teal-950 p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-xl shadow-inner">
                🤖
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-teal-950 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">HomeSphere Support</h3>
              <p className="text-teal-200 text-xs font-medium">Typically replies instantly</p>
            </div>
          </div>

          {/* Chat History Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4 hide-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-l-2xl rounded-tr-2xl' 
                      : 'bg-white border border-stone-100 text-teal-950 rounded-r-2xl rounded-tl-2xl'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-100 text-stone-400 rounded-r-2xl rounded-tl-2xl p-4 flex gap-1 shadow-sm w-16">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-stone-100">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full pl-4 pr-12 py-3 bg-stone-50 border border-stone-200 rounded-full text-sm text-teal-950 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;