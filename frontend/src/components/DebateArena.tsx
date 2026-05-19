import { useState } from 'react'
import './DebateArena.css'
import { PERSONAS, STAGES, type DebateMessage, type Stage } from '../data/personas'

interface Props {
  onBack: () => void
}

const MOCK_MESSAGES: DebateMessage[] = [
  {
    id: '1',
    personaId: 'system-architect',
    content: 'I recommend a microservices architecture using event-driven communication via AWS EventBridge. Each domain service will be independently deployable as a Lambda function, with DynamoDB as the primary data store for low-latency reads. API Gateway will serve as the unified entry point.',
    timestamp: '11:42 AM',
  },
  {
    id: '2',
    personaId: 'security-engineer',
    content: 'Each service boundary must enforce strict zero-trust principles. I recommend mTLS for all inter-service communication, IAM policies scoped to least-privilege per Lambda, and request signing for all EventBridge messages. Without this, a compromised service becomes a lateral movement vector.',
    timestamp: '11:43 AM',
    isActive: true,
  },
  {
    id: '3',
    personaId: 'finops-engineer',
    content: 'While the security posture is sound, the compute overhead of mTLS at Lambda scale could increase operational costs by 15-20%. I suggest using VPC-internal communication with security groups as a more cost-effective perimeter, reserving mTLS for external-facing boundaries only.',
    timestamp: '11:44 AM',
  },
  {
    id: '4',
    personaId: 'reliability-engineer',
    content: 'The microservices approach is strong, but I flag the DynamoDB single-table design as a maintenance concern. As the schema evolves, query patterns will become increasingly complex. I recommend starting with separate tables per bounded context to maintain Developer Experience.',
    timestamp: '11:45 AM',
  },
  {
    id: '5',
    personaId: 'current-state-expert',
    content: 'Referencing ADR-20260501: The team already adopted a monorepo strategy. Deploying individual Lambda functions per microservice conflicts with the shared deployment pipeline established in the last sprint. We need to reconcile this or formally supersede ADR-20260501.',
    timestamp: '11:46 AM',
  },
]

export default function DebateArena({ onBack }: Props) {
  const [stages] = useState<Stage[]>(STAGES)
  const [messages] = useState<DebateMessage[]>(MOCK_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [activePersonaId, setActivePersonaId] = useState('security-engineer')
  const [debateRound, setDebateRound] = useState(1)

  const activePersona = PERSONAS.find(p => p.id === activePersonaId)

  return (
    <div className="arena-layout">
      {/* LEFT SIDEBAR — State Machine */}
      <aside className="arena-sidebar-left glass-panel animate-fade-in">
        <button className="back-btn btn-ghost btn" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </button>

        <div className="sidebar-section">
          <h4 className="label-text">Orchestration Flow</h4>
          <div className="stage-tracker">
            {stages.map((stage, index) => (
              <div key={stage.id} className={`stage-node ${stage.status}`}>
                <div className="stage-dot">
                  {stage.status === 'completed' ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : stage.status === 'active' ? (
                    <div className="dot-pulse" />
                  ) : (
                    <div className="dot-empty" />
                  )}
                </div>
                <span className="stage-label">{stage.name}</span>
                {index < stages.length - 1 && <div className="stage-connector" />}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h4 className="label-text">Debate Status</h4>
          <div className="debate-meta glass-panel">
            <div className="meta-row">
              <span>Round</span>
              <span className="meta-value">{debateRound} / 2</span>
            </div>
            <div className="meta-row">
              <span>Mode</span>
              <span className="meta-value meta-tag">Full Debate</span>
            </div>
            <div className="meta-row">
              <span>Active</span>
              <span className="meta-value" style={{ color: activePersona?.color }}>
                {activePersona?.name}
              </span>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary round-btn"
          onClick={() => setDebateRound(r => Math.min(r + 1, 2))}
        >
          Trigger Round {debateRound + 1}
        </button>
      </aside>

      {/* CENTER — Debate Feed */}
      <main className="arena-main">
        <header className="arena-header glass-panel">
          <div>
            <h2 className="arena-title">Debate Arena</h2>
            <p className="arena-topic">Topic: Microservices architecture for notification system</p>
          </div>
          <div className="round-badge">
            Round {debateRound}
          </div>
        </header>

        <div className="message-feed" id="message-feed">
          {messages.map((msg, index) => {
            const persona = PERSONAS.find(p => p.id === msg.personaId)
            if (!persona) return null
            const isActive = msg.personaId === activePersonaId
            return (
              <div
                key={msg.id}
                className={`message-row animate-fade-in-up stagger-${index + 1} ${isActive ? 'message-active' : ''}`}
                onClick={() => setActivePersonaId(msg.personaId)}
              >
                <div
                  className={`message-avatar ${isActive ? 'avatar-glow' : ''}`}
                  style={{ borderColor: isActive ? persona.color : 'transparent' }}
                >
                  <img src={persona.avatar} alt={persona.name} />
                </div>
                <div className="message-body">
                  <div className="message-header">
                    <span className="message-name" style={{ color: persona.color }}>{persona.name}</span>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                  <p className="message-text">{msg.content}</p>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          <div className="typing-indicator animate-fade-in">
            <div className="typing-avatar">
              <img src={activePersona?.avatar} alt="" />
            </div>
            <div className="typing-dots">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
            <span className="typing-label" style={{ color: activePersona?.color }}>
              {activePersona?.name} is thinking...
            </span>
          </div>
        </div>

        {/* Chat Input */}
        <div className="arena-input-bar glass-panel">
          <input
            type="text"
            placeholder="Inject your architectural counter-point..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="arena-input"
            id="arena-chat-input"
          />
          <button className="btn btn-primary" id="send-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </main>

      {/* RIGHT SIDEBAR — Active Personas */}
      <aside className="arena-sidebar-right glass-panel animate-fade-in">
        <h4 className="label-text">Active Personas</h4>
        <div className="persona-list">
          {PERSONAS.map((persona, index) => {
            const isActive = persona.id === activePersonaId
            return (
              <button
                key={persona.id}
                className={`persona-card ${isActive ? 'persona-active' : ''} animate-fade-in-up stagger-${index + 1}`}
                onClick={() => setActivePersonaId(persona.id)}
                style={{
                  borderColor: isActive ? persona.color : 'transparent',
                  boxShadow: isActive ? `0 0 12px ${persona.color}33` : 'none',
                }}
              >
                <div className="persona-avatar-sm">
                  <img src={persona.avatar} alt={persona.name} />
                  {isActive && (
                    <div className="persona-status-dot" style={{ background: persona.color }} />
                  )}
                </div>
                <div className="persona-info">
                  <span className="persona-name" style={{ color: isActive ? persona.color : 'var(--color-on-surface)' }}>
                    {persona.name}
                  </span>
                  <span className="persona-role">{persona.role.substring(0, 50)}...</span>
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </div>
  )
}
