'use client';

import { useState } from 'react';

interface ContactFormProps {
  venueName: string;
  whatsappNumber: string;
}

export default function ContactForm({ venueName, whatsappNumber }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    guests: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.date) newErrors.date = 'Please select an event date';
    if (!formData.guests) {
      newErrors.guests = 'Please specify guest count';
    } else if (isNaN(Number(formData.guests)) || Number(formData.guests) <= 0) {
      newErrors.guests = 'Please enter a valid guest count';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({ name: '', date: '', guests: '', message: '' });
    }, 1500);
  };

  const triggerWhatsApp = () => {
    const text = `Hi, I am interested in booking ${venueName} for my event. Here are the details:
- Name: ${formData.name || 'N/A'}
- Date: ${formData.date || 'N/A'}
- Guest Count: ${formData.guests || 'N/A'}
- Message: ${formData.message || 'N/A'}`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#faf7f2] border border-[#c5a880]/30 rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(197,168,128,0.15)] relative overflow-hidden group">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c5a880]/30 rounded-tl-xl transition-all group-hover:border-[#c5a880]"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c5a880]/30 rounded-tr-xl transition-all group-hover:border-[#c5a880]"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c5a880]/30 rounded-bl-xl transition-all group-hover:border-[#c5a880]"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c5a880]/30 rounded-br-xl transition-all group-hover:border-[#c5a880]"></div>

      {isSubmitted ? (
        <div className="py-12 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-[#c5a880]/20 rounded-full flex items-center justify-center mx-auto border border-[#c5a880]/40">
            <svg className="w-8 h-8 text-[#6b1d2f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-[#6b1d2f] font-bold">Enquiry Received</h3>
            <p className="text-sm text-[#0f172a]/75 max-w-sm mx-auto leading-relaxed">
              Thank you for choosing {venueName}. Our luxury events coordinator will review your details and connect with you shortly.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-semibold text-[#6b1d2f] hover:underline cursor-pointer"
            >
              Submit Another Enquiry
            </button>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <button
              onClick={triggerWhatsApp}
              className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1 justify-center cursor-pointer"
            >
              <span>Instant Follow-up on WhatsApp</span>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.003 21.162c-3.414 0-6.643-1.921-8.238-4.997L2.077 21l4.981-1.306c1.478.804 3.143 1.228 4.935 1.23h.005c6.11 0 11.085-4.975 11.085-11.085 0-2.96-1.152-5.742-3.245-7.837C17.742 1.156 14.962 0 12.003 0c-6.11 0-11.086 4.975-11.086 11.085 0 1.956.516 3.864 1.492 5.549L1.003 24l7.397-1.94a11.026 11.026 0 005.127 1.267h.005c6.11 0 11.093-4.978 11.093-11.085 0-1.93-.526-3.83-1.522-5.513l-1.01 1.748c.83 1.411 1.268 3.018 1.268 4.673 0 5.12-4.167 9.287-9.288 9.287h-.003c-1.63 0-3.14-.424-4.47-1.189l-.427-.245-4.403 1.155 1.176-4.293-.274-.436a9.231 9.231 0 01-1.423-4.945c0-5.12 4.167-9.288 9.287-9.288 2.482 0 4.815.967 6.57 2.722 1.756 1.756 2.722 4.09 2.722 6.571-.002 5.12-4.172 9.288-9.29 9.288z"/>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-center space-y-1 pb-2">
            <h3 className="font-serif text-2xl text-[#6b1d2f] font-bold">Request a Bespoke Proposal</h3>
            <p className="text-xs text-[#0f172a]/60">Share your vision, and we will craft a customized experience.</p>
          </div>

          <div className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-[#0f172a]/70">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Eleanor Vance"
                className={`w-full px-4 py-3 bg-white border ${
                  errors.name ? 'border-red-500' : 'border-[#c5a880]/30 focus:border-[#6b1d2f]'
                } rounded-lg text-sm text-[#0f172a] placeholder-neutral-400 focus:outline-none transition-colors duration-250`}
              />
              {errors.name && <span className="text-[11px] text-red-500 font-medium">{errors.name}</span>}
            </div>

            {/* Grid for Date and Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-[#0f172a]/70">Event Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.date ? 'border-red-500' : 'border-[#c5a880]/30 focus:border-[#6b1d2f]'
                  } rounded-lg text-sm text-[#0f172a] focus:outline-none transition-colors duration-250`}
                />
                {errors.date && <span className="text-[11px] text-red-500 font-medium">{errors.date}</span>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wider text-[#0f172a]/70">Expected Guests</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.guests ? 'border-red-500' : 'border-[#c5a880]/30 focus:border-[#6b1d2f]'
                  } rounded-lg text-sm text-[#0f172a] placeholder-neutral-400 focus:outline-none transition-colors duration-250`}
                />
                {errors.guests && <span className="text-[11px] text-red-500 font-medium">{errors.guests}</span>}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-[#0f172a]/70">Special Requests / Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your wedding theme, catering preferences, or general queries..."
                rows={3}
                className="w-full px-4 py-3 bg-white border border-[#c5a880]/30 focus:border-[#6b1d2f] rounded-lg text-sm text-[#0f172a] placeholder-neutral-400 focus:outline-none transition-colors duration-250 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#6b1d2f] to-[#4a1525] hover:from-[#7e253a] hover:to-[#581a2c] text-white shadow-md hover:shadow-xl transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Curating Proposal...</span>
              </>
            ) : (
              <span>Submit Proposal Request</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
