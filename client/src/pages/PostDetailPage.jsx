import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService, donationService } from '../services';
import { useAuth } from '../context/AuthContext';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [donating, setDonating] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPost(id);
      setPost(response.data.post);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setDonating(true);
      await donationService.createDonation({
        postId: id,
        amount: parseFloat(donationAmount)
      });
      alert('Donation successful!');
      setDonationAmount('');
      fetchPost();
    } catch (error) {
      alert('Error making donation: ' + error.response?.data?.message);
    } finally {
      setDonating(false);
    }
  };

  if (loading) return <div className="container py-12 text-center">Loading...</div>;

  if (!post) return <div className="container py-12 text-center">Post not found</div>;

  const percentage = (post.collectedAmount / post.requiredAmount) * 100;

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {post.image && (
            <img 
              src={`${import.meta.env.VITE_API_URL}${post.image}`}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
          )}

          <div className="card">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center mb-6 text-gray-600">
              <span className="mr-6">By {post.createdBy?.name}</span>
              <span>📍 {post.location}</span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{post.description}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="card mb-6">
            <h3 className="text-xl font-bold mb-4">Donation Progress</h3>

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all" 
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{Math.round(percentage)}% funded</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Raised</span>
                <span className="font-bold">${post.collectedAmount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Goal</span>
                <span className="font-bold">${post.requiredAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Donors</span>
                <span className="font-bold">{post.donors?.length || 0}</span>
              </div>
            </div>

            <form onSubmit={handleDonate} className="space-y-4">
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
                step="0.01"
                required
                className="input-field"
              />
              <button
                type="submit"
                disabled={donating || !isAuthenticated}
                className="btn btn-primary w-full"
              >
                {donating ? 'Processing...' : 'Donate Now'}
              </button>
            </form>

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 text-center mt-2">
                Please login to donate
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
