import React from 'react';
import { Link } from 'react-router-dom';

const DonationCard = ({ post }) => {
  const percentage = (post.collectedAmount / post.requiredAmount) * 100;

  return (
    <Link to={`/post/${post._id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer h-full">
        {post.image && (
          <img 
            src={`${import.meta.env.VITE_API_URL}${post.image}`} 
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span className="font-semibold">${post.collectedAmount}</span>
            <span>of ${post.requiredAmount}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{post.donors?.length || 0} donors</span>
          <span>{post.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default DonationCard;
