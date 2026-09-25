# J-MOTION-PROOFS-A round 3 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-motion-proofs-a-brief-3.md`.

---

Round 3 is done, and each of M1–M5 is met. Modal now reads its dialog fresh at every show, hide and bounce, and the new case for that fails on `beb7cd8`'s `Modal.ts` and passes at the tip. The whole mutation instrument, with the new rows, fails every row by an assertion. All four files pass against the plant. Nothing is committed.

## Files touched
All under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a/`.
- `src/browser/Modal.ts`: the stored dialog is gone. A private `#findDialog()` reads the first HTML element the `dialog` selector matches, each time it is called. `#settle()`, the bounce, and the show's body-scroll step all use it. The class TSDoc no longer says construction finds the dialog.
- `tests/src/browser/Modal.test.ts`:
  - the new M1 case;
  - the M2 backdrop reading in the hide case;
  - the M2 backdrop reading in the order case, whose title now names the backdrop.
- `tests/src/browser/Alert.test.ts`: the M3 readings at `closed` in the fade case and the factor case.
- `tests/src/browser/Backdrop.test.ts`: the M4 case.

Diffstat:
```
 src/browser/Modal.ts               |  25 ++++---
 tests/src/browser/Alert.test.ts    |  63 ++++++++++++++---
 tests/src/browser/Backdrop.test.ts |  39 ++++++++++-
 tests/src/browser/Modal.test.ts    | 134 ++++++++++++++++++++++++++++++++-----
 4 files changed, 221 insertions(+), 40 deletions(-)
```

## M1 change and readings
The new case is `settles each change and the bounce on a dialog inserted after construction`:
1. It builds the modal over a `.modal.fade` host with no dialog, using `backdrop: false, focus: false, dismiss: { escape: false }`.
2. It then inserts a `.modal-dialog` and sets that dialog's duration to twice `readDuration(host)`, so the dialog outlasts the host's fade whatever the cascade ships.
3. It reads the dialog's motion as each `show()` or `hide()` call returns, and again right after an Escape starts a bounce.
4. At `shown`, at the end of the bounce, and at `hidden`, it records whether it read that change's motion and how many motions read so far are unfinished.

Command: `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Modal.test.ts`

**Red on `beb7cd8`'s `Modal.ts`** (`Tests  1 failed | 60 passed (61)`):
```
AssertionError: expected [ [ 'shown.vn.modal', true, 1 ], …(2) ] to deeply equal [ Array(3) ]
    [ "shown.vn.modal", true,
-     0,
+     1,
    ],
    [ "bounced", true,
-     0,
+     2,
    ],
    [ "hidden.vn.modal", true,
-     0,
+     3,
    ],
 ❯ tests/src/browser/Modal.test.ts:411:25
```
The unfinished count is cumulative, so each change leaves one more cut-off dialog motion.

**Green at the tip:** `Tests  61 passed (61)`.

## New mutation rows
The instrument is `mutate-3.py` with `mutations-3.json`. It is `mutate-2.py` with its log folder moved to `mutations-3/`. Every row failed only on assertions (one `AssertionError` per failed case), and every mutated file was restored byte for byte (`sha256sum -c` OK).

| Row | Result | Red reading |
|---|---|---|
| modal-stale-dialog (`beb7cd8` Modal.ts) | 1 failed \| 60 passed | the M1 case, as quoted earlier |
| modal-backdrop-hide-skip (`await held.hide()` becomes `void held.hide()`) | 4 failed | Hide case: `hidden` reads `false` where `true` was expected, so no finished backdrop fade was read. Order case: `expected Set{} to deeply equal Set{ <div class="modal-backdrop fade"> }`. It also fails the hide-takeover and the "shows no backdrop the hide did not write" cases. |
| backdrop-literal-fade-show (waits only if the class list has a literal `fade`) | 1 failed | M4 case: `expected [ [ 'show', true, true, 1 ], … ] to deeply equal [ [ 'show', true, true, +0 ], … ]` |
| backdrop-literal-fade-hide | 1 failed | M4 case: the hide reading reads `1` unfinished where `0` was expected |

The existing rows still fail by assertion. Because the new cases read more, some rows now fail more cases:
- **Now fail more cases:**
  - modal-base: 2 failed (order case and M1 case);
  - modal-hide-host: 2 failed;
  - modal-show-skip: 6 failed;
  - modal-hide-skip: 3 failed;
  - backdrop-show-skip: 4 failed;
  - backdrop-hide-skip: 3 failed.
- **Unchanged from rounds 1 and 2:**
  - modal-show-dialog, whose text now reads `this.#findDialog() ?? host`: 1 failed;
  - offcanvas-show-backdrop: 1 failed;
  - offcanvas-show-panel: 3 failed;
  - offcanvas-hide-backdrop: 1 failed;
  - offcanvas-hide-panel: 2 failed;
  - alert-skip: 8 failed;
  - reader-seconds: 1 failed (`expected 0.3 to be 300`).

**M3.** The Alert fade case's `closed` now records the unfinished count of the motions the close started, `['closed.vn.alert', false, 0]`. The factor case records one reading per alert at `closed`, `[['still', false, 0], ['slow', true, 0]]`. The host is already removed at `closed`, so it lists no animations; the case reads the motion objects it kept instead.

**M4.** The Backdrop replacing-class case loads a consumer rule, `.shade.is-fading { opacity: 0; transition: opacity 0.1s }` plus shown opacity. Its comment says it is the consumer's own rule. At each call's resolution it records `['show', true, true, 0]` and `['hide', true, true, 0]`.

## Plant run
`plant.sh` with `plant.py` ran against the round-3 tip: Modal `61 passed`, Offcanvas `62 passed`, Backdrop `13 passed`, Alert `24 passed`. The planted-value probe passed (1 passed), so the run used 250 ms, `ease-out`, and the dialog at scale 0.96. The copy is removed, and `git diff --stat -- src/styles` is empty.

## Acceptance output
```
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
All matched files use the correct format.
Finished in 13244ms on 476 files using 16 threads.
git diff --check exit 0
Modal      Test Files  1 passed (1)   Tests  61 passed (61)
Offcanvas  Test Files  1 passed (1)   Tests  62 passed (62)
Backdrop   Test Files  1 passed (1)   Tests  13 passed (13)
Alert      Test Files  1 passed (1)   Tests  24 passed (24)
```

## git status --short
```
 M src/browser/Modal.ts
 M tests/src/browser/Alert.test.ts
 M tests/src/browser/Backdrop.test.ts
 M tests/src/browser/Modal.test.ts
```

## Deviation state
No stop. Two things for you to decide:
- **Wider M1 change.** M1 names `#settle` alone. I also switched the bounce and the body-scroll step to the live read, so the modal has one way to find its dialog, and the M1 case proves the bounce too. Revert those two call sites if you want the change limited to `#settle`.
- **Guide patch to apply.** The M1 change makes a sentence in `guides/veneer.md` false, and the guide is outside my scope. The patch is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a/tmp/j-motion-proofs-a/veneer-3.md.patch`, and `oxfmt --check` passes on the edited copy. It rewrites the Modal construction sentence: construction no longer finds the dialog, and a show, a hide, and a bounce each read the dialog the `dialog` selector matches inside the host when they run.
