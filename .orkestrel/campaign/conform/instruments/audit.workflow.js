export const meta = {
  name: 'conform-audit',
  description: 'Per checkpointed package: audit blind (Opus objective lane and Sonnet checker) on the committed unit, run up to two fix rounds with a fresh audit after each, return a compact verdict',
  phases: [
    { title: 'Audit', detail: 'objective lane on Opus 5 and checker on Sonnet, blind to each other' },
    { title: 'Fix', detail: 'an Opus 5 fix round on the audit findings, then a fresh audit' },
  ],
}
const UNITS = '/home/user/scaffold/tmp/units/conform'
const REPORTS = '/home/user/work/reports'
const EVIDENCE = '/home/user/work/evidence'
const SCRATCH = '/home/user/scaffold/tmp/work'
const repoOf = (pkg) => (pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`)
const RECON = {
  type: 'object',
  properties: {
    package: { type: 'string' },
    rows: { type: 'integer' },
    breaking: { type: 'array', items: { type: 'string' } },
    folded: { type: 'array', items: { type: 'string' } },
    orchestrator: { type: 'array', items: { type: 'string' } },
    consumers: { type: 'array', items: { type: 'string' } },
    skipped: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['package', 'rows', 'breaking', 'folded', 'orchestrator', 'consumers', 'skipped', 'note'],
}
const REPORT = {
  type: 'object',
  properties: {
    package: { type: 'string' },
    rows: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, disposition: { type: 'string', enum: ['applied', 'stopped', 'noop'] }, note: { type: 'string' } }, required: ['id', 'disposition', 'note'] } },
    files: { type: 'array', items: { type: 'string' } },
    gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'integer' }, excerpt: { type: 'string' } }, required: ['command', 'exit'] } },
    breaking: { type: 'array', items: { type: 'object', properties: { symbol: { type: 'string' }, change: { type: 'string' }, consumers: { type: 'array', items: { type: 'string' } }, edit: { type: 'string' } }, required: ['symbol', 'change', 'consumers', 'edit'] } },
    patches: { type: 'array', items: { type: 'string' } },
    deviations: { type: 'array', items: { type: 'string' } },
  },
  required: ['package', 'rows', 'files', 'gates', 'breaking', 'patches', 'deviations'],
}
const VERDICT = {
  type: 'object',
  properties: { verdicts: { type: 'string' }, findings: { type: 'string' }, terminal: { type: 'string', enum: ['PASS', 'FAIL'] }, failing: { type: 'array', items: { type: 'integer' } } },
  required: ['verdicts', 'findings', 'terminal', 'failing'],
}
const canon = 'Before acting, read /home/user/scaffold/AGENTS.md and every file under /home/user/scaffold/.claude/rules/. Perform the assignment directly and spawn nothing. Shell discipline: read files with the Read, Grep, and Glob tools rather than the shell; in Bash run one plain command per call with absolute paths, never a `cd … &&` chain, never inline `node -e`, and never a pipe into a tool outside cat, head, tail, grep, sed -n, sort, uniq, wc, tr, cut, and awk; a command that prompts for permission blocks the whole round.'
const reconcile = (pkg) => agent(
  `You are the Orchestrator's reconciliation lane on Claude Opus 5 for the conformance round, package ${pkg}, tree ${repoOf(pkg)}. If the marker file ${REPORTS}/conform-${pkg}.reconciled exists, do nothing except read ${UNITS}/conform-${pkg}-brief.md, count its numbered rows under § Rows, and return skipped=true with that count. Otherwise: read ${REPORTS}/conform-${pkg}.json (the refuter's rulings under refuter.rulings, and the finders' findings under objective.findings and subjective.findings, matched by id). Apply exactly these fixed rules and never re-judge the refuter's substance: (1) where the refuter's repair or ground names one carrier for two findings with the same defect, set the non-carrier ruling's verdict to FOLDED and record which id carries it in an orchestrator field; (2) where a CONFIRMED ruling's repair requires editing package.json dependency or version fields, package-lock.json, node_modules, an npm install, or any off-limits file (.claude/**, .codex/**, .cursor/**, AGENTS.md, CLAUDE.md, .agents/**, configs/**, tests/setupPolicy.ts, tests/policy.test.ts, tests/config.test.ts, scripts/**, .mcp.json, .oxlintrc.json, .oxlintignore, .oxfmtrc.json, .prettierignore, .editorconfig, .gitattributes, .gitignore, LICENSE), set its verdict to ORCHESTRATOR with the reason in an orchestrator field (the Orchestrator carries it in a fleet dependency or vendored-file unit); (3) where a ruling's repair is entirely an edit to another package's checkout, set it to ORCHESTRATOR with the consumer named; (4) leave every other ruling as it is. Write the JSON back with the same shape (JSON.stringify with indent 1). Then, for every CONFIRMED ruling marked breaking, sweep the fleet for real consumers of the renamed or removed symbol: grep the identifier at a word boundary across /home/user/fleet/*/src, /home/user/fleet/*/tests, /home/user/fleet/*/guides/<that-package>.md, /home/user/fleet/*/README.md, and /home/user/scaffold/src and /home/user/scaffold/tests, excluding node_modules, excluding ${repoOf(pkg)} itself, and excluding the vendored dependency guide mirrors guides/${pkg}.md in other checkouts; list the checkouts that hit. Append a short section for ${pkg} to ${SCRATCH}/reconcile.md naming each FOLDED and ORCHESTRATOR mark with its reason and each breaking row with its real consumers or "no source consumer". Run \`node ${SCRATCH}/mkimplement.mjs ${pkg}\` to generate ${UNITS}/conform-${pkg}-brief.md and ${UNITS}/conform-${pkg}-audit-brief.md, then create the marker file ${REPORTS}/conform-${pkg}.reconciled containing the date. Edit nothing under ${repoOf(pkg)}. Return the structured object with rows (the brief's row count), the breaking row ids, the folded ids, the orchestrator ids, the consumer checkouts that hit, skipped=false, and a one-sentence note.`,
  { label: `reconcile:${pkg}`, phase: 'Reconcile', model: 'opus', agentType: 'general-purpose', schema: RECON },
)
const implement = (recon, pkg) => agent(
  `You are the \`implementer\` role on Claude Opus 5, a native subagent, the sole writer in ${repoOf(pkg)}. Read ${UNITS}/conform-${pkg}-brief.md in full and perform the unit exactly as written. ${canon} Do not commit, stage, push, install, or run any discarding git command. Write the report ${UNITS}/conform-${pkg}-report.md and the two evidence files the brief names (${EVIDENCE}/conform-${pkg}.diff after \`git add -N\` on every file you created, and ${EVIDENCE}/conform-${pkg}.status), then return the structured output with the same content: every row's disposition, the files touched, each gate with its exit code, the breaking entries with consumers and the exact consumer edit, the shared-file patches, and the deviations.`,
  { label: `implement:${pkg}`, phase: 'Implement', model: 'opus', agentType: 'implementer', schema: REPORT },
)
const audit = (pkg, round) => parallel([
  () => agent(
    `You are the \`reviewer\` role on Claude Opus 5 holding the OBJECTIVE lane (the recorded substitution for the dark GPT-5.6 Sol bench), a native subagent in a clean context, read-only. Your own engine wrote the subject; attack it harder for that. Read ${UNITS}/conform-${pkg}-audit-brief.md in full and perform it exactly as written${round > 1 ? ` — this is audit round ${round} after a fix round; the writer's report at ${UNITS}/conform-${pkg}-report.md names what the fix changed` : ''}. The tree is ${repoOf(pkg)} with the unit's uncommitted changes in place; the diff and status evidence are at the paths the brief names. Audit directly and spawn nothing; never edit. Return per-claim verdicts with file:line evidence, findings outside the claims (each with the exact prescription that closes it), and exactly one terminal line PASS or FAIL <claim numbers>.`,
    { label: `objective:${pkg}:r${round}`, phase: 'Audit', model: 'opus', agentType: 'reviewer', schema: VERDICT },
  ),
  () => agent(
    `You are the \`checker\` role on Claude Sonnet, a native subagent in a clean context, read-only. Read ${UNITS}/conform-${pkg}-audit-brief.md in full and perform the checker's claims exactly as written${round > 1 ? ` — this is audit round ${round} after a fix round` : ''}. The tree is ${repoOf(pkg)} with the unit's uncommitted changes in place; the diff and status evidence are at the paths the brief names. Audit directly and spawn nothing; never edit. Return per-claim verdicts with file:line evidence, findings outside the claims (each with the exact prescription that closes it), and exactly one terminal line PASS or FAIL <claim numbers>.`,
    { label: `checker:${pkg}:r${round}`, phase: 'Audit', model: 'sonnet', agentType: 'checker', schema: VERDICT },
  ),
])
const fix = (pkg, round, objective, checker) => agent(
  `You are the \`implementer\` role on Claude Opus 5, a native subagent, the sole writer in ${repoOf(pkg)}, running fix round ${round} of unit conform-${pkg}. The unit's brief is ${UNITS}/conform-${pkg}-brief.md and its report is ${UNITS}/conform-${pkg}-report.md; the tree carries the unit's uncommitted changes. The audit lanes returned these verdicts. OBJECTIVE lane: ${JSON.stringify(objective)}. CHECKER lane: ${JSON.stringify(checker)}. Close every broken claim and every substantiated finding: where a lane gives an exact prescription, adopt it verbatim; where it names a defect without one, repair it under the rule it cites; where a lane is wrong on the evidence, do not change the tree for it and record why under deviations. Do not widen the unit. ${canon} Do not commit, stage, push, install, or run any discarding git command. Re-run the gate chain (format:check, lint:check, check, build, test) and read each result. Rewrite the report and the two evidence files (${EVIDENCE}/conform-${pkg}.diff after \`git add -N\` on every created file, ${EVIDENCE}/conform-${pkg}.status) so they describe the whole unit as it now stands, with a § Fix round ${round} section naming each finding and what closed it. Return the structured output.`,
  { label: `fix:${pkg}:r${round}`, phase: 'Fix', model: 'opus', agentType: 'implementer', schema: REPORT },
)
const driveAudit = async (pkg) => {
  const rounds = []
  let round = 1
  let report
  let [objective, checker] = await audit(pkg, round)
  rounds.push({ round, objective: objective?.terminal || 'none', checker: checker?.terminal || 'none' })
  while (round < 3 && ((objective?.terminal || 'FAIL') === 'FAIL' || (checker?.terminal || 'FAIL') === 'FAIL')) {
    round += 1
    const fixed = await fix(pkg, round - 1, objective, checker)
    if (fixed) report = fixed
    ;[objective, checker] = await audit(pkg, round)
    rounds.push({ round, objective: objective?.terminal || 'none', checker: checker?.terminal || 'none' })
  }
  const ok = objective?.terminal === 'PASS' && checker?.terminal === 'PASS'
  return { package: pkg, stage: 'audited', ok, rounds, gates: report?.gates, breaking: report?.breaking, deviations: report?.deviations, stopped: report ? report.rows.filter((r) => r.disposition === 'stopped') : [], lastObjective: ok ? undefined : objective, lastChecker: ok ? undefined : checker }
}
log(`conformance audit: ${args.packages.join(' ')}`)
const results = await pipeline(args.packages, (pkg) => driveAudit(pkg))
return results
