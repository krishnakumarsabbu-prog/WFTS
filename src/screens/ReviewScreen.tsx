import { useState } from 'react';
import type { StructuredFeedback, Sentiment, InterestLevel } from '../types';
import { ArrowLeftIcon, PlusIcon, TrashIcon, CloudIcon } from '../components/icons';
import { InnovationBackground, GoldDivider } from '../components/InnovationBackground';

interface ReviewScreenProps {
  feedback: StructuredFeedback;
  onUpdate: (feedback: StructuredFeedback) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const SENTIMENT_OPTIONS: Sentiment[] = ['positive', 'neutral', 'negative', 'mixed'];
const INTEREST_OPTIONS: InterestLevel[] = ['high', 'medium', 'low'];

const SENTIMENT_STYLES: Record<Sentiment, { active: string; dot: string }> = {
  positive: { active: 'bg-green-500/15 text-green-400 border-green-500/30', dot: 'bg-green-400' },
  neutral: { active: 'bg-white/10 text-wf-stone-300 border-white/15', dot: 'bg-wf-stone-400' },
  negative: { active: 'bg-wf-red/15 text-wf-red-bright border-wf-red/30', dot: 'bg-wf-red-bright' },
  mixed: { active: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' },
};

const INTEREST_STYLES: Record<InterestLevel, { active: string; dot: string }> = {
  high: { active: 'bg-green-500/15 text-green-400 border-green-500/30', dot: 'bg-green-400' },
  medium: { active: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' },
  low: { active: 'bg-white/10 text-wf-stone-300 border-white/15', dot: 'bg-wf-stone-400' },
};

export function ReviewScreen({ feedback, onUpdate, onSubmit, onBack }: ReviewScreenProps) {
  const update = (partial: Partial<StructuredFeedback>) => {
    onUpdate({ ...feedback, ...partial });
  };

  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-wf-ink text-white overflow-hidden">
      <InnovationBackground variant="dark" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-wf-stone-400 hover:bg-white/5 transition-colors"
          aria-label="Back"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-extrabold tracking-tight">Insight Captured</h2>
          <p className="text-[11px] text-wf-stone-500">Here's what we heard from the conversation.</p>
        </div>
      </div>

      <div className="relative z-10 flex-1 px-4 py-4 space-y-3 overflow-y-auto no-scrollbar">
        {/* Session metadata strip */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-wf-stone-600">
          <span>{feedback.sessionId}</span>
          <span className="w-1 h-1 rounded-full bg-wf-stone-700" />
          <span>{feedback.anchorName}</span>
        </div>

        {/* Hero insight card */}
        <div className="glass-dark rounded-2xl p-5 animate-slide-up">
          <p className="text-[10px] font-semibold text-wf-gold uppercase tracking-[0.15em] mb-2">Key Insight</p>
          <textarea
            value={feedback.summary}
            onChange={(e) => update({ summary: e.target.value })}
            className="w-full bg-transparent text-base font-medium text-white leading-relaxed border-0 outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Sentiment + Interest row */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up-delayed">
          <div className="glass-dark rounded-xl p-4">
            <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.12em] mb-2.5">Overall Sentiment</p>
            <div className="flex flex-wrap gap-1.5">
              {SENTIMENT_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => update({ sentiment: s })}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all capitalize ${
                    feedback.sentiment === s ? SENTIMENT_STYLES[s].active : 'bg-transparent text-wf-stone-600 border-white/8'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-dark rounded-xl p-4">
            <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.12em] mb-2.5">Interest Level</p>
            <div className="flex gap-1.5">
              {INTEREST_OPTIONS.map((l) => (
                <button
                  key={l}
                  onClick={() => update({ interestLevel: l })}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all capitalize ${
                    feedback.interestLevel === l ? INTEREST_STYLES[l].active : 'bg-transparent text-wf-stone-600 border-white/8'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Follow-up */}
        <div className="glass-dark rounded-xl p-4 animate-fade-in">
          <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.12em] mb-2.5">Follow-up Required</p>
          <div className="flex gap-2">
            <button
              onClick={() => update({ followUpRequired: true })}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                feedback.followUpRequired ? 'btn-red-glow text-white border-wf-red' : 'bg-transparent text-wf-stone-500 border-white/8'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => update({ followUpRequired: false })}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                !feedback.followUpRequired ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-wf-stone-500 border-white/8'
              }`}
            >
              No
            </button>
          </div>
        </div>

        <GoldDivider className="my-2" />

        {/* Lists */}
        <EditableList title="What They Liked" items={feedback.liked} onChange={(liked) => update({ liked })} placeholder="Add something they liked..." accent="green" />
        <EditableList title="Concerns" items={feedback.concerns} onChange={(concerns) => update({ concerns })} placeholder="Add a concern..." accent="red" />
        <EditableList title="Pain Points" items={feedback.painPoints} onChange={(painPoints) => update({ painPoints })} placeholder="Add a pain point..." accent="amber" />
        <EditableList title="Suggestions" items={feedback.suggestions} onChange={(suggestions) => update({ suggestions })} placeholder="Add a suggestion..." accent="gold" />

        {/* Transcript preview */}
        <div className="glass-dark rounded-xl p-4">
          <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.12em] mb-2">Source Evidence</p>
          <div className="max-h-32 overflow-y-auto no-scrollbar">
            <p className="text-xs text-wf-stone-400 leading-relaxed whitespace-pre-wrap">{feedback.transcript}</p>
          </div>
        </div>
      </div>

      {/* Submit bar */}
      <div className="relative z-10 bg-wf-ink/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 safe-bottom">
        <button
          onClick={onSubmit}
          className="w-full flex items-center justify-center gap-2 btn-red-glow text-white font-bold text-base py-3.5 rounded-xl transition-all active:scale-[0.98]"
        >
          <CloudIcon className="w-5 h-5" />
          Submit to Summit Repository
        </button>
      </div>
    </div>
  );
}

const ACCENT_COLORS: Record<string, string> = {
  green: 'bg-green-400',
  red: 'bg-wf-red-bright',
  amber: 'bg-amber-400',
  gold: 'bg-wf-gold',
};

function EditableList({
  title,
  items,
  onChange,
  placeholder,
  accent,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  accent: string;
}) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));
  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="glass-dark rounded-xl p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-1.5 h-1.5 rounded-full ${ACCENT_COLORS[accent]}`} />
        <h3 className="text-[10px] font-semibold text-wf-stone-400 uppercase tracking-[0.12em]">{title}</h3>
        {items.length > 0 && <span className="text-[10px] text-wf-stone-600 font-mono ml-auto">{items.length}</span>}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-white bg-white/5 border border-white/8 rounded-lg outline-none focus:border-wf-red/40 transition-colors"
            />
            <button
              onClick={() => removeItem(index)}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-wf-stone-600 hover:text-wf-red-bright hover:bg-wf-red/10 transition-colors"
              aria-label="Remove"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 text-sm text-white bg-white/5 border border-white/8 rounded-lg outline-none focus:border-wf-red/40 transition-colors placeholder:text-wf-stone-600"
          />
          <button
            onClick={addItem}
            disabled={!newItem.trim()}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-wf-stone-400 hover:bg-white/10 transition-colors disabled:opacity-30"
            aria-label="Add"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        {items.length === 0 && !newItem && (
          <p className="text-xs text-wf-stone-600 italic">Nothing captured.</p>
        )}
      </div>
    </div>
  );
}
