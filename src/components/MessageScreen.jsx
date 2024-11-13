import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Picker from "@emoji-mart/react"; // Emoji picker from Emoji Mart
import { Link } from "react-router-dom";

const MessageScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, how are you?", sender: "friend", time: "10:00 AM" },
    { id: 2, text: "I'm good! How about you?", sender: "me", time: "10:01 AM" },
    {
      id: 3,
      text: "Doing well, thanks for asking!",
      sender: "friend",
      time: "10:02 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [newMessage]);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: "me",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <button className="text-lime-400 text-2xl">
          <Link to="/">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div>
            <h3 className="text-white font-bold">John Doe</h3>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-3"></div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "me"
                  ? "bg-lime-400 text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              {message.text}
              <div className="text-xs text-gray-400 mt-1 text-right">
                {message.time}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-sm"
          >
            Friend is typing...
          </motion.div>
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 right-4 z-10">
          <Picker onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}

      {/* Input Bar */}
      <div className="bg-gray-800 p-4 flex items-center space-x-3 relative">
        <button
          className="text-lime-400"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <i className="fas fa-smile text-2xl"></i>
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-lime-400 text-black px-4 py-2 rounded-full hover:bg-lime-500 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageScreen;
