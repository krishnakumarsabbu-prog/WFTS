import type { GitHubConfig, GitHubSubmitResult, StructuredFeedback } from '../types';
import { GITHUB_CONFIG, isGitHubConfigured } from '../config';
import { todayDateString } from '../utils/session';

export class GitHubRepository {
  private config: GitHubConfig;
  private readonly apiBase = 'https://api.github.com';

  constructor(config?: GitHubConfig) {
    this.config = config ?? GITHUB_CONFIG;
  }

  isConfigured(): boolean {
    return isGitHubConfigured();
  }

  getConfig(): GitHubConfig {
    return { ...this.config };
  }

  private get filePathPrefix(): string {
    return 'feedback';
  }

  buildFilePath(sessionId: string): string {
    const date = todayDateString();
    return `${this.filePathPrefix}/${date}/${sessionId}.json`;
  }

  async submitFeedback(feedback: StructuredFeedback): Promise<GitHubSubmitResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'GitHub repository is not configured. Set VITE_GITHUB_OWNER, VITE_GITHUB_REPO, and VITE_GITHUB_TOKEN.',
      };
    }

    const filePath = this.buildFilePath(feedback.sessionId);
    const content = this.encodeContent(feedback);

    try {
      const url = `${this.apiBase}/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;
      const body = {
        message: `Add feedback: ${feedback.sessionId}`,
        branch: this.config.branch,
        content,
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          commitSha: data.commit?.sha,
          filePath,
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          error: 'GitHub authentication failed. The configured token is invalid or expired.',
        };
      }

      if (response.status === 404) {
        return {
          success: false,
          error: 'GitHub repository not found. Check the owner and repository name.',
        };
      }

      if (response.status === 422) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.message || 'File already exists or validation failed.';
        return {
          success: false,
          error: `GitHub rejected the submission: ${msg}`,
        };
      }

      const errorText = await response.text().catch(() => 'Unknown error');
      return {
        success: false,
        error: `GitHub submission failed (${response.status}): ${errorText}`,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      return {
        success: false,
        error: `Network error while submitting to GitHub: ${message}`,
      };
    }
  }

  private encodeContent(feedback: StructuredFeedback): string {
    const json = JSON.stringify(feedback, null, 2);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
