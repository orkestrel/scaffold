# Unit u2-presence — report (writer return + acceptance)

Writer: `implementer`, Opus 5 (recorded substitution for dark Sol). Returned 2026-09-01.

## What the writer landed

`PRESENCE_MASK_LIMIT = 31` in `constants.ts`; compile-time position records plus per-call
bitmasks in the object cases of the guard, parser, auditor, and reporter, with the collection
form retained verbatim as the past-width branch; the auditor's `declared` set and the
reporter's `known` set hoisted to plan build behind `readValue` doors matching the parser's
existing hoist. Added pins: `__proto__` as a required key through every door; identical
presence at the width and one past it; identical presence far past the width where a bit
position would alias. Mutation controls: widening the limit to 100 reddens the aliasing case;
an ordinary `{}` positions record reddens the `__proto__` case; both restored to 254 green.
Whole src:core project 1300 passed under the writer's read-only run.

## Deviations triaged

- Guide surface row for the new constant (off-limits to the writer): exact returned patch
  applied serially by the Orchestrator, with the serial comma the writing rules require;
  `test:guides` 65 passed after application.
- Brief defect (Orchestrator's): the brief named `u2-patch.mjs`, `u2b-patch.mjs`, and
  `u2-ab.out` at the campaign folder before they were copied there. Repaired; the writer had
  correctly located the scratchpad originals and read them.

## Orchestrator acceptance evidence

- Parity: U1 tree dist vs U2 tree dist — IDENTICAL over 1170 comparisons.
- Marginal A/B (49 paired rounds) vs the U1 tree: medium `is` 0.909; medium `audit` 0.905;
  deep `is` 0.924; deep `audit` 0.895; medium `parse` 0.878; medium `explain` 0.907. Both
  declared bars (6% medium `is`, 4% deep `audit`) clear; parse and explain exceed the probe
  because the implementation covers the parser and reporter blocks the dist probe did not.

## Audit-round routing

The implementation departed from the probe prescription in named ways (the width at 31, the
`maskable` boolean over a sentinel, `readValue`-doored hoists, per-family integration), so per
`.claude/rules/quality.md` the unit gets the cross-engine round — with Sol dark, a
clean-context Opus lane on the committed diff, verdict recorded in
`u2-presence-audit-verdict.md`.
