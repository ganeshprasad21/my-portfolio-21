import React from 'react';

const tools = [
  "K3s", "K8s", "AWS", "Python", "Bash", "Linux", "RedHat", "VMware", 
  "Black Duck", "JFrog", "Docker", "Rancher", "Jenkins", "Automation", 
  "Firmware", "UI Design", "JS", "React", "p5.js", "C++", "C", "YAML", 
  "Ubuntu", "MCP"
];

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {tools.map((tool, idx) => (
          <span key={`a-${idx}`} className="marquee-item">{tool}</span>
        ))}
        {/* Duplicate the array to create the seamless infinite scroll illusion */}
        {tools.map((tool, idx) => (
          <span key={`b-${idx}`} className="marquee-item">{tool}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
