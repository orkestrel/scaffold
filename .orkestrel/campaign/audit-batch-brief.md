# Audit round: the distributed units batch

## Subject

Uncommitted working trees across `C:/Users/mikes/WebstormProjects/`:

| Repo | Unit | Claimed to close | Writer engine |
| --- | --- | --- | --- |
| contract | E2 (+ its completion) | The `Symbol.for` cross-copy brand; the old `#brand`/`guard()` mechanism removed; integration proofs re-pinned to the new defenses; guide rewritten | Sol |
| sea | E1 | `SEAOptions.timeout` threaded to every spawned shell; the `TIMEOUT` proof | Sol |
| program | M2 + E3 | Foreign validation results guarded; the definition owned, guarded, sealed at construction | Sol |
| mcp | U12 | The published `add`/`destroy` teardown adopted; the aggregation proof; the relocated ordering remark | Sol |
| agent | U2 | The `Channel` comment corrected; the missing `@example` | Sonnet |
| qualifier | U3 | The `Premise` two-mode prose; the described-mode render pins | Sonnet |
| toolbox | M1 | The `promptToolShape`/`answerToolShape` proofs | Sonnet |
| middleware, browser, workflow | U11-A | The awaited-delay conversions; loop-internal and captured-handle sites skipped | Sonnet |
| eleven manifests + two distribution proofs | sweep | `"prepack": "npm run build"`; `--ignore-scripts` in brief and process (mcp and probe added later by the Orchestrator) | Sonnet + Orchestrator |

Analyst lane: E2, E1, M2, E3, and U12 are your own engine's work — attack them the harder.
Reviewer lane: none of this chain is yours; audit at full strength anyway.

## What the round decides

Whether these trees enter release preparation. contract is L0 — a wrong release there cascades
to the whole fleet.

## Already established, by the Orchestrator directly — do not re-run

- Registry parity: every checkout's version matches the registry (2026-08-21 sweep).
- The suite totals each unit reported were spot-verified through the notifications record;
  the AUTHORITATIVE runs are the verifier's, later — your subject is the claims, not the
  totals.
- `prepack` reads back as `npm run build` in every edited manifest (Orchestrator parse
  checks).

## Review evidence

Per repo: `git status --porcelain` and `git diff` yourself.

## Numbered falsifiable claims

1. (contract) `isContractError` recognizes a genuine error across a module-copy boundary and
   REFUSES: a plain `Error` with a hand-stamped `Symbol.for` brand but the wrong name; a
   lookalike with the brand and name but an undeclared code; a `Proxy` over a genuine error;
   a hostile getter object — WITHOUT THROWING on any of them. Attack the totality: the guard
   contains every inspection.
2. (contract) The old mechanism is GONE — no `#brand`, no `guard()`, no second recognition
   door that can disagree — and no test or guide sentence still describes it. Sweep, do not
   trust the report.
3. (contract) The brand-installation defense holds: `Object.defineProperty` captured at
   module evaluation means a later replacement cannot affect construction or recognition;
   the re-pinned integration proofs actually pin THAT, not a tautology.
4. (sea) `timeout` reaches EVERY `runShell` call site the build spawns — enumerate the call
   sites yourself and check each; a site composing its own shell object without the option
   falsifies the claim.
5. (sea) The `TIMEOUT` proof discriminates: it cannot pass on a build that ignores the
   option (what makes it red without the threading?).
6. (program) The guards refuse exactly off-contract results and admit every conforming
   implementation the interface permits (foreign-contract law: no over-narrowing — a class
   instance with getters must pass). Attack with a conforming-but-unusual implementation.
7. (program) The sealed definition is DEEPLY owned: mutating the caller's object after
   construction changes nothing; mutating a nested member of the stored copy fails; and no
   pre-existing behaviour reads the caller's object identity.
8. (mcp) The adopted teardown registers each resource IMMEDIATELY after acquisition in every
   converted suite — find a site where intervening code between acquisition and `add` could
   throw and leak.
9. (mcp) The aggregation proof cannot pass against the OLD abandoning loop (its red is
   recorded; verify the proof's mechanism would still discriminate).
10. (mechanical batch) Spot the three you consider most likely wrong among: the `Channel`
    example compiling and running as written; the `Premise` renders matching
    `describePremise`'s real output; the shaper proofs exercising the real compiled
    contracts; a U11-A conversion that changed timing semantics; a manifest whose `prepack`
    landed in the wrong place. Attack those three and name them.
11. (whole batch) Each tree is coherent: its scoped projects and parity gates agree with its
    sources. Name any tree you would NOT ship and why.

## Unknowns, named

- Whether contract's cross-copy proof simulates the second copy faithfully enough to bind
  (the proof's mechanism vs a REAL dual-install) — if you cannot settle it from the tree,
  `UNRESOLVED` with the settling procedure named.

## Probes

Each repo declares the `probe` Vitest project over its own `tmp/probe/**/*.test.ts`. Reviewer
lane: `tmp/probe/audit-reviewer-*.test.ts`; analyst lane: `tmp/probe/audit-analyst-*.test.ts`.
Delete probes before returning. Write NOTHING outside `tmp/probe/` in any repo.

## Verdict

Per the `orkestrel-falsify` skill (scaffold repo, `.agents/skills/orkestrel-falsify/SKILL.md`)
and `.claude/rules/quality.md` § Falsification. CONFIRMED requires naming the attack you
tried that failed. A claim you cannot decide is UNRESOLVED, not CONFIRMED. Do not hedge
toward an imagined consensus. Return per-claim verdicts, findings outside the claims, one
terminal line.
