export const meta = {
  name: 'voice-slice',
  description: 'TSDoc voice units per package: Opus implementer, then Opus subjective reviewer and Sonnet checker lanes',
  phases: [{ title: 'Implement', detail: 'one Opus implementer per checkout, two at a time' }, { title: 'Audit', detail: 'subjective reviewer on Opus and checker on Sonnet, blind to each other' }],
}
const UNITS = '/home/user/scaffold/tmp/units/voice'
const repoOf = (pkg) => (pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`)
const REPORT = {
  type: 'object',
  properties: {
    package: { type: 'string' },
    rewritten: { type: 'object', properties: { imperative: { type: 'integer' }, verbless: { type: 'integer' }, name: { type: 'integer' }, returns: { type: 'integer' } }, required: ['imperative', 'verbless', 'name', 'returns'] },
    files: { type: 'array', items: { type: 'string' } },
    gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'integer' }, excerpt: { type: 'string' } }, required: ['command', 'exit'] } },
    evidence: { type: 'object', properties: { diff: { type: 'string' }, status: { type: 'string' }, report: { type: 'string' } }, required: ['diff', 'status', 'report'] },
    deviations: { type: 'array', items: { type: 'string' } },
  },
  required: ['package', 'rewritten', 'files', 'gates', 'evidence', 'deviations'],
}
const VERDICT = {
  type: 'object',
  properties: { verdicts: { type: 'string' }, findings: { type: 'string' }, terminal: { type: 'string', enum: ['PASS', 'FAIL'] }, failing: { type: 'array', items: { type: 'integer' } } },
  required: ['verdicts', 'findings', 'terminal', 'failing'],
}
const implement = (pkg) => agent(
  `You are the \`implementer\` role on Claude Opus 5, a native subagent. Read ${UNITS}/voice-${pkg}-brief.md in full, then the shared brief it succeeds, /home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md, in full. Perform the unit exactly as written in ${repoOf(pkg)}, directly and spawning nothing. Before editing, read ${repoOf(pkg)}/AGENTS.md and the "Comments and API documentation" section of ${repoOf(pkg)}/.claude/rules/typescript.md. Do not commit, stage, push, install, or run any discarding git command (git checkout, git restore, git stash, git reset, git clean). After the gate chain, write the two evidence files the brief names, write your report as Markdown to ${UNITS}/voice-${pkg}-report.md (the same content as your structured return: counts by kind, files touched, each gate command with its exit code and any failure excerpt, evidence paths, deviations), then return the structured output.`,
  { label: `implement:${pkg}`, phase: 'Implement', model: 'opus', agentType: 'implementer', schema: REPORT },
)
const audit = (report, pkg) => parallel([
  () => agent(
    `You are the \`reviewer\` role on Claude Opus 5 holding the SUBJECTIVE lane, a native subagent in a clean context, read-only. Read your brief at ${UNITS}/voice-${pkg}-audit-subjective-brief.md in full and perform it exactly as written. The tree is ${repoOf(pkg)} with the unit's uncommitted changes in place. Audit directly and spawn nothing; never edit. Return per-claim verdicts with file:line evidence, findings outside the claims, and exactly one terminal line PASS or FAIL <claim numbers>.`,
    { label: `subjective:${pkg}`, phase: 'Audit', model: 'opus', agentType: 'reviewer', schema: VERDICT },
  ),
  () => agent(
    `You are the \`checker\` role on Claude Sonnet, a native subagent in a clean context, read-only. Read your brief at ${UNITS}/voice-${pkg}-audit-checker-brief.md in full and perform it exactly as written. The tree is ${repoOf(pkg)} with the unit's uncommitted changes in place. Audit directly and spawn nothing; never edit. Return per-claim verdicts with file:line evidence, findings outside the claims, and exactly one terminal line PASS or FAIL <claim numbers>.`,
    { label: `checker:${pkg}`, phase: 'Audit', model: 'sonnet', agentType: 'checker', schema: VERDICT },
  ),
]).then(([subjective, checker]) => ({ package: pkg, report, subjective, checker }))
log(`voice slice: ${args.packages.join(' ')}`)
const results = await pipeline(args.packages, (pkg) => implement(pkg), (report, pkg) => (report ? audit(report, pkg) : { package: pkg, report: null, subjective: null, checker: null }))
return results