# CL11 audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. **Astra wrote this fix round, so you hold the OBJECTIVE
lane** (correctness, rule compliance, test sufficiency, scope honesty) and the Astra analyst holds the
subjective lane. The lanes swap back from round 1, where Opus wrote the work and Astra held this lane.

Read the work as work you did not write. Perform the assignment directly and spawn nothing. You edit
nothing and run nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-audit-2-claims.md`
with CONFIRMED, REFUTED, or UNPROVEN and the deciding evidence, add any extra finding that is an
implementation defect (numbered after the last claim, with a site and a one-line failure scenario,
distinguishing one that forces another round from one that does not), and end with one terminal line:
`Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Standing instructions about your own evidence

**Cite every site by its symbol** — the case title, the export name, the state name. Give a line
number only as "currently around N".

**Before confirming any claim about a proof, name the mutation that would make that proof fail**, and
say whether the proof's assertions distinguish that mutation from the passing case. Where you cannot
name such a mutation, the claim is UNPROVEN rather than CONFIRMED.

**Read an installed contract out of its own bytes.** This round turns on what the installed frame
reader does and does not do; round 1 recorded a gap as irreducible on a mis-read of exactly that
contract.

## What is closed

**Round 1 accepted the shipped behaviour**, and an independent verifier ran the whole chain green on
both engines. `cl11-audit-verdict.md` and `units/cl11-gate.log.txt` record it. Do not re-litigate a
round-1 claim. Rule on what this round changed and on whether closing each finding left the accepted
behaviour intact.

## Evidence

- The cumulative diff over the CL10 landing `0e0b055`:
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-diff-2.patch`
- **Round 1's diff, which isolates what the fix round changed**:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl11-diff.patch.txt`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-status-2.txt`

Both renderings are supplied on purpose. A previous round's checker correctly refused a claim because
only the cumulative diff existed, and it could not tell round 1's work from the fix round's.

Read those and these live Veneer files:

- `tests/setup.ts` and `tests/setup.test.ts` — the state table, its doc block, the capture controls,
  and the uniqueness assertions
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` — the frame sampler, the restore-refusal
  case, and the permanent control cases
- `tests/app/browser/integration.test.ts` — the capture-only case, the frame guard, and the cascade
  journey's paint assertions
- `node_modules/@orkestrel/test/dist/src/browser/index.js` and its declarations — the portfolio's
  place method, its accumulated paths, and the installed frame reader

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
effective brief `units/cl11-brief-2.md` over `units/cl11-brief.md`, the measurements
`units/cl11-fix-terrain.md`, the report `units/cl11-report-2.md`, round 1's report
`units/cl11-report.md` — **which carries two statements this round withdrew** — and round 1's verdict.

The law lives in the scaffold checkout, under `.claude/rules/`, with `tests.md`, `names.md`, and
`architecture.md` in particular.

## Push hardest on these

- **Whether the sampler proves what it claims.** It decodes a written PNG and compares every pixel
  against the first. Rule on what a uniform-variation test catches and what it misses, and on whether
  the unit's own statement of those limits is honest and complete.
- **Whether the control bytes are real.** The permanent case carries base64 of a retained blank probe
  frame and a retained painted one. Verify they are the real frames and that carrying them in the
  module rather than as fixture files is right.
- **Whether the leak proof isolates the leak.** The unit planted a wrong expectation and reports the
  following case failing before the fix and passing after. Rule on whether that distinguishes a
  cleanup fix from a coincidence.
- **Whether the doc-block corrections state what the code does.** Round 1's state table carried a false
  byte-identity measurement and a false copy-fidelity claim. Rule on the corrected text against the
  code, not against its wording.

## Scope of findings

The user has ruled that audits cover implementation only: report no wording, comment, doc-block, or
guide-prose finding. **The one exception this round:** a doc block that states a measurement or a
property of the proof is in scope as a contract, judged on its facts being true of the code, because
correcting two such statements is one of this round's obligations.
