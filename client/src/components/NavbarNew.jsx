import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Menu, X, Heart, Sun, Moon, Home, Info, Zap, Gift, Mail } from 'lucide-react';
import GradientLogo from './GradientLogo';

const NavbarNew = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Campaigns', path: '/campaigns', icon: Zap },
    { name: 'Donate', path: '/campaigns', icon: Gift },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navItemVariants = {
    whileHover: { scale: 1.2, y: -6 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300`}>
      {/* Desktop Dock Navigation */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-6">
        <nav className={`backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/40' : 'bg-white/30'} rounded-2xl px-6 py-4 border ${theme === 'dark' ? 'border-gray-700/50' : 'border-white/20'} shadow-lg`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="cursor-pointer flex-shrink-0"
            >
              <GradientLogo text="HelpingHands" className="text-2xl font-bold" />
            </motion.div>

            {/* Center Navigation Icons */}
            <div className="flex items-center space-x-2 mx-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    variants={navItemVariants}
                    whileHover="whileHover"
                    transition={navItemVariants.transition}
                  >
                    <Link to={link.path}>
                      <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-800/60 hover:bg-gray-700/80 text-gray-100' : 'bg-gray-100/60 hover:bg-gray-200/80 text-gray-700'} transition-all cursor-pointer`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side - Auth & Theme */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-800/60 hover:bg-gray-700/80' : 'bg-gray-100/60 hover:bg-gray-200/80'} transition-all`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Dashboard
                  </motion.button>
                  {user?.role === 'admin' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/admin')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      Admin
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className={`px-4 py-2 rounded-lg border-2 border-blue-600 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} text-sm font-medium hover:${theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-50'} transition-colors`}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Sign Up
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className={`backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/40' : 'bg-white/30'} border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-white/20'} px-4 py-4`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="cursor-pointer"
            >
              <GradientLogo text="HelpingHands" className="text-xl font-bold" />
            </motion.div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-gray-100/60'}`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-gray-100/60'}`}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/40' : 'bg-white/30'} border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-white/20'}`}
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100/60'} transition-colors`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className={`pt-3 mt-3 border-t ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className={`px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{user?.name}</p>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Dashboard
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 border-2 border-blue-600 rounded-lg text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </header>
  );
};

export default NavbarNew;
