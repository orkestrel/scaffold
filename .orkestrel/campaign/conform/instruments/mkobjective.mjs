// Write the objective-lane brief for a package's audit round, for a Sol lane on the Cursor bench (read-only).
import { existsSync, writeFileSync } from 'node:fs'
const [pkg, round] = process.argv.slice(2)
if (!pkg || !round) throw new Error('usage: node tmp/work/mkobjective.mjs <pkg> <round>')
const cwd = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
const S = '/home/user/scaffold'
const addendum = `${S}/tmp/units/conform/conform-${pkg}-brief-addendum.md`
const distill = existsSync(`${S}/tmp/cursor/${pkg}-r${round}-distill-grok.result.md`) ? `${S}/tmp/cursor/${pkg}-r${round}-distill-grok.result.md` : `${S}/tmp/cursor/${pkg}-r${round}-distill-luna.result.md`
const text = `# Lane brief — unit conform-${pkg}, objective lane, audit round ${round}

Role and engine: the objective lane of the adversarial audit, held by GPT-5.6 Sol on the Cursor bench. Read-only: never create, edit, or delete a file, and never run a command that changes the tree. Perform the audit directly and spawn nothing.

Subject: the uncommitted unit in \`${cwd}\`. Read the audit brief \`${S}/tmp/units/conform/conform-${pkg}-audit-brief.md\` first; it names the claims, the threshold, and the output shape. Then read, in this order: the absorption lane's distillate \`${distill}\` (a map with \`file:line\` pointers, never a verdict); the writer's report \`${S}/tmp/units/conform/conform-${pkg}-report.md\`; the unit brief \`${S}/tmp/units/conform/conform-${pkg}-brief.md\`${existsSync(addendum) ? ` and its addendum \`${addendum}\` (consumer edits from landed dependencies, applied before the rows)` : ''}; the evidence \`/home/user/work/evidence/conform-${pkg}.diff\` (the unit's \`git diff HEAD\`) and \`/home/user/work/evidence/conform-${pkg}.status\` (\`git status --short\`).

Law: read \`${S}/AGENTS.md\`, \`${S}/.claude/rules/quality.md\` § Falsification, \`${S}/.claude/rules/writing.md\`, and \`${S}/.claude/rules/tests.md\` before ruling; each row cites a rule section under \`${S}/.claude/rules/\`, read the sentence it cites.

Standing conditions: exclude \`node_modules/**\`, \`dist/**\`, and \`tmp/**\` from every sweep; the vendored files (\`tests/setupPolicy.ts\`, \`tests/policy.test.ts\`, \`tests/config.test.ts\`, \`tests/distribution.test.ts\`, \`configs/**\`, \`scripts/**\`, \`.claude/settings.json\`, and every \`guides/<dependency>.md\` mirror) are outside the unit and off-limits to it; the guide the unit owns is \`guides/${pkg}.md\` with \`guides/README.md\` and \`README.md\`. Claim 8's gate reading is NOT-EVIDENCED for a read-only lane and settles on the Orchestrator's deciding run at landing; say so rather than reading the report's exit codes as your own.

Method: attempt to refute each numbered claim with the smallest evidence that would break it; re-run every sweep you rely on rather than reading it from the report or the distillate, and name each sweep's pattern and paths; quote \`file:line\`. CONFIRMED with the evidence that convinced you, or REFUTED with the failing input and the smallest correct fix. Rule a prose hit by the sense the rule bans, and record a permitted sense as permitted. A number reported beside the command that produced it is a measurement, not a count.

Output, in Markdown and nothing else: \`## Per-claim verdicts\` (one entry per claim, in order), \`## Findings outside the claims\` (O-numbered, each with \`file:line\` and the right form), \`## Referrals to the Orchestrator\` (R-numbered questions, no verdicts), and one terminal line: \`PASS\` or \`FAIL <claim numbers>\`. Write plainly: no count of a growable set in prose, no \`above\` or \`below\` as a pointer, no \`should\`.
`
const out = `${S}/tmp/cursor/${pkg}-r${round}-objective-brief.md`
writeFileSync(out, text)
console.log(out)
