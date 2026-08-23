# FIX-Q audit — the fifth CommonJS decision, and one question the Orchestrator could not settle

Both lanes receive this identical text and are blind to each other.

## Subject

`@orkestrel/scaffold` 0.0.50 at `c70b3fe` on `claude/new-session-hxonen`. The subject is that commit's
diff.

## What this round decides

**Whether the fleet sweep runs and 0.0.50 publishes.**

**The CommonJS decision is on its fifth attempt.** Four shipped before it and every one passed a
review before a later round broke it: `entry.module === false`, "something resolves under require
conditions", "the walk traversed an explicit `require` key", and "classify the target's extension
against the root manifest's `type`". This attempt differs in kind — it claims a **complete
enumeration of Node's `require` format rules** rather than a heuristic, and the enumeration is
offered as its own evidence. Attack the completeness claim. A rule Node applies that the enumeration
omits is the finding.

## Who wrote what

**Sol wrote all of it.** Objective lane: this is your own engine's work and it is your fifth attempt
at this decision — attack it hardest. Subjective lane: you did not write it, and E4 through E7 are
yours first.

## Already established — do not re-run

Verified by the Orchestrator directly, on the host, after the unit exited:

- Template project: **23 passed**, exit 0. The unit's sandbox reported six `EPERM` failures on the
  same command; all pass on the host.
- `format:check`, `lint:check`, `check`, `test:guides` all exit 0.
- **The end-to-end reading.** Candidate rebuilt, packed, installed, the presence-owned proof deleted
  so `repair` writes the regenerated one into `/home/user/orkestrel/indexeddb`:
  `Tests 6 passed | 2 skipped (8)`, exit 0, under `--mode release`.
- The unit's six-case matrix and its firing control, recorded in `.orkestrel/campaign/fix-q-report.md`.

## The Orchestrator's failed verification — read this before E1

The round's evidence requirement was the enumeration, so the Orchestrator tried to check it and
**failed twice**, both times through a defective probe. The record is in
`.orkestrel/campaign/fix-q-report.md`. In short:

- A `require()`-based probe discriminates nothing, because Node's `require(esm)` loads an ES module
  too. The predicate models TypeScript's judgment, not Node's tolerance.
- A TypeScript probe disagreed with the enumeration in three rows, and none of the three is evidence:
  the fixtures carry no `types` condition, so TypeScript resolved declarations by extension guess.
  `TS2307` there is "cannot find module", a declaration-resolution failure rather than a format
  verdict.

**Do not treat those readings as findings.** Build the fixtures correctly if you attack E1.

## Review evidence

- Diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/q/diff.txt`
- Diffstat: `.../audit/q/diffstat.txt` — verified to name the same eight files as the diff.
- Status: `.../audit/q/status.txt` (empty; tree clean)
- Unit report and integration: `.orkestrel/campaign/fix-q-report.md`
- Prior reconciliation: `.orkestrel/campaign/audit-p-reconciliation.md`

## Claims

**E1 — the enumeration is complete.** It claims Node's `require` format rules are: `.cjs`, `.json`,
`.node` and extensionless are CommonJS; `.mjs` is not; `.js` takes the nearest enclosing
`package.json` `type`. Attack completeness: name a rule Node applies that this omits. Consider a
symlinked target, a target inside `node_modules`, a `.cts`/`.mts` target, an unknown extension, a
target whose nearest manifest has a malformed or absent `type`, and a directory target.

**E2 — the enumeration models the right authority.** The predicate decides whether a *typed CommonJS
consumer* can take the subpath. Attack: does TypeScript decide format the way this enumeration
assumes? **Specifically: when an entry declares a `types` condition, does the declaration's own
extension decide the consumer's format rather than the runtime target's?** If it does, the
nearest-manifest rule may model something TypeScript never consults. The Orchestrator raised this and
could not settle it — settle it with fixtures that carry proper `types` conditions.

**E3 — the ruling against observation holds.** The unit rejected gating on an observed `require()`
because `buildStage` classifies before the compile probes run, and a require during classification
would conflate an incompatible format with valid CommonJS that throws while initializing. Attack:
is that conflation real and unavoidable, or could the observation be staged to avoid it?

**E4 — the AST instrument cannot be evaded.** It requires each call the rule names inside
`buildStage`. Attack the rule, not its output: name a mutation that breaks the fallback behaviour and
leaves every required call present.

**E5 — the guide describes the shipped predicate.** It now names the condition set and the format
rules. Attack: does any sentence still describe a rule the code does not implement? Is a false claim
replaced by an unfalsifiable one?

**E6 — the three copies of the reason of record are correct and legible.** One was a graft last round.
Attack all three, including whether the emitted copy is intelligible to a consumer reading it in
their own `tests/distribution.test.ts`.

**E7 — the writing contract holds across the diff.** Sweep the substitution table case-insensitively
and across inflections over every file in the diff. Rule each hit by the sense the row bans. Name the
pattern and paths, including a clean result. The counts ban is live and has been violated three times
in this campaign, twice by the Orchestrator.

**E8 — no refusal widened and no coverage was lost.** The previous four selectors each lost coverage
or widened a refusal, twice silently. Attack: which package shape now enters a probe that should not,
or leaves one it should stay in?

**E9 — coherent, and would you ship it to eleven repositories?**

## Unknowns, named as unknowns

- E2's question is genuinely open. The Orchestrator's two attempts to settle it were both defective.
- Whether a symlinked or `node_modules`-internal target changes E1's answer is not known.

## Where a probe may live

**Objective lane (Sol):** probes only under `tmp/audit-q-sol/`. Never inside `tests/`. Delete before
returning. No tree-wide gate. Your sandbox denies a grandchild process, a nested install, a loopback
listener, and writes under `.agents/`. Seven times in this campaign a reported denial led to a host
reading that found something. Report; never substitute the reachable half.

**Subjective lane (Opus): Read, Grep, Glob only.** No Bash, no Write. Where a claim needs a run,
return `UNRESOLVED` and name the exact command. E4, E5, E6, E7 and E9 are yours first.

## The threshold

A finding is worth more than a clean pass. Eleven repositories receive these bytes next, and this
decision has been wrong four times. Return "no findings" only if you attacked and failed to break,
and show what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
