# Audit round 1 — TOAST (`to`): subjective lane (`reviewer` on Opus 5.5) verdict

The lane's final message from workflow `wf_c5d7606f-0b0` (script `to-audit-workflow.js`), verbatim below the rule.

---

1. **UNRESOLVED.** Scope and delta. Most of this claim held, but my own evidence cannot confirm the `git apply --check` part. The rest of that part rests on the writer's report (`b-modal-to-report.md:14`).
   - `to-status.txt:1-4` lists only the four owned paths, and `to.diff` carries only those files.
   - Every file `to-shared.patch` touches is in the brief's Shared list (`b-modal-to-brief.md:111-125`). No hunk touches a vendored, off-limits, sibling, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, or `README.md` path.
   - The MODAL, OFFCANVAS, and TIP entries stay as the base has them: `to-shared.patch:21-25`, `:494-495`, `:7-8`, and `:383`.
   - I sampled hunk contexts against the base and they match: `src/styles/index.scss:71-76`, `tests/setupStyles.ts:4572-4582` and `:4607`, `tests/conformance.test.ts:388-396`, and `guides/veneer.md:2524-2527` and `:5567-5575`. I did not sample the other hunks.
   - **What settles it:** run `git apply --check to-shared.patch` against a fresh `git archive 2a3f223` extract.

2. **CONFIRMED.** The partial matches the oracle.
   - `/home/user/veneer-to/src/styles/components/_toast.scss:11-89` writes the eight recorded selectors with the declarations in `node_modules/bootstrap/scss/_toasts.scss:1-73`.
   - It departs only on the zindex, padding-x/y, spacing, and font-size values, which are tokenized, and on the prefixed `width` values, which it drops. The `#### toast` rows record each departure.
   - `--bs-toast-zindex: var(--vn-stack-toast)` sits at `:12` and `:51`.
   - The spacing derivation holds: `$toast-spacing` is `$container-padding-x`, which is `$grid-gutter-width` (`_variables.scss:1478`, `:525`, `:520`), and `--vn-gutter-x` is `1.5rem` at `_tokens.scss:342`.
   - The partial writes no literal colour, no `!important`, and no transition.

3. **CONFIRMED.** Each mutation is distinguished. I ruled from the assertions in `tests/src/styles/components/toast.test.ts` and from the mutation map in `to-instruments/to-mutate-styles.py:12-22`. No per-mutation output log was retained, so the executed reds are the writer's record.

   | Mutation | Assertion that fails (`toast.test.ts`) | Distinguishes |
   | --- | --- | --- |
   | Container slot written as the literal `1090` | `:191-193`: the `.rung` retune to 1234 leaves `z-index` at 1090 | yes |
   | Slot dropped from `.toast` | `:189`, `:193`: the bare toast sits outside the container, so it reads an empty slot instead of `1090` | yes |
   | `:not(.show)` rule dropped | `:148-149` | yes |
   | `.showing` rule dropped | `:164` | yes |
   | `:not(:last-child)` qualifier dropped | `:213`: margins read 24, 24, 24 instead of 24, 24, 0 | yes |
   | Header corners at the full radius | `:247-249`: 6 instead of 5 | yes |
   | Combinator written as `.toast .btn-close` | `:275-276`: the body control's margin reads 12 instead of 0; `:47` also fails | yes |
   | Literal `--bs-toast-bg` | `:330` after the light retune; `:321` in dark | yes |
   | Body padding reordered | `:294-295`: top reads 8 instead of 12 | yes |
   | Gap written as `var(--vn-space-12)` | `:85` (slot differs from the gutter token) and `:110` (48 instead of 24 at density 2) | yes |
   | Failing-first: barrel `@use` removed | Every case reads a declaration absent without the partial, for example `:47`, `:58`, `:85`, `:148`, `:321` | yes |

4. **CONFIRMED.** The close combinator moved correctly.
   - The entry moves from `CLOSE_DEFERRED` to `CLOSE_SELECTORS` (`to-shared.patch:17,22`), and its `Overlays` row is deleted (`:486`).
   - The partition case at `tests/setupStyles.test.ts:2731-2736` is untouched.
   - `tests/src/styles/components/close.test.ts:95-96` reads the tables, so it needs no edit. Mutation: dropping the combinator from the partial reddens `:95`.
   - The geometry proof uses a body control that reads no margin (`toast.test.ts:275-276`).

5. **BROKEN.** The `TOAST_SPECIMENS` TSDoc (`to-shared.patch:336-346`) does not record the missing colored toasts. Only the guide records them (`:469-470`). The TSDoc also records the `me-auto` substitution without naming the class (`:345-346`).
   - **Fix:** add to the `@remarks` block: "The header title carries the `flex-grow-1` class where the release's markup writes the `me-auto` class, which does not ship. No specimen renders a colored toast, because the release writes one with the `text-bg-*` and `border-0` classes, and neither class ships."
   - **What held:**
     - The names follow M14: `Shown toast` uses the release's word, and `Stacked toasts` and `Centered toast` put the modifier first, as `Role alerts` does.
     - The copy is one imperative sentence in the Validation and Alert voice.
     - No specimen writes an inline style (`ToastSection.test.ts:24`), and every toast carries `show` (`:40-41`).
     - Each toast carries `role="alert" aria-live="assertive" aria-atomic="true"` (`:47-53`), and each close control carries `aria-label="Close"` (`:61-62`).
     - Each container sits in a `.viewport` frame (`:88-89`) and uses only shipped utilities. The base `dist/src/styles/index.css` has rules for `.top-0`, `.end-0`, `.top-50`, `.start-50`, `.translate-middle`, and `.flex-grow-1`, and none for `.me-auto` or `.text-bg-primary`.
     - The M3 sentence is one sentence (`to-shared.patch:462-464`).
     - The `showing` decline is recorded with its reason (`:171-174`, `:468-469`, `:560-563`).
     - The report's section mutations are distinguished: the container outside `.viewport` (`:88`), `role="status"` (`:47-53`), a missing `show` (`:40`), a `style` attribute (`:24`), a removed `aria-label` (`:61`), and `translate-middle-y` (`:98-105`, plus the centering offset).

6. **CONFIRMED.** Registries and orders agree.
   - The subjects are at `to-shared.patch:161-163` and the resting rows at `:183-198`. Each resting row reads a property a toast rule sets, and no `DRIVEN_KEYS` row is added.
   - `listed` (`:269`), the `toasts` stem (`:290`), `passiveNames` (`:298`), and the expected order (`:306`) agree with the barrel (`:7`).
   - The server set (`:316`), `Showcase.ts` (`:383`), `index.ts` (`:393`), and the label and spread lists (`:236`, `:244`, `:254-259`) agree with M14.

7. **BROKEN.** Two guide defects:
   - **(a) The Toast `plugin` row (`to-shared.patch:532`) leaves out obligations `toast.js` has.**
     - It never names the `show` class, which the engine adds in `show()` and removes after `hide()` and in `dispose()` (`toast.js:97`, `:115`, `:127`).
     - It leaves out the deprecated `hide` class (`toast.js:95`, `:114`).
     - It drops the landed Alert row's closing negative. The Toast plugin has no key or ARIA handling (first terrain § B, Keys "None" and ARIA "None").
     - The guide's pointer at `:419-420` says § Compatibility records the plugin "that moves a toast between the classes", but the row never names `show`.
     - **Fix:** replace the class clause with "the `show` method adds the `show` and `showing` classes, and the `fade` class when animated, then removes the `showing` class after the transition; the `hide` method adds the `showing` class, then removes the `showing` and `show` classes and adds the deprecated `hide` class; the `dispose` method removes the `show` class". End the row with "; no key or ARIA handling. Owner: J-ENGINE."
   - **(b) The guide overclaims what the rung retune moves.**
     - `:437-439` says "so a retune of that rung moves every toast and every container". The variable row at `:524` says "each one is read beside the property it drives".
     - `.toast` declares `--bs-toast-zindex` and applies no `z-index` (`_toast.scss:11-37`), which matches the release (`_toasts.scss:1-38`).
     - Falsifier: a `<div class="toast show position-fixed">` under `--vn-stack-toast: 1234` computes `z-index: auto`.
     - **Fix, for `:437-439`:** "...which the `.toast` class and the `.toast-container` class each declare. The container applies the level, so a retune of that rung moves every container and the toasts inside it, and a toast outside a container declares the slot and applies no level of its own."
     - **Fix, for `:524`:** "...each one is read in `tests/src/styles/components/toast.test.ts`, and each one but the toast's stacking slot beside the property it drives."
   - **What held:**
     - The § Files row.
     - The `#### toast` rows, which equal the report's gate rows (`b-modal-to-report.md:39-46`). The conformance log shows `Tests 22 passed (22)` (`to-gate-conformance.log.txt:11`).
     - The Alias cell (`:495`).
     - The selector row (`:523`).
     - The defaults, methods, events, dismiss trigger, and the pointer-or-focus pause (`toast.js:41-45`, `:75-135`, `:25-28`, `:216`, `:185-188`).

8. **BROKEN.** The writing rule is not met in these places:
   - **Code tokens with no noun after them** in `### Toast classes`: `to-shared.patch:425-431` (`--vn-space-4`, `--vn-space-6`, `--vn-size-2`, `--bs-body-bg-rgb`, `--bs-border-color-translucent`, `--bs-secondary-color`, `--bs-box-shadow`, `--bs-toast-color`), `:435` (`--bs-toast-spacing`), `:437` (`--bs-toast-zindex`), `:451-453` (`1090`, `--bs-toast-zindex`, `var(--vn-stack-toast)`), and `:458-459` (the prefixed values).
   - **The same fault in the plugin row** (`:532`): "cancelable `show.bs.toast` and `hide.bs.toast`, then `shown.bs.toast` and `hidden.bs.toast`" and "after `delay`". The Alert row writes "the cancelable `close.bs.alert` event".
   - The same section already uses the correct form at `:455-457` ("the `--vn-space-6` and `--vn-space-4` tokens"), so it mixes two forms. **Fix:** write "reads the `--vn-space-4` token", "the `show.bs.toast` and `hide.bs.toast` events", "the `delay` option", and so on.
   - **An unbackticked class name** in the `tests/setup.ts` `CASCADE_KEYS` TSDoc (`:171`): "the showing class". The sibling paragraph writes "the `collapsing` class". **Fix:** "the `showing` class".
   - **A list item named by its position** in the report (`b-modal-to-report.md:164`): "the release's first documented pair". **Fix:** "the pair the release's toast markup writes".
   - **What held:**
     - No `any`, `as`, `!`, suppression, mock, or nested function appears.
     - The toast tables sit in `tests/setupStyles.ts`, are frozen, and are exported and bound (`:96-98`, `:106-150`).
     - `TOAST_SELECTORS` follows the `ALERT_SELECTORS` precedent.
     - `TOAST_SLOT_CASES` has the `{property, token, pixels}` shape of `ALERT_SPACE_CASES`. Its `SLOT` stem fits because the rows span the space, gutter, and size tokens, and the partial and guide call these values slots.
     - `TOAST_CLOSE_GEOMETRY` follows `ALERT_DISMISSIBLE_GEOMETRY`, with the one-word fields `left` and `right`.
     - Each table's TSDoc matches its shape.
     - The report's gate table records each command with its result line (`:129-141`).
   - **Numbers the report states.** Each is a measurement tied to the run that produced it, so none is a banned count:
     - Diffstats: +90, +337, +20, +180; +1 -0, +48 -1, +52 -0, +26 -0, +2 -0, +3 -0, +3 -0, +7 -3, +1 -0, +40 -0, +2 -0, +1 -0, +99 -8.
     - Test results: `Tests 22 passed (22)`, `17 passed (17)`, `17 failed (17)`, `1 failed | 16 passed`, `3 failed | 14 passed`, `2 failed | 15 passed`, `1 failed | 16 passed (17)`, `1 failed | 121 passed (122)`, `122 passed (122)`, `3 failed | 2 passed`, `1 failed | 4 passed`, `34 passed (34)`, `5 passed (5)`, `267 passed (267)`, `1 failed | 266 passed`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `8 passed | 168 skipped (176)`, `Test Files 4 passed (4)`.
     - Other values: a timeout of 10100 ms, a load average of 12, and the 390 and 1280 variants.

**Findings outside the claims**

- **F1.** The opening comment of `/home/user/veneer-to/src/styles/components/_toast.scss` (`:2-10`) repeats the 7(b) overclaim at `:5-6`: "a retune of that rung moves every toast and every container". The same falsifier applies. Its statement at `:3` that the engine writes the `showing` class "while a toast fades in" also leaves out the fade-out, where `hide()` adds the class (`toast.js:119`).
  - **Fix:** "...the engine writes the `showing` class for each fade, in and out alike... The container applies the stacking level from the toast rung, so a retune of that rung moves every container and the toasts inside it."

**Attacked and held**

- The Toast copy leaves out the "each state set as a class in markup" clause that Carousel, Accordion, Collapse, Nav, and Navbar use. It stays within M14, because Alert, the family precedent, omits it too.
- The `--vn-gutter-x` row owes no `--bs-toast-spacing` Alias entry. The length tables list root aliases only; for example, the `--vn-space-8` row reads "none" although the alert slots read it.
- The given ruling on the stacking paragraph stands. After this patch, that paragraph contradicts the toast Alias cell until MODAL's rewrite lands.

**Referrals**

- **To the objective lane:** the `toast case tables` case (`to-shared.patch:125-130`) asserts that `TOAST_SLOT_CASES.map(token)` equals a restated literal list. That assertion fails only when someone edits one copy and not the other. The Alert precedent derives the token from the pixels instead (`tests/setupStyles.test.ts:2771-2772`). Rule whether this binding is sufficient.
- **To the Orchestrator:** "The engine also sets the `fade` class, which no Veneer rule reads." (`to-shared.patch:419`) is true at `2a3f223`, where `src/styles` has no `.fade` rule. It goes false when CROSS-FADE ships `.fade` (M5). Name CROSS-FADE's brief as the carrier of that sentence.
- **To the Orchestrator:** the landed `### Alert classes` and `### Carousel classes` sections use the same bare-token form as 8 (`guides/veneer.md:2361-2363`, `:2552`, `:2567`). They are outside this unit and need a carrier.

VERDICT: FAIL 1, 5, 7, 8; outside the claims: F1
