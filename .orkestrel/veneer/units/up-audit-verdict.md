# Audit round 1 — UTIL-PAINT (`up`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-PAINT unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-up` from `2a3f223`),
claims file `up-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`up-audit-objective-verdict.md`, thread
`01a0d12e-a5fc-70a0-8844-0cf93d59e64a`, journal `tmp/codex/up-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`up-audit-subjective-verdict.md`),
and the checker on Sonnet (`up-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through
workflow `wf_2c14f81b-b5e`. The Orchestrator's apply checks ran on a fresh `git archive 2a3f223`
extract in its scratchpad: `git apply --check up-shared.patch` exit 0, and `up-unscoped-profiles.patch`
over the applied shared patch exit 0.

## Per-claim rulings

1. **CONFIRMED.** Every lane held the scope clauses; the subjective lane and the checker left only the
   apply checks unresolved, which the Orchestrator's runs settle.
2. **CONFIRMED** by both lanes.
3. **CONFIRMED for discrimination; the provenance carried.** Every named mutation's assertions
   distinguish it. The subjective lane's referral stands: the mutation logs cite case lines that differ
   from the shipped proofs, so the proofs changed after the runs, and the cases that grew include those
   the tertiary, unguarded, and responsive mutations target. Carrier: P-e.
4. **BROKEN (both lanes).** `up-unscoped-profiles.patch` compares slices of the order: an extra layer
   written ahead of the order line (`@layer vendor;` in `tests/setup.css`, or an `intruder` layer in
   the preflight profile's statement) passes the patched case, where the base case read it red; and the
   patched comment claims the order line is declared unchanged, which no assertion reads. Both lanes
   name the same fix. Carrier: P-a.
5. **CONFIRMED** by both lanes.
6. **CONFIRMED** by every lane that ruled it.
7. **BROKEN (both lanes).** The guide says each class is read at every breakpoint boundary and each
   radius step under the radius factor, where the boundary cases mount selected compositions and the
   factor case reads the bare class and its step-2 counterpart; and it leaves bare code values ("sets
   that local to `1`", "a factor of `2` doubles"). Carrier: P-b.
8. **BROKEN.** The subjective lane: the table comments leave the `rgba()` and `var()` tokens without a
   noun. Carrier: P-b. The report's cross-references, temporal words, "via", bare tokens, and tallies are
   the round's record, not product; recorded here, and the round-2 report follows the writing rule. No
   carrier. The checker's claim-8 reading rests on the sites it read; the lanes' cited sites resolve.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** The Background and Border specimen lists build the same captioned
  swatch grid character for character. The consolidation step routes repeated behaviour through one
  implementation, and a pure markup builder is a helper, so it belongs in `app/browser/helpers.ts`,
  exported through the barrel and proved in `tests/app/browser/helpers.test.ts`. Carrier: P-c.
- **F2 (subjective lane): BROKEN.** The `BACKGROUND_SPECIMENS` remark says each caption names the class
  the swatch shows; it names every class the swatch carries. Carrier: P-b.
- **The white swatches (subjective lane's referral): ruled in.** The unit's own rule gives a border to a
  swatch that matches the page, and the `bg-white` swatch on the light canvas and the `border-white`
  swatch without a fill break it. Carrier: P-d. The Orchestrator reads the `background-roles` and
  `border-roles` frames in both modes at the landing's capture run.
- **The `utility-variable` infix guard (subjective lane's referral): dropped with reason.** Family ruling
  2 fixes the mixin without an infix, and a css-var entry guarded to the empty infix is the gate the
  `utility` mixin applies to a non-responsive entry; no rule chooses between that and skipping the walk.
- **The cascade count's missing negative control (subjective lane's referral).** Carried in P-e.
- **REPORT-COUNTS (objective lane).** Recorded under claim 8. No carrier.

## Carrier

Round 2 on the same `opus` subagent carries P-a to P-e (`b-utilities-up-brief-2.md`). Its audit runs
the objective lane on Astra and the checker; the subjective lane is not run for round 2, because P-a,
P-b, and P-d adopt the lanes' wording or rule, the checker verifies the letters, and P-c and P-e close
on their retained runs.

VERDICT: FAIL 4, 7, 8; outside the claims: F1, F2
