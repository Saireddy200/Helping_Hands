import api from './api';

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.put('/auth/reset-password', { token, newPassword }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Post Services
export const postService = {
  getAllPosts: (filters) => api.get('/posts', { params: filters }),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (data) => api.post('/posts', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updatePost: (id, data) => api.put(`/posts/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deletePost: (id) => api.delete(`/posts/${id}`),
  getUserPosts: () => api.get('/posts/user/my-posts'),
};

// Donation Services
export const donationService = {
  createDonation: (data) => api.post('/donations', data),
  getAllDonations: () => api.get('/donations'),
  getUserDonations: (userId) => api.get(`/donations/user/${userId}`),
  getPostDonations: (postId) => api.get(`/donations/post/${postId}`),
  getDonationStats: () => api.get('/donations/stats/all'),
};

// Contact Services
export const contactService = {
  sendMessage: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  getMessage: (id) => api.get(`/contact/${id}`),
  updateMessageStatus: (id, data) => api.put(`/contact/${id}`, data),
  deleteMessage: (id) => api.delete(`/contact/${id}`),
};

// Admin Services
export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getPosts: () => api.get('/admin/posts'),
  deletePost: (id) => api.delete(`/admin/posts/${id}`),
  getDonations: () => api.get('/admin/donations'),
};

// Campaign Services
export const campaignService = {
  getAllCampaigns: (filters) => api.get('/campaigns', { params: filters }),
  getCampaign: (id) => api.get(`/campaigns/${id}`),
  createCampaign: (data) => api.post('/campaigns', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateCampaign: (id, data) => api.put(`/campaigns/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
  likeCampaign: (id) => api.post(`/campaigns/${id}/like`),
  addComment: (id, data) => api.post(`/campaigns/${id}/comments`, data),
  donateToCampaign: (id, data) => api.post(`/campaigns/${id}/donate`, data),
  getUserCampaigns: () => api.get('/campaigns/user/my-campaigns'),
};
