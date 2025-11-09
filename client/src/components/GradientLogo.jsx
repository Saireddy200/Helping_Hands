import React from 'react';

const GradientLogo = ({ text = 'HelpingHands', className = '' }) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-extrabold ${className}`}
      style={{ WebkitBackgroundClip: 'text' }}
    >
      {text}
    </span>
  );
};

export default GradientLogo;
