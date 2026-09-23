# B-FORMS-CLOSE-FORCED (`bff`) — audit verdict, round 1

Claims: `bff-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra (session
`01a0cd9c-c39e-70d0-8cd6-b262dd57dae2`, `bff-audit-analyst-verdict.md`), `reviewer` on Opus 5.5
(`bff-audit-reviewer-verdict.md`), `checker` on Sonnet (`bff-audit-checker-verdict.md`). Every lane
ran on the one claims file, blind.

## Reconciliation

| Claim | analyst | reviewer | checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED (in-memory expanded compile: identical button blocks; the split-media mutation reaches only the expanded comparison) | CONFIRMED (text-identical expansion) | — | holds |
| 3 | CONFIRMED (the range keeps its thumb shadow) | CONFIRMED | BROKEN on "keep their shadow" for `.form-range:focus` | holds; the checker's fault is the claims file's wording (the range host has no shadow of its own; R3 puts the indicator on the host and keeps the thumb shadow), dropped on record |
| 4 | BROKEN (the density and override readings cover the class swatches only) | CONFIRMED (the claim overstates R2; the scoped form shares the declaration) | CONFIRMED (source) | the claim overstated the proof; the analyst's extension (a scoped native-validity pair in the density case) is cheap and lands in round 2 |
| 5 | CONFIRMED (assertions distinguish the three mutations) | BROKEN (the titles claim "in the system highlight" and no assertion reads colour; referral B on whether emulation preserves an author `Highlight`) | — | BROKEN on the titles; round 2 retitles the five cases without the colour claim and corrects the § Compatibility sentence to the style-and-width reading; the colour under emulation stays unmeasured (a colour reader cannot answer under forced colours, per the mixin proof's comment) |
| 6 | CONFIRMED | CONFIRMED | — | holds |
| 7 | BROKEN (`forced-ring` token) | BROKEN (`forced-ring` token; `outline: 0` token; the § Compatibility overclaim; the three-idea plaintext sentence) | BROKEN (`forced-ring` token) | BROKEN; round 2 lands the lanes' exact texts |
| 8 | CONFIRMED (`npm run check` exit 0) | CONFIRMED (reading parts) | CONFIRMED (reading parts) | holds |

Outside the claims: UNPROMOTED-COMPILE-PROOF (analyst) against the reviewer's "no test owed" —
ruled for the analyst: `.claude/rules/quality.md` § Instruments and the retention procedure make a
probe that settled a claim a test before the prune, and the settled claim (the mixin emits one
forced-colours media block per caller, so a caller's content shares it) is a structural property of
every `forced-ring` caller, not a frozen byte comparison; round 2 lands a Node case in
`tests/setupStyles.test.ts` (granted) counting the forced-colours blocks per selector in the
expanded cascade. MIXIN-COMMENT (analyst) and F2 (reviewer): the reviewer's full comment text lands
in round 2. F1 (the § Validation classes proof paragraph): the reviewer's clause lands in round 2.
Referral C: the width cells for the scoped selectors pin the binding at the compiled-value level
(the analyst's claim 7 reading), so no further proof is owed. Referral E: B-PASSIVE-CLOSE-B carries
the rewrite of the § Compatibility button sentence when it lands (its brief names it). The repeated
forced-reading sequence is not a helper defect (both lanes); B-PASSIVE-CLOSE-B re-evaluates when
its own forced readings land (the reviewer's carrier).

## Round 2

A fix round on `opus` in the same worktree: `b-forms-close-forced-brief-2.md`. Its audit runs
`analyst` on Astra and `reviewer` on Opus (blind) with `checker`.

VERDICT: FAIL 4, 5, 7; outside the claims: UNPROMOTED-COMPILE-PROOF, MIXIN-COMMENT, F1, F2
