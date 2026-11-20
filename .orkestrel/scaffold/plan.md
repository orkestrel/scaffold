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
- 2026-11-20, the user: run U2 and U3 in this session and hold U4 to U7 for the next fleet wave's preparation, to keep lane time for the agent and learn sessions.
- 2026-11-20, the Orchestrator: the re-pin defect in `swap.ts` (the first `--pin` after `repair` exits 1, and the second exits 0) is its own unit, U9, which opens with a reproduction.

## Sequence

One writer at a time, in this order:
1. **U4** (`opus`, objective): `wave.ts` gains the `pull` step, the `PATH` lead, and a ruling split into own and mirror hits. `readVerdict` and `failed` in `wave.ts` read a step whose child ends with no exit status, killed by a signal or by `ENOBUFS` past `maxBuffer`, as failed, never as a dry-run row; a dry-run row stays the only row with no exit.
2. **U5** (`opus`): `wave.ts --sweep` and `--plan --root`, with `--checkout`.
3. **U6** (`opus`): `release.ts --prepare` and `--commit`.
4. **U7** (`opus`): the skill's instruction lines and ROADMAP 69.

Each unit's proof carries a negative control, and each medium unit gets one review by a reviewer who did not write it.

## Deferred

- **U8**, staging ahead. Trigger: the two readings in § Rulings, then the user's ruling. Owner: scaffold.
- **U9**, the `swap.ts` re-pin defect. Trigger: after U6. Owner: scaffold.

## State

- 2026-11-20: D14 (`launch.ts --detach`) landed in `c4bb16076`, so the publish skill's scripts are free to change.
- 2026-11-20: U1 landed in `299ec9494`, after one review and a fix round whose closure check closed every finding.
- 2026-11-20: the contract 0.0.27 wave's campaign files are retired. Its lessons live in ROADMAP 191 to 195 and in this campaign's U2, U5, U8, and U9.
- 2026-11-20: U2 landed in `24c25ad88`, after one review, two fix rounds, and two closure checks that closed every finding.
- 2026-11-20: U3 landed in `8f07b9868`, after one review, one fix round, and a closure check that closed every finding.

Next action: hold U4 to U7 until the next fleet wave's preparation, then dispatch U4.
