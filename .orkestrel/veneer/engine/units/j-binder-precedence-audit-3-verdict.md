# J-BINDER-PRECEDENCE audit round 3 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-BINDER-PRECEDENCE unit's rounds 1 to 4 in the worktree `veneer-precedence` (`unit/precedence` from Veneer `main` `1395361`), uncommitted, claims file `j-binder-precedence-audit-claims-3.md`. The lanes swapped because Astra wrote rounds 1 and 3: the objective lane, `reviewer` on Opus 5.5 (`j-binder-precedence-audit-3-objective-verdict.md`, terminal line `FAIL 1, 6; outside the claims: F1`); the subjective lane, `analyst` on GPT-6 Astra (thread `01a0d0e3-78ef-7c72-b5ad-74d6cd05c1a4`, 35 commands, 254 s; `j-binder-precedence-audit-3-subjective-verdict.md`, `FAIL 6; outside the claims: none`); the checker on Sonnet (`j-binder-precedence-audit-3-checker-verdict.md`, `FAIL none`). No lane the round named is not run. Every citation checked below resolves in the file it names. The Orchestrator's own settling runs: the gate run `j-binder-precedence-gates-3.log.txt` (every scoped gate green, 151 of 151 on Chromium 153.0.8010.12, parity 19 of 19, the criterion-5 greps as the brief fixes with the bounded sentence at four sites, the tree-wide check green) and the mutation replay `j-binder-precedence-mutations-3-orchestrator.log.txt` (the Orchestrator's instrument over the styled take branch, the two taken presence stamps, the withdrawal after a write, and the `readTag` guard: each reddens its named case, the styled take branch and the withdrawal also a second case each, every source restored byte for byte).

## Per-claim rulings

1. **BROKEN** on one path, the objective lane: every clause of both sentences holds under interleavings A and B, the inherited stamp, and every path where no write throws, but where an inner restoration with an earlier recording replaces a pending entry and then throws, its `finally` withdraws the entry and the outer restoration skips it, so no restoration writes the target back and "the tokens and properties themselves are always restored" is false on that path (reachable only through the public `HostSnapshot` with a token `classList.toggle` rejects, because the engines validate tokens). The subjective lane confirmed the sentences as consumer-facing prose. Ruling: the objective lane's prose fix ("restored unless a write throws", and the throwing restoration's withdrawn earliest recording stated at the four sites) with the trace pinned as an executed case; the code alternative (`save` refusing a token the platform rejects) is not taken this round, because it changes the existing throw case and the engines already validate. Carried as brief 5's S1.
2. **CONFIRMED**, both lanes: the three pinned cases match the round-1 interleavings and end where the traces end, and their mutations redden them (the objective lane noting that each mutation also reaches an existing case, which does not weaken the binding).
3. **CONFIRMED**, both lanes and the Orchestrator's replay: the two surviving round-1 mutations now redden the style handoff and the presence-stamp cases.
4. **CONFIRMED** on the guard, both lanes: the proxy attack is closed and the probe's `23` is the red reading; the `@returns` sentence's list is incomplete for a cross-realm element (F1).
5. **CONFIRMED**, both lanes and the checker.
6. **CONFIRMED** by the Orchestrator's replay named in the head; the checker's referral on the replay file it read (the round-1 replay under its own name) is answered by the round-3 file existing now.

## Findings outside the claims, ruled

- **F1** (the objective lane): `readTag`'s `@returns` lists the cases that read `undefined` and misses the cross-realm element, which fails this realm's `instanceof Element`. Ruling: the lane's sentence ("fails this realm's `instanceof Element` check") and an iframe case. Carried as S2.

## Referrals and bounds ruled

- The objective lane's referral on the claims file's "a prose finding is a bound" sentence against the brief's admission of a false sentence: a false behaviour sentence is a finding under `documentation.md`, and both lanes treated it so; the claims file's sentence names wording preferences, which stay bounds.
- The bounds (the "because" clause under a reused public snapshot; "judges once" as at most once; the unpinned own-write window and interleaving A on `styled`; the Chromium version not printed in the gate log) stay as bounds; the own-write window is a candidate case for J-SNAPSHOT-PRESENCE.

## Carrier and the round-5 audit

Claim 1's path and F1 are carried by J-BINDER-PRECEDENCE round 5 (`j-binder-precedence-brief-5.md`, S1 and S2, `sol` on Astra in the same worktree): two sentences with the objective lane's exact wording and two executed cases. Its audit is the checker on Sonnet over the exact sentences and the cases present, plus the Orchestrator's gates and replay; the objective and subjective lanes are not run for that round, for this reason: the edits are prose with the lane's exact wording and two cases whose traces the lane wrote, no mechanism changes, and the round-3 lanes ruled every mechanism. The unit then lands (`land-precedence.sh`), the verifier runs the chain, the push follows, and the collapse's fix round merges `main`.

VERDICT: FAIL 1; outside the claims: F1
