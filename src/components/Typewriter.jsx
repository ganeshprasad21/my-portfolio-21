import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setContent(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 100); // Terminal typing speed
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="typewriter">
      {content}<span className="cursor">█</span>
    </span>
  );
};

export default Typewriter;
