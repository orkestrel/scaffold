export const meta = {
  name: 'conform-implement',
  description: 'Conformance implementation units per package: Opus implementer, then blind Opus objective reviewer and Sonnet checker lanes',
  phases: [{ title: 'Implement', detail: 'one Opus implementer per checkout' }, { title: 'Audit', detail: 'objective reviewer on Opus and checker on Sonnet, blind to each other' }],
}
const UNITS = '/home/user/scaffold/tmp/units/conform'
const repoOf = (pkg) => (pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`)
const REPORT = {
  type: 'object',
  properties: {
    package: { type: 'string' },
    rows: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, disposition: { type: 'string', enum: ['applied', 'stopped', 'noop'] }, note: { type: 'string' } }, required: ['id', 'disposition', 'note'] } },
    files: { type: 'array', items: { type: 'string' } },
    proofs: { type: 'array', items: { type: 'object', properties: { row: { type: 'string' }, command: { type: 'string' }, before: { type: 'string' }, after: { type: 'string' } }, required: ['row', 'command', 'before', 'after'] } },
    gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'integer' }, excerpt: { type: 'string' } }, required: ['command', 'exit'] } },
    breaking: { type: 'array', items: { type: 'object', properties: { symbol: { type: 'string' }, change: { type: 'string' }, consumers: { type: 'array', items: { type: 'string' } }, edit: { type: 'string' } }, required: ['symbol', 'change', 'consumers', 'edit'] } },
    patches: { type: 'array', items: { type: 'string' } },
    evidence: { type: 'object', properties: { diff: { type: 'string' }, status: { type: 'string' }, report: { type: 'string' } }, required: ['diff', 'status', 'report'] },
    deviations: { type: 'array', items: { type: 'string' } },
  },
  required: ['package', 'rows', 'files', 'proofs', 'gates', 'breaking', 'patches', 'evidence', 'deviations'],
}
const VERDICT = {
  type: 'object',
  properties: { verdicts: { type: 'string' }, findings: { type: 'string' }, terminal: { type: 'string', enum: ['PASS', 'FAIL'] }, failing: { type: 'array', items: { type: 'integer' } } },
  required: ['verdicts', 'findings', 'terminal', 'failing'],
}
const implement = (pkg) => agent(
  `You are the \`implementer\` role on Claude Opus 5, a native subagent, the sole writer in ${repoOf(pkg)}. Read ${UNITS}/conform-${pkg}-brief.md in full and perform the unit exactly as written, directly and spawning nothing. Before editing, read /home/user/scaffold/AGENTS.md and every file under /home/user/scaffold/.claude/rules/. Do not commit, stage, push, install, or run any discarding git command. Write the report and the two evidence files the brief names, then return the structured output with the same content.`,
  { label: `implement:${pkg}`, phase: 'Implement', model: 'opus', agentType: 'implementer', schema: REPORT },
)
const audit = (report, pkg) => parallel([
  () => agent(
    `You are the \`reviewer\` role on Claude Opus 5 holding the OBJECTIVE lane as the recorded substitution for the dark GPT-5.6 Sol bench, a native subagent in a clean context, read-only. Your own engine wrote the subject; attack it harder for that. Read ${UNITS}/conform-${pkg}-audit-brief.md in full and perform it exactly as written. The tree is ${repoOf(pkg)} with the unit's uncommitted changes in place; the diff and status evidence are at the paths the brief names. Audit directly and spawn nothing; never edit. Return per-claim verdicts with file:line evidence, findings outside the claims, and exactly one terminal line PASS or FAIL <claim numbers>.`,
    { label: `objective:${pkg}`, phase: 'Audit', model: 'opus', agentType: 'reviewer', schema: VERDICT },
  ),
  () => agent(
    `You are the \`checker\` role on Claude Sonnet, a native subagent in a clean context, read-only. Read ${UNITS}/conform-${pkg}-audit-brief.md in full and perform the checker's claims exactly as written. The tree is ${repoOf(pkg)} with the unit's uncommitted changes in place; the diff and status evidence are at the paths the brief names. Audit directly and spawn nothing; never edit. Return per-claim verdicts with file:line evidence, findings outside the claims, and exactly one terminal line PASS or FAIL <claim numbers>.`,
    { label: `checker:${pkg}`, phase: 'Audit', model: 'sonnet', agentType: 'checker', schema: VERDICT },
  ),
]).then(([objective, checker]) => ({ package: pkg, report, objective, checker }))
log(`conformance implementation: ${args.packages.join(' ')}`)
const results = await pipeline(args.packages, (pkg) => implement(pkg), (report, pkg) => (report ? audit(report, pkg) : { package: pkg, report: null, objective: null, checker: null }))
return results
