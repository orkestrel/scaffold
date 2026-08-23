# FIX-P audit — the last round before the fleet sweep

Both lanes receive this identical text and are blind to each other.

## Subject

`@orkestrel/scaffold` 0.0.50 at `df941ec` on `claude/new-session-hxonen`. The subject is that
commit's diff.

Chain: design rounds, W1–W7, propagation, round 1 (FAIL), FIX-A–E, round 2 (FAIL), FIX-G/H/I,
round 3 (two lanes FAIL, nine refuters), FIX-J, its audit (FAIL), FIX-L, FIX-K, its audit (FAIL),
FIX-M, FIX-N, their audit (both lanes FAIL), FIX-P.

## What this round decides

**Whether the fleet sweep runs and 0.0.50 publishes.** After this, eleven repositories receive these
bytes.

**Two things in this diff have been wrong three or four times each.** The CommonJS selector is on its
fourth attempt: `entry.module === false`, then "resolves under require conditions", then "traversed an
explicit `require` key", now "resolve under `['node','require']` and classify the target's format".
The browser branch's reason of record is on its third: "the imports are not present", then "the
imports follow a published face", now "the imports are declared by either axis". Each previous
version passed a review. Assume this one is wrong too and find how.

## Who wrote which half

- **Sol wrote P1, P2's assertion, P3 and P5.** Objective lane: your own engine's work — attack hardest.
- **The Orchestrator wrote P4** (the rule consolidation in `.agents/orchestration.md`) **and ran P2's
  caller-mutating control**. Subjective lane: P4 is prose in an instruction file and is yours first.
  Neither is exempt.

## Already established — do not re-run

Verified by the Orchestrator directly, on the host:

- `format:check`, `lint:check`, `check`, `test:guides` all exit 0; inventory staged 108 files.
- `src:core` scoped to `templates.test.ts`: 22 passed. Scoped to `compilers.test.ts`: 91 passed.
  `guides`: 16 passed.
- **P1's four cases**, run against the shipped predicate:
  ```text
  module-sync first   required=true   got=true  OK
  node condition      required=true   got=true  OK
  plain ESM-only      required=false  got=false OK
  plain dual          required=true   got=true  OK
  ```
- **P2's caller-mutating control**: replacing `collectTargets(entry)` inside the emitted `buildStage`
  reds the assertion; restored byte-identical, green again. Before this round the same mutation left
  it passing.
- `.agents/` is not writable from the codex bench sandbox. That is why P4 was Orchestrator-written.
  Not a finding.
- The distribution proof is presence-owned; the fleet sweep must delete it per target. Known.
- Node loads an extensionless file under both module systems; that claim was refuted and withdrawn
  earlier. **Do not revive it.**

## Review evidence

- Diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/p/diff.txt`
- Diffstat: `.../audit/p/diffstat.txt` — **verified to name the same eight files as the diff.** A
  previous round supplied a diffstat over twelve paths and a diff over seven, and a lane correctly
  refused to report a sweep it could not complete.
- Status: `.../audit/p/status.txt` (empty; tree clean)
- Unit report and integration: `.orkestrel/campaign/fix-p-report.md`
- Prior reconciliation: `.orkestrel/campaign/audit-mn-reconciliation.md`

## Claims

**D1 — the fourth CommonJS selector is right.** It resolves under `['node','require']`, then treats
`.cjs` and the addon extension as CommonJS, `.js` as CommonJS unless the manifest declares
`"type": "module"`, and everything else as not. Attack: find a fifth shape it decides wrongly. Consider
a `.mjs` target reached under require conditions, a subpath whose target is extensionless, a nested
fallback array, a package with no `type` field, and a `"type": "commonjs"` package publishing `.mjs`.

**D2 — reading the installed manifest's `type` is sound where it is read.** `manifest.type` is passed
into the predicate from `buildStage`. Attack: is that the right manifest — the installed dependency's,
or the consumer's? Would it be correct for a subpath whose target resolves into a nested directory
with its own `package.json`?

**D3 — P2's assertion binds the caller and cannot pass vacuously.** The Orchestrator's control fired.
Attack the instrument's rule rather than that reading: name a change to the emitted proof that would
break the fallback behaviour and leave this assertion passing.

**D4 — the reason of record is now true, in all three copies.** "those imports are declared by either
axis, so they do not select the branch". Attack: check it against `src/core/compilers.ts` yourself.
Is "either axis" exactly right? Does the emitted copy still say the same thing under its literal ban?

**D5 — P4's consolidation lost nothing.** The duplicated directive was deleted and one clause folded
into the paste-the-command bullet. Attack: did the fold lose an obligation the deleted bullet carried?
Does the surviving mechanism-owns-its-prose rule still state a complete trigger and action after its
tail was stripped?

**D6 — no refusal widened and no coverage was lost.** D1 changed a selector, again. Attack: which
package shape now enters a probe that should not, or leaves one it should stay in? The previous three
selectors each lost coverage silently.

**D7 — the guide describes the shipped predicate.** Attack: does any sentence still state a
condition-traversal rule the code no longer uses? Is a false universal replaced by an unfalsifiable
one?

**D8 — the writing contract holds across the diff.** Sweep the substitution table
case-insensitively and across inflections over every file in the diff. Rule each hit by the sense the
row bans. Name the pattern and the paths, including a clean result. The counts ban is live and has
been violated twice in this campaign.

**D9 — coherent, and would you ship it to eleven repositories?**

## Unknowns, named as unknowns

- Whether a nested `package.json` under a resolved target changes D2's answer is not known.
- Whether the two ragged wrap lines in `guides/scaffold.md` are worth reflowing given the assertion
  coupling is a judgment the Orchestrator made against reflowing. Rule on it if you disagree.

## Where a probe may live

**Objective lane (Sol):** probes only under `tmp/audit-p-sol/`. Never inside `tests/`. Delete before
returning. No tree-wide gate. Scope every run. Your sandbox denies a grandchild process, a nested
install, a loopback listener, and writes under `.agents/` — **six times in this campaign a reported
denial led to the host reading finding a real defect.** Report; never substitute the reachable half.

**Subjective lane (Opus): Read, Grep, Glob only.** No Bash, no Write. Where a claim needs a run,
return `UNRESOLVED` and name the exact command. D4, D5, D7, D8 and D9 are yours first.

## The threshold

A finding is worth more than a clean pass. Eleven repositories receive these bytes next. Return "no
findings" only if you attacked and failed to break, and show what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
