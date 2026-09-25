# E-ID-MOTION-FADE audit — verdict

The Orchestrator reconciled this round on 2026-09-25. Both lanes ran on `mfade-audit-claims.md`, blind to each other.

- **Objective lane:** `analyst` on GPT-6 Astra, thread `01a0d6e3-c5a1-7d40-aad3-14a19031ac2e`, exit 0
  (`mfade-audit-objective-verdict.md`). `VERDICT: PASS`.
- **Subjective lane:** `reviewer` on Opus 5.5 (`mfade-audit-subjective-verdict.md`).
  `VERDICT: FAIL 2, 4; outside the claims: F1`.
- **No checker ran.** No claim was a verbatim prescription. Round 3's fixes close on a checker read.

## Claims

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1 The rule | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The reader | CONFIRMED on the unit's plant logs | UNRESOLVED: no plant log retained | CONFIRMED. The unit wrote its red-first and plant logs into the Orchestrator's scratchpad, where the objective lane read them. The Orchestrator retained them as `mfade-instruments/logs/mfade-2-{sb1,sb-mut1,sb-mut2}.log.txt`, and each cited line resolves: `sb-mut1` line 169 reads `expected [ 200, 'linear', '1', '1' ] to deeply equal [ 200, 'linear', '1', '0.5' ]`, and `sb-mut2` line 168 reads `expected [ 'opacity', 'opacity' ] to deeply equal [ 'opacity', 'width' ]` |
| 3 The fade proof | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 Failing first, mutations | CONFIRMED on the unit's logs | UNRESOLVED: no red or plant log retained | CONFIRMED on the retained `mfade-2-{red,green,mut-fade,mut-conf,mut-dur}.log.txt`: the red run and the `linear` plant read the easing `AssertionError`, the conformance plant fails `names no departure the compiled cascade no longer carries`, and the `0.15s` plant fails the factor assertion |
| 5 The record | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 Gates | CONFIRMED | CONFIRMED | CONFIRMED |

## Findings outside the claims

- **F1 (subjective), accepted.**
  - The § Fade classes proof paragraph nests the unit's running-transition readings inside an outer comma list, so a
    reader can't tell where each item ends.
  - The sentence "The duration resolves to the release's `0.15s` value, so the `--vn-factor-motion` factor rescales it"
    gives the resolved value as the reason for the rescaling. The factor rescales the duration because
    `--vn-motion-feedback` is `calc(150ms * var(--vn-factor-motion))`.
- **R1 (subjective referral), accepted.** The reader's no-effect throw has no proof, and a `null` effect is reachable,
  because `Animation.effect` is writable.
- **R4 (subjective referral), accepted.** The control's title uses `once` in its temporal sense, which the substitution
  table in `.claude/rules/writing.md` replaces with `after`.
- **R2 and R3 (subjective referrals), dropped on the record.**
  - R2: the gate driver writes every log in one pass after the export-list edit, and the objective lane read each
    `exit=0`.
  - R3: `fade.test.ts` is collected, because the green fade log (`mfade-2-green.log.txt`) names its cases.
- **Process, recorded.** The unit wrote its logs into the Orchestrator's scratchpad. Every live unit is told to keep
  its instruments in its own worktree.

## Carrier

E-ID-MOTION-FADE round 3 (`e-id-motion-fade-brief-3.md`, `builder` on Sonnet). It applies F1 verbatim, adds R1's
proof, and retitles R4's case. It closes on a `checker` read and its gates.

## Ruling

PASS on every claim once the logs are retained. F1, R1, and R4 go to a verbatim round 3.
