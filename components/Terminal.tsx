import React, { useState, useEffect } from "react";
import "./Terminal.css";

const Terminal = ({ messages }) => {
  const [displayedMessages, setDisplayedMessages] = useState([]);


  useEffect(() => {
    let currentIndex = 0;
    let currentMessageIndex = 0;

    const typeNextCharacter = () => {
      if (currentMessageIndex >= messages.length) {
        return; // Stop if all messages are displayed
      }
      const message = messages[currentMessageIndex];
      setDisplayedMessages((prevMessages) => [
        ...prevMessages.slice(0, currentMessageIndex),
        message.substring(0, currentIndex + 1),
      ]);

      currentIndex++;
      if (currentIndex === message.length) {
        currentIndex = 0;
        currentMessageIndex++;
        setTimeout(typeNextCharacter, 1000); // Delay before next message
        return;
      }

      setTimeout(typeNextCharacter, 50); // Typing speed
    };


    const intervalId = setInterval(() => {
      if (currentMessageIndex < messages.length) {
        typeNextCharacter();
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <div className="terminal">
      <pre>
        {displayedMessages.map((message, index) => (
          <div key={index} className="line">{message}</div>
        ))}
      </pre>
    </div>
  );
};

export default Terminal;
