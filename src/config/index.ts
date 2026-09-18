import type { GitHubConfig } from '../types';

function required(key: keyof ImportMetaEnv, fallback: string): string {
  const val = import.meta.env[key];
  return val && val.trim().length > 0 ? val.trim() : fallback;
}

export const APP_CONFIG = {
  summitTitle: 'Technology Innovation Summit 2026',
  summitShort: 'TIS 2026',
  sessionIdPrefix: 'TIS-2026',
  feedbackPath: 'feedback',
} as const;

export const GITHUB_CONFIG: GitHubConfig = {
  owner: required('VITE_GITHUB_OWNER', 'wellsfargo-tis'),
  repo: required('VITE_GITHUB_REPO', 'feedback-data'),
  branch: required('VITE_GITHUB_BRANCH', 'main'),
  token: required('VITE_GITHUB_TOKEN', ''),
};

export function isGitHubConfigured(): boolean {
  return (
    GITHUB_CONFIG.owner.length > 0 &&
    GITHUB_CONFIG.repo.length > 0 &&
    GITHUB_CONFIG.token.length > 0
  );
}

export function getGitHubConfigStatus(): { configured: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!GITHUB_CONFIG.owner) missing.push('owner');
  if (!GITHUB_CONFIG.repo) missing.push('repo');
  if (!GITHUB_CONFIG.token) missing.push('token');
  return { configured: missing.length === 0, missing };
}
