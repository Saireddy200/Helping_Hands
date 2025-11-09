import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🤝 HelpingHands
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/charities" className="text-gray-700 hover:text-blue-600">Charities</Link>
          {isAuthenticated && <Link to="/create-post" className="text-gray-700 hover:text-blue-600">Create Post</Link>}
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        </div>

        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary">
                {user?.name}
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="btn btn-primary">Admin</Link>
              )}
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
