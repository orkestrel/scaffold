# Audit verdict — F5e SETUP-CONVENTION in `@orkestrel/veneer` (working tree over `a162c91`, 2026-09-22)

Claims: `f5e-audit-claims.md`. Evidence: `units/f5e-audit-evidence.md`, the diff
`units/f5e.diff.txt`, the status `units/f5e-status.txt`, the unit's report `units/f5e-report.md`,
and the Orchestrator's gate log `units/f5e-gates.log.txt` (green in every project). Lanes, blind,
on that one claims file: `checker` on Sonnet (`units/f5e-audit-checker-report.md`), `reviewer` on
Opus through the `opus` alias (`units/f5e-audit-reviewer-report.md`), and `analyst` on GPT-6 Astra
(`units/f5e-audit-analyst-report.md`, thread in that file's header). Opus wrote the unit, so the
objective lane on Astra is the auditor that did not write it. The Orchestrator's serial patch of
the unit's returned TSDoc diff (the unit's one deviation) is disclosed in the evidence file and is
the integration step § Execution loop permits; the landing fixes below are the Orchestrator's own
part, briefed in `units/f5e-brief-2.md` and gated in `units/f5e-landing-gates.log.txt` and the
full chain `units/f5e-gates-2.log.txt`.

## Rulings per claim

| Claim | Checker | Reviewer | Analyst | Ruling and carrier |
| --- | --- | --- | --- | --- |
| 1 the fixed set | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 exports moved once | referred | CONFIRMED | CONFIRMED | Held; the analyst's declaration comparison ran its added, removed, and changed-body controls. |
| 3 exact inventories | referred | CONFIRMED | CONFIRMED | Held; the reviewer's named blind spot (type-only exports are not runtime keys) is the fleet's inventory shape, not this unit's. |
| 4 no retired importer | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 5 listener fixture keeps its claim | referred | CONFIRMED | CONFIRMED | Held; the reviewer's placement question is ruled at the landing: the fixture sits beside its proof's mirror as `tests/src/browser/fixtures/entryListener.ts`, the way `tests/src/styles/fixtures/mixins.scss` does. |
| 6 placement law | referred | CONFIRMED | CONFIRMED | Held. |
| 7 guide true and in parity | UNRESOLVED (gate) | CONFIRMED (with F-1, F-2) | CONFIRMED | Held on the gate log; the reviewer's F-1 and F-2 are fixed at the landing. |
| 8 gate chain green | UNRESOLVED (log absent) | UNRESOLVED (log absent) | CONFIRMED | Held: the log completed after the two native lanes read the directory; every gate exits 0. |
| 9 scope honest | BROKEN (literal) | CONFIRMED (correction recorded) | BROKEN (wording) | Held under the contract: the `tests/setupBrowser.ts` change is the unit's returned patch applied at integration, disclosed; the § Deferred selectors sentence names a setup module, which the brief's guide scope covers. The effective scope record is this verdict. |
| 10 prose holds | CONFIRMED | CONFIRMED | CONFIRMED | Held; the report's tally stays as the verbatim record. |

## Findings outside the claims

- Reviewer F-1 — the guide's setup-module paragraph read as a false complete host split.
  Substantiated; rewritten at the landing to scope the styles proofs' modules and name the shared
  and browser modules once.
- Reviewer F-2 — the styles § Files table carried a fixture row outside the styles axis and a
  server row with no styles reason. Substantiated; the fixture row is gone with the fixture's move,
  and the server row states why the styles proofs reach it.
- Reviewer nit — "written on" beside "stands on" in the module header. Fixed at the landing.

## Attacked and held

The merged module's section order and header; the single `describe('styles setup')`; the
inventory case title; the fixture's name; the `mandated` parameter; the Node imports staying in
the server module.

## Deviations

The two native lanes read the evidence before the gate log landed and ruled claim 8 UNRESOLVED;
the analyst read it after. The lanes ran in parallel on the native side and one at a time on the
bench; each stayed blind.

VERDICT: FAIL 9; outside the claims: F-1, F-2 — claim 9 held under the contract, F-1 and F-2 closed at the landing
