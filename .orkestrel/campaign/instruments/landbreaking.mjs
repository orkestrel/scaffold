// Land a returned breaking-unit report: render the workflow's JSON report to Markdown beside its
// brief, render the checkout's actual diff and status for the audit lanes, and generate the audit
// briefs (objective reviewer, optional subjective reviewer, checker) from the rulings.
// Usage: node landbreaking.mjs <package> <report.json> [--wide]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const [pkg, reportPath] = process.argv.slice(2)
if (!pkg || !reportPath) throw new Error('usage: landbreaking.mjs <package> <report.json> [--wide]')
const wide = process.argv.includes('--wide')
const baseArg = process.argv.find((arg) => arg.startsWith('--base='))
const base = baseArg ? baseArg.slice('--base='.length) : undefined
const FIX = '/home/user/scaffold/.orkestrel/campaign/fix'
const UNITS = '/home/user/scaffold/tmp/units/breaking'
const repo = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
mkdirSync(UNITS, { recursive: true })

const report = JSON.parse(readFileSync(reportPath, 'utf8'))
const rulings = JSON.parse(readFileSync(`${FIX}/rulings.json`, 'utf8'))[pkg] || []
const git = (args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
const diff = git(base ? ['diff', base] : ['diff'])
const status = base ? git(['diff', '--name-status', base]) : git(['status', '--short'])
writeFileSync(`${UNITS}/${pkg}.diff`, diff)
writeFileSync(`${UNITS}/${pkg}.status`, status)

const rows = (report.rows || []).map((row) => `- **${row.id}** — ${row.state}: ${row.note}`).join('\n')
const gates = (report.gates || []).map((gate) => `- \`${gate.command}\` → exit ${gate.exit}${gate.excerpt ? ` — ${gate.excerpt.slice(0, 400)}` : ''}`).join('\n')
const list = (items) => (items && items.length ? items.map((item) => `- ${item}`).join('\n') : '- none')
const md = `# Unit breaking-${pkg} — report (${new Date().toISOString().slice(0, 10)})

Writer: \`implementer\` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

${rows || '- none'}

## Symbols moved

${list(report.symbols)}

## Files touched

${list(report.files)}

## Tests changed

${list(report.tests)}

## Gates

${gates || '- none'}

## Diff stat

\`\`\`text
${(report.diffstat || '').trim()}
\`\`\`

Status at return (writer's reading): \`${(report.status || '').trim().replace(/\n/g, ' | ')}\`
Built \`dist/\` moves: ${report.distMoves}

## Observations

${list(report.observations)}

## Deviations

${list(report.deviations)}

Actual diff and status rendered by the Orchestrator: \`tmp/units/breaking/${pkg}.diff\`,
\`tmp/units/breaking/${pkg}.status\`.
`
writeFileSync(`${UNITS}/${pkg}-report.md`, md)

const claims = [
	`Every row the brief lists ends in the report as applied, refused, or stopped, and every refused row quotes the rule text that refuses it.`,
	`For every applied rename or removal, no old name survives under \`src\`, \`tests\`, and \`guides\` of ${repo} (grep with word boundaries; the diff and the tree are the evidence), and every new published symbol is declared in the owning \`types.ts\` where it is a contract.`,
	`Each applied row lands in the ruled form, not a variant: ${rulings.length ? rulings.map((r) => r.split(':')[0]).join('; ') : 'see rulings.json'} (the rulings are quoted in the brief's Rulings section).`,
	`No compatibility alias, re-export shim, deprecated twin, or old-name fallback was added anywhere in the diff.`,
	`Every guide row, fence, and \`@example\` that spelled a moved symbol moved with it, the parity \`INTERNAL\` list matches the barrel where the package keeps one, and a prose claim about changed behavior has an executed assertion rather than a substring check.`,
	`The tree holds only owned files changed: the status output lists nothing under \`.claude/\`, \`configs/\`, \`tests/setupPolicy.ts\`, \`tests/policy.test.ts\`, \`package.json\`, \`package-lock.json\`, or a vendored guide mirror.`,
	`The gate commands the report claims exit as reported (the \`verifier\` lane re-runs the chain and quotes the exit codes; a reviewer or checker lane rules this NOT-EVIDENCED unless the report quotes the exact command and exit code).`,
	`The report's observations and deviations hide no criterion failure: a timing-suspect test is named with the failing test, and a stopped row states expected, found, and evidence.`,
]
const brief = (lane, claimNumbers) => `# Audit breaking-${pkg} — ${lane}

## Role and engine

${lane}. The writer was Claude Opus 5; the Sol bench is dark, so this lane runs on the writer's own
engine in a clean context. Attack the half your engine wrote hardest. The subject is the diff, the
status, and the report, never your own reading of the intent. Read-only.

## Subject

- Diff: \`${UNITS}/${pkg}.diff\` (actual \`git diff\` at return).
- Status: \`${UNITS}/${pkg}.status\` (actual \`git status --short\` at return).
- Report: \`${UNITS}/${pkg}-report.md\`.
- Brief the writer executed: \`${UNITS}/${pkg}-brief.md\` (its Rulings and Vocabulary sections are
  the ruled forms).
- Tree: \`${repo}\` (read it to confirm a claim the diff cannot settle).
- Law: \`${repo}/AGENTS.md\`, \`${repo}/.claude/rules/names.md\` (the vendored copy predates the
  vocabulary; the brief quotes the landed text), \`architecture.md\`, \`patterns.md\`,
  \`documentation.md\`, \`tests.md\`.

## Claims

Rule on claims ${claimNumbers.join(', ')} with CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, each
with its evidence line (file:line or the command and its output as quoted in the report).

${claims.map((claim, index) => `${index + 1}. ${claim}`).join('\n')}

## Output

Per-claim verdicts with evidence, then one terminal line: \`PASS\` when every claim you hold is
CONFIRMED, \`FAIL\` otherwise with the failing claim numbers. No process diary.
`
writeFileSync(`${UNITS}/${pkg}-audit-objective-brief.md`, brief('`reviewer` on Claude Opus 5 holding the OBJECTIVE lane (correctness, constraints, what the diff actually does)', [1, 2, 3, 4, 6, 8]))
if (wide) writeFileSync(`${UNITS}/${pkg}-audit-subjective-brief.md`, brief('`reviewer` on Claude Opus 5 holding the SUBJECTIVE lane (shape, vocabulary, guide voice, design fit of the landed names)', [3, 4, 5]))
writeFileSync(`${UNITS}/${pkg}-audit-checker-brief.md`, brief('`checker` on Claude Sonnet holding the mechanical lane', [1, 2, 5, 6, 7]))
writeFileSync(`${UNITS}/${pkg}-verify-brief.md`, `# Verify breaking-${pkg}

## Role and engine

\`verifier\` on Claude Sonnet. Run the exact commands below in \`${repo}\`, in order, stopping at the
first non-zero exit, and report each command with its exit code and the first failing excerpt
(at most 40 lines). Fix nothing; edit nothing; run no install and no discarding git command.

\`\`\`text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
\`\`\`

Observations, not criteria: a timing-suspect failure in a whole-suite run is reported with the
failing test's name; the Orchestrator takes the deciding re-run.
`)
console.log(`${pkg}: report, diff (${diff.split('\n').length} lines), status (${status.trim().split('\n').filter(Boolean).length} entries), audit briefs${wide ? ' (wide)' : ''}, verify brief`)
