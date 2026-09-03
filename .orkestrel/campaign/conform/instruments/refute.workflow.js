export const meta = {
  name: 'conform-refute',
  description: 'Conformance refuter per package over the saved finder lanes, running first any finder lane the usage limit killed',
  phases: [{ title: 'Find', detail: 'finder lanes the earlier run lost, on Opus, blind' }, { title: 'Refute', detail: 'one Opus refuter per package over the union of findings' }],
}
const UNITS = '/home/user/scaffold/tmp/units/conform'
const REPORTS = '/home/user/work/reports'
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
  `You are the \`reviewer\` role on Claude Fable 5.1, a native subagent in a clean context, read-only, holding the ${which.toUpperCase()} lane of the conformance audit${which === 'objective' ? ' as the recorded substitution for the dark GPT-5.6 Sol bench' : ''}. Read ${UNITS}/brief.md in full, then ${UNITS}/${pkg}-brief.md in full, then /home/user/scaffold/AGENTS.md and every file under /home/user/scaffold/.claude/rules/. The subject tree is ${repoOf(pkg)}. Rule on every claim your lane owns (${which === 'objective' ? 'O1 through O8' : 'S1 through S6'}) and on the carry rows your lane is named for, attack them rather than confirm them, and return the structured object: per-claim verdicts with what you read, numbered findings in the brief's finding shape with ids ${pkg}-${which === 'objective' ? 'obj' : 'subj'}-<n>, referrals, coverage, and exactly one terminal line. Spawn nothing; edit nothing.`,
  { label: `${which}:${pkg}`, phase: 'Find', model: 'fable', agentType: 'reviewer', schema: LANE },
)
const source = (p, found) => {
  const fresh = found.filter(Boolean).flatMap((l) => l.findings || [])
  const saved = ['objective', 'subjective'].filter((w) => !p.missing.includes(w))
  const file = `${REPORTS}/conform-${p.name}.json`
  if (saved.length === 2) return `in the file ${file} under \`objective.findings\` and \`subjective.findings\`; read both arrays in full, and every finding id in them receives a ruling`
  if (saved.length === 1) return `partly in the file ${file} under \`${saved[0]}.findings\` (read that array in full; every finding id in it receives a ruling) and partly inline as the following JSON:\n\n${JSON.stringify(fresh, null, 1)}\n\nThe union is both sets together`
  return `inline as the following JSON:\n\n${JSON.stringify(fresh, null, 1)}\n\nEvery finding id receives a ruling`
}
const refute = (found, p) => agent(
  `You are the \`reviewer\` role on Claude Fable 5.1, a native subagent in a clean context, read-only, holding the REFUTER lane of the conformance audit for ${p.name} (the objective perspective, as the recorded substitution for the dark GPT-5.6 Sol bench). Read ${UNITS}/brief.md § Refuter lane and the whole brief, then ${UNITS}/${p.name}-brief.md, then /home/user/scaffold/AGENTS.md and every file under /home/user/scaffold/.claude/rules/. The subject tree is ${repoOf(p.name)}. The union of the finders' findings is ${source(p, found)}. Reproduce each vector yourself and rule CONFIRMED or REFUTED with the ground and the evidence, amending the repair where the finder's is wrong and stating whether the repair is breaking. Return the structured object with one ruling per finding id and exactly one terminal line. Spawn nothing; edit nothing.`,
  { label: `refute:${p.name}`, phase: 'Refute', model: 'fable', agentType: 'reviewer', schema: RULING },
).then((refuter) => ({ package: p.name, lanes: found, refuter }))
log(`refute slice: ${args.packages.map((p) => p.name + (p.missing.length ? `(+${p.missing.join('+')})` : '')).join(' ')}`)
const results = await pipeline(
  args.packages,
  (p) => (p.missing.length ? parallel(p.missing.map((w) => () => lane(p.name, w))) : Promise.resolve([])),
  (found, p) => refute(found, p),
)
return results.filter(Boolean).map((r) => ({
  package: r.package,
  lanes: r.lanes.filter(Boolean).map((l) => ({ lane: l.lane, findings: (l.findings || []).length, terminal: l.terminal })),
  refuter: r.refuter ? { confirmed: (r.refuter.rulings || []).filter((x) => x.verdict === 'CONFIRMED').length, refuted: (r.refuter.rulings || []).filter((x) => x.verdict === 'REFUTED').length, terminal: r.refuter.terminal } : null,
}))
