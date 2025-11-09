import React from 'react';

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#001219] to-[#03045e] opacity-95"></div>

      <div className="absolute -left-40 -top-20 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 opacity-40 filter blur-3xl animate-aurora-slow" />
      <div className="absolute right-0 top-24 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-300 to-blue-500 opacity-30 filter blur-2xl animate-aurora-slower" />
      <div className="absolute left-1/4 bottom-10 w-80 h-80 rounded-full bg-gradient-to-r from-yellow-300 to-pink-400 opacity-20 filter blur-3xl animate-aurora-slow" />
    </div>
  );
};

export default AuroraBackground;
