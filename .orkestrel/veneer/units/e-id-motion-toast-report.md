# E-ID-MOTION-TOAST report

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-mtoast` (branch `unit/mtoast`, base `6586b11`).

## Deviation state

**A stop condition from the deviation contract is met, and the owned scope is complete.** The change needs an edit to an
off-limits file, so the Orchestrator must rule on it.

- **Expected:** the brief's "What asserts the state this change ends" list names every proof this change makes false.
- **Found:** the `fades the alert, toast, tooltip, popover, tab pane, and modal, and leaves each shown component its own
  opacity` case in `tests/src/styles/components/fade.test.ts` (off-limits) reads `transition-property` on the
  `FADE_COMPONENT_CASES` toast rows (`toast fade show showing`, `toast fade show`) and expects `opacity`. After this change
  the toast reads `opacity, transform`. No toast design that scales the toast can keep that reading, because both rows are
  the after-change styles of the show and the hide. The brief's search patterns (`.toast.showing`, `toast showing`,
  `'.toast'`) cannot match that table's `toast fade show showing` spelling.
- **Evidence:** `tmp/units/mtoast-fade-after.log.txt` (the fade proof alone, after the change: `Tests 1 failed | 9 passed
  (10)`, `exit=1`). `tmp/units/mtoast-src-styles.log.txt` (`npm run test:src:styles`: `Tests 1 failed | 1560 passed
  (1561)`, `exit=1`; that case is the only failure).
- **Done:** every owned step and every acceptance gate. **Not done:** the fade proof edit. The exact patch is in
  `tmp/units/mtoast-fade-test.patch`. It was run through a probe config over a copy of the patched file against the final
  cascade: `tmp/units/mtoast-fade-patch-probe.log.txt` reads `Tests 10 passed (10)`. The unpatched copy through the same
  probe is the control: `tmp/units/mtoast-fade-patch-control.log.txt` reads `Tests 1 failed | 9 passed (10)`. The probe
  files are deleted, and the config is kept as `tmp/units/mtoast-fade-probe-config.ts.txt`.
- **Hypothesis:** FLOAT's tooltip and popover rows hit the same reading. The patch reads whether the transitioned list
  names `opacity`, so it holds for FLOAT too.

Ancillary choices settled within scope:

- The transition sits on the `.toast.fade` compound.
- The scale sits on the recorded `.toast.showing` rule.
- The `.toast.fade` selector is spelled inline beside `TOAST_SELECTORS` in the selector case, following the accordion and
  carousel precedent. So `tests/setupStyles.ts` needs no patch.

## Touched files

- `src/styles/components/_toast.scss`: loads the mixins, adds `transform: scale(0.98)` to `.toast.showing`, and adds the
  `.toast.fade` transition through the `transition` mixin.
- `tests/src/styles/components/toast.test.ts`: the selector case reads the fade compound. A `toast motion` block holds the
  declaration, entry, exit, plain-toast, and factor/reduced-motion proofs. The cleanup releases the staged media and the
  motion factor.
- `guides/veneer.md`: the § Toast classes prose on the showing state and the motion, the additions sentence, the proof
  paragraph, and the toast's § Additions rows.

The diffstat (`git diff --stat 6586b11`) follows.

```text
 guides/veneer.md                          |  36 ++++-
 src/styles/components/_toast.scss         |  25 ++++
 tests/src/styles/components/toast.test.ts | 232 +++++++++++++++++++++++++++++-
 3 files changed, 283 insertions(+), 10 deletions(-)
```

The diff is in `tmp/units/mtoast.diff` (`git diff 6586b11`). The status is in `tmp/units/mtoast-status.txt`, which holds
`M guides/veneer.md`, `M src/styles/components/_toast.scss`, and `M tests/src/styles/components/toast.test.ts`.

## Searches

- **Evidence re-taken at the base:** every reading in the brief's Context matched: `_toast.scss`, `_fade.scss`, the Toast
  class sequence in the guide, the `Toast.test.ts` declaration case, the `toast.test.ts` showing case, Elements'
  `[popover]:not(:where(aside, dialog, nav))` rule and its `@starting-style` twin (`opacity: 0; transform: scale(0.98)`,
  with `--set-popover-transition-duration` resolving to `--set-transition-duration: 150ms` and no timing function), and
  the § Toast classes sentence. The baseline run was green: `tmp/units/mtoast-base-styles.log.txt`.
- **App, showcase, and engine readings of a changed value:** `tmp/units/mtoast-search.sh` searched every file under
  `tests/app`, `app`, and `tests/src/browser` that names a toast (case-insensitive). It listed each line that reads
  `transform`, `scale`, `opacity`, `readDuration`, or `getAnimations` within 8 lines of a toast line. The output is in
  `tmp/units/mtoast-search.log.txt`, and every hit is in `tests/src/browser/Toast.test.ts`:
  - the declaration case: `readDuration` is `0` without `fade` and positive with it, and the opacity is `1` and then `0`;
  - the completion cases: `getAnimations` counts and play states;
  - the factor case: the ratio `readDuration(slow) / shipped` is close to `4`;
  - the supersession cases: `host.getAnimations()[0]` awaited for `ready`.

  None pins a property, a transform, or a single-transition count. No app or showcase line reads a toast's motion.
- **What asserts the state:** `grep -rn "\.toast\.showing\|toast showing\|'\.toast'" tests/` found these hits outside the
  owned set:
  - `tests/setupStyles.test.ts` around line 4005: binds `TOAST_SELECTORS` to the inventory and reads no motion;
  - `tests/src/browser/Toast.test.ts` lines 64, 1503, 1534, and 1622: the declaration probe and class-list readings;
  - `tests/app/browser/sections/EngineSection.test.ts` and `ToastSection.test.ts`: position and containment only;
  - `tests/fixtures/oracle/inventory.json` and `tests/setupStyles.ts` (`TOAST_SELECTORS`): no motion.

  Outside those patterns, `tests/src/styles/components/fade.test.ts` reads `FADE_COMPONENT_CASES` and breaks, as the
  Deviation state section describes.

## Unknowns answered

- **Selector:** the transition sits on `.toast.fade`, with specificity (0,2,0) in `@layer components`. It outranks the
  `.fade` rule, (0,1,0) in the same layer, whatever the load order. The mixin's reduced-motion twin sits on the same
  compound at the same specificity under `(prefers-reduced-motion: reduce)`, so it outranks both the compound's own
  transition and the `.fade` twin. A transition list replaces the overridden rule's whole list, so the compound writes
  the opacity entry again on the fade's tokens (`--vn-motion-feedback`, `--vn-ease-out`). A toast without `fade` matches
  neither rule, so it declares no transition (`transition-duration` reads `0s`).
- **Ledger:** `npm run test:conformance` printed these addition rows and no departure rows
  (`tmp/units/mtoast-conformance-first.log.txt`):

  ```text
  toast | .toast.showing { transform } | — | declaration | scale(0.98)
  toast | .toast.fade | — | selector | —
  toast | .toast.fade { transition } | — | declaration | opacity var(--vn-motion-feedback) var(--vn-ease-out), transform var(--vn-motion-feedback) var(--vn-ease-standard)
  toast | .toast.fade | @media (prefers-reduced-motion: reduce) | selector | —
  toast | .toast.fade { transition } | @media (prefers-reduced-motion: reduce) | declaration | none
  ```

  After the rows landed: `Tests 45 passed (45)` (`tmp/units/mtoast-conformance.log.txt`).
- **App proof and showcase:** neither reads a changed value (see Searches). After `npm run build:src`, the engine proof
  passes unchanged (`Tests 45 passed (45)`), and `npm run test:app` passes (`Tests 223 passed (223)`).

## Failing first and green

The command was `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts
tests/src/styles/components/toast.test.ts`, run on the final test file. `tmp/units/mtoast-red.sh` swaps in the base
partial from `git show 6586b11:src/styles/components/_toast.scss` and then restores the final partial. The sha256 check
reads identical.

| Partial | Result | Log |
| --- | --- | --- |
| Base `6586b11` | `Tests 6 failed \| 16 passed (22)`, `exit=1`, each an `AssertionError` | `tmp/units/mtoast-red.log.txt` |
| Final | `Tests 22 passed (22)`, `exit=0` | `tmp/units/mtoast-green.log.txt` |

These cases failed first:

- `writes the recorded toast selectors, the fade compound, and no other components-layer selector naming a toast class`
- `declares the scale and the fade on the fade compound, no transition under the reduced-motion condition, and the 0.98 scale on the showing state`
- `scales an animated toast from 0.98 to none over the feedback duration on the standard curve beside its fade as the showing class leaves`
- `scales an animated toast from none to 0.98 on the same timing beside its fade as the showing class joins`
- `runs no motion on a toast without the fade class, and rests every shown toast at no transform`
- `doubles the running duration of the scale and the fade at a doubled motion factor, and runs neither at a zero factor or under the reduced-motion preference`

The rendered readings run on Chromium 141:

- The entry reads `transform` from `matrix(0.98, 0, 0, 0.98, 0, 0)` to `none` over the specimen-resolved feedback
  duration (150 ms) on `ease`, beside `opacity` from `0` over the same duration on `ease-out`. The midpoint scale sits in
  (0.99, 1), past the linear halfway.
- The exit starts at identity and settles at `matrix(0.98, 0, 0, 0.98, 0, 0)` and opacity `0`, on the same timing. The
  midpoint sits in (0.98, 0.99).
- The doubled/resting ratio is `[2, 2]`. A zero factor and every factor under the reduced-motion preference read
  `[undefined, value]`.

Each sample's presence is asserted with `toBeDefined()` before it is narrowed.

## Rules as written

The partial now opens with `@use '../mixins' as *;`, and these rules follow `.toast`:

```scss
.toast.showing {
	opacity: 0;
	transform: scale(0.98);
}

.toast.fade {
	@include transition(
		(
			opacity var(--vn-motion-feedback) var(--vn-ease-out),
			transform var(--vn-motion-feedback) var(--vn-ease-standard)
		)
	);
}
```

## Guide rows

These § Additions rows sit before the `modal` rows:

| Component | Name | Condition | Category | Veneer | Reason |
| --- | --- | --- | --- | --- | --- |
| `toast` | `.toast.showing { transform }` | — | declaration | `scale(0.98)` | The showing state takes the `0.98` scale of Elements' surface motion beside the release's transparent opacity, so the toast shrinks as it fades out and grows as it fades in. |
| `toast` | `.toast.fade` | — | selector | — | The compound carries the toast's motion, so a toast without the `fade` class runs none. |
| `toast` | `.toast.fade { transition }` | — | declaration | `opacity var(--vn-motion-feedback) var(--vn-ease-out), transform var(--vn-motion-feedback) var(--vn-ease-standard)` | The toast scales over the `--vn-motion-feedback` duration on the `--vn-ease-standard` curve beside its fade, and the list writes the `.fade` rule's opacity transition again because it replaces that rule's list. |
| `toast` | `.toast.fade` | `@media (prefers-reduced-motion: reduce)` | selector | — | The release declares no transition here, and the `transition` mixin writes this one with its reduced-motion pair. |
| `toast` | `.toast.fade { transition }` | `@media (prefers-reduced-motion: reduce)` | declaration | `none` | The release declares no transition here, and the `transition` mixin writes this one with its reduced-motion pair. |

§ Toast classes states the showing state's scale and the resting `none`. It also states the compound's motion, its
tokens, why the compound wins and writes the opacity entry again, the absent motion without `fade`, and the reduced-motion
pair. An additions sentence and the proof paragraph's motion clause follow.

## Plants

`tmp/units/mtoast-plants.sh` ran each plant on the final partial and final test file. Each plant rebuilt the styles, ran
`toast.test.ts`, and restored the partial by copy. The sha256 before and after is
`ab06f5633210cce59b3e7d4bf3f6fe429d8fa51cee8710f5093e9819e279fe0e`, and every log reads `restore identical`.

| Plant | Edit | Result | Failing cases (each an `AssertionError`) | Log |
| --- | --- | --- | --- | --- |
| drop-scale | delete `transform: scale(0.98);` | `5 failed \| 17 passed` | the declaration, entry, exit, plain, and factor cases | `tmp/units/mtoast-plant-drop-scale.log.txt` |
| move-transition | `.toast.fade {` becomes `.toast {` | `3 failed \| 19 passed` | the selector, declaration, and plain cases | `tmp/units/mtoast-plant-move-transition.log.txt` |
| ease-out | the `transform` entry reads `var(--vn-ease-out)` | `3 failed \| 19 passed` | the declaration, entry (`'ease-out'` against `'ease'`), and exit cases | `tmp/units/mtoast-plant-ease-out.log.txt` |

## Gates

Each gate ran through `tmp/units/mtoast-gates.sh`. After the final Reason-cell edit, `tmp/units/mtoast-gates-guide.sh`
re-ran the gates that read the guide (format, conformance, guides, policy) into the same logs. Each log echoes its
command first and ends with its exit and `/proc/loadavg`.

| Gate | Result | Exit | Load (1/5/15) | Log |
| --- | --- | --- | --- | --- |
| oxfmt `--check` on the owned files | All matched files use the correct format | 0 | 5.24 3.96 3.28 | `mtoast-format.log.txt` |
| `npm run lint:check` | clean | 0 | 0.69 1.16 2.60 | `mtoast-lint.log.txt` |
| `npm run check` | clean | 0 | 1.26 1.25 2.58 | `mtoast-check.log.txt` |
| `npm run build:src` | built | 0 | 1.37 1.28 2.58 | `mtoast-build-src.log.txt` |
| Owned style proofs | `Tests 22 passed (22)` | 0 | 1.38 1.28 2.56 | `mtoast-styles.log.txt` |
| `npm run test:setup` | `Tests 357 passed (357)` | 0 | 2.19 1.51 2.60 | `mtoast-setup.log.txt` |
| `npm run test:conformance` | `Tests 45 passed (45)` | 0 | 5.56 4.81 3.69 | `mtoast-conformance.log.txt` |
| `npm run test:guides` | `Tests 26 passed (26)` | 0 | 5.53 4.83 3.71 | `mtoast-guides.log.txt` |
| `npm run test:policy` | `Tests 109 passed \| 1 skipped (110)` | 0 | 5.57 4.85 3.72 | `mtoast-policy.log.txt` |
| `Toast.test.ts` (src:browser, after `build:src`) | `Tests 45 passed (45)`, unchanged | 0 | 2.07 1.74 2.52 | `mtoast-engine.log.txt` |
| `npm run test:app` | `Tests 223 passed (223)` | 0 | 3.54 2.18 2.63 | `mtoast-app.log.txt` |
| Observation: `npm run test:src:styles` | `Tests 1 failed \| 1560 passed (1561)`; only the fade case in the Deviation state section | 1 | 6.02 3.92 3.23 | `mtoast-src-styles.log.txt` |

All logs are under `tmp/units/`.

## Report-only patches

- **`tests/src/styles/components/fade.test.ts` (off-limits):** `tmp/units/mtoast-fade-test.patch`. The case reads
  whether `splitTopLevelList(transition-property)` includes `opacity` instead of equating it to `'opacity'`, and its
  comment states why. `git apply --check` passes against the final tree, and the patch is probe-verified green (see the
  Deviation state section).
- **`guides/veneer.md` § Engine and § Compatibility (off-limits sections):** `tmp/units/mtoast-guide-report-only.patch`.
  `git apply --check` passes.
  - The Toast paragraph "The toast partial declares no transition of its own, and the shipped fade partial fades a
    toast …" becomes false with this change. The patch restates it: the partial transitions an animated toast's opacity
    and scale over `--vn-motion-feedback`, and a show takes a hidden toast to no opacity at a `0.98` scale.
  - The patch adds `motion` to the toast `selector` row's proved list in § Compatibility, as the modal row reads.
- **`tests/setupStyles.ts` and `tests/setupBrowser.ts`:** no patch needed.
