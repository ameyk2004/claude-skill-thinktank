export interface Persona {
  id: string
  name: string
  role: string
  color: string
  avatar: string
}

export const PERSONAS: Persona[] = [
  {
    id: 'system-architect',
    name: 'System Architect',
    role: 'Proposes the foundational system design and drives delivery speed and scalability.',
    color: '#DE7356',
    avatar: '/persona-avatar.png',
  },
  {
    id: 'current-state-expert',
    name: 'Current State Expert',
    role: 'Enforces backwards compatibility and validates proposals against historical ADRs.',
    color: '#8b5cf6',
    avatar: '/persona-avatar.png',
  },
  {
    id: 'security-engineer',
    name: 'Security Engineer',
    role: 'Audits the proposal for vulnerabilities, compliance risks, and threat vectors.',
    color: '#ef4444',
    avatar: '/persona-avatar.png',
  },
  {
    id: 'finops-engineer',
    name: 'FinOps Engineer',
    role: 'Optimizes for cloud infrastructure costs and third-party API spend.',
    color: '#22c55e',
    avatar: '/persona-avatar.png',
  },
  {
    id: 'reliability-engineer',
    name: 'Reliability Engineer',
    role: 'Champions maintainable code, low technical debt, and Developer Experience.',
    color: '#3b82f6',
    avatar: '/persona-avatar.png',
  },
  {
    id: 'engineering-manager',
    name: 'Engineering Manager',
    role: 'Synthesizes the debate, applies weighted scoring, and authorizes the final ADR.',
    color: '#f59e0b',
    avatar: '/persona-avatar.png',
  },
]

export interface DebateMessage {
  id: string
  personaId: string
  content: string
  timestamp: string
  isActive?: boolean
}

export interface Stage {
  id: number
  name: string
  status: 'pending' | 'active' | 'completed'
}

export const STAGES: Stage[] = [
  { id: 1, name: 'Discovery', status: 'completed' },
  { id: 2, name: 'Context Analysis', status: 'completed' },
  { id: 3, name: 'Smart Debate', status: 'active' },
  { id: 4, name: 'Decision', status: 'pending' },
  { id: 5, name: 'Implementation', status: 'pending' },
]
