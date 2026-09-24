# J-MODAL audit — the Orchestrator's reconciled verdict (round 3, 2026-09-24)

Subject: the J-MODAL unit's round 3 in `veneer/tmp/worktrees/modal`, claims `j-modal-audit-claims-3.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-modal-audit-3-objective-verdict.md`, thread `01a0d24f-610c-7ff1-adff-f7b6bd8c805a`, journal `scaffold/tmp/codex/j-modal-audit-3.jsonl`, 71 commands, 860 s) and `checker` on Sonnet (`j-modal-audit-3-checker-verdict.md`, `PASS`). The subjective lane was not run for this round: the round's items are one mechanism correction, three sentences with one contract, one report correction, and the instrument, the objective lane's subject, with no API-shape change beyond `ScrollLockOptions.signal` in the shape `IsolationOptions.signal` already has; the deviation is recorded here. Opus 5.5 wrote the unit and its rounds; the objective lane is the engine that did not.

Orchestrator evidence: none this round beyond the gate run `j-modal-gates-3.log.txt`; the replay runs on the landing round's instrument before the fast-forward (claim 4).

## Rulings per claim

1. **The lock under the modal's lifetime — BROKEN on one door.** Every other lifetime mechanism withstood the lane's attacks (the pre-aborted return, the abort release, the padding and margin reads, the construction door, repeated destruction). The writer omitted the read after the body's overflow write on the claim that a body is never a custom element; a body can be a customized built-in element (`extends: 'body'`) observing `style`, and `setProperty` runs its reaction before returning, so a reaction that destroys the modal at the overflow write lets the construction resume, save and write the body's padding after destruction returned, and leave that padding in an orphaned snapshot after the record is gone. Ruling: read the lock's controller immediately after the overflow write, before the no-window return and before the compensation; a customized-body regression asserting no write after destruction and no residual padding; a row dropping that read. Carried as item A of `j-modal-brief-4.md` (the landing round), whose diff receives an objective lane before the fast-forward. Source-derived; the red-first case is the reproduction. Two `JOINED` bindings the lane disputes ("the lock ignores its signal" against its named case, and the later-abort branch of the aborted-signal case) are settled in the landing instrument by targeted rows naming those cases alone, so each binding is read on its own cause.
2. **Sentences and the contract — BROKEN on one paragraph and one proof.** The normalization paragraph still overstates: Bootstrap runs `JSON.parse(decodeURIComponent(value))` and returns the original string when either throws (the lane executed the installed normalizer: `[]` parses to an array, `["%"]` stays a string because the URI decoding throws, the JSON-encoded empty string `""` parses to an empty string that passes the string check and disables the backdrop and its dismissal, `0` and `1` parse to numbers). Ruling: describe the URI decoding, the JSON parse, and the fallback to the original string, and say that ordinary dismissal applies to a truthy non-`static` string, keeping the raw-empty, `null`, numeric, and `[]` examples. Item B. The bounce and return-contract clauses hold; the completed-event proof lacks a targeted row: replacing the final lifetime-only return with `#holds(true)` after `shown` is the mutation its assertion distinguishes, and no row records it. Item C.
3. **The attribution correction — CONFIRMED.**
4. **The instrument — CONFIRMED except the replay clause and the two disputed bindings**, both carried as claim 1 states.
5. **Scope, gates, and the added lines — CONFIRMED**; the two guide edits the writer flagged are in scope (the mechanism they describe changed).

## Findings outside the claims

None.

## Carried to the landing round (`j-modal-brief-4.md`, after Carousel lands)

- Item A: the overflow-write read with its customized-body proof and row; item B: the normalization paragraph; item C: the completed-event targeted row; item D: the two targeted rows for the disputed bindings.
- The merge of Veneer `main` at the modal's landing, the fold of the modal routes into the landed delegate (`#closest`, `#construct`, one `#conflicts` with the modal host, E16's `isDisabled` for the dismiss trigger), and the Orchestrator's replay and objective lane before the fast-forward.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: FAIL 1, 2, 4 — carried to the landing round through `j-modal-brief-4.md`, whose diff receives an objective lane before the fast-forward
