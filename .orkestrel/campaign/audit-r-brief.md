# FIX-R audit — the ruling that claims to end the seam

Both lanes receive this identical text and are blind to each other.

## Subject

`@orkestrel/scaffold` 0.0.50 at `4369c32` on `claude/new-session-hxonen`. The subject is that commit's
diff.

## What this round decides

**Whether the fleet sweep runs and 0.0.50 publishes.**

**This seam has consumed six rounds.** `.claude/rules/quality.md` § Rounds and verdicts sets three as
the budget and switches strategy at it. That switch fired: FIX-R implements a **ruling** — the compile
probe's membership is decided by the resolved declaration, not the runtime target — rather than a
sixth predicate. Five predicates before it each passed a review and were each broken by a later round.

**One thing is different and you should weigh it rather than discount it.** For the first time in this
seam, an independent check by the Orchestrator **agreed** with the unit's answer. The four rounds
before produced readings that contradicted the shipped predicate. That is evidence the subject
changed, not proof the implementation is right.

## Who wrote what

**Sol wrote all of it.** Objective lane: your own engine's work, and your sixth pass at this decision —
attack it hardest. Subjective lane: you did not write it; C5 through C9 are yours first.

## Already established — do not re-run

Verified by the Orchestrator directly, on the host, after the unit exited:

- Template project: **24 passed**, exit 0, including the `ERR_INVALID_PACKAGE_TARGET` Node child the
  unit's sandbox refused. `format:check`, `lint:check`, `check`, `test:guides` all exit 0.
- **End to end.** Candidate rebuilt, packed, installed, presence-owned proof deleted so `repair` writes
  the regenerated one into `/home/user/orkestrel/indexeddb`: `Tests 6 passed | 2 skipped (8)`, exit 0,
  under `--mode release`.
- **The `.d.ts` scope question, reproduced independently** with the Orchestrator's own fixtures:
  ```text
    package               decl-dir type  root type  .cts consumer under node16
    decl-cjs-root-esm     commonjs       module     accepts
    decl-esm-root-cjs     module         commonjs   TS1479
    decl-none-root-esm    (none)         module     TS1479
  ```
  The declaration's own directory decides; the walk falls back to the outer scope with no nearer
  manifest.
- **The authority finding**, reproduced independently: a `.d.cts` declaration over a `.mjs` runtime
  target is accepted; a `.d.mts` declaration over a `.cjs` target is refused with TS1479.

## Review evidence

- Diff: `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/audit/r/diff.txt`
- Diffstat: `.../audit/r/diffstat.txt` — verified to name the same seven files as the diff.
- Status: `.../audit/r/status.txt` (empty; tree clean)
- Unit report and integration: `.orkestrel/campaign/fix-r-report.md`
- The ruling and the reconciliation it came from: `.orkestrel/campaign/audit-q-reconciliation.md`

## Claims

**C1 — the invariant is implemented correctly.** `commonjs` comes from the resolved declaration:
`.d.cts` admits, `.d.mts` refuses, `.d.ts` takes its own directory's nearest scope. Attack: name a
declaration shape it decides wrongly. Consider a declaration reached through a fallback array, a
declaration with no `types` condition at all, a `.d.ts` whose nearest manifest is malformed, and a
subpath whose `require` and `import` branches resolve different declarations.

**C2 — the two booleans are separated correctly.** `commonjs` gates the compile probe; `required`
gates the runtime drive. Attack: is either consumed anywhere it should not be? Can they disagree in a
way that leaves a subpath measured by nothing, or measured twice under contradictory expectations?

**C3 — the constraint held: no evidence was removed.** The `isPackageTarget` guard is gone from the
non-list path so an invalid target reaches the drive; fallback-list validation stays; `.json` was
dropped from the CommonJS admission rather than added to the module set. Attack each: did removing the
guard admit something that now fails for the wrong reason? Did dropping `.json` lose a measurement?

**C4 — nothing regressed in what the previous rounds fixed.** This seam has repaired: the dual
subpath, the ESM-only package, `module-sync` first, the `node` branch, extensionless targets, and
nested scope. **Re-ask each at this implementation.** `.claude/rules/quality.md`: treat a repaired
claim as a new claim, and re-ask it at every entry point that reaches the same rule.

**C5 — the guide describes what ships.** It was rewritten around declaration-format membership.
Attack: does any sentence describe a rule the code does not implement? Is a false claim replaced by an
unfalsifiable one?

**C6 — the emitted proof is reconstructible by the maintainer who holds it.** Presence ownership means
a target keeps whatever ships. The dangling "either" and the dead `RUNTIME_CONDITIONS.commonjs` were
both repaired. Attack: read the emitted file as a consumer would. Can they reconstruct the rule? Is
any term undefined in that file's own vocabulary?

**C7 — the behaviour instrument cannot be evaded.** It lifts the emitted classification walk and
asserts the records produced. Attack the rule, not the output: name a mutation that breaks the
behaviour and leaves the assertion passing.

**C8 — the writing contract holds across the diff.** Sweep the substitution table case-insensitively
and across inflections over every file in the diff. Rule each hit by the sense the row bans. Name the
pattern and paths, including a clean result. The counts ban has been violated four times in this
campaign, three by the Orchestrator.

**C9 — coherent, and would you ship it to eleven repositories?**

## Unknowns, named as unknowns

- The unit flagged this itself: a malformed nearest manifest is measured against TypeScript, but
  treating every **other** filesystem read failure the same way follows its catch boundary without a
  direct comparison. Settle it or rule on whether it matters.
- Whether a declaration reached through a fallback array is classified correctly is not known.

## Where a probe may live

**Objective lane (Sol):** probes only under `tmp/audit-r-sol/`. Never inside `tests/`. Delete before
returning. No tree-wide gate. Your sandbox denies a grandchild process, a nested install, a loopback
listener, and `.agents/` writes. Eight times in this campaign a reported denial led to a host reading
that found something. Report; never substitute the reachable half.

**Subjective lane (Opus): Read, Grep, Glob only.** No Bash, no Write. Where a claim needs a run, return
`UNRESOLVED` and name the exact command and fixture. Your restraint on the last round — refusing to
derive verdicts you could not execute, while tracing findings through shipped code — is what made that
report worth acting on. Do the same.

## The threshold

A finding is worth more than a clean pass. Eleven repositories receive these bytes next. But
`.claude/rules/quality.md` is equally explicit: never manufacture a finding to avoid a clean round, and
an all-confirmed round is a legitimate result that puts the brief on trial rather than the subject. If
you attack and cannot break, say so and show what you tried.

## Verdict shape

Exactly the `orkestrel-falsify` shape: numbered verdicts in this brief's order, each
`CONFIRMED` / `BROKEN` / `UNRESOLVED` / `NOT-EVIDENCED` with the evidence that value requires; then
findings fitting no claim; then one terminal line and only one.
