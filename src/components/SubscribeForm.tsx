import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function SubscribeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Hardcoding your ID for maximum reliability on all hosting platforms
    const formspreeId = 'xwvnzywb';
    
    try {
      console.log('Attempting to send to Formspree:', formspreeId);
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          _subject: `New Lead: ${formData.firstName} ${formData.lastName}`
        }),
      });

      if (response.ok) {
        console.log('Formspree success');
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '' });
      } else {
        const data = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
        console.error('Formspree error:', data);
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
      setMessage('Failed to connect to the server. Please check your connection.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <h3 className="text-xl font-serif font-bold text-emerald-900 mb-2">You're on the list!</h3>
        <p className="text-emerald-700">
          Thanks for subscribing. We'll send you the latest insights and videos as soon as they're released.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-bold text-emerald-800 hover:underline"
        >
          Add another person
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-serif font-bold text-brand-blue mb-2 text-center">Get the Latest Insights</h3>
        <p className="text-gray-600 text-center mb-8">
          Sign up to receive more strategy sessions and practice management videos directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-brand-blue uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Subscribe to Insights
              </>
            )}
          </button>
          
          <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest">
            No spam. Just high-value strategy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
