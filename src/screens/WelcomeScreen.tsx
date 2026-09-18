import { useState } from 'react';
import { APP_CONFIG } from '../config';
import { ArrowRightIcon, UserIcon } from '../components/icons';
import { InnovationBackground, GoldDivider } from '../components/InnovationBackground';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  const trimmed = name.trim();
  const isValid = trimmed.length >= 2;

  const handleSubmit = () => {
    setTouched(true);
    if (isValid) {
      onStart(trimmed);
    }
  };

  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-wf-ink text-white overflow-hidden">
      <InnovationBackground variant="dark" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-16 pb-6">
        {/* Eyebrow */}
        <div className="animate-fade-in mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-wf-red animate-pulse" />
            <p className="text-[11px] font-semibold text-wf-stone-500 uppercase tracking-[0.2em]">
              Technology Innovation Summit 2026
            </p>
          </div>
        </div>

        {/* Hero headline */}
        <div className="animate-slide-up mb-3">
          <h1 className="text-[2.5rem] leading-[1.05] font-extrabold tracking-tight">
            Your Conversation
            <br />
            Can Shape{' '}
            <span className="text-gradient-gold-red">What's Next.</span>
          </h1>
        </div>

        <p className="text-sm text-wf-stone-400 leading-relaxed max-w-xs mb-10 animate-slide-up-delayed">
          Capture what visitors think. Turn conversations into actionable innovation insight.
        </p>

        {/* Flow visualization */}
        <div className="flex items-center gap-3 mb-10 animate-fade-in-slow">
          {['VOICE', 'AI', 'INSIGHT'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              {i > 0 && <div className="w-6 h-px bg-gradient-to-r from-wf-red/40 to-wf-gold/40" />}
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                  i === 0 ? 'bg-wf-red/20 text-wf-red-bright border border-wf-red/30'
                  : i === 1 ? 'bg-wf-gold/10 text-wf-gold border border-wf-gold/20'
                  : 'bg-white/5 text-white border border-white/10'
                }`}>
                  {i + 1}
                </div>
                <span className="text-[9px] font-semibold text-wf-stone-500 tracking-wider">{step}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Glass panel */}
        <div className="glass-dark rounded-2xl p-6 animate-slide-up-delayed">
          <div className="mb-1">
            <h2 className="text-lg font-bold text-white">Start Your Session</h2>
            <p className="text-xs text-wf-stone-400 mt-1">Tell us who you are to begin capturing visitor insights.</p>
          </div>

          <GoldDivider className="my-5" />

          <label htmlFor="anchor-name" className="block text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.15em] mb-2.5">
            Anchor Name
          </label>
          <div className="relative mb-2">
            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-wf-stone-600" />
            <input
              id="anchor-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter your name"
              className="w-full pl-11 pr-4 py-3.5 text-base text-white bg-white/5 border rounded-xl transition-all outline-none placeholder:text-wf-stone-600"
              style={{
                borderColor: touched && !isValid ? '#D52B1E' : 'rgba(255,255,255,0.08)',
              }}
              onFocus={(e) => { if (!touched || isValid) e.currentTarget.style.borderColor = 'rgba(213,43,30,0.5)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = touched && !isValid ? '#D52B1E' : 'rgba(255,255,255,0.08)'; }}
              aria-label="Enter your name"
              autoComplete="off"
            />
          </div>
          {touched && !isValid && (
            <p className="text-xs text-wf-red-bright font-medium mb-2">Please enter at least 2 characters.</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full flex items-center justify-center gap-2 btn-red-glow text-white font-bold text-base py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:bg-white/5 disabled:text-wf-stone-600 disabled:shadow-none mt-4"
          >
            Begin Session
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-[10px] text-wf-stone-600 mt-auto pt-6 tracking-wider">
          {APP_CONFIG.summitTitle}
        </p>
      </div>
    </div>
  );
}
