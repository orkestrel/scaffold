# J-BINDER audit round 4 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-BINDER unit's round 4 (the fix round on the round-3 findings) in the worktree `veneer-binder` (`unit/binder`, round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 4 uncommitted, claims file `j-binder-audit-claims-4.md`. Lanes that ran, blind, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0d031-74f9-7021-bce6-48d7a05ac8c4`, 29 commands, 425 s; `j-binder-audit-4-objective-verdict.md`, terminal line `FAIL 1, 2, 5; outside the claims: none`), launched after the native lanes because the bench was carrying the contract fix unit; the subjective lane, `reviewer` on Opus 5.5 (`j-binder-audit-4-subjective-verdict.md`, `FAIL none; outside the claims: F1`); the checker on Sonnet (`j-binder-audit-4-checker-verdict.md`, no failed claim once the apply checks were appended to the gate log). No lane the round named is not run. Every citation checked below resolves in the file it names. The Orchestrator's own settling run after the lanes returned: the round-4 mutation sample re-run `j-binder-mutations-4-orchestrator.log.txt` (twelve mutations through the unit's round-4 instrument over `j-binder4-mutations.json`, the shared fixture in the digest), which reproduces every recorded reddening with every source restored byte for byte.

## Per-claim rulings

1. **BROKEN**, the objective lane, on one further interleaving; the subjective lane's traces of every round-3 path held on both. A replacement engine destroyed by a reaction inside its own `toggle` (B's `classList.toggle` adds the token, the reaction destroys B and constructs C, then B's suspended `toggle` resumes) writes `aria-pressed` and dispatches its event onto a host C now owns, because `Button.toggle` checks the controller only before the token write. Ruling: after each reaction-capable write, `Button` re-checks its controller and stops (no further write, no dispatch) when it was destroyed during the write; the same rule binds every engine's write sequence (a rule for `guides/veneer.md`'s § Ownership and restoration, which J-COLLAPSE inherits).
2. **CONFIRMED** by the Orchestrator's re-run named above; the objective lane found no recorded reddening the named proof's assertions could not produce, and the subjective lane checked the distinguishing assertions of three handoff rows.
3. **CONFIRMED**, both lanes; the subjective lane's F1 corrects one sentence of the same remark (below).
4. **CONFIRMED**, both lanes; the class-static registry is the right home (the subjective lane's Unknown 1), and deletion is the right takeover mark (its Unknown 3: reassigning the owner would break a third save and a nested restore).
5. **BROKEN**, the objective lane: `restore()` re-entered on the same snapshot from a reaction (a reaction saves a new target through S and calls `S.restore()`) withdraws the outer invocation's pending entries in the nested `finally`, because `#unpublish` matches the owner snapshot rather than the invocation, so the outer restoration fails its ownership checks and leaves the host half restored. Ruling: each `restore()` invocation owns its published entries through an invocation token (not the snapshot object), and `#unpublish` withdraws by invocation. The subjective lane's Unknown 2 (the overlap precedence): the first-publisher rule is stated on `HostSnapshotInterface.restore` as what the code does, and the precedence question (whether it is right when the nested snapshot saved first) is carried to J-COLLAPSE, the first unit that can put two engine classes' tokens on one host; the subjective lane's widening (every token save records the shared `classed` key, so any two token-writing engines on one host share a target) goes into that brief.

## Findings outside the claims, ruled

- **F1** (the subjective lane): `HostSnapshotInterface.restore`'s remark says every `class` attribute the tokens left empty is removed, while the code removes only one the snapshot recorded as absent (an element that carried `class=""` keeps it). Ruling: the sentence takes the qualifier, and the remark says a token's first save records whether the `class` attribute was present.

## Referrals ruled

- **R1** (the subjective lane; a target already written back stays published until `finally`, so a replacement constructed by a reaction to the last write, after a consumer's own edit, records the pending original rather than the live state): adopted; each target is withdrawn right after its write (and the `classed` entry after the class pass), which also makes every "still to write back" sentence literal.
- **R2** (the subjective lane; the `entry.owner === this` clause in `#take` has no proof): with invocation ownership the clause becomes "owned by this invocation"; ruling: a snapshot saving during its own restoration takes its own pending original like any other (the record then holds the true original for the next restore), and the unit proves it with a consumer-constructed `HostSnapshot` whose reaction saves through the restoring snapshot; the objective lane's claim-5 interleaving is the same proof's second assertion.
- **R3** (the subjective lane; `j-binder-mutations-4.json` beside `j-binder4-mutations.json`): the former is the round-1 series' fourth file; the Orchestrator's round-4 sample reads `j-binder4-mutations.json`, recorded in its log's header.

## Bounds ruled (the subjective lane's)

- "still to write back" wording: made literal by R1.
- The `classed` entry carrying a boolean as `''` or `undefined`, the repeated `{ value, priority }` shape, the `#take` comment, `save`'s description not naming the handoff, and `#unobserve`'s verb: the comment and the `save` description are adopted (the unit says what `#take` does and adds one sentence to `save`); the rest stays.

## Carrier

Claims 1 and 5, F1, R1, and R2 are carried by J-BINDER round 5 (`units/j-binder-brief-5.md`, the same writer resumed on the same uncommitted tree), audited in round 5 by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker` on Sonnet on `j-binder-audit-claims-5.md`; the overlap precedence and the shared `classed` target go to J-COLLAPSE's brief (`plan.md` § Carried findings). No finding is dropped.

VERDICT: FAIL 1, 5; outside the claims: F1
