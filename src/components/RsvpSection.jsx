import React, { useState } from 'react';
import { Check, Minus, Plus, Utensils, Leaf } from 'lucide-react';

export default function RsvpSection({ onRsvpSubmitted }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    attending: 'yes',
    dietary: 'veg',
    guests: 1,
    children: 0,
    wishes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGuestsChange = (delta) => {
    setFormData((prev) => {
      const next = prev.guests + delta;
      if (next >= 1 && next <= 8) {
        return { ...prev, guests: next };
      }
      return prev;
    });
  };

  const handleChildrenChange = (delta) => {
    setFormData((prev) => {
      const next = prev.children + delta;
      if (next >= 0 && next <= 8) {
        return { ...prev, children: next };
      }
      return prev;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      try {
        const stored = JSON.parse(localStorage.getItem('sn_wedding_rsvp') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('sn_wedding_rsvp', JSON.stringify(stored));
      } catch (err) {
        console.error('Failed to save RSVP:', err);
      }

      if (onRsvpSubmitted) {
        onRsvpSubmitted(formData);
      }
    }, 450);
  };

  return (
    <section
      id="rsvp"
      className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-[#12141C]"
    >
      {/* 1. Full-Bleed Background without Opacity Reduction (100% full opacity) */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-[center_center]"
          style={{ backgroundImage: `url('/assets/rsvp_bg.jpg')` }}
        />
        {/* Subtle edge blends for smooth section continuity */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#12141C] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#12141C] to-transparent pointer-events-none" />
      </div>

      {/* 2. RSVP Card in the Middle */}
      <div className="relative z-20 w-full max-w-md sm:max-w-lg mx-auto my-auto">
        <div className="w-full bg-[#12141C]/85 backdrop-blur-xl border border-[#D2A85C]/35 rounded-[30px] sm:rounded-[34px] p-5 sm:p-8 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden transition-all duration-300 hover:border-[#D2A85C]/60 hover:shadow-[0_30px_70px_rgba(210,168,92,0.2)]">
          
          {/* Decorative Corner Glows */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D2A85C]/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#D2A85C]/10 to-transparent rounded-tr-full pointer-events-none" />

          {/* Title & Subtitle */}
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="font-display text-4xl sm:text-5xl text-[#E7CE9C] tracking-wide font-normal mb-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              RSVP
            </h2>
            <p className="text-[10px] sm:text-[11px] font-sans-ui uppercase tracking-[0.24em] text-[#A9A6A0]">
              We would love to hear from you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
            
            {/* First Name */}
            <div>
              <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-1 font-medium">
                First Name <span className="text-[#D2A85C]">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  if (errors.firstName) setErrors({ ...errors, firstName: null });
                }}
                placeholder="Enter your first name"
                className={`w-full bg-[#1B1F2B] text-sm text-[#F3EFE4] placeholder-[#A9A6A0]/40 rounded-xl px-4 py-2.5 sm:py-3 border transition-all duration-200 outline-none ${
                  errors.firstName
                    ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                    : 'border-[#333A4D] focus:border-[#D2A85C] focus:ring-1 focus:ring-[#D2A85C]/50'
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-[11px] text-red-400 font-sans-ui">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-1 font-medium">
                Last Name <span className="text-[#D2A85C]">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  if (errors.lastName) setErrors({ ...errors, lastName: null });
                }}
                placeholder="Enter your last name"
                className={`w-full bg-[#1B1F2B] text-sm text-[#F3EFE4] placeholder-[#A9A6A0]/40 rounded-xl px-4 py-2.5 sm:py-3 border transition-all duration-200 outline-none ${
                  errors.lastName
                    ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                    : 'border-[#333A4D] focus:border-[#D2A85C] focus:ring-1 focus:ring-[#D2A85C]/50'
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-[11px] text-red-400 font-sans-ui">{errors.lastName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-1 font-medium">
                Email Address <span className="text-[#D2A85C]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder="Enter your email address"
                className={`w-full bg-[#1B1F2B] text-sm text-[#F3EFE4] placeholder-[#A9A6A0]/40 rounded-xl px-4 py-2.5 sm:py-3 border transition-all duration-200 outline-none ${
                  errors.email
                    ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                    : 'border-[#333A4D] focus:border-[#D2A85C] focus:ring-1 focus:ring-[#D2A85C]/50'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-400 font-sans-ui">{errors.email}</p>
              )}
            </div>

            {/* Attendance Radio Pills */}
            <div>
              <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-2 font-medium">
                Will you be attending? <span className="text-[#D2A85C]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Joyfully Accept */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`py-2.5 sm:py-3 px-3 rounded-full text-xs font-semibold flex items-center justify-center space-x-2 transition-all duration-200 active-press ${
                    formData.attending === 'yes'
                      ? 'bg-[#D2A85C] text-[#12141C] shadow-gold-glow'
                      : 'bg-[#1B1F2B] text-[#F3EFE4] border border-[#333A4D] hover:border-[#D2A85C]/50'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      formData.attending === 'yes' ? 'bg-[#12141C]' : 'border border-[#A9A6A0]'
                    }`}
                  >
                    {formData.attending === 'yes' && (
                      <Check className="w-3 h-3 text-[#D2A85C] stroke-[3]" />
                    )}
                  </div>
                  <span>Joyfully Accept</span>
                </button>

                {/* Regretfully Decline */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`py-2.5 sm:py-3 px-3 rounded-full text-xs font-semibold flex items-center justify-center space-x-2 transition-all duration-200 active-press ${
                    formData.attending === 'no'
                      ? 'bg-[#D2A85C] text-[#12141C] shadow-gold-glow'
                      : 'bg-[#1B1F2B] text-[#F3EFE4] border border-[#333A4D] hover:border-[#D2A85C]/50'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      formData.attending === 'no' ? 'bg-[#12141C]' : 'border border-[#A9A6A0]'
                    }`}
                  >
                    {formData.attending === 'no' && (
                      <Check className="w-3 h-3 text-[#D2A85C] stroke-[3]" />
                    )}
                  </div>
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Conditional Guest count, Children, & Dietary preference */}
            {formData.attending === 'yes' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                
                {/* Dietary Preference */}
                <div>
                  <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-2 font-medium">
                    Dietary Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, dietary: 'veg' })}
                      className={`py-2 px-3 rounded-full text-xs font-medium flex items-center justify-center space-x-2 transition-all active-press ${
                        formData.dietary === 'veg'
                          ? 'bg-[#1B1F2B] border-2 border-[#D2A85C] text-[#D2A85C] shadow-sm'
                          : 'bg-[#1B1F2B] text-[#F3EFE4]/80 border border-[#333A4D]'
                      }`}
                    >
                      <Leaf className="w-4 h-4 text-[#D2A85C]" />
                      <span>Vegetarian</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, dietary: 'non-veg' })}
                      className={`py-2 px-3 rounded-full text-xs font-medium flex items-center justify-center space-x-2 transition-all active-press ${
                        formData.dietary === 'non-veg'
                          ? 'bg-[#1B1F2B] border-2 border-[#D2A85C] text-[#D2A85C] shadow-sm'
                          : 'bg-[#1B1F2B] text-[#F3EFE4]/80 border border-[#333A4D]'
                      }`}
                    >
                      <Utensils className="w-4 h-4 text-[#D2A85C]" />
                      <span>Non-Veg</span>
                    </button>
                  </div>
                </div>

                {/* Side-by-Side: Number of Guests & Children */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-1.5 font-medium">
                      Number of Guests
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleGuestsChange(-1)}
                        disabled={formData.guests <= 1}
                        className="w-10 h-10 rounded-xl bg-[#1B1F2B] border border-[#333A4D] hover:border-[#D2A85C]/60 disabled:opacity-40 text-[#F3EFE4] flex items-center justify-center transition-colors active-press"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="flex-1 h-10 bg-[#1B1F2B] border border-[#333A4D] rounded-xl flex items-center justify-center">
                        <span className="text-sm font-semibold text-[#F3EFE4] font-display">
                          {formData.guests}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleGuestsChange(1)}
                        disabled={formData.guests >= 8}
                        className="w-10 h-10 rounded-xl bg-[#1B1F2B] border border-[#333A4D] hover:border-[#D2A85C]/60 disabled:opacity-40 text-[#F3EFE4] flex items-center justify-center transition-colors active-press"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Number of Children */}
                  <div>
                    <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-1.5 font-medium">
                      Children (under 12)
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleChildrenChange(-1)}
                        disabled={formData.children <= 0}
                        className="w-10 h-10 rounded-xl bg-[#1B1F2B] border border-[#333A4D] hover:border-[#D2A85C]/60 disabled:opacity-40 text-[#F3EFE4] flex items-center justify-center transition-colors active-press"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="flex-1 h-10 bg-[#1B1F2B] border border-[#333A4D] rounded-xl flex items-center justify-center">
                        <span className="text-sm font-semibold text-[#F3EFE4] font-display">
                          {formData.children}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleChildrenChange(1)}
                        disabled={formData.children >= 8}
                        className="w-10 h-10 rounded-xl bg-[#1B1F2B] border border-[#333A4D] hover:border-[#D2A85C]/60 disabled:opacity-40 text-[#F3EFE4] flex items-center justify-center transition-colors active-press"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* Warm Wishes */}
            <div>
              <label className="block text-xs font-sans-ui text-[#F3EFE4] mb-1 font-medium">
                Warm Wishes for the Couple
              </label>
              <textarea
                rows={3}
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                placeholder="Share your wishes..."
                className="w-full bg-[#1B1F2B] text-sm text-[#F3EFE4] placeholder-[#A9A6A0]/40 rounded-xl px-4 py-2.5 sm:py-3 border border-[#333A4D] focus:border-[#D2A85C] focus:ring-1 focus:ring-[#D2A85C]/50 transition-all duration-200 outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D2A85C] hover:bg-[#E7CE9C] text-[#12141C] font-sans-ui text-sm font-semibold tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 shadow-gold-glow hover:scale-[1.02] active-press disabled:opacity-70 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[#12141C] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Submit RSVP</span>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
