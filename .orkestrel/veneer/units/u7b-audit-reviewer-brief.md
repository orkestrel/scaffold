# U7b audit — objective lane brief (lane swap)

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit under audit, so the lanes are
swapped: you hold the OBJECTIVE lane (correctness: `Button`'s derivation of `pressed` from the
`active` class, the write order class then `aria-pressed` then the event, the event's type and
flags, restoration on `destroy()`, the ownership refusal, `Delegate`'s single delegated listener,
its `closest` resolution and `preventDefault`, its disabled refusal, its per-host engine reuse
and release, the barrel registering no listener on import, the proofs' sufficiency and their
controls), and Astra holds the subjective lane. Perform the assignment directly and spawn
nothing. You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7b-audit-claims.md` — that file alone fixes
the claim numbers — with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). The Orchestrator rendered the evidence a read-only lane needs: the
diff over the Veneer checkout's `91e5906` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7b-diff.patch.txt` (tracked and untracked
files) and the status at `tmp/audit/u7b-status.txt`; read those and the live Veneer tree
(`C:/Users/mikes/WebstormProjects/veneer`), never the report alone. Cross-check the engine's
behaviour against the oracle fixture `tests/fixtures/oracle/button.json` (the class mutation
precedes the `aria-pressed` mutation; the data-api click is prevented; a disabled anchor
refuses) and the installed Test helpers' declarations
(`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`). The user has ruled that audits
cover implementation only: report no wording, comment, doc-block, or guide-prose finding. Add
extra findings only for an implementation defect, numbered after the last claim, each with a
site and a one-line failure scenario.

## Context

The retained records sit under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`units/u7b-brief-2.md` (the effective brief, carrying `units/u7b-brief.md`: the `AppError` contract in `src/core/errors.ts`), `units/u7b-report.md` and `units/u7b-report-2.md` (the reports), `u7-design-verdict.md`
(questions 1 to 4 and § The user's correction: no `auto` entry, no adapter, no Bootstrap method
spellings; `Delegate` behind the existing `./browser` barrel), `units/u7-design-planner-report.md`
§§ 1 to 4, `units/u7-design-analyst-report.md`. Law: scaffold's `AGENTS.md`,
`.claude/rules/architecture.md`, `patterns.md` (§ Emitters), `browser.md`, `tests.md`,
`names.md`, `typescript.md`. The user's rulings: surfaces are core, browser, server, styles only;
a lone class sits flat at the environment root. Do not read the Veneer `tmp/` directory beyond
the report.

## Output

A table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
