import { useState } from 'react'
import './CliGuide.css'

interface Props {
  onBack: () => void
}

type Tab = 'cli' | 'desktop'

export default function CliGuide({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('cli')

  return (
    <div className="cli-page">
      <div className="ambient-orb orb-1" />

      <nav className="welcome-nav glass-panel">
        <button className="btn btn-ghost" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Dashboard
        </button>
      </nav>

      <section className="cli-content">
        <div className="cli-badge label-text animate-fade-in">Local Integration</div>
        <h1 className="cli-title animate-fade-in-up">Add to Claude Code</h1>
        <p className="cli-subtitle animate-fade-in-up stagger-1">
          Import the ThinkTank skill into your Claude environment.
        </p>

        {/* Tabs */}
        <div className="tab-bar glass-panel animate-fade-in-up stagger-2">
          <button
            className={`tab-btn ${activeTab === 'cli' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('cli')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            Claude Code CLI
          </button>
          <button
            className={`tab-btn ${activeTab === 'desktop' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('desktop')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Desktop / Web
          </button>
        </div>

        {/* CLI Tab Content */}
        {activeTab === 'cli' && (
          <div className="tab-content animate-fade-in" key="cli">
            <div className="cli-steps">
              <div className="cli-step glass-panel">
                <div className="step-number">1</div>
                <div className="step-body">
                  <h3>Install the Skill</h3>
                  <p>Run this single command in your terminal:</p>
                  <div className="code-block">
                    <code>claude skill add https://thinktank-assets.s3.amazonaws.com/thinktank.skill</code>
                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText('claude skill add https://thinktank-assets.s3.amazonaws.com/thinktank.skill')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="cli-step glass-panel">
                <div className="step-number">2</div>
                <div className="step-body">
                  <h3>Trigger a Full Debate</h3>
                  <p>Navigate to any project directory and invoke ThinkTank:</p>
                  <div className="code-block">
                    <code>ThinkTank: I want to build a real-time notification system</code>
                  </div>
                </div>
              </div>

              <div className="cli-step glass-panel">
                <div className="step-number">3</div>
                <div className="step-body">
                  <h3>Save Tokens with Targeted Debates</h3>
                  <p>Append a focus tag to reduce token consumption by 60%:</p>
                  <div className="code-block">
                    <code>ThinkTank: I want to build a webhook handler [Focus: Security]</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop / Web Tab Content */}
        {activeTab === 'desktop' && (
          <div className="tab-content animate-fade-in" key="desktop">
            <div className="cli-steps">
              <div className="cli-step glass-panel">
                <div className="step-number step-number-purple">1</div>
                <div className="step-body">
                  <h3>Download the Skill File</h3>
                  <p>Download the <strong>thinktank.skill</strong> file from this repository:</p>
                  <a href="https://thinktank-assets.s3.amazonaws.com/thinktank.skill" download className="btn btn-ghost download-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download thinktank.skill
                  </a>
                </div>
              </div>

              <div className="cli-step glass-panel">
                <div className="step-number step-number-purple">2</div>
                <div className="step-body">
                  <h3>Enable the Skill Creator</h3>
                  <p>In your Claude environment, navigate to:</p>
                  <div className="path-breadcrumb">
                    <span className="crumb">Settings</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span className="crumb">Capabilities</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span className="crumb">Skills</span>
                  </div>
                  <p className="step-note">Ensure that the <strong>Skill Creator</strong> toggle is switched <strong>ON</strong>.</p>
                </div>
              </div>

              <div className="cli-step glass-panel">
                <div className="step-number step-number-purple">3</div>
                <div className="step-body">
                  <h3>Upload the Skill</h3>
                  <p>Navigate to the Skills panel and upload your file:</p>
                  <div className="path-breadcrumb">
                    <span className="crumb">Customize</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span className="crumb">Skills</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span className="crumb highlight-crumb">+ Create Skill</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    <span className="crumb highlight-crumb">Upload a Skill</span>
                  </div>
                  <p className="step-note">Drop your <strong>.skill</strong> or <strong>.zip</strong> file into the upload area.</p>
                </div>
              </div>

              <div className="cli-step glass-panel">
                <div className="step-number step-number-purple">4</div>
                <div className="step-body">
                  <h3>Start Using ThinkTank</h3>
                  <p>Open any conversation and type your architectural question:</p>
                  <div className="code-block">
                    <code>ThinkTank: I want to build a real-time notification system</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
