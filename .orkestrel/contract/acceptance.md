# Campaign acceptance — contract performance (2026-09-01)

Accepted by the Orchestrator at contract 5142c7e (branch
`claude/method-memoization-contracts-yus26p`), independent verifier GATES: GREEN
(format:check, lint:check, check, build, test — every exit 0 on a clean tree).

## Exit criterion walk (every capability closed)

- Array snapshot cost — IMPLEMENTED (U1, e5b81ae): order-aware sort-skip; probe 0.917-0.86,
  mutation-probe closure, descending-view pin.
- Presence machinery — IMPLEMENTED (U2, 99283f9) + REPAIRED (u2fix, 50ceb45): compile-time
  bitmask in four families with `PRESENCE_MASK_LIMIT` and the retained collection branch;
  audit round FAIL on hoist containment repaired with red/green pre-load-sabotage proof; all
  other audit claims CONFIRMED (6240-case differential with discriminating controls).
- Tracking-ledger allocation — IMPLEMENTED (U3, 768c048): single-slot promotion; control
  re-derived red-first; pathological bounds hold; retained-auditor gap closed.
- Clean-leaf diagnostic work — IMPLEMENTED (U4, f62d830): refinement gate; helper stays single
  source.
- Union diagnostic fan-out — IMPLEMENTED (U5, 5142c7e): anyOf first-clean acceptance with its
  ruling, guide sentences, and pins; closed a shipped four-door disagreement (audit threw on a
  hostile prototype behind a clean variant while is answered true).
- Refined-leaf capture — EXCLUDED at its fired gate (u6-ruling.md): design law, not magnitude.
- attempt containment — REFUSED at its declared bar (u7-probe.out): 0.992 against 15%; attempt
  stays; the doctrine cost was never paid.
- Lazy readValue diagnostics — EXCLUDED on the reader doctrine; shipped refusal recorded (P5).
- Internal freezes — EXCLUDED (both lanes); 47 ns measured and unclaimed.
- De-Reflect — EXCLUDED on M-D's measured tie.
- Type level — EXCLUDED on the extended consumer fixture (t6 createContract 562 instantiations
  / 0.10 s; t7 optional-key 824 / 0.09 s; linear, controls discriminating).
- Answer parity — HELD at every step: the P0 differential (identity IDENTICAL, seeded control
  64 differences) read IDENTICAL over 1170 comparisons at every unit acceptance.
- Baselines — RESTATED on the accepted tree (ops-final.out, heap-final.out), controls
  discriminating, same coverage statement as the 2026-09-01 baseline.
- Guide parity — union sentences restated with U5; `PRESENCE_MASK_LIMIT` surface row; the
  `createStringFaults` refined-declaration precision; no nanosecond figures in the guide; the
  177x headroom stays a bound in this record only.
- Public surface — one addition: the `PRESENCE_MASK_LIMIT` constant. No signature moved.

## Final measurements (final-ab.out; paired 49-round A/B, published 0.0.14 vs accepted tree)

| family | B/A median |
| --- | --- |
| medium is | 0.728 |
| medium parse | 0.816 |
| medium audit | 0.751 |
| medium explain | 0.744 |
| deep is | 0.767 |
| deep audit | 0.673 |
| 48-string list is | 0.895 |
| 48-string list audit | 0.935 |

Restated absolute hot path (ops-final.out): medium is 2057 ns/op, audit 4214, explain 3781;
deep is 6729, audit 15181, explain 9010; generate within noise of its baseline (untouched).

## The traded cost, stated plainly (heap-final.out vs baseline-perf-report.md)

Compile-path retained heap rose with the compile-time structures the strategies moved work
into: medium full contract 11721 -> 13734 B/call, deep 48476 -> 59322, guard-only medium
4915 -> 5183; the cold compiler shell is unchanged at 648 B. This is the designed trade —
call-tier work moved to the compile tier — and a consumer compiling many contracts pays it
once per contract while every call collects the reduction. CONTROL_ARRAY discriminated in
both readings.

## Routing ledger (substitutions recorded)

Grok live all campaign (probe round-tripped; R1, R2, S1 lanes journaled). Codex/Sol excluded
by the user's instruction: Opus 5 ran both design lanes, every implementation unit, and the
u2-presence audit lane, each as a separate clean-context subagent; `verifier` native. Every
deciding timing run was the Orchestrator's own host process. Brief defects recorded where
found (U1 test-shape, U2 retention paths, the u2fix probe's first door misread —
Orchestrator's own, corrected before ruling).

## Prune status

The campaign folder awaits the owner's explicit go-ahead per
`.agents/skills/orkestrel-debrief/references/retention.md`; nothing is deleted at this
acceptance.
