export const meta = {
  name: 'to-audit-1',
  description: 'TOAST audit round 1: the subjective lane (reviewer, Opus) and the checker (Sonnet), blind to each other and to the objective lane',
  phases: [{ title: 'Audit', detail: 'subjective lane and checker on one claims file' }],
}
const U = '/home/user/scaffold/.orkestrel/veneer/units'
const lanes = [
  { label: 'reviewer:to', brief: `${U}/to-audit-reviewer-brief.md`, agentType: 'reviewer', model: 'opus' },
  { label: 'checker:to', brief: `${U}/to-audit-checker-brief.md`, agentType: 'checker', model: 'sonnet' },
]
const results = await parallel(lanes.map((l) => () =>
  agent(`Read the brief at ${l.brief} completely and execute it exactly. The claims file is ${U}/to-audit-claims.md. Perform the assignment directly and spawn nothing; edit nothing. Your final message is the verdict the brief's Output section specifies, and nothing else.`,
    { label: l.label, phase: 'Audit', agentType: l.agentType, model: l.model })
    .then((text) => ({ lane: l.label, text }))
))
return results.filter(Boolean)
