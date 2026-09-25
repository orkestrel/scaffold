# J-MOTION-PROOFS-A round 2 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-motion-proofs-a-brief-2.md`.

---

Round 2 is done. `readDuration` is the one shared duration reader: the three inline readings now call it, and no other file keeps a copy. Every round-1 mutation row reads exactly as before. One addition beyond the two patches: an existing test lists every export of `tests/setupBrowser.ts`, and my round-1 patch did not add `readDuration` to that list. I added that one entry. Nothing is committed.

## Files touched
All under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a/`.
- `tests/setupBrowser.ts`: `setupBrowser.ts.patch` applied as returned, adding the `readDuration` export.
- `tests/setupBrowser.test.ts`: `setupBrowser.test.ts.patch` applied (the import and the `describe('readDuration')` proof). I also added `'readDuration'` to the export list in the case `exports the showcase mount, the component mounts, the case matrices, the oracle drive, the recorders, the cascade readers, and the position scan`.
- `tests/src/browser/Modal.test.ts`, `Offcanvas.test.ts` and `Alert.test.ts`: the three sites switched, plus the import.

Diffstat:
```
 tests/setupBrowser.test.ts          | 16 ++++++++++++++++
 tests/setupBrowser.ts               | 27 +++++++++++++++++++++++++++
 tests/src/browser/Alert.test.ts     | 14 +++-----------
 tests/src/browser/Modal.test.ts     |  9 +++------
 tests/src/browser/Offcanvas.test.ts | 11 ++++-------
 5 files changed, 53 insertions(+), 24 deletions(-)
```

## `readDuration` and its control
```ts
export function readDuration(element: Element): number
```
It returns the longest `transition-duration` entry the element's computed style declares, in milliseconds, and 0 when there is no transition.

The control mutation (`mutate-2.py mutations-2.json reader-seconds`) changes the seconds factor `1000` to `1`. It fails only the reader's proof:
```
Tests  1 failed | 88 passed (89)
FAIL readDuration > returns the longest declared duration in milliseconds across a list in seconds and milliseconds
AssertionError: expected 0.3 to be 300 // Object.is equality
```

## Switched sites
| File | Case | Now reads |
|---|---|---|
| `Modal.test.ts` | the order case (`… whichever of the host's fade and the dialog's transition lasts longer`) | `shipped = readDuration(other)`, then the lengthened element gets `transition-duration: ${2 * shipped}ms` |
| `Offcanvas.test.ts` | the order case (`… whichever of the fade and the slide lasts longer`) | `shipped = readDuration(longer === 'backdrop' ? host : shade)`, then the rule or inline duration uses `${2 * shipped}ms` |
| `Alert.test.ts` | the motion-factor case | `released = readDuration(slow)` and `scaled = readDuration(slow)`, with the ratio close to 4 |

A search for `transitionDuration.split` or `transitionDuration` followed by `parseFloat` across `tests`, `src` and `app` finds only `tests/setupBrowser.ts`, inside `readDuration`.

## Mutation readings
I ran round 1's `mutations.json` rows through `mutate-2.py`. It is a copy of `mutate.py` that lets a row name its test project (default `src:browser`) and writes logs to `mutations-2/`. Every row matches round 1, every failure is an `AssertionError`, and every mutated file was restored byte for byte (`sha256sum -c` OK).

| Row | Result |
|---|---|
| modal-base | 1 failed \| 59 passed: the order case. Host row at `shown` reads `1,1` instead of `0,0`; host row at `hidden` has 1 unfinished; dialog row at `hidden` has 1 unfinished. |
| modal-show-dialog | 1 failed: the order case |
| modal-hide-host | 1 failed: the order case |
| modal-show-skip | 5 failed, the same five cases as round 1 |
| modal-hide-skip | 2 failed: the hide-fade case and the order case |
| offcanvas-show-backdrop | 1 failed: the order case |
| offcanvas-show-panel | 3 failed: the slide case, the order case, and the resize-during-slide case |
| offcanvas-hide-backdrop | 1 failed: the order case |
| offcanvas-hide-panel | 2 failed: the slide case and the order case |
| backdrop-show-skip | 3 failed |
| backdrop-hide-skip | 2 failed |
| alert-skip | 8 failed; the factor case reads `expected NaN to be close to 4` |

## Acceptance output
```
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
All matched files use the correct format.
Finished in 23563ms on 476 files using 16 threads.
git diff --check exit 0
Modal      Test Files  1 passed (1)   Tests  60 passed (60)
Offcanvas  Test Files  1 passed (1)   Tests  62 passed (62)
Backdrop   Test Files  1 passed (1)   Tests  13 passed (13)
Alert      Test Files  1 passed (1)   Tests  24 passed (24)
npm run test:setup:browser exit 0
 Test Files  1 passed (1)
      Tests  89 passed (89)
```

## git status --short
```
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/browser/Alert.test.ts
 M tests/src/browser/Modal.test.ts
 M tests/src/browser/Offcanvas.test.ts
```

## Deviation state
No stop. One departure from D1: besides the two patches, I added `'readDuration'` to the export list in `tests/setupBrowser.test.ts`. With the new export, that test failed as `expected [ 'BUTTON_CLASS', …(65) ] to deeply equal [ 'BUTTON_CLASS', …(64) ]`. In round 1 I ran only the `readDuration` case, so I missed it. Nothing else in the two shared files changed.
