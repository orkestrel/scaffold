// Generate the per-package TSDoc voice unit brief (successor of the shared brief), the subjective
// reviewer brief, and the checker brief. Usage: node mkvoice.mjs <pkg> [<pkg> ...]
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
const UNITS = '/home/user/scaffold/tmp/units/voice'
const RETAIN = '/home/user/scaffold/.orkestrel/campaign/voice/units'
mkdirSync(UNITS, { recursive: true }); mkdirSync(RETAIN, { recursive: true })
const scan = Object.fromEntries(readFileSync('/home/user/scaffold/.orkestrel/campaign/voice/scan-before.txt', 'utf8').split('\n').filter((l) => /^\S+\s+files=/.test(l)).map((l) => { const [name, ...rest] = l.trim().split(/\s+/); return [name, Object.fromEntries([...l.matchAll(/(\w+)=\s*(\d+)/g)].map((m) => [m[1], m[2]]))] }))
for (const pkg of process.argv.slice(2)) {
	const repo = pkg === 'scaffold' ? '/home/user/scaffold' : `/home/user/fleet/${pkg}`
	const tip = execFileSync('git', ['-C', repo, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
	const s = scan[pkg] || {}
	const unit = `# Unit voice-${pkg} — migrate the TSDoc voice of \`@orkestrel/${pkg}\`

Successor of \`.orkestrel/campaign/fix/tsdoc-wave-brief.md\` (the shared wave brief, read it in full
first; every section there binds unless this file narrows it). What this file adds: the package,
its checkout, its tip, the measured population, the standing conditions of the breaking wave, and
the evidence the unit must leave on disk.

## Role and engine

\`implementer\` on Claude Opus 5, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Every TSDoc block under \`src/\` and \`app/\` of \`${repo}\` opens with a third-person \`-s\` verb
sentence that never repeats the symbol's name, and every boolean \`@returns\` reads
\`True if …; false otherwise\`, with no other change to the tree.

## Context

**Host.** Linux, bash. Repository \`${repo}\` at commit \`${tip}\`, branch
\`claude/orkestrel-npm-audit-deps-14ibta\`, committed clean at launch, \`node_modules\` installed
with the fleet closure staged as tarballs. Do not run \`npm install\`. Run only the gate chain the
shared brief names; \`test:distribution\` and any live-service suite are outside it.

**Measured population at launch** (\`instruments/voice-scan.mjs\`, an over-approximating
classifier — it counts a first sentence as verbless when it opens with a noun, an article, or a
backtick token, so read each hit before rewriting): files=${s.files ?? '?'}, blocks=${s.blocks ?? '?'},
imperative=${s.imperative ?? '?'}, verbless=${s.verbless ?? '?'}, boolean \`@returns\` in another wording=${s.returnsBad ?? '?'}.

**Standing conditions.**
- A guide parity test in some packages compares \`@example\` fences and backticked symbol names in
  TSDoc against the guide and the barrel (for example \`tests/guides.test.ts\`). The wave leaves
  \`@example\` blocks and every backtick token untouched, so those tests stay green; a test that
  pins a first sentence is a deviation to report, never a guide edit.
- The breaking wave landed before this unit: symbol names in the tree are the ruled names. Never
  rename a symbol, and never touch a guide or a test.
- \`lsp\` and \`test\` already open every first sentence in the third person; if this package's scan
  shows zero in a bucket, that bucket needs no sweep.
- The rule file: read \`.claude/rules/typescript.md\` in the checkout where it exists; a target
  checkout carries no \`.claude/rules/\`, so read the vendored copy at
  \`node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md\`. That is not a
  deviation.
- Lessons the pilot slice's audits ruled, binding here: when a rewrite drops a noun phrase, keep
  every referent a later clause depends on (a pronoun such as \`it\` must still resolve to the
  same noun); add no quantifier the sentence did not carry (\`each\`, \`every\`, \`all\`); keep a
  possessive on the noun it modified (the emitter's handler stays the emitter's handler); where
  a constant's sentence names the symbol's own identifier as a code token, drop the token only
  when the sentence still names the value (\`the null byte\` for \`NUL\`), and keep a domain term
  that is the value's own name (a wire field, a byte's name); a boolean \`@returns\` rewrite
  drops the backticked \`true\`/\`false\` tokens by design.
- The scan's buckets are a population estimate: \`Options for …\` and \`Whether …\` openers sit
  in the wrong bucket, so sweep every block and rule by reading, not by the bucket.

## Unknowns

none.

## Scope

**Owned.** TSDoc comment text under \`src/**\` and \`app/**\` of \`${repo}\`, and the evidence files
named under Output.

**Off-limits.** Every non-comment token; \`tests/**\`; \`guides/**\`; \`README.md\`; \`package.json\`;
\`package-lock.json\`; \`AGENTS.md\`; \`.claude/**\`; \`.agents/**\`; \`configs/**\`;
\`tests/setupPolicy.ts\`; \`tests/policy.test.ts\`; every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
\`git\` command. Tree-wide \`npm run lint\` then \`npm run format\` only to converge, then the
non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Sweep as the shared brief
directs, run the gate chain, then write the evidence files:

\`\`\`text
git diff > ${UNITS}/voice-${pkg}.diff
git status --short > ${UNITS}/voice-${pkg}.status
\`\`\`

## Output

Return, as data: the count of blocks rewritten by kind (first sentence from the imperative,
first sentence given a verb, first sentence reworded to drop the symbol's name, boolean
\`@returns\`); the files touched; each gate command with its exit code and an excerpt for any
failure; the two evidence paths; deviations (expected, found, evidence, done or not, one
hypothesis) or \`none\`.

## Deviation contract

Stop and report when a rewrite would change meaning, when a test pins a sentence you must
change, or when the gate chain fails for a cause you cannot attribute after one re-run. Wording
choices within the rule are yours: decide, continue.

## Acceptance criteria

1. \`git diff\` shows changes inside comment text only (the checker reads the diff hunks).
2. No doc block under \`src/\` or \`app/\` opens with an imperative verb or a bare noun phrase, and no
   boolean \`@returns\` uses another wording (the Orchestrator re-runs \`voice-scan.mjs\` after
   landing as the acceptance instrument).
3. Every \`@example\`, \`@param\`, \`@remarks\`, \`@throws\`, and later sentence is byte-identical to
   the launch tree.
4. The gate chain exits 0 at every step (observation for \`npm test\` timing; the Orchestrator's
   landing chain is the authoritative run).
5. \`git status --short\` lists only files under \`src/\` and \`app/\`.
`
	const subjective = `# Audit brief — unit voice-${pkg}, subjective lane

## Role and engine

\`reviewer\` on Claude Opus 5 holding the SUBJECTIVE lane (voice, wording, meaning kept, guide
voice), a native subagent in a clean context. The writer was Claude Opus 5; the Sol bench is
dark, so this lane runs on the writer's engine, told so. Read-only: Read, Grep, Glob. You audit
directly and spawn nothing; you never edit.

## Subject

The TSDoc voice unit of \`@orkestrel/${pkg}\` in \`${repo}\`. The brief the writer executed is
\`${UNITS}/voice-${pkg}-brief.md\` and the shared brief it succeeds is
\`/home/user/scaffold/.orkestrel/campaign/fix/tsdoc-wave-brief.md\`; the actual diff is
\`${UNITS}/voice-${pkg}.diff\` and the actual status \`${UNITS}/voice-${pkg}.status\`; the
writer's report is \`${UNITS}/voice-${pkg}-report.md\`. Rule on the diff and the tree, never on
the report's self-assessment. The rule is \`.claude/rules/typescript.md\` § Comments and API
documentation in the same checkout.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every rewritten first sentence keeps the meaning of the sentence it replaced: the same
   action, the same subject, the same qualifiers; nothing added, nothing dropped. Sample every
   hunk in the diff, not a subset, and quote any hunk that changes meaning.
2. Every rewritten first sentence opens with a third-person \`-s\` verb that fits the symbol
   (\`Creates\` for a factory, \`Returns\` or \`Checks whether\` for a query, \`Holds\` or
   \`Represents\` or \`Names\` for a property, type, or constant) and never repeats the symbol's
   name; quote any sentence whose verb misdescribes the symbol.
3. Every rewritten boolean \`@returns\` reads \`True if …; false otherwise\` with the original
   condition kept.
4. No first sentence that already satisfied the rule was rewritten, and the diff touches no
   \`@example\`, \`@param\`, \`@remarks\`, \`@throws\`, or later sentence.

## Output

Per-claim verdicts with \`file:line\` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: \`PASS\` or
\`FAIL <claim numbers>\`.
`
	const checker = `# Audit brief — unit voice-${pkg}, checker lane

## Role and engine

\`checker\` on Claude Sonnet (mechanical conformance), a native subagent in a clean context.
Read-only: Read, Grep, Glob. You audit directly and spawn nothing; you never edit.

## Subject

The TSDoc voice unit of \`@orkestrel/${pkg}\` in \`${repo}\`. The brief the writer executed is
\`${UNITS}/voice-${pkg}-brief.md\`; the actual diff is \`${UNITS}/voice-${pkg}.diff\` and the actual
status \`${UNITS}/voice-${pkg}.status\`; the writer's report is \`${UNITS}/voice-${pkg}-report.md\`.
Rule on the diff, the status, and the tree, never on the report's self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every hunk in the diff changes comment text only: no \`-\`/\`+\` line pair differs outside a
   \`/** … */\` block or a \`//\` comment. Quote any hunk that touches a code token.
2. Every backtick token, \`{@link …}\`, and URL in a rewritten block is byte-identical to the
   removed line, except the backticked \`true\`/\`false\` tokens of a boolean \`@returns\` line
   rewritten to \`True if …; false otherwise\` (the rule mandates that form), the backticked \`true\`
   of a boolean-summary opener (\`\\\`true\\\` when the value is …\` → \`Checks whether the value is …\`), and a code token
   that repeated the symbol's own identifier and was dropped under the name clause (report it
   as an observation with the sentence that replaced it, not as a break); quote any other
   token that changed.
3. The status lists only files under \`src/\` or \`app/\`; nothing under \`tests/\`, \`guides/\`,
   \`README.md\`, \`package.json\`, \`package-lock.json\`, \`.claude/\`, \`configs/\`,
   \`tests/setupPolicy.ts\`, or \`tests/policy.test.ts\`.
4. Grep the tree's \`src/\` and \`app/\` for a doc block whose first line opens with an imperative
   verb (\`Create\`, \`Return\`, \`Build\`, \`Check\`, \`Determine\`, \`Narrow\`, \`Resolve\`, \`Read\`,
   \`Write\`, \`Parse\`, \`Validate\`, \`Compile\`, \`Decode\`, \`Encode\`, \`Run\`, \`Start\`, \`Stop\`,
   \`Open\`, \`Close\`, \`Register\`, \`Remove\`, \`Add\`, \`Get\`, \`Set\`, \`Emit\`, \`Send\`, \`Wrap\`,
   \`Format\`, \`Render\`, \`Normalize\`, \`Merge\`, \`Apply\`, \`Load\`, \`Save\`, \`Convert\`,
   \`Extract\`, \`Collect\`, \`Report\`, \`Describe\`, \`Infer\`, \`Derive\`, \`Compute\`, \`Map\`,
   \`Filter\`, \`Select\`, \`Match\`, \`Find\`, \`List\`, \`Count\`, \`Measure\`, \`Trim\`, \`Split\`,
   \`Join\`, \`Serialize\`, \`Deserialize\`, \`Handle\`, \"Ensure\") followed by a space or a
   backtick (case-insensitively, so \`create\` and \`Create\` both count), and for \`@returns\`
   followed by \`Whether\`, \`\\\`true\\\`\`, or \`true \`; the sweep returns no hit.
5. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with \`file:line\` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: \`PASS\` or
\`FAIL <claim numbers>\`.
`
	for (const [name, text] of [[`voice-${pkg}-brief.md`, unit], [`voice-${pkg}-audit-subjective-brief.md`, subjective], [`voice-${pkg}-audit-checker-brief.md`, checker]]) {
		writeFileSync(`${UNITS}/${name}`, text); copyFileSync(`${UNITS}/${name}`, `${RETAIN}/${name}`)
	}
	console.log(`${pkg} ${tip} briefs written`)
}
