# Unit S5 — the skill, the plan of record, and the transport rule after the S audit

Fix round for the S audit (`.orkestrel/campaign/s-audit-verdict.md` § Findings carried, the rows
whose carrier is an S5 item; lane reports `.orkestrel/campaign/s-audit-objective-report.md` and
`s-audit-subjective-report.md`). Unit S4 (`sol`) landed the generator half before this unit: a
browser application is born with the journey axis, and `audit` and `repair` report a manifest that
disagrees with the wrapper. Write every instruction here for that generator.

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/scaffold` checkout. You open this brief
yourself; every later section is written for you.

## Objective

Correct the journey skill, `ROADMAP.md`, `guides/scaffold.md`'s engine paragraph, and the cp1252
rule in `.agents/transports/codex.md` so that each sentence the audit broke is replaced by one that
is true of the tree, is a directive, and has one home.

## Context

**Evidence.** Read first: `.orkestrel/campaign/s-audit-verdict.md` (the rulings this unit
implements, with the reproduction behind each), then the two lane reports for the exact sites and
the prescriptions, then `.orkestrel/campaign/s4-report-2.md` (round 2, the landed one; `s4-report.md` is the round-1 stop) for what the generator emits after S4
(the `new` default, the question arms, their wording). The Orchestrator measured, at tip
`0d03ec79` on 2026-09-17:

- `grep -n "declared size" src/core/templates.ts .agents/skills/orkestrel-prove-journey/SKILL.md guides/scaffold.md ROADMAP.md`
  matches four lines: `templates.ts:1143` (the emitted `configs/browsers.ts` doc block),
  `SKILL.md:330`, `guides/scaffold.md:963`, `ROADMAP.md:39`. The skill's copy reads "one recorded
  divergence" where the doc block reads "a journey or style divergence".
- `node_modules/@orkestrel/test/dist/src/browser/index.js:2289`:
  `` `Access is denied for ${operation}${key === void 0 ? "" : ` "${key}"`}` `` — the key is
  omitted when the operation has none. `references/layer.md:159` prints the quoted key
  unconditionally.
- `references/layer.md:270-280`: the ban row "A store read or a router call → `readPerception`,
  `readValue`, `readStates`, `waitForText`" names readers as the replacement for a navigation, and
  the bullet after the table admits "a router call as corroboration".
- `.orkestrel/campaign/s-audit-reproduction/c20-write-paths-summary.txt`: on this host a
  `codex exec` edit through its own patch tool preserved U+96EA and U+00D7 on the touched line, and
  a PowerShell write that read and wrote bytes preserved them too. Neither run reproduced the S2
  damage, so the hazard the rule can name is a text-encoding write — `Get-Content`, `Set-Content`,
  `Out-File`, a `>` redirection — and the patch-tool remedy stands.
- `.orkestrel/campaign/s-audit-reproduction/c23-f1-probe.log.txt`: before S4, `new --app browser`
  wrote no wrapper, no `appJourney`, and no `test:journey`. After S4 (read `s4-report-2.md`), a
  browser application is born with all three and its `test` chain invokes `test:journey`; an
  existing workspace born earlier activates the axis by writing the wrapper and running
  `scaffold repair`, and activates the browser setup proof by writing `tests/setupBrowser.test.ts`
  and running `scaffold repair`; `audit` reports a manifest whose `test:journey` names a missing
  wrapper, and a wrapper whose `test` chain does not invoke `test:journey`.

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`;
`.claude/rules/documentation.md` § Workflow skills and § Authority and workflow (`ROADMAP.md` is
the sequenced plan of record; each chunk reaches green); `.claude/rules/quality.md` § Instruments
(owns "an instrument is not evidence until it has failed"); `.claude/rules/portability.md`
§ Scripts and packaging and § Claims (no POSIX-only command line). Skill: none. Guide:
`guides/scaffold.md` (one paragraph; keep every Summary cell equal to its doc block).

**Installed primitives.** `@orkestrel/test` 0.0.17 (`node_modules/@orkestrel/test/dist/**`).

**Host.** Windows 11; Bash; edit through your editor tools so no non-ASCII code point round-trips
through cp1252; the skill files carry em dashes and arrows.

**Measurements.** Baseline: the checkpoint the dispatch message names, carrying S4 with the
Orchestrator's gate reading green. `npm run test:policy` reads `Tests 110 passed (110)` there.

**Control identifiers.** `S5-C1` through `S5-C4`. Name a test or a probe for what it proves, never
for the control label.

**Standing conditions.** `host.json` reads stale after a vendored edit until the Orchestrator's
build; the inventory case in `test:config` reddens for that reason alone. `.orkestrel/campaign/`
is untracked and off-limits. `tmp/probe/` holds retired instruments; leave them.

## Unknowns

- The exact wording S4 gave the two question arms. Read it from `s4-report-2.md` and from
  `src/bin/CLI.ts`, and quote the manifest–wrapper disagreement the way the CLI reports it.

## The items to land

1. **One home for the engine condition (claims 5, 19).** The condition lives in the emitted
   `configs/browsers.ts` doc block (`src/core/templates.ts:1141-1143`, off-limits) alone. Rewrite
   `SKILL.md`'s Accept paragraph to state the engine bound with the verdict and to name that doc
   block as the home of the limit and its reopening condition, restating neither. Rewrite the
   paragraph at `guides/scaffold.md:961-963` the same way. Rewrite `ROADMAP.md` row 36 to keep its
   number, point at the doc block for the condition, and state its closing condition: the row
   closes when the engine-selection design is adopted in `configs/browsers.ts`, or when the limit
   is removed from the emitted doc block.
2. **The voices table (claim 12).** In `references/layer.md`, state in the sentence introducing
   the failure voices that the table carries the layer's own voices and that the statechart and
   capture voices live in `statechart.md` and `captures.md`. Split the storage row: an operation
   with a key raises `Access is denied for <operation> "<key>"`; an operation with none raises
   `Access is denied for <operation>`.
3. **The ban row (claim 16).** Split the last row of the named bans: a navigation performed by a
   router call → the visible link or control that navigates, through `clickAccessible` or
   `clickAccessibleWithin`; a store or route state read standing in for a rendered assertion →
   `readPerception`, `readValue`, `readStates`, `waitForText`. Rewrite the bullet after the table
   so corroboration admits a store read or a route state read beside a rendered assertion, and
   never a router call.
4. **The Accept bullet (claim 17).** Replace the bullet "the matrix family read once per declared
   variant, each style instrument carrying the published control that must read under its bar in
   the same run" with: "the matrix family read once per declared variant, each style reading
   carrying its published control from [styles.md](references/styles.md) → The published controls
   in the same run, and the contrast reading's control straddling its declared bar".
5. **The title sentence (claim 18).** Replace `SKILL.md`'s "Assert the title from `document.title`
   per screen. A surface whose screens share one title is a finding about the surface." with:
   "Assert the title from `document.title` per screen, against the title the product guide names
   for that screen. Report a screen the guide gives no title as a product finding."
6. **The fresh workspace (claim 23).** Rewrite every sentence that states the axis or the setup
   proof as present in a fresh workspace so it is true after S4: a browser application born by
   `scaffold new` carries the wrapper, `appJourney`, `test:journey`, and the chain invocation; a
   workspace born earlier activates the axis by writing `configs/app/vite.journey.config.ts` and
   running `scaffold repair`; writing `tests/setupBrowser.test.ts` selects the browser setup
   runtime, and `scaffold repair` after it registers `setup:browser`, emits `test:setup:browser`,
   and joins it to `test`. Carry the `repair` step into `SKILL.md` → Read the variant once,
   `SKILL.md` → Import the journey layer, the Accept bullet naming `setup:browser`, and
   `references/layer.md:68-70`. Name the `audit` question a reader meets when the manifest and the
   wrapper disagree, quoting S4's wording.
7. **The cp1252 rule (claim 20).** Rewrite the paragraph S3 appended to
   `.agents/transports/codex.md` § Sol route as directives with their triggers: when a bench unit
   must edit a line carrying a code point above `0x7F`, it edits through the exec's own patch tool
   and never through a text-encoding shell write (`Get-Content`, `Set-Content`, `Out-File`, a `>`
   redirection), and it reports every such line it touched; the Orchestrator's review sweep
   compares, for each touched line, the set of code points above `0x7F` before and after, and
   flags a line that lost any of them. Keep it one paragraph, one home, no history.
8. **The instruction-file sweep (claim 22).** Replace `references/layer.md:10-11` with: "Verify
   against the installed entry any name this reference or its siblings do not carry in a fence."
   Delete the reassurance clause at `layer.md:264` ("The replacement is published, so the ban costs
   a journey nothing.") and open the table with its directive. Delete the two restatements of
   `.claude/rules/quality.md`'s instrument law (`styles.md:111`, `SKILL.md:285`) and reference the
   rule where the sentence sat. Rewrite the narrative opener of `statechart.md` → The worked table
   (`:46-48`) as a directive naming what the table is and what to do with it. Sweep every owned
   file for a remaining count, an explanation written to persuade, or a law restated from
   `AGENTS.md` or a rule file, and fix each.
9. **The capture flag (F2).** Replace `CAPTURE=1 npm run test:journey` in `SKILL.md` and
   `references/captures.md` with an instruction that sets `CAPTURE` to `1` in the reader's own
   shell and then runs `npm run test:journey`, naming no shell syntax.
10. **The count at `styles.md:125` (F3).** Name the members: `buildContrast` hands back `refused`
    and `accepted` by name.
11. **ROADMAP rows.** Row 36 per item 1. Add no other row; strike none.

## Scope

**Owned.** `.agents/skills/orkestrel-prove-journey/SKILL.md`,
`.agents/skills/orkestrel-prove-journey/references/*.md`,
`.agents/skills/orkestrel-prove-journey/agents/openai.yaml` and
`.claude/skills/orkestrel-prove-journey/SKILL.md` (only if the `description` moves; it need not),
`ROADMAP.md`, `.agents/transports/codex.md`, `guides/scaffold.md` (the engine paragraph alone).

**Shared (report-only).** None.

**Off-limits.** `src/**`, `tests/**`, every other skill, `.claude/rules/**`, `.claude/agents/**`,
`.codex/**`, `.cursor/**`, `host.json`, `package.json`, `.orkestrel/**`.

**What asserts the state this change ends.** `tests/policy.test.ts` (the skill family sweep, the
fenced-import sweep, the banned-term sweep), `tests/guides.test.ts` (Summary parity over
`guides/scaffold.md`), `npm run format:check`.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. Format only your owned files with
`./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <files>`; never run the tree-wide
`format` or `lint`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `.orkestrel/campaign/s5-report.md`: a table of item → file → section; the exact text landed for
items 1, 5, 7; the sweep's pattern, paths, and every judged hit with its ruling; each control's
command and reading; the gate table; the claims you flag as least certain; the diff stat and
`git status --short`. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle wording, paragraph placement,
and heading choice. Stop and report if `s4-report-2.md` is absent or names a generator behaviour that
contradicts evidence item 5 here, if an item needs an edit outside the owned files, or if the
policy sweep reports a violation naming a file you do not own.

## Acceptance criteria

Cheap first.

- **S5-C1.** `grep -n "declared size" src/core/templates.ts .agents/skills/orkestrel-prove-journey/SKILL.md guides/scaffold.md ROADMAP.md`
  matches `src/core/templates.ts` alone.
- **S5-C2.** `grep -rn "CAPTURE=1\|costs a journey nothing\|share one title\|Two forms" .agents/skills/orkestrel-prove-journey ROADMAP.md .agents/transports/codex.md`
  matches nothing, and `grep -rn "not evidence until" .agents/skills/orkestrel-prove-journey`
  matches nothing.
- **S5-C3.** `npm run format:check` exits 0; `npm run test:policy` exits 0 with no violation;
  `npm run test:guides` exits 0.
- **S5-C4.** The banned-term and judged-term sweep from `.orkestrel/campaign/s3-instruments/s3-terms.mts`
  (copy it under `tmp/probe/` and run it with `node --experimental-strip-types`) reports zero
  banned hits over the owned files, with each judged hit ruled in the report.

**Observations, not criteria.** `test:config`'s inventory case until the Orchestrator's build; the
whole `npm test` chain.

## Review evidence

The actual diff and the actual `git status --short` output, in the report.
