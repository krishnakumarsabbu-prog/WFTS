import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../config';
import { ArrowRightIcon, UserIcon } from '../components/icons';
import { InnovationBackground, GoldDivider } from '../components/InnovationBackground';
import { WFTheme } from '../theme';
import { GitHubRepository } from '../engines/GitHubRepository';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  onSubmitFeedback?: (name: string, text: string) => void;
}

export function WelcomeScreen({ onStart, onSubmitFeedback }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  // GitHub configuration state
  const [showGitConfig, setShowGitConfig] = useState(false);
  const [gitToken, setGitToken] = useState('');
  const [gitOwner, setGitOwner] = useState('krishnakumarsabbu-prog');
  const [gitRepo, setGitRepo] = useState('WFTS');
  const [gitSaved, setGitSaved] = useState(false);
  const [hasActiveToken, setHasActiveToken] = useState(false);

  useEffect(() => {
    GitHubRepository.getActiveConfig().then((cfg) => {
      setGitOwner(cfg.owner || 'krishnakumarsabbu-prog');
      setGitRepo(cfg.repo || 'WFTS');
      setGitToken(cfg.token || '');
      setHasActiveToken(Boolean(cfg.token && cfg.token.trim().length > 0));
    });
  }, []);

  const handleSaveGit = async () => {
    await GitHubRepository.saveCustomConfig({
      owner: gitOwner,
      repo: gitRepo,
      token: gitToken,
    });
    setHasActiveToken(Boolean(gitToken && gitToken.trim().length > 0));
    setGitSaved(true);
    setTimeout(() => {
      setGitSaved(false);
      setShowGitConfig(false);
    }, 1500);
  };

  const trimmedName = name.trim();
  const trimmedFeedback = feedbackText.trim();
  const hasFeedback = trimmedFeedback.length >= 3;

  const handleStartVoice = () => {
    onStart(trimmedName || 'Booth Anchor');
  };

  const handleSubmitFeedback = () => {
    if (hasFeedback && onSubmitFeedback) {
      onSubmitFeedback(trimmedName || 'Booth Anchor', trimmedFeedback);
    } else {
      handleStartVoice();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1A1C] relative flex flex-col justify-between">
      <InnovationBackground variant="light" />

      <main className="max-w-xl mx-auto w-full px-5 py-8 flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: WFTheme.colors.red }} />
          <span className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-widest">
            Technology Innovation Summit 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1C] tracking-tight leading-tight mb-2">
          Your Conversation <br />
          Can Shape <span style={{ color: WFTheme.colors.red }}>What's Next.</span>
        </h1>

        <p className="text-sm text-[#4A4A50] leading-relaxed mb-6">
          Capture what visitors think. Speak or type below to transform conversations into actionable innovation insights.
        </p>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-6 bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-[#E8E8EA]">
          {['VOICE / TEXT', 'AI INSIGHT', 'ACTION'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0
                    ? 'bg-[#FEF2F2] text-[#D52B1E] border border-[#F8C5C5]'
                    : i === 1
                    ? 'bg-[#FFFDF5] text-[#D4A017] border border-[#FFEBA8]'
                    : 'bg-[#F0F0F2] text-[#6B6B70]'
                }`}
              >
                {i + 1}
              </div>
              <span className="text-[11px] font-bold text-[#4A4A50] tracking-wide">{step}</span>
              {i < 2 && <span className="text-[#C4C4C8] mx-1">→</span>}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E8EA] mb-4">
          <h2 className="text-lg font-bold text-[#1A1A1C]">Capture Visitor Feedback</h2>
          <p className="text-xs text-[#6B6B70] mt-0.5">Enter notes directly or start a voice recording session.</p>

          <GoldDivider className="my-4" />

          {/* Anchor Name */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#1A1A1C] mb-1.5">
              Anchor Name <span className="text-[#9A9A9F] font-normal">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#9A9A9F]">
                <UserIcon size={16} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera or Booth Host"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F7] rounded-xl border border-[#E8E8EA] text-sm text-[#1A1A1C] placeholder-[#9A9A9F] focus:outline-none focus:border-[#D52B1E] focus:ring-1 focus:ring-[#D52B1E] transition-all"
              />
            </div>
          </div>

          {/* Feedback / Conversation Notes */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-[#1A1A1C]">Conversation / Feedback Notes</label>
              {hasFeedback ? (
                <span className="text-[11px] text-[#6B6B70] font-mono">{trimmedFeedback.length} chars</span>
              ) : null}
            </div>
            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Type or paste what the visitor shared (e.g. 'Visitor loves the mobile dashboard speed, but concerned about AI security and wants follow-up demo next month')..."
              className="w-full px-3.5 py-2.5 bg-[#FAF9F7] rounded-xl border border-[#E8E8EA] text-sm text-[#1A1A1C] placeholder-[#9A9A9F] focus:outline-none focus:border-[#D52B1E] focus:ring-1 focus:ring-[#D52B1E] resize-none transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            {hasFeedback ? (
              <>
                <button
                  type="button"
                  onClick={handleSubmitFeedback}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  style={{
                    background: `linear-gradient(135deg, ${WFTheme.colors.redBright} 0%, ${WFTheme.colors.redDeep} 100%)`,
                    boxShadow: WFTheme.shadows.button,
                  }}
                >
                  <span>Analyze & Submit Feedback</span>
                  <ArrowRightIcon size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleStartVoice}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#4A4A50] bg-[#F8F7F4] hover:bg-[#EFEFEA] border border-[#E8E8EA] transition-all"
                >
                  Switch to Live Voice Recording
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleStartVoice}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  style={{
                    background: `linear-gradient(135deg, ${WFTheme.colors.redBright} 0%, ${WFTheme.colors.redDeep} 100%)`,
                    boxShadow: WFTheme.shadows.button,
                  }}
                >
                  <span>Start Voice Recording</span>
                  <ArrowRightIcon size={18} />
                </button>
                <p className="text-center text-[11px] text-[#9A9A9F] mt-1">
                  Or type your feedback notes above to analyze immediately.
                </p>
              </>
            )}
          </div>
        </div>

        {/* GitHub Connection Strip */}
        <div
          onClick={() => setShowGitConfig(!showGitConfig)}
          className="bg-white/80 backdrop-blur-sm border border-[#E8E8EA] rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-white transition-all mb-3"
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                hasActiveToken ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
              }`}
            />
            <span className="text-xs font-medium text-[#4A4A50]">
              {hasActiveToken
                ? `GitHub: ${gitOwner}/${gitRepo}`
                : 'GitHub: Token not set (Click to connect)'}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#6B6B70]">
            {showGitConfig ? '▲ Close' : '⚙️ Setup'}
          </span>
        </div>

        {/* GitHub Config Modal / Drawer */}
        {showGitConfig && (
          <div className="bg-white border border-[#E8E8EA] rounded-2xl p-5 mb-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#1A1A1C]">GitHub Repository Sync</h3>
            <p className="text-[11px] text-[#6B6B70] mt-0.5 mb-3">
              Feedback will be saved directly into: <code>feedback/&lt;user&gt;/&lt;date&gt;/&lt;id&gt;.json</code>
            </p>

            <div className="mb-3">
              <label className="block text-[11px] font-semibold text-[#4A4A50] mb-1">
                Repository (Owner / Repo)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={gitOwner}
                  onChange={(e) => setGitOwner(e.target.value)}
                  placeholder="krishnakumarsabbu-prog"
                  className="flex-1 px-3 py-2 bg-[#FAF9F7] rounded-lg border border-[#E8E8EA] text-xs font-mono"
                />
                <span className="text-[#9A9A9F]">/</span>
                <input
                  type="text"
                  value={gitRepo}
                  onChange={(e) => setGitRepo(e.target.value)}
                  placeholder="WFTS"
                  className="flex-1 px-3 py-2 bg-[#FAF9F7] rounded-lg border border-[#E8E8EA] text-xs font-mono"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-[#4A4A50] mb-1">
                Personal Access Token (Classic with <code>repo</code> or Fine-grained with <code>Contents: Read and write</code>)
              </label>
              <input
                type="password"
                value={gitToken}
                onChange={(e) => setGitToken(e.target.value)}
                placeholder="ghp_... or github_pat_..."
                className="w-full px-3 py-2 bg-[#FAF9F7] rounded-lg border border-[#E8E8EA] text-xs font-mono"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveGit}
              className="w-full py-2.5 px-4 rounded-xl text-white font-semibold text-xs transition-all active:scale-[0.99]"
              style={{ backgroundColor: gitSaved ? WFTheme.colors.success : WFTheme.colors.red }}
            >
              {gitSaved ? '✓ Connection Saved!' : 'Save & Connect to GitHub'}
            </button>
          </div>
        )}

        <footer className="text-center text-[11px] text-[#9A9A9F] mt-4 font-medium">
          {APP_CONFIG.summitTitle}
        </footer>
      </main>
    </div>
  );
}
