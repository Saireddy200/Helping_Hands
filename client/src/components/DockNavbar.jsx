import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientLogo from './GradientLogo';
import { Home, Info, Layers, Gift, Mail } from 'lucide-react';

const links = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'About', to: '/about', icon: Info },
  { name: 'Campaigns', to: '/campaigns', icon: Layers },
  { name: 'Donate', to: '/campaigns', icon: Gift },
  { name: 'Contact', to: '/contact', icon: Mail }
];

const DockNavbar = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/') }>
              <GradientLogo text="HelpingHands" className="text-2xl" />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {links.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.2, y: -6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex flex-col items-center text-sm text-gray-700 dark:text-gray-200"
                    onClick={() => navigate(link.to)}
                  >
                    <div className="p-2 rounded-full bg-white/80 dark:bg-gray-800/60 shadow-sm">
                      <Icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <span className="mt-1 hidden lg:block">{link.name}</span>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => navigate('/menu')} className="p-2 rounded-md bg-white/80 dark:bg-gray-800/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DockNavbar;
