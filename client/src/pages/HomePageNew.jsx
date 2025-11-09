import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, TrendingUp, ArrowRight, Star, Gift, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TypingHeading from '../components/TypingHeading';

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="flex justify-center mb-3">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <div className="text-4xl font-bold text-blue-600">{count.toLocaleString()}+</div>
      <p className="text-gray-600 mt-2">{label}</p>
    </motion.div>
  );
};

// Hero Section
const HeroSection = ({ navigate }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <TypingHeading 
                texts={['Make a Real Impact Today', 'Change a Life Today', 'Join a Future of Giving']}
                speed={90}
                className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Join thousands of donors helping people in need. Whether it's food, education, or medical
              support, your donation can change lives. Start your journey of giving today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/charities')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Donate Now <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/charities')}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Explore Campaigns
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <Heart className="w-40 h-40 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const categories = [
    { icon: Gift, title: 'Food & Nutrition', desc: 'Help fight hunger and malnutrition' },
    { icon: Lightbulb, title: 'Education', desc: 'Empower children through learning' },
    { icon: Heart, title: 'Medical Care', desc: 'Support healthcare initiatives' },
    { icon: Users, title: 'Community', desc: 'Build stronger communities together' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What We Do</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            HelpingHands connects compassionate donors with those in need, creating meaningful change
            across multiple categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 hover:shadow-lg transition-all border border-slate-600"
            >
              <cat.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
              <p className="text-gray-300">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements Section
const AchievementsSection = () => {
  const achievements = [
    { target: 50000, label: 'Meals Donated', icon: Gift },
    { target: 1200, label: 'Campaigns Completed', icon: Target },
    { target: 15000, label: 'Active Donors', icon: Users },
    { target: 5000000, label: 'Funds Raised', icon: TrendingUp, format: true },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Together, we're making a real difference. Here's what we've achieved so far.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-8 border border-white border-opacity-10 hover:bg-opacity-10 transition-all">
              <AnimatedCounter
                target={achievement.target}
                label={achievement.label}
                icon={achievement.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const [imageErrors, setImageErrors] = React.useState({});
  
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1469571486292-846bc9301e4c?w=500&h=400&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      title: 'Helping Hands',
      category: 'Community',
    },
    {
      url: 'https://images.unsplash.com/photo-1582213921290-991b38693d1b?w=500&h=400&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1427504494785-cdbb17a3b519?w=500&h=400&fit=crop',
      title: 'Education Support',
      category: 'Education',
    },
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1588080872657-b6881e4d76bb?w=500&h=400&fit=crop',
      title: 'Food Distribution',
      category: 'Food',
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=400&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=400&fit=crop',
      title: 'Medical Help',
      category: 'Medical',
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1469571486292-846bc9301e4c?w=500&h=400&fit=crop',
      title: 'Community Care',
      category: 'Community',
    },
    {
      url: 'https://images.unsplash.com/photo-1528605248644-803a1993ad53?w=500&h=400&fit=crop',
      fallback: 'https://images.unsplash.com/photo-1450747832694-a4e98e6c0f30?w=500&h=400&fit=crop',
      title: 'Volunteer Work',
      category: 'Volunteers',
    },
  ];

  const handleImageError = (idx) => {
    setImageErrors(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Impact Gallery</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how your donations are making a real difference in people's lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-xl shadow-lg bg-slate-700"
            >
              <img
                src={imageErrors[idx] ? image.fallback : image.url}
                alt={image.title}
                className="w-full h-64 object-cover"
                onError={() => handleImageError(idx)}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <div className="text-center">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  <p className="text-blue-200 text-sm mt-2">{image.category}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [avatarErrors, setAvatarErrors] = React.useState({});

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Donor',
      text: 'HelpingHands made it so easy to donate and see the impact. I love being part of this community!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      fallback: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      rating: 5,
    },
    {
      name: 'Ahmed Hassan',
      role: 'Recipient',
      text: 'The support from donors through this platform changed my life. I was able to get my daughter back to school.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      fallback: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
      rating: 5,
    },
    {
      name: 'Emily Chen',
      role: 'Donor',
      text: 'Transparent, trustworthy, and truly making a difference. I recommend HelpingHands to everyone!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      fallback: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      rating: 5,
    },
  ];

  const handleAvatarError = (idx) => {
    setAvatarErrors(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">What People Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied donors and recipients making a real difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg border border-slate-600 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center mb-4">
                <img
                  src={avatarErrors[idx] ? testimonial.fallback : testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 bg-slate-600"
                  onError={() => handleAvatarError(idx)}
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = ({ navigate }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-200 mb-8">
            Your generosity can change lives. Start supporting causes you care about today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/charities')}
            className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors shadow-xl"
          >
            Start Donating Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Main HomePage Component
const HomePageNew = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSection navigate={navigate} />
      <AboutSection />
      <AchievementsSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
    </div>
  );
};

export default HomePageNew;
