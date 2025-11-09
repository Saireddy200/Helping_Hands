import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp, Globe, Shield, Zap, Award, Target } from 'lucide-react';
import GradientLogo from '../components/GradientLogo';

const AboutPage = () => {
  const [memberImageErrors, setMemberImageErrors] = React.useState({});

  const stats = [
    { icon: Users, label: 'Active Donors', value: '50,000+' },
    { icon: TrendingUp, label: 'Funds Raised', value: '₹12 Cr+' },
    { icon: Target, label: 'Campaigns Funded', value: '1,200+' },
    { icon: Globe, label: 'Lives Impacted', value: '500,000+' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and empathy to create positive change.'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Every donation is tracked, and impact is measured. We believe in complete accountability.'
    },
    {
      icon: Zap,
      title: 'Impact',
      description: 'We focus on creating real, measurable change in the lives of those we serve.'
    },
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Our mission guides every decision we make and every campaign we support.'
    },
  ];

  const teamMembers = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      bio: 'Dedicated to making charitable giving accessible and impactful.'
    },
    {
      name: 'Arjun Kumar',
      role: 'Head of Operations',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
      bio: 'Ensures every campaign reaches those who need it most.'
    },
    {
      name: 'Meera Patel',
      role: 'Community Manager',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
      bio: 'Connects donors with causes that matter to them.'
    },
    {
      name: 'Rahul Singh',
      role: 'Tech Lead',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
      bio: 'Building technology that empowers social change.'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-32 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-16 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
          About <GradientLogo text="HelpingHands" className="inline-block" />
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          We believe that every act of kindness, no matter how small, has the power to change the world. HelpingHands connects compassionate donors with meaningful causes.
        </p>
      </motion.div>

      {/* Mission, Vision, Values Section */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Mission */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Target className="w-12 h-12 text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To empower individuals and organizations to make a meaningful difference in the world by providing a secure, transparent, and user-friendly platform for charitable giving.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Globe className="w-12 h-12 text-indigo-600 mr-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To create a world where financial barriers don't prevent anyone from accessing education, healthcare, food, and basic necessities.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-12 h-12 text-red-600 mr-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Values</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Compassion, transparency, accountability, and impact drive everything we do. We're committed to making a real difference.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Impact Statistics */}
      <div className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white"
        >
          Our Impact By The Numbers
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white"
        >
          Our Core Values
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl mb-4 mx-auto">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-center">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white"
        >
          Meet Our Team
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover bg-slate-700"
                onError={(e) => {
                  setMemberImageErrors(prev => ({ ...prev, [index]: true }));
                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`;
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Why Choose HelpingHands?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <Award className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Verified Campaigns</h3>
                <p className="text-blue-100">Every campaign is thoroughly verified to ensure your donation goes to legitimate causes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                <p className="text-blue-100">Your financial information is protected with industry-leading encryption and security measures.</p>
              </div>
            </div>
            <div className="flex items-start">
              <TrendingUp className="w-8 h-8 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Real Impact</h3>
                <p className="text-blue-100">Track exactly how your donation makes a difference through real-time updates and reports.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands of donors who are changing lives every day. Start your journey of giving today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/campaigns"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
          >
            Explore Campaigns
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
          >
            Get In Touch
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
