# Unit u3-ledger — report (writer return + acceptance)

Writer: `implementer`, Opus 5 (recorded substitution for dark Sol). Returned 2026-09-01.

## What the writer landed

Single-slot call ledger in `#trackGuard` and `#trackFaults`: an inline slot (value + kept
answer) serves the one-object-per-node call; a `WeakMap` is allocated only on the second
distinct object in one scope, carrying the slot entry. Departures from the probe form, argued
and adopted: occupancy derived from `slot === undefined` (no second flag to drift); the scope
refresh clears slot and map together (removes the only stale-kept read path); no per-fill
object literal. Ledger comments rewritten where the map-per-call sentence went false.

Tests: the emptied `calledFew`/`calledMany` control re-derived from promotion-forcing values
(array-nested members, two distinct records per member) with failing-first evidence (1 failed
at line 508 between source edit and amendment; 24 passed after); added
`holds no report about an object across two calls of one retained auditor` — closing a
coverage gap that PREDATES the unit (no test had one diagnostic ledger in front of two calls;
proved red with the faults slot refresh removed, `expected +0 to be 1`).

## Orchestrator acceptance evidence (u3-acceptance.out)

Parity IDENTICAL over 1170. Marginal A/B vs the U2 tree: medium `is` 0.901, deep `is` 0.888,
deep `audit` 0.952 — the 5% bar clears. Bounds: shared 30-level chain 0.3-1.0 ms per family;
promotion-forcing alternating graph within the 2x gate.

## Finding carried to the campaign record (outside unit scope)

The promoted ledger's reuse is unproven by the suite: deleting the carry-in or the recall
block keeps all 1301 src:core tests green — only a work-counting assertion can catch it (the
writer's probe measures promoted 2 with carry-in, 3 without, 5 with no ledger). Carrier: the
capability that owns the published per-node read bound; recorded for the ROADMAP at closure.

## Instrument

The writer's `tmp/probe/ledger.test.ts` retained beside this report as `u3-ledger-probe.test.ts`
and swept from the subject tree.
