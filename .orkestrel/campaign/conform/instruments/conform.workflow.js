export const meta = {
  name: 'conform-slice',
  description: 'Strict conformance audit per package: blind objective and subjective Opus lanes, then an Opus refuter over their union',
  phases: [{ title: 'Find', detail: 'objective and subjective reviewer lanes on Opus, blind, per package' }, { title: 'Refute', detail: 'one Opus refuter per package over the union of findings' }],
}
const UNITS = '/home/user/scaffold/tmp/units/conform'
const repoOf = (pkg) => (pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`)
const FINDING = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    claim: { type: 'string' },
    file: { type: 'string' },
    rule: { type: 'string' },
    wrong: { type: 'string' },
    repair: { type: 'string' },
    breaking: { type: 'boolean' },
    consumers: { type: 'array', items: { type: 'string' } },
    verdict: { type: 'string', enum: ['CONFIRMED', 'EXEMPT'] },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
  },
  required: ['id', 'claim', 'file', 'rule', 'wrong', 'repair', 'breaking', 'verdict', 'confidence'],
}
const LANE = {
  type: 'object',
  properties: {
    package: { type: 'string' },
    lane: { type: 'string' },
    claims: { type: 'array', items: { type: 'object', properties: { claim: { type: 'string' }, verdict: { type: 'string', enum: ['CONFIRMED', 'BROKEN', 'UNRESOLVED'] }, read: { type: 'string' } }, required: ['claim', 'verdict', 'read'] } },
    findings: { type: 'array', items: FINDING },
    referrals: { type: 'array', items: { type: 'string' } },
    coverage: { type: 'string' },
    terminal: { type: 'string' },
  },
  required: ['package', 'lane', 'claims', 'findings', 'referrals', 'coverage', 'terminal'],
}
const RULING = {
  type: 'object',
  properties: {
    package: { type: 'string' },
    rulings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, verdict: { type: 'string', enum: ['CONFIRMED', 'REFUTED'] }, ground: { type: 'string' }, evidence: { type: 'string' }, repair: { type: 'string' }, breaking: { type: 'boolean' } }, required: ['id', 'verdict', 'ground', 'evidence', 'repair', 'breaking'] } },
    terminal: { type: 'string' },
  },
  required: ['package', 'rulings', 'terminal'],
}
const lane = (pkg, which) => agent(
  `You are the \`reviewer\` role on Claude Opus 5, a native subagent in a clean context, read-only, holding the ${which.toUpperCase()} lane of the conformance audit${which === 'objective' ? ' as the recorded substitution for the dark GPT-5.6 Sol bench' : ''}. Read ${UNITS}/brief.md in full, then ${UNITS}/${pkg}-brief.md in full, then /home/user/scaffold/AGENTS.md and every file under /home/user/scaffold/.claude/rules/. The subject tree is ${repoOf(pkg)}. Rule on every claim your lane owns (${which === 'objective' ? 'O1 through O8' : 'S1 through S6'}) and on the carry rows your lane is named for, attack them rather than confirm them, and return the structured object: per-claim verdicts with what you read, numbered findings in the brief's finding shape with ids ${pkg}-${which === 'objective' ? 'obj' : 'subj'}-<n>, referrals, coverage, and exactly one terminal line. Spawn nothing; edit nothing.`,
  { label: `${which}:${pkg}`, phase: 'Find', model: 'opus', agentType: 'reviewer', schema: LANE },
)
const refute = (found, pkg) => {
  const findings = found.filter(Boolean).flatMap((l) => l.findings || [])
  if (!findings.length) return { package: pkg, lanes: found, refuter: { package: pkg, rulings: [], terminal: 'no findings to refute' } }
  return agent(
    `You are the \`reviewer\` role on Claude Opus 5, a native subagent in a clean context, read-only, holding the REFUTER lane of the conformance audit for ${pkg} (the objective perspective, as the recorded substitution for the dark GPT-5.6 Sol bench). Read ${UNITS}/brief.md § Refuter lane and the whole brief, then ${UNITS}/${pkg}-brief.md, then /home/user/scaffold/AGENTS.md and every file under /home/user/scaffold/.claude/rules/. The subject tree is ${repoOf(pkg)}. Here is the union of the finders' findings as JSON; reproduce each vector yourself and rule CONFIRMED or REFUTED with the ground and the evidence, amending the repair where the finder's is wrong and stating whether the repair is breaking:\n\n${JSON.stringify(findings, null, 1)}\n\nReturn the structured object with one ruling per finding id and exactly one terminal line. Spawn nothing; edit nothing.`,
    { label: `refute:${pkg}`, phase: 'Refute', model: 'opus', agentType: 'reviewer', schema: RULING },
  ).then((refuter) => ({ package: pkg, lanes: found, refuter }))
}
log(`conformance slice: ${args.packages.join(' ')}`)
const results = await pipeline(
  args.packages,
  (pkg) => parallel([() => lane(pkg, 'objective'), () => lane(pkg, 'subjective')]),
  (found, pkg) => refute(found, pkg),
)
// Return a compact summary; the full lane outputs live in the workflow journal and the assembler reads them there.
return results.filter(Boolean).map((r) => ({
  package: r.package,
  objective: r.lanes[0] ? { findings: (r.lanes[0].findings || []).length, terminal: r.lanes[0].terminal } : null,
  subjective: r.lanes[1] ? { findings: (r.lanes[1].findings || []).length, terminal: r.lanes[1].terminal } : null,
  refuter: r.refuter ? { confirmed: (r.refuter.rulings || []).filter((x) => x.verdict === 'CONFIRMED').length, refuted: (r.refuter.rulings || []).filter((x) => x.verdict === 'REFUTED').length, terminal: r.refuter.terminal } : null,
}))
