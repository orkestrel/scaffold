# J-MOTION-PROOFS-B round 2 — the writer's report (opus on Opus 5.5, 2026-09-25)

I finished J-MOTION-PROOFS-B round 2: `Carousel` now dispatches `slid` only after both items' motion finishes, whichever lasts longer, in both the slide and the fade variants. The new outgoing-longer cases read red at `f03690f` by assertion and green after the fix. Every acceptance criterion passes, and nothing is committed.

## Measurement and the unknown
- **Red reading, before any edit.** I added only the slide-variant outgoing-longer case and ran `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Carousel.test.ts`. It read `Tests  1 failed | 70 passed (71)`: `AssertionError: expected [ [ 'slid.vn.carousel', 1, +0 ] ] to deeply equal [ [ 'slid.vn.carousel', +0, +0 ] ]`. At `slid` one motion was unfinished, because the completion's display change cancelled the outgoing transition.
- **The unknown: the fade variant needs no settle of its own.** The outgoing item's delayed opacity drop is a running CSS transition with a finite end time, even during its delay. The same two-item settle waits for it. The proof is the fade outgoing-longer case, which reads the same red at `f03690f` and green after the fix. The `r2-carousel-incoming` mutation reddens it as well. Under the shipped values the round 1 fade case passed only because the drop and the fade in end on the same frame.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/`.
- `src/browser/Carousel.ts`: the slide settles on both items together. I updated the comment beside the settle and the class remarks' sentence about the wait.
- `tests/src/browser/Carousel.test.ts`:
  - two new outgoing-longer cases, one per variant;
  - one new fade-variant incoming-longer case;
  - every order case now reads its order from the two motions' end times;
  - the reduced-motion case reads both items in both variants.
- `guides/veneer.md` § Carousel: the sentence on the wait and the Bootstrap-difference item on completion now say both items.

```
 guides/veneer.md                   |  15 +--
 src/browser/Carousel.ts            |  13 ++-
 tests/src/browser/Carousel.test.ts | 204 ++++++++++++++++++++++++++++++++++---
 3 files changed, 204 insertions(+), 28 deletions(-)
```

## Fix
The slide used to wait on the incoming item only, and now waits on both items together under the engine's signal. The door that follows the wait is unchanged:
```ts
const signal = this.#controller.signal
await Promise.all(pair.map((item) => settleAnimations(item, signal)))
```
This follows the pattern of `Modal`'s `#settle`, written inline because the slide has only one call site. It does not change when `slide` dispatches or which item takes the `active` token.

## Red-first proof
- **Case:** "dispatches slid after the outgoing item motion when it outlasts the incoming item motion". It sits before round 1's incoming-longer case.
- **Fade twin:** "dispatches slid under the fade variant after the outgoing item motion when it outlasts the incoming item motion".
- **Red at `f03690f`, with every case added:** `Tests  2 failed | 71 passed (73)`. Both cases failed on `expected [ [ 'slid.vn.carousel', 1, +0 ] ] to deeply equal [ [ 'slid.vn.carousel', +0, +0 ] ]` (`r2-logs/red-all-cases.log.txt`).
- **Green, same command:** `Tests  73 passed (73)`.
- **Revert of `Carousel.ts` to `f03690f`:** exactly those two cases fail, both by `AssertionError`.

## Plant run
`bash tmp/j-motion-proofs-b/plant.sh tmp/j-motion-proofs-b/plant.py r2-plant-final` ran on the finished tree (`r2-plant-final.log.txt`):
```
PlantProbe exit 0   Tests  2 passed (2)
Collapse exit 0     Tests  49 passed (49)
Toast exit 0        Tests  45 passed (45)
Tab exit 0          Tests  47 passed (47)
Carousel exit 0     Tests  73 passed (73)
scratch removed: yes
```
The plant lives only in the scratch copy, which the script deletes afterwards. `git status` lists only the owned files.

## Mutations
The instrument is `mutate.py` with `r2-mutations.json`, logged in `r2-mutations.log.txt`. Each row restores the file byte for byte, and each row reported `restored True`.

| Row | Proofs it reddens | Red reading |
|---|---|---|
| Settle on the incoming item only (`r2-carousel-incoming`) | slide outgoing-longer, fade outgoing-longer | `2 failed \| 71 passed (73)`; `expected [ [ 'slid.vn.carousel', 1, +0 ] ] to deeply equal [ [ 'slid.vn.carousel', +0, +0 ] ]` |
| Settle on the outgoing item only (`r2-carousel-outgoing`) | slide incoming-longer, fade incoming-longer | `2 failed \| 71 passed (73)`; `expected [ [ 'slid.vn.carousel', 1, 1 ] ] to deeply equal [ [ 'slid.vn.carousel', +0, +0 ] ]` |
| `await Promise.resolve()` in place of the settle (`r2-carousel-yield`) | all six motion cases, plus the queue case | `7 failed \| 66 passed (73)`; the motion cases read `expected [ [ 'slid.vn.carousel', 2, 1 ] ] to deeply equal …`, the queue case `expected true to be false` |
| `Carousel.ts` from `f03690f` (`r2-carousel-base`) | slide outgoing-longer, fade outgoing-longer | `2 failed \| 71 passed (73)`, both `AssertionError` |

## Acceptance output
```
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
All matched files use the correct format.
Finished in 20013ms on 476 files using 16 threads.
git diff --check exit 0
Carousel exit 0
 Test Files  1 passed (1)
      Tests  73 passed (73)
npm run test:guides exit 0
 Test Files  1 passed (1)
      Tests  26 passed (26)
npm run test:app exit 0
 Test Files  61 passed (61)
      Tests  223 passed (223)
```
Criterion 3 holds: under `stageMedia({ motion: false })` the extended case reads no animation on either item, in both variants.

## git status --short
```
 M guides/veneer.md
 M src/browser/Carousel.ts
 M tests/src/browser/Carousel.test.ts
```

## Report-only patches
Both patches are under `tmp/j-motion-proofs-b/`, and `git apply --check` exits 0 for each.
- **`r2-types.ts.patch`: `CarouselEventMap.slid` in `types.ts`.** Its summary says `slid` fires "after the active item's transition settles". That sentence is outside my grant, which covered only the `CarouselInterface` remarks. Those remarks don't say when `slid` fires, so I left `types.ts` unchanged. The patch rewords the summary to "dispatched after the `active` token moves, and under the `slide` token after the motion of both items finishes".
- **`r2-EngineSection.test.ts.patch`: a comment fix only.** The showcase case waits on final-state tokens, not on animations, so it needs no behaviour change. Its comment still says the move waits for "the incoming item's transition", and the patch corrects that.

## Deviation state
No stop. These are the choices I settled myself, which you can overrule:
- **Case placement:** the slide outgoing-longer case sits before round 1's incoming-longer case. The two fade order cases follow round 1's fade case.
- **Fade cases:** the fade variant gets its own cases for both orders. The outgoing drop is lengthened with an inline `transition-delay`, the property the cascade itself uses to hold that drop.
- **Round 1's incoming-longer case:** it now also asserts its order from the end times.
- **Guide event table:** I left the `slid` row as it is. "After the `active` token moves" is still true, and a host without the `slide` token waits for no motion.
- **Stale digest:** `r2-before.sha256` no longer matches `Carousel.ts`. It was taken before my later TSDoc rewrap, and the remaining diff to `Carousel.ts` is only my intended change.

Logs and scripts are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/tmp/j-motion-proofs-b/`: `r2-run.sh`, `r2-accept.sh`, `r2-patches.sh`, `r2-wait.sh`, `r2-mutations.json`, `r2-logs/`, `r2-accept.log.txt`, `r2-mutations.log.txt`, `r2-plant.log.txt`, `r2-plant-final.log.txt`, and `mutations/r2-*.log.txt`.
