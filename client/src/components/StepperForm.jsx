import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Your Details' },
  { id: 2, title: 'Select Cause' },
  { id: 3, title: 'Confirm & Donate' }
];

const StepperForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', cause: '', amount: '' });
  const [submitting, setSubmitting] = useState(false);

  const goNext = () => setStep(s => Math.min(steps.length, s + 1));
  const goPrev = () => setStep(s => Math.max(1, s - 1));

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Validate form
    if (!form.name || !form.email || !form.cause || !form.amount) {
      alert('Please fill in all fields');
      setSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    
    // Navigate to payment page with donation data
    navigate('/payment', {
      state: {
        donationData: {
          name: form.name,
          email: form.email,
          cause: form.cause,
          amount: form.amount
        }
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/60 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        {steps.map(s => (
          <div key={s.id} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.id ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{s.id}</div>
            <div className="hidden md:block">
              <div className={`text-sm font-semibold ${step >= s.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>{s.title}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700" placeholder="Jane Doe" />

            <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-4 block">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700" placeholder="jane@example.com" />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Cause</label>
            <select name="cause" value={form.cause} onChange={handleChange} className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <option value="">Select a cause</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="food">Food</option>
            </select>

            <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-4 block">Amount (₹)</label>
            <input name="amount" value={form.amount} onChange={handleChange} type="number" className="w-full mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700" placeholder="1000" />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-sm text-gray-700 dark:text-gray-200">Please confirm your details</div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between"><span className="text-gray-600">Name</span><span className="font-medium">{form.name || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Email</span><span className="font-medium">{form.email || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Cause</span><span className="font-medium">{form.cause || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Amount</span><span className="font-medium">₹{form.amount || '0'}</span></div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div>
            {step > 1 && <button type="button" onClick={goPrev} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">Back</button>}
          </div>

          <div className="flex items-center gap-3">
            {step < steps.length ? (
              <button type="button" onClick={goNext} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Next</button>
            ) : (
              <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 transition-colors">{submitting ? 'Processing...' : 'Proceed to Payment'}</button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepperForm;
