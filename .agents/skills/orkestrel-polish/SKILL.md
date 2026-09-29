---
name: orkestrel-polish
description: Drive a rendered or externally driven surface to shipped quality through one capture-evidence verdict round and its fix units. Use when asked to polish an interface, bring a rendered surface to enterprise grade, judge what actually renders rather than what the source claims, or reconcile design, state-truth, and inventory findings into fix units on captured proof. Run a verdict alone for a narrow request; run the round with its fix units for a polish or production-readiness request.
---

# Polish a rendered surface

## Read

`AGENTS.md` § Authority and loading names the files every unit reads. This skill adds
[capture-harness.md](references/capture-harness.md) before building, eyeballing, or trusting a
portfolio, the authoritative `*/types.ts` for the surface, its components and partials, and the
shipped resolved cascade of every stylesheet the surface loads. Preserve dirty and user-owned work.

## Judge the rendering, not the source

A claim about a rendered surface is proven by capture, never by reading the code that was
supposed to produce it. Source-reading review passes a component that renders nothing.

- Generate the portfolio from the journey suite's capture family wherever a Vitest
  browser project can drive the surface, and from a spawned harness only where none
  can ([capture-harness.md](references/capture-harness.md)).
- The portfolio IS the review input: captures at every viewport and every theme the surface declares, an
  accessibility snapshot, and an interaction log.
- Source is corroboration for a mechanism, never the proof that the surface shows it.
- A claim the portfolio cannot show is unproven, not passed. Say so.
- The same law governs an externally driven surface: a compatibility claim is proven by
  driving it with a representative real client, not by its own tests.

## Select the scope

Choose the smallest scope that satisfies the request:

- **Verdict:** one portfolio, one lane, no fixes.
- **Round:** portfolio → independent verdicts → reconciliation → fix units → recapture → one
  re-verdict on the repaired items → independent gates.

A narrow verdict request does not authorize fixes. A polish request authorizes fixing every
confirmed finding in scope and rebuilding the harness gaps the verdicts expose. A second round
over the same surface needs an instruction from the user.

## Execute the round

1. **Build the portfolio.** Produce the full evidence set with the harness reference, then
   eyeball every artifact yourself before spending a verdict round on it. An unexamined
   portfolio buys harness bugs at verdict prices.
2. **Seed candidates.** Turn your own mid-integration observations into numbered
   confirm-or-refute candidates inside the verdict brief. Observations that stay in your
   head are neither evidence nor findings.
3. **Take independent verdicts** on the SAME portfolio, in the shape
   § "Return the fixed verdict shape" fixes. The
   lanes are subjective design fit; objective state truth; and mechanical inventory of
   copy, classes, icons, and accessibility attributes. This is the surface variant of the
   review in `.agents/orchestration.md` § Size gate, so its rules bind: each lane is a fresh
   subagent with a clean context, blind to the others until reconciliation, run once, and no
   lane is dropped because an engine is dark. A narrow verdict request runs the selected lane once
   and stops.
4. **Reconcile.** Confirmed findings get carriers; refuted findings die on the record with
   the evidence that killed them; conflicts get a dated ruling. Then walk the reconciled
   list once and name the fix-brief item carrying each finding — a finding with no carrier
   is a dropped finding, and it will cost the next round.
5. **Dispatch serialized fix units,** objective lane first because it changes the ground
   truth the subjective lane reads. Each unit records the failing proof before the
   repair — the exact command and its red count — and the same command's green count
   after. Commit each accepted unit before dispatching the next.
6. **Defer each fix unit's review to the re-verdict.** No separate cross-audit runs; a fix that
   adopted the verdict's prescription verbatim closes with the recapture alone.
7. **Recapture,** repairing every harness gap the verdicts exposed. The re-verdict reads the
   recaptured portfolio, never the old one.
8. **Re-verdict the repaired items once.** Point the lanes at the recaptured portfolio and only at
   the items the fix units repaired, plus regressions of an item already in the inventory. A
   fresh preference about an item already converged is recorded for the user, not made this
   round's blocker. An item still open after the re-verdict is reported open; the round ends.
9. **Verify independently.** An independent runner executes the repository-prescribed
   gates; a fixer's own report never establishes green.

## Fix the treatment, not the symptom

- Resolve every visual treatment in the shipped cascade before writing it; a dependency's
  own default rules decide what a bare element renders as.
- Prove a defect with a test that fails for that defect before the repair exists.
- Do not narrow a selector, add a local exception, or restyle one instance to make a
  capture pass while the underlying rule stays wrong.
- When a law of the repository genuinely conflicts with the surface's required anatomy,
  stop and report both horns with evidence. An improvised local exception poisons an
  enforced invariant.

## Return the fixed verdict shape

Free-form verdicts cost one reconciliation pass each. Every verdict returns:

- one line per item, in the brief's numbering:
  - `RENDERED-PROVEN(<capture>)` — the artifact shows it;
  - `REGRESSED(<capture>, <what regressed>)` — the artifact shows it is now worse;
  - `NOT-EVIDENCED(<what the portfolio lacks>)` — the portfolio cannot decide it;
- referrals to another lane, each with the specific evidence and no verdict attached;
- exactly one final line: `CONVERGED` or `ANOTHER ROUND(<item list>)`.

Treat every `NOT-EVIDENCED` line as a harness question first and a product defect second.
Triage it against the capture reference before it becomes a finding.

## Accept the result

Do not accept a source-only verdict, a self-audited fix unit, a round without a terminal
line, or a green claim from the engine that wrote the code. Completion requires:

- every confirmed finding fixed or explicitly ruled out of scope on the record;
- a final portfolio whose captures show the accepted state;
- red-then-green evidence for every defect unit;
- every repaired item converged in the re-verdict against that final portfolio, and every open item named;
- independent gate evidence.

Report what changed, which capture proves each change, the exact test and gate results, and
any residual risk the portfolio genuinely cannot settle.
