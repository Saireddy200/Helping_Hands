import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavbarNew from './components/NavbarNew';
import FooterNew from './components/FooterNew';
import AuroraBackground from './components/AuroraBackground';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePageNew from './pages/HomePageNew';
import CharitiesPage from './pages/CharitiesPage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CampaignsPage from './pages/CampaignsPage';
import DonatePage from './pages/DonatePage';
import AboutPage from './pages/AboutPage';
import PaymentPage from './pages/PaymentPage';
import FuturisticHome from './pages/FuturisticHome';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthProvider>
      <Router>
        <AuroraBackground />
        <NavbarNew theme={theme} toggleTheme={toggleTheme} />
        <main className={`min-h-screen relative ${theme === 'dark' ? 'bg-transparent' : 'bg-white/50 dark:bg-transparent'}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePageNew />} />
            <Route path="/futuristic" element={<FuturisticHome />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/charities" element={<CharitiesPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/donate/:campaignId" element={<DonatePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route 
              path="/create-post" 
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/new-post" 
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <FooterNew theme={theme} />
      </Router>
    </AuthProvider>
  );
}

export default App;
