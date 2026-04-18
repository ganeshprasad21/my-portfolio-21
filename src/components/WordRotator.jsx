import React, { useState, useEffect } from 'react';

const skills = [
  "CI/CD Pipelines",
  "Zero-Trust Infrastructure",
  "High-Traffic OTT Frontends",
  "Multi-Node K3s Clusters",
  "MCP AI Integrations",
  "Full-Stack Automations"
];

const WordRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotator-container">
      <span className="static-text">Executing: </span>
      <span className={`rotating-word ${index % 2 === 0 ? 'color-green' : 'color-grey'}`} key={index}>
        {skills[index]}
      </span>
    </div>
  );
};

export default WordRotator;
