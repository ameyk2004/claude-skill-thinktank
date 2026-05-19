import type { AppView } from '../App'
import './WelcomeDashboard.css'

interface Props {
  onNavigate: (view: AppView) => void
}

export default function WelcomeDashboard({ onNavigate }: Props) {
  return (
    <div className="welcome-page">
      {/* Floating ambient orbs */}
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      {/* Nav */}
      <nav className="welcome-nav glass-panel">
        <div className="nav-brand">
          <span className="brand-icon">T</span>
          <span className="brand-text">ThinkTank</span>
        </div>
        <div className="nav-links">
          <a href="https://github.com/ameyk2004/claude-skill-thinktank" target="_blank" rel="noreferrer" className="btn btn-ghost">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            View Repo
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge label-text animate-fade-in">Architecture Decision Engine</div>
        <h1 className="hero-title animate-fade-in-up">
          Think<span className="hero-accent">Tank</span>
          <span className="hero-sub-title">AI Workflow</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-up stagger-1">
          Multi-agent adversarial debates that stress-test your architecture
          before you write a single line of code.
        </p>
      </section>

      {/* Option Cards */}
      <section className="option-cards">
        <button
          className="option-card glass-panel animate-fade-in-up stagger-2"
          onClick={() => onNavigate('arena')}
          id="card-github"
        >
          <div className="card-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          </div>
          <h3 className="card-title">Connect GitHub</h3>
          <p className="card-desc">Link your repository for context-aware architectural debates with full ADR integration.</p>
          <span className="card-cta">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </button>

        <button
          className="option-card glass-panel animate-fade-in-up stagger-3"
          onClick={() => onNavigate('arena')}
          id="card-greenfield"
        >
          <div className="card-icon-wrap card-icon-green">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <h3 className="card-title">Start Greenfield</h3>
          <p className="card-desc">Begin a brand-new project from scratch. No constraints, no legacy — just pure design.</p>
          <span className="card-cta">
            Launch Arena
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </button>

        <button
          className="option-card glass-panel animate-fade-in-up stagger-4"
          onClick={() => onNavigate('cli-guide')}
          id="card-cli"
        >
          <div className="card-icon-wrap card-icon-blue">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          </div>
          <h3 className="card-title">Add to Claude Code</h3>
          <p className="card-desc">Import the ThinkTank skill directly into your local Claude Code CLI in one command.</p>
          <span className="card-cta">
            View Guide
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </button>
      </section>

      {/* Footer tagline */}
      <footer className="welcome-footer animate-fade-in stagger-5">
        <p>Zero dependencies. Token-optimized. Open source.</p>
      </footer>
    </div>
  )
}
