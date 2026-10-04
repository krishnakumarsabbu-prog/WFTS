import React from 'react';
import type { GitHubSubmitResult } from '../types';
import { CheckIcon, ArrowRightIcon } from '../components/icons';
import { InnovationBackground, GoldDivider } from '../components/InnovationBackground';
import { WFTheme } from '../theme';

interface SuccessScreenProps {
  sessionId: string;
  anchorName: string;
  submitResult: GitHubSubmitResult | null;
  onStartNew: () => void;
}

export function SuccessScreen({ sessionId, anchorName, submitResult, onStartNew }: SuccessScreenProps) {
  const isLocal =
    submitResult?.commitSha === 'local-demo-saved' ||
    submitResult?.commitSha === 'local-saved-waiting-token';

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1A1C] relative flex flex-col justify-between">
      <InnovationBackground variant="light" />

      <main className="max-w-md mx-auto w-full px-6 py-12 flex-1 flex flex-col justify-center items-center">
        {/* Checkmark Animation Centerpiece */}
        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl relative" style={{ backgroundColor: WFTheme.colors.red }}>
            <CheckIcon size={40} color="#FFFFFF" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: WFTheme.colors.gold }} />
          </div>

          <h1 className="text-2xl font-extrabold text-[#1A1A1C] mt-5 tracking-tight text-center">
            Insight Captured
          </h1>
          <p className="text-xs text-[#4A4A50] mt-1 text-center max-w-xs">
            {isLocal
              ? 'Saved locally to browser storage (Configure GitHub token to push live).'
              : 'Successfully committed and uploaded to GitHub repository!'}
          </p>
        </div>

        {/* Details Card */}
        <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#E8E8EA] space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-[#6B6B70] uppercase tracking-wider">Feedback ID</span>
            <span className="text-xs font-mono font-extrabold" style={{ color: WFTheme.colors.red }}>{sessionId}</span>
          </div>

          <GoldDivider />

          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-[#6B6B70] uppercase tracking-wider">Author / Anchor</span>
            <span className="text-xs font-bold text-[#1A1A1C]">{anchorName}</span>
          </div>

          <GoldDivider />

          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-[#6B6B70] uppercase tracking-wider">Repository</span>
            <span className="text-xs font-medium text-[#4A4A50]">krishnakumarsabbu-prog/WFTS</span>
          </div>

          <GoldDivider />

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLocal ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`} />
              <span className="text-[10px] font-bold text-[#6B6B70] uppercase tracking-wider">
                {isLocal ? 'Offline Storage' : 'GitHub Live Commit'}
              </span>
            </div>
            <div className="text-xs font-mono text-[#4A4A50] break-all bg-[#FAF9F7] p-2 rounded-lg border border-[#E8E8EA]">
              {submitResult?.filePath || 'Submitted'}
            </div>
            {isLocal ? (
              <p className="text-[10px] text-[#9A9A9F]">Saved offline. Provide your GitHub token to upload records.</p>
            ) : submitResult?.commitSha ? (
              <p className="text-[10px] font-mono text-[#9A9A9F]">Commit SHA: {submitResult.commitSha.slice(0, 10)}</p>
            ) : null}
          </div>
        </div>

        <p className="text-xs font-medium text-[#9A9A9F] mt-6">
          Ready for the next conversation
        </p>
      </main>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-[#E8E8EA] py-3 px-5">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={onStartNew}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
            style={{
              background: `linear-gradient(135deg, ${WFTheme.colors.redBright} 0%, ${WFTheme.colors.redDeep} 100%)`,
              boxShadow: WFTheme.shadows.button,
            }}
          >
            <span>Start New Conversation</span>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
