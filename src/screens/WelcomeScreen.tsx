import { useState } from 'react';
import { APP_CONFIG } from '../config';
import { ArrowRightIcon, UserIcon } from '../components/icons';

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
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wf-red mb-5 shadow-lg shadow-wf-red/20">
              <span className="text-white font-extrabold text-xl tracking-tight">WF</span>
            </div>
            <h1 className="text-2xl font-extrabold text-wf-charcoal leading-tight mb-2">
              Technology Innovation Summit
            </h1>
            <p className="text-sm text-wf-stone-500 font-medium">
              Voice-to-Insight Feedback Capture
            </p>
          </div>

          <div className="bg-wf-stone-50 border border-wf-stone-200 rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-wf-stone-500 uppercase tracking-wider mb-2">
              How it works
            </p>
            <ol className="space-y-2.5">
              {[
                'Enter your name to begin a session',
                'Record a conversation with a visitor',
                'Review and submit the structured feedback',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-wf-red/10 flex items-center justify-center text-[11px] font-bold text-wf-red mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-wf-charcoal leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-2">
            <label htmlFor="anchor-name" className="block text-xs font-semibold text-wf-stone-600 uppercase tracking-wider mb-2">
              Enter your name to begin
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-wf-stone-400" />
              <input
                id="anchor-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Your name"
                className="w-full pl-11 pr-4 py-3.5 text-base text-wf-charcoal bg-white border-2 rounded-xl transition-all outline-none placeholder:text-wf-stone-400"
                style={{
                  borderColor: touched && !isValid ? '#C8102E' : '#E8E8E8',
                }}
                onFocus={(e) => {
                  if (!touched || isValid) e.currentTarget.style.borderColor = '#B31B1B';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = touched && !isValid ? '#C8102E' : '#E8E8E8';
                }}
                aria-label="Enter your name"
                autoComplete="off"
              />
            </div>
            {touched && !isValid && (
              <p className="mt-2 text-xs text-wf-red font-medium">
                Please enter at least 2 characters.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white px-6 pb-6 pt-3 border-t border-wf-stone-100">
        <div className="max-w-sm mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full flex items-center justify-center gap-2 bg-wf-red text-white font-semibold text-base py-4 rounded-xl transition-all active:scale-[0.98] disabled:bg-wf-stone-300 disabled:text-white shadow-sm"
          >
            Continue
            <ArrowRightIcon className="w-5 h-5" />
          </button>
          <p className="text-center text-[11px] text-wf-stone-400 mt-3">
            {APP_CONFIG.summitTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
