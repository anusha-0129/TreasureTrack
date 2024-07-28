import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './VoiceCommands.css';
const API_URL = import.meta.env.VITE_API_URL;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US';

const VoiceCommands = () => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      setMessage(`You said: ${transcript}`);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setMessage('Error occurred in recognition.');
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start(); 
      }
    };
  }, [listening]);

  const handleVoiceCommand = async (command) => {
    try {
      const response = await axios.post(`${API_URL}/api/voice-command`, { command });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error handling command:', error);
      setMessage('Error processing command.');
    }
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
    setMessage('Listening...');
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
    setMessage('Stopped listening.');
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <motion.div 
      className="container text-center mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        Welcome to Voice Commands
      </motion.h2>
      <motion.p initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        Use your voice to add income or expenses quickly and easily.
      </motion.p>
      <motion.p initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        Click the microphone icon to start or stop listening.
      </motion.p>
      
      <div className="mt-4">
        <i
          className={`bi ${listening ? 'bi-mic-mute-fill' : 'bi-mic-fill'}`}
          style={{ fontSize: '3rem', cursor: 'pointer', color: listening ? 'red' : 'green' }}
          onClick={toggleListening}
        ></i>
        <motion.p 
          className="mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.p>
      </div>

      <motion.div className="mt-5 instructions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h4>How to use Voice Commands</h4>
        <p>Here are some example commands you can use:</p>
        <ul className="list-unstyled">
          <motion.li whileHover={{ scale: 1.05 }}><strong>Add Income:</strong> "Add income of 500 by freelance work on July 10 2024."</motion.li>
          <motion.li whileHover={{ scale: 1.05 }}><strong>Add Expense:</strong> "Add expense of 200 by groceries on July 12 2024."</motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default VoiceCommands;
