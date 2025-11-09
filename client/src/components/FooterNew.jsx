import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import GradientLogo from './GradientLogo';

const FooterNew = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Campaigns', path: '/charities' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '#' },
        { name: 'FAQs', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms & Conditions', path: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '#' },
        { name: 'Success Stories', path: '#' },
        { name: 'Donate', path: '/charities' },
        { name: 'Get Involved', path: '#' },
      ],
    },
  ];

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-900 text-white'} transition-colors`}>
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 hidden md:flex items-center justify-center"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center mb-4">
              <GradientLogo text="HelpingHands" className="text-2xl font-bold" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We connect compassionate donors with those in need, creating meaningful change across
              communities. Your generosity changes lives.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gray-800 text-gray-300 rounded-full hover:text-white hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 4 }}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-800 rounded-xl"
        >
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold mb-1">Email</h5>
              <p className="text-gray-400">hello@helpinghands.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold mb-1">Phone</h5>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-bold mb-1">Address</h5>
              <p className="text-gray-400">123 Charity Lane, Help City, HC 12345</p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-12"
        >
          <h4 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h4>
          <p className="text-blue-100 mb-6">
            Get updates on campaigns and success stories delivered to your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-gray-400">
              <p>© {currentYear} HelpingHands. All rights reserved.</p>
              <p className="text-sm mt-2">
                Empowering communities through compassionate giving.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Settings
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterNew;
