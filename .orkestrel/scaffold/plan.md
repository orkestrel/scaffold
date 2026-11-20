# Promote the wave tools into `orkestrel-publish` (ROADMAP 69)

## Goal

The next fleet wave runs its layer preparation, release commits, and fleet sweep through proven `orkestrel-publish` scripts, with no throwaway driver under `tmp/`.

**Exit criterion:** each unit U1 to U7 is accepted, the skill's instruction lines match what shipped, ROADMAP 69 is narrowed to the census, and `verifier`'s tree-wide gates pass.

## Repository

`@orkestrel/scaffold`, `https://github.com/orkestrel/scaffold`.

## Governing skills

- `orkestrel-dispatch`: each unit's brief, launch, and acceptance.
- `orkestrel-falsify`: the review of each medium unit.
- `orkestrel-publish`: the scripts and references this campaign changes.

## Rulings

- 2026-11-20, the Orchestrator, on a read-only design consultation:
  - Extend `steps.ts`, `window.ts`, `pins.ts`, and `wave.ts`, and add `release.ts` with `--prepare` and `--commit` modes. Promote no batch loop and no push.
  - Make `pull` a visit step.
  - Give `--sweep` and `--plan --root` a repeatable `--checkout NAME=DIR` override.
  - Read a same-layer development edge as a held range, never as an extra round.
- 2026-11-20, the Orchestrator: staging a layer ahead against unpublished upstream tarballs (U8) waits on two readings, and then on the user's ruling, because it changes `wave.md`'s rule. The readings are which `swap.ts --pin` proof refused whole-wave staging, and whether an `npm pack` tarball's files equal the published tarball's.
- 2026-11-20, the Orchestrator: the re-pin defect in `swap.ts` (the first `--pin` after `repair` exits 1, and the second exits 0) is its own unit, U9, which opens with a reproduction.

## Sequence

One writer at a time, in this order:
1. **U1** (`builder`): `steps.ts` leads `PATH` with the running Node, folding the name's case, and writes `DIR/result.json` with `{ exit, node, npm, binary, cli }`.
2. **U2** (`opus`, objective): `window.ts --confirm` waits until each tarball answers 200 and adds a `tarball` member.
3. **U3** (`builder`): `pins.ts --catalog` classes a hit as `mirror` or `own`, and exits 0 when only mirror hits remain.
4. **U4** (`opus`, objective): `wave.ts` gains the `pull` step, the `PATH` lead, and a ruling split into own and mirror hits.
5. **U5** (`opus`): `wave.ts --sweep` and `--plan --root`, with `--checkout`.
6. **U6** (`opus`): `release.ts --prepare` and `--commit`.
7. **U7** (`opus`): the skill's instruction lines and ROADMAP 69.

Each unit's proof carries a negative control, and each medium unit gets one review by a reviewer who did not write it.

## Deferred

- **U8**, staging ahead. Trigger: the two readings in § Rulings, then the user's ruling. Owner: scaffold.
- **U9**, the `swap.ts` re-pin defect. Trigger: after U6. Owner: scaffold.

## State

- 2026-11-20: D14 (`launch.ts --detach`) landed in `c4bb16076`, so the publish skill's scripts are free to change.

Next action: dispatch U1.
