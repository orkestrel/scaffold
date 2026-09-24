# J-SNAPSHOT audit round 2 — the Orchestrator's reconciled verdict (2026-09-24)

Subject: the J-SNAPSHOT round-2 tree in `tmp/worktrees/snapshot` (base `afae42c`), per `j-snapshot-brief-2.md`, `j-snapshot-report-2.md`, and `j-snapshot-audit-claims-2.md`.

## Lanes

| Lane | Role and engine | Retained verdict | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst`, GPT-6 Astra (`codex exec` read-only; thread `01a0d3fa-6795-70f2-b9d6-4d3814f6c9fa`, 48 commands, 486 s) | `j-snapshot-audit-2-objective-verdict.md` | `VERDICT: FAIL 1, 4, 5; outside the claims: none` |
| Subjective | `reviewer`, Opus 5.5 (native, read-only; the writer's engine) | `j-snapshot-audit-2-subjective-verdict.md` | `VERDICT: FAIL 4, 5; outside the claims: F1` |
| Checker | `checker`, Sonnet (native, read-only) | `j-snapshot-audit-2-checker-verdict.md` | `VERDICT: PASS` |

Citations spot-checked by line in `HostSnapshot.ts` and `HostSnapshot.test.ts`: they resolve. Neither bench lane executed anything; the objective lane's claim-1 counterexample is a derivation with an exact sequence, carried as a red-first obligation.

## Per-claim ruling

| Claim | Ruling | Carrier |
| --- | --- | --- |
| 1 Every departure removes against the shared reading | **FAIL** on one interleaving: a re-entrant `save` inside the interrupted restoration's own class write (a reaction that saves a token this snapshot is restoring, then toggles it off) moves the snapshot's presence holding from `#leaving` back into `#joined`, so the restoration's cleanup loop and its `finally` find no class departure and `class=""` stays present and empty until a later restoration; no write throws. The subjective lane's attacks (an early departure before a later holder's token restore, a record read present, a consumer token between saves, a nested restore during the removal loop) held. The Button/Collapse partial-restoration case binds as adopted. | Round 3 (S1'') |
| 2 The Dropdown reproduction's assertion binds | CONFIRMED by both lanes. R2 (subjective): the reproduction drives `hide()` where the `#### Dropdown` sentence describes a `destroy` inside destruction's own restoration; round 3 confirms `Dropdown.test.ts` covers that path or adds the variant. | Round 3 (S2'') |
| 3 The fold and the type argument | CONFIRMED by both lanes. R1 (subjective, the repeated inline private shapes): ruled a bound, no carrier — a private implementation shape stays inline, and `types.ts` is the home of a reusable public type only. | — |
| 4 The sentences | **FAIL.** The objective lane: the no-empty-partial-restoration promise (`types.ts` remarks, class remarks, § Ownership and restoration) is contradicted by claim 1's interleaving, so the mechanism is repaired and the sentence stands. The subjective lane: 4a `#### Tab` says "no two engines share the recording of one target" where `Modal.#opened`, `ScrollLock`, and `Isolation` share recordings across engines — scope the clause to tabs or end the sentence before it; 4b the shared-record sentence (types remarks, § Ownership) states no lifetime — add "while no snapshot holds the record, and forgotten after the last snapshot holding it restores, so a later save reads the element again". | Round 3 (S3'') |
| 5 Instrument, gates, scope | UNRESOLVED on the Orchestrator's replay only; settled at the landing over round 3's instrument. | The landing replay |

## Outside the claims

- **F1 (subjective).** Three fixture tag names (`vn-probe-snapshot-class-presence-stamp`, `-style-presence-stamp`, `-classed`) name the removed mechanism; rename for what each case builds. Round 3.
- Bounds (subjective, wording): the class remarks' "that recorded the attribute absent" versus the contract's "whose record reads the attribute absent"; the 70-word removal sentence; "presence record" in the Modal paragraph without an introduction; the Carousel restatement; the garbled `#join` comment; `written` versus its comment; the array spelling; the Dropdown antecedent. Folded into round 3 as wording where the sentence is touched.

## Deviations

- The round-2 lane briefs still carried the component template's delegate-route focus, subject files, and gate greps; the reviewer ruled on neither (recorded twice now). No further snapshot lane brief is generated: round 3 adopts the objective lane's prescription and closes with the instrument probe under `.claude/rules/quality.md` § Rounds and verdicts ("a fix that adopts the auditor's prescription verbatim may close with a mutation probe in place of a fresh audit round"), and the Orchestrator's replay at the landing settles claim 5.

VERDICT: FAIL 1, 4; outside the claims: F1; round 3 under `j-snapshot-brief-3.md` closes with the instrument probe and the landing replay
