import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import chatAPI from "../api/chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //
  // ✅ Load translated welcome message AFTER i18n loads
  //
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "initial",
      role: "assistant",
      content: t("chatBot.welcome.message"),
      timestamp: new Date().toISOString(),
    };

    setMessages([welcomeMessage]);
  }, [i18n.language, t]);

  //
  // Auto-show floating button after delay
  //
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  //
  // Auto-scroll to bottom when new messages arrive
  //
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //
  // Auto-focus input when chat opens
  //
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  //
  // Send message
  //
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiResponse = await chatAPI(userMessage.content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: apiResponse.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat API error:", err);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t("chatBot.errors.general"),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => handleSendMessage(reply);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Backdrop */}
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

      {/* Floating Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-28 right-6 rtl:left-6 rtl:right-auto z-50 flex items-center gap-3 rtl:flex-row-reverse"
          >
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-[#42A5E1] text-white px-4 py-2 rounded-2xl shadow-lg relative whitespace-nowrap"
              >
                <p className="text-sm font-medium">{t("chatBot.bubble.text")}</p>
                <div
                  className="
                    absolute top-1/2 w-3 h-3 bg-[#42A5E1] rotate-45
                    -right-1 rtl:-right-auto rtl:-left-1
                  "
                ></div>
              </motion.div>
            )}

            {/* Button */}
            <motion.button
              onClick={toggleChat}
              className="bg-[#42A5E1] hover:bg-[#1e81c6] text-white p-4 rounded-full shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-40 right-6 rtl:left-6 rtl:right-auto w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#42A5E1] to-[#1e81c6] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{t("chatBot.header.title")}</h3>
                <p className="text-sm text-blue-100">{t("chatBot.header.subtitle")}</p>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end text-right rtl:text-right"
                      : "justify-start text-left rtl:text-left"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-[#42A5E1] text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm border"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap rtl:text-right">
                      {msg.content}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  <button
                    onClick={() =>
                      handleQuickReply(t("chatBot.quickReplies.companyRegistration"))
                    }
                    className="bg-white border px-4 py-2 rounded-full text-sm text-black"
                  >
                    {t("chatBot.quickReplies.companyRegistration")}
                  </button>

                  <button
                    onClick={() =>
                      handleQuickReply(t("chatBot.quickReplies.visaServices"))
                    }
                    className="bg-white border px-4 py-2 rounded-full text-sm text-black"
                  >
                    {t("chatBot.quickReplies.visaServices")}
                  </button>
                </motion.div>
              )}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-white p-3 rounded-2xl shadow-sm border w-fit">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t bg-white p-4">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chatBot.input.placeholder")}
                  disabled={isLoading}
                  className="flex-1 border text-black rounded-full px-4 py-2 text-sm focus:ring-[#42A5E1] focus:border-[#42A5E1] disabled:bg-gray-100 rtl:text-right"
                />

                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-[#42A5E1] hover:bg-[#1e81c6] disabled:bg-gray-300 text-white p-2 rounded-full"
                >
                  <Send size={16} />
                </button>
              </div>

              {/* Footer */}
              <div className="text-center mt-3">
                <a
                  href="https://api.whatsapp.com/send?phone=96872596531&text=Hello!%20I%20need%20to%20speak%20with%20a%20human%20consultant."
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
                    <path d="M12 2C6.486 2 2 6.486..." />
                  </svg>
                  {t("chatBot.footer.consultantText")}
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
