export const meta = {
  name: 'breaking-design-round',
  description: 'Adversarial design pass for the breaking-change phase: subjective and objective lanes on one brief, blind, Opus both (Sol dark)',
  phases: [{ title: 'Design', detail: 'planner (subjective) + objective lane, both Opus, clean contexts' }],
}
const BRIEF = '/home/user/scaffold/tmp/units/fix/breaking-design-brief.md'
const SHAPE = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'design', 'alternatives', 'units', 'tensions', 'risks'],
  properties: {
    lane: { enum: ['subjective', 'objective'] },
    design: { type: 'string', description: 'the coherent plan in prose: layer schedule, tarball mechanics, audit shape, exit criterion' },
    alternatives: { type: 'string' },
    units: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['unit', 'package', 'layer', 'role', 'engine', 'rows', 'stages', 'unblocks', 'owned', 'offLimits', 'acceptance'], properties: {
      unit: { type: 'string' }, package: { type: 'string' }, layer: { type: 'string' }, role: { type: 'string' }, engine: { type: 'string' },
      rows: { type: 'array', items: { type: 'string' }, description: 'finding ids this unit applies' },
      stages: { type: 'array', items: { type: 'string' }, description: 'dependency packages whose tarball must be staged before this unit' },
      unblocks: { type: 'array', items: { type: 'string' } },
      owned: { type: 'string' }, offLimits: { type: 'string' }, acceptance: { type: 'string' },
    } } },
    refusals: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['row', 'rule', 'reason'], properties: { row: { type: 'string' }, rule: { type: 'string' }, reason: { type: 'string' } } } },
    tensions: { type: 'string' },
    risks: { type: 'string' },
  },
}
function prompt(lane) {
  const perspective = lane === 'subjective'
    ? 'the SUBJECTIVE lane: shape, naming, ergonomics, design fit, what the moved API should feel like, and whether each deferred rename earns its cost'
    : 'the OBJECTIVE lane: correctness, constraints, what the code and contracts actually permit, dependency order, tarball mechanics, and the conflicts between rows'
  return `You are a Claude Opus 5 design lane for the Orkestrel fleet campaign, holding ${perspective}. The Sol bench is dark, so Opus holds both lanes; state which perspective you held and hold it in full.\n` +
    `Read and follow the brief at ${BRIEF} (its LANE_PLACEHOLDER is your lane). Read /home/user/scaffold/.agents/orchestration.md and /home/user/scaffold/AGENTS.md first, then the law the brief names. Work from the brief's evidence files; you are read-only and spawn nothing.\n` +
    `Return the structured shape; your final output is data, not a message.`
}
const [subjective, objective] = await parallel([
  () => agent(prompt('subjective'), { label: 'design:subjective', phase: 'Design', schema: SHAPE, agentType: 'planner', model: 'opus', effort: 'high' }),
  () => agent(prompt('objective'), { label: 'design:objective', phase: 'Design', schema: SHAPE, agentType: 'planner', model: 'opus', effort: 'high' }),
])
return { subjective, objective }
