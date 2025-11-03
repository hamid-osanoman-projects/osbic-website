import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle } from 'lucide-react';
// import { supabase } from '../integrations/supabase/client'; // TODO: Uncomment after setting up database
import chatAPI from '../api/chat';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial assistant message
  const initialMessage: Message = {
    id: 'initial',
    role: 'assistant',
    content: `Hello! I'm your OSBIC virtual assistant. I can help you with:

• Company registration inquiries
• Visa and PRO services  
• Cost estimates
• General questions

How may I assist you today?`,
    timestamp: new Date().toISOString()
  };

  useEffect(() => {
    // Initialize with the assistant's welcome message
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    // Auto-show chatbot button after 10 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // TODO: Uncomment after setting up the database table
      // Save user message to Supabase (with error handling)
      // try {
      //   await supabase.from('messages').insert({
      //     role: 'user',
      //     content: userMessage.content,
      //     timestamp: userMessage.timestamp
      //   });
      // } catch (dbError) {
      //   console.warn('Database save failed, continuing without persistence:', dbError);
      // }

      // Call API to get assistant response
      const data = await chatAPI(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      };

      // Add assistant message
      setMessages(prev => [...prev, assistantMessage]);

      // TODO: Uncomment after setting up the database table
      // Save assistant message to Supabase (with error handling)
      // try {
      //   await supabase.from('messages').insert({
      //     role: 'assistant',
      //     content: assistantMessage.content,
      //     timestamp: assistantMessage.timestamp
      //   });
      // } catch (dbError) {
      //   console.warn('Database save failed, continuing without persistence:', dbError);
      // }

    } catch (err) {
      console.error('Error sending message:', err);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact our support team.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Backdrop for chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      {/* Floating Chat Button with Professional Dialogue */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-28 right-6 z-50 flex items-center gap-3"
          >
            {/* Professional Blue Dialogue Bubble - Hidden when chat is open */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="bg-[#42A5E1] text-white px-4 py-2 rounded-2xl shadow-lg relative whitespace-nowrap"
                >
                  <p className="text-sm font-medium">Need any help?</p>
                  {/* Arrow pointing to button */}
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#42A5E1] rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Button */}
            <motion.button
              onClick={toggleChat}
              className="bg-[#42A5E1] hover:bg-[#1e81c6] text-white p-4 rounded-full shadow-xl transition-colors flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                opacity: 1, 
                y: 0 
              }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                scale: {
                  times: [0, 0.5, 1],
                  duration: 0.6
                }
              }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageCircle size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            className="fixed bottom-40 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#42A5E1] to-[#1e81c6] text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="font-semibold text-lg">OSBIC Assistant</h3>
                <p className="text-sm text-blue-100">How can we help you today?</p>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-[#42A5E1] text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md shadow-sm border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Reply Buttons (only show for first message) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 justify-start"
                >
                  <button
                    onClick={() => handleQuickReply('Company registration')}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors"
                  >
                    Company registration
                  </button>
                  <button
                    onClick={() => handleQuickReply('Visa services')}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors"
                  >
                    Visa services
                  </button>
                </motion.div>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4 rounded-b-2xl">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-black text-sm focus:outline-none focus:border-[#42A5E1] focus:ring-1 focus:ring-[#42A5E1] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-[#42A5E1] hover:bg-[#1e81c6] disabled:bg-gray-300 text-white p-2 rounded-full transition-colors disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              
              {/* Footer Link */}
              <div className="text-center mt-3">
                <a
                  href="https://api.whatsapp.com/send?phone=96872596531&text=Hello!%20I%20need%20to%20speak%20with%20a%20human%20consultant%20about%20your%20services.%20Could%20you%20please%20assist%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#42A5E1] text-sm hover:underline flex items-center justify-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12a9.935 9.935 0 0 0 1.64 5.434L2 22l4.708-1.59A9.936 9.936 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2Zm0 18a7.94 7.94 0 0 1-4.08-1.11l-.292-.173-2.795.945.933-2.863-.19-.295A7.931 7.931 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8Zm4.297-5.406c-.242-.121-1.435-.709-1.657-.789-.223-.08-.386-.121-.55.121-.163.242-.631.789-.773.951-.142.162-.285.182-.527.061-.242-.121-1.023-.377-1.947-1.203-.72-.641-1.207-1.433-1.35-1.676-.142-.242-.015-.373.106-.494.109-.109.242-.285.364-.427.121-.142.162-.242.242-.404.081-.162.04-.304-.02-.426-.061-.121-.55-1.324-.754-1.812-.197-.473-.397-.41-.55-.417l-.47-.008c-.162 0-.426.061-.648.304s-.85.83-.85 2.02.87 2.348.99 2.51c.121.162 1.712 2.615 4.145 3.668.58.25 1.033.398 1.385.51.582.185 1.112.159 1.531.097.467-.07 1.435-.586 1.639-1.151.203-.566.203-1.051.142-1.152-.061-.101-.223-.162-.465-.283Z" />
                  </svg>
                  Talk to a Human Consultant
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;