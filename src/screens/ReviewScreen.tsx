import { useState } from 'react';
import type { StructuredFeedback, Sentiment, InterestLevel } from '../types';
import { ArrowLeftIcon, PlusIcon, TrashIcon, CloudIcon } from '../components/icons';

interface ReviewScreenProps {
  feedback: StructuredFeedback;
  onUpdate: (feedback: StructuredFeedback) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const SENTIMENT_OPTIONS: Sentiment[] = ['positive', 'neutral', 'negative', 'mixed'];
const INTEREST_OPTIONS: InterestLevel[] = ['high', 'medium', 'low'];

const SENTIMENT_COLORS: Record<Sentiment, string> = {
  positive: 'bg-green-100 text-green-700 border-green-200',
  neutral: 'bg-wf-stone-100 text-wf-stone-600 border-wf-stone-200',
  negative: 'bg-wf-red-50 text-wf-red border-wf-red/20',
  mixed: 'bg-amber-100 text-amber-700 border-amber-200',
};

const INTEREST_COLORS: Record<InterestLevel, string> = {
  high: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-wf-stone-100 text-wf-stone-600 border-wf-stone-200',
};

export function ReviewScreen({ feedback, onUpdate, onSubmit, onBack }: ReviewScreenProps) {
  const update = (partial: Partial<StructuredFeedback>) => {
    onUpdate({ ...feedback, ...partial });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-wf-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-wf-stone-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-wf-stone-600 hover:bg-wf-stone-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-wf-charcoal">Review Feedback</h2>
            <p className="text-xs text-wf-stone-500">Edit before submitting to GitHub</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Session info */}
        <div className="bg-white border border-wf-stone-200 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[11px] font-semibold text-wf-stone-500 uppercase tracking-wider mb-1">Session ID</p>
              <p className="text-sm font-mono font-semibold text-wf-charcoal">{feedback.sessionId}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-wf-stone-500 uppercase tracking-wider mb-1">Anchor</p>
              <p className="text-sm font-semibold text-wf-charcoal">{feedback.anchorName}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <Section title="Overall Summary">
          <textarea
            value={feedback.summary}
            onChange={(e) => update({ summary: e.target.value })}
            className="w-full p-3 text-sm text-wf-charcoal bg-wf-stone-50 border border-wf-stone-200 rounded-lg resize-none outline-none focus:border-wf-red transition-colors leading-relaxed"
            rows={3}
          />
        </Section>

        {/* Sentiment */}
        <Section title="Sentiment">
          <div className="flex gap-2">
            {SENTIMENT_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => update({ sentiment: s })}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all capitalize ${
                  feedback.sentiment === s
                    ? SENTIMENT_COLORS[s]
                    : 'bg-white text-wf-stone-400 border-wf-stone-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Section>

        {/* Interest Level */}
        <Section title="Interest Level">
          <div className="flex gap-2">
            {INTEREST_OPTIONS.map((l) => (
              <button
                key={l}
                onClick={() => update({ interestLevel: l })}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border-2 transition-all capitalize ${
                  feedback.interestLevel === l
                    ? INTEREST_COLORS[l]
                    : 'bg-white text-wf-stone-400 border-wf-stone-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </Section>

        {/* Liked */}
        <EditableList
          title="What the visitor liked"
          items={feedback.liked}
          onChange={(liked) => update({ liked })}
          placeholder="Add something the visitor liked..."
        />

        {/* Concerns */}
        <EditableList
          title="Concerns"
          items={feedback.concerns}
          onChange={(concerns) => update({ concerns })}
          placeholder="Add a concern..."
        />

        {/* Pain Points */}
        <EditableList
          title="Pain Points"
          items={feedback.painPoints}
          onChange={(painPoints) => update({ painPoints })}
          placeholder="Add a pain point..."
        />

        {/* Suggestions */}
        <EditableList
          title="Suggestions"
          items={feedback.suggestions}
          onChange={(suggestions) => update({ suggestions })}
          placeholder="Add a suggestion..."
        />

        {/* Follow-up */}
        <Section title="Follow-up Required">
          <div className="flex gap-2">
            <button
              onClick={() => update({ followUpRequired: true })}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                feedback.followUpRequired
                  ? 'bg-wf-red text-white border-wf-red'
                  : 'bg-white text-wf-stone-500 border-wf-stone-200'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => update({ followUpRequired: false })}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                !feedback.followUpRequired
                  ? 'bg-wf-charcoal text-white border-wf-charcoal'
                  : 'bg-white text-wf-stone-500 border-wf-stone-200'
              }`}
            >
              No
            </button>
          </div>
        </Section>

        {/* Transcript preview */}
        <Section title="Transcript (Source Evidence)">
          <div className="bg-wf-stone-50 border border-wf-stone-200 rounded-lg p-3 max-h-40 overflow-y-auto">
            <p className="text-xs text-wf-stone-600 leading-relaxed whitespace-pre-wrap">
              {feedback.transcript}
            </p>
          </div>
        </Section>
      </div>

      {/* Bottom action */}
      <div className="sticky bottom-0 bg-white px-4 py-3 border-t border-wf-stone-200">
        <button
          onClick={onSubmit}
          className="w-full flex items-center justify-center gap-2 bg-wf-red text-white font-semibold text-base py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-sm"
        >
          <CloudIcon className="w-5 h-5" />
          Submit to GitHub
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-wf-stone-200 rounded-xl p-4 animate-fade-in">
      <h3 className="text-xs font-semibold text-wf-stone-600 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function EditableList({
  title,
  items,
  onChange,
  placeholder,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <Section title={title}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-wf-charcoal bg-wf-stone-50 border border-wf-stone-200 rounded-lg outline-none focus:border-wf-red transition-colors"
            />
            <button
              onClick={() => removeItem(index)}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-wf-stone-400 hover:text-wf-red hover:bg-wf-red-50 transition-colors"
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
            className="flex-1 px-3 py-2 text-sm text-wf-charcoal bg-white border border-wf-stone-200 rounded-lg outline-none focus:border-wf-red transition-colors placeholder:text-wf-stone-400"
          />
          <button
            onClick={addItem}
            disabled={!newItem.trim()}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-wf-stone-100 text-wf-stone-600 hover:bg-wf-stone-200 transition-colors disabled:opacity-40"
            aria-label="Add"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        {items.length === 0 && !newItem && (
          <p className="text-xs text-wf-stone-400 italic">No items captured.</p>
        )}
      </div>
    </Section>
  );
}
