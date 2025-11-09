import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Zap, CheckCircle, ArrowLeft } from 'lucide-react';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donationData } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // If no donation data, redirect back
  if (!donationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">No donation data found</h2>
          <button
            onClick={() => navigate('/campaigns')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Campaigns
          </button>
        </motion.div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Secure payment with Visa, Mastercard, or American Express',
      fields: [
        { label: 'Card Number', placeholder: '1234 5678 9012 3456', type: 'text' },
        { label: 'Expiry Date', placeholder: 'MM/YY', type: 'text' },
        { label: 'CVV', placeholder: '123', type: 'text' }
      ]
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Zap,
      description: 'Quick payment using your UPI ID (Google Pay, PhonePe, Paytm)',
      fields: [
        { label: 'UPI ID', placeholder: 'yourname@upi', type: 'email' }
      ]
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Smartphone,
      description: 'Safe and secure payment through PayPal',
      fields: [
        { label: 'PayPal Email', placeholder: 'your.email@paypal.com', type: 'email' }
      ]
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setPaymentSuccess(true);

    // Redirect after success
    setTimeout(() => {
      navigate('/campaigns');
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-gray-300 mb-4">
            Thank you for your generous donation of <span className="font-bold text-green-400">₹{donationData.amount}</span>
          </p>
          <p className="text-sm text-gray-400 mb-6">
            A confirmation email has been sent to <span className="font-semibold">{donationData.email}</span>
          </p>
          <div className="text-gray-300 text-sm">
            Redirecting to campaigns in 3 seconds...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 sticky top-32">
              <h3 className="text-lg font-bold text-white mb-6">Donation Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="pb-4 border-b border-slate-700">
                  <p className="text-sm text-gray-400">Donor Name</p>
                  <p className="text-white font-semibold">{donationData.name}</p>
                </div>
                
                <div className="pb-4 border-b border-slate-700">
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-semibold text-sm">{donationData.email}</p>
                </div>
                
                <div className="pb-4 border-b border-slate-700">
                  <p className="text-sm text-gray-400">Cause</p>
                  <p className="text-white font-semibold">{donationData.cause || 'General'}</p>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-400 mb-2">Donation Amount</p>
                  <p className="text-4xl font-bold text-green-400">₹{donationData.amount}</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-200">
                  ✓ Your donation is secure and tax-deductible
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-8">Select Payment Method</h2>

              {/* Payment Method Cards */}
              <div className="grid gap-4 mb-8">
                {paymentMethods.map((method, idx) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod?.id === method.id;

                  return (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setSelectedMethod(method)}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
                        isSelected
                          ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-blue-500/30' : 'bg-slate-600/50'}`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-400' : 'text-gray-300'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{method.name}</h3>
                          <p className="text-sm text-gray-400">{method.description}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                          >
                            <span className="text-white text-xs">✓</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Payment Form Fields */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-3 pt-4 border-t border-slate-600"
                        >
                          {method.fields.map((field, idx) => (
                            <div key={idx}>
                              <label className="text-sm text-gray-300 block mb-2">{field.label}</label>
                              <input
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                              />
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Security Note */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-8">
                <p className="text-sm text-green-200">
                  🔒 All payments are encrypted and secured with industry-standard SSL security
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handlePayment}
                  disabled={!selectedMethod || processing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    selectedMethod && !processing
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {processing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₹{donationData.amount}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
