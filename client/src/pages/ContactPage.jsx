import React, { useState } from 'react';
import { contactService } from '../services';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await contactService.sendMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 pt-32 max-w-2xl">
      <h1 className="section-title">Contact Us</h1>

      {success && (
        <div className="bg-green-100 text-green-600 p-4 rounded mb-6">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="input-field"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
