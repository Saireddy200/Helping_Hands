import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService, donationService } from '../services';
import DonationCard from '../components/DonationCard';

const HomePage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsRes, statsRes] = await Promise.all([
        postService.getAllPosts({ limit: 6 }),
        donationService.getDonationStats()
      ]);
      setFeaturedPosts(postsRes.data.posts.slice(0, 6));
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to HelpingHands</h1>
          <p className="text-xl mb-8">Connect people in need with willing donors</p>
          <div className="flex justify-center gap-4">
            <Link to="/charities" className="btn bg-white text-blue-600 hover:bg-gray-100">
              Browse Causes
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      {stats && (
        <section className="bg-gray-100 py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600">{stats.totalAmount}</div>
                <p className="text-gray-600">Total Raised</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">{stats.totalDonations}</div>
                <p className="text-gray-600">Donations</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">{stats.uniqueDonors}</div>
                <p className="text-gray-600">Donors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">{stats.completedCauses}</div>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Causes */}
      <section className="py-16">
        <div className="container">
          <h2 className="section-title text-center">Featured Causes</h2>
          
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <DonationCard key={post._id} post={post} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/charities" className="btn btn-primary">
              View All Causes
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-4">Want to Help?</h3>
              <p className="text-gray-600 mb-6">
                Browse through causes and make donations to help those in need.
              </p>
              <Link to="/charities" className="btn btn-primary">
                Start Donating
              </Link>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Share your cause and receive support from our community of donors.
              </p>
              <Link to="/signup" className="btn btn-primary">
                Create a Post
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
