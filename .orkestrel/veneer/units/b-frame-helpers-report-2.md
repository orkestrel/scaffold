# FRAME-HELPERS round 2 (`fh`) report

The `opus` role on Opus 5.5 ran this round natively in `/home/user/veneer-fh`, on `b-frame-helpers-brief-2.md`. Every
acceptance criterion is met, and the P1 mutation reddens the container and link cases. Nothing is committed, and
`.orkestrel/veneer/units/fh-shared.patch` stands unchanged: `git apply --check` accepts it against this tree.

## Findings and their changes

- **P1: outline cases require a painted reading.** Each outline-painting focus case asserts
  `expect(focusReading.outline).toBeGreaterThan(0)`, which fails on an undefined reading. These are the list-group,
  menu item, skip link, and focusable container cases. The link specimen case collects an `outlines` list from its
  focus rows, requires one entry per `-focus` key, and requires each entry to be greater than 0 with `?? 0`, so an
  undefined reading fails.
- **F1: one outline factory.** The `createOutlineCapture` function in `tests/setupBrowser.ts` takes the
  `PortfolioOptions` without `enabled`, and builds the painted and suppressed portfolios, enabled, under
  `<directory>/painted` and `<directory>/suppressed`.
  - The journey's `FRAMES` constant and the helper proofs both build through it.
  - The local `createOutlines` factory in `tests/setupBrowser.test.ts` is gone. The proof file keeps one
    `OUTLINE_OPTIONS` constant beside its existing `IDLE` constant.
  - The proof "creates an enabled painted and suppressed portfolio pair under one directory" places a frame through
    each portfolio and reads each written path. It also checks the variant and the refusal of an unregistered
    variant.
  - The export-list proof names `createOutlineCapture`.
- **N1: one name for a focus reading, and the `worn` key.**
  - Every `FocusReading` is bound as `focusReading`, once per call site, with no shadowing. That binding sits inside
    the lift callback, which also holds the assertions and fault collection that read it. The `ringed` binding is
    gone.
  - A `FocusReading` bound as `focused` is gone too. `focused` now names only a paint read under focus.
  - The plaintext case's list of readings is `focusReadings`.
  - `FocusOptions.ring` is renamed `worn` at every site, including the helper's locals, the private `#outline`
    method's parameter, and the check-group call. The docs call it "the worn element".
- **N2: the lifted element is named `specimen` at every lift site, except detached copies.**
  - The Primary focus case, the Primary hover and active case, the role hovers, and the link button name the lifted
    host `specimen`. The role loop destructures `{ name }`. Titles, comments, and messages keep the word "host".
  - The nav case lifts both of its specimens, for all its frames, from one loop. So does the navbar case. The
    `pointed` flag picks the drive and the padding.
  - The check-group and indeterminate cases keep `copied`, because a detached copy is a different concept from the
    specimen whose original each case also holds.
- **C1: shared pixel reader and checked reads.**
  - The press case reads each screenshot whole through the `readImageRegion` function, then takes the centre pixel
    from the returned bytes. Its private decode is gone. Both variants give the same centre readings as round 1.
  - The page strip link, the underline link, and the accordion buttons are read through the `readElement` function.
    Their inline `instanceof HTMLElement` checks are gone.
  - The page link is read by position, and the case asserts its name is "Page 1".
  - The input checks that need an `HTMLInputElement` API keep their guards.
- **W1: prose.**
  - `outline: 0` is written as "the `outline: 0` declaration" in both carousel comments and in the guide.
  - "The last row carries every fault together" became "The row carrying every fault together decides the order."
  - The `lift` summary, its remarks, and the class doc say the wrapper is padded unless the `padded` option is
    `false`.
  - The `padded` doc states what `false` does and no longer claims a need.
  - `FocusReading.entered` records "until the frame was shot".
  - The `@throws` tags of `readElement`, `lift`, `focus`, and `createOutlineCapture` use the "Thrown when" form.
  - "the placement every pointer state takes" is corrected in the press and file-hover cases.
  - The class doc's method links carry their noun.
  - The § Tests paragraphs are re-wrapped. The frame helper paragraph is bounded to lifted specimens and names the
    in-place `toggle-pressed` frame.

## P1 red and green

The instrument is `.orkestrel/veneer/units/fh-instruments/fh2-p1.sh`. It changes the focus method's outline test in `tests/setupBrowser.ts` so no
outline is read, runs the filter, restores the line exactly, and reruns the filter.

- **Command.** `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "reveals the focusable container|drives a link of each link specimen|drives one list-group action|drives one menu item|reveals the skip link"`
- **Red run** (`.orkestrel/veneer/units/fh-instruments/fh2-p1-red.log.txt`): exit 1, `Tests  5 failed | 57 skipped (62)`.
  - The container case fails with `TypeError: actual value must be number or bigint, received "undefined"`. In
    round 1 this case stayed green.
  - The link specimen case fails with `AssertionError: expected [ …(3) ] to strictly equal []`, one entry for each
    focus row. In round 1 this case stayed green.
  - The list-group, menu, and skip link cases fail with the same `TypeError`.
- **Green run** (`.orkestrel/veneer/units/fh-instruments/fh2-p1-green.log.txt`): exit 0, `Tests  5 passed | 57 skipped (62)`.
- **Timing.** Both P1 runs came before the press-case repair and the last comment edits. Neither of those touched the
  mutated line or the P1 assertions, and the final `journey:dark-1280` gate passes those cases unmutated.

## Gates

All gates were run after the final edit. The runner is `.orkestrel/veneer/units/fh-instruments/fh2-gates-2.sh`, and each log ends with its exit
line.

| Gate | Exit | Result line | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` | `fh2-format-2.log.txt` |
| `npm run lint:check` | 0 | no diagnostics | `fh2-lint-2.log.txt` |
| `npm run check` | 0 | no diagnostics | `fh2-check-2.log.txt` |
| `npm run test:setup` | 0 | `Tests  313 passed (313)` | `fh2-test-setup-2.log.txt` |
| `npm run test:setup:browser` | 0 | `Tests  81 passed (81)` | `fh2-setup-browser-2.log.txt` |
| `npm run test:guides` | 0 | `Tests  20 passed (20)` | `fh2-test-guides-2.log.txt` |
| `CAPTURE=1 … --project journey:dark-1280` | 0 | `Tests  62 passed (62)` | `fh2-journey-dark-1280-2.log.txt` |
| Observation: `CAPTURE=1 … --project journey:light-390` | 0 | `Tests  62 passed (62)` | `fh2-journey-light-390-2.log.txt` |

The first gate pass (`fh2-*.log.txt` without the `-2` suffix) failed at both journey variants, with
`Tests  1 failed | 61 passed (62)`. The failure was in the press case: `The declared region clips to nothing inside a
2x3 frame`. My first C1 edit had keyed the centre region to the control's box. The screenshot of a pressed control is
smaller than that box, so the region fell outside the image. The fix reads the screenshot whole and takes its centre
pixel, as the round-1 code did. The filtered press runs `fh2-press-dark-1280.log.txt` and `fh2-press-light-390.log.txt`
passed before the second gate pass.

## Files

- **Diff:** `.orkestrel/veneer/units/fh-2.diff`, the whole change over `5afa37b`. Its stat line is
  `6 files changed, 1736 insertions(+), 2218 deletions(-)`.
- **Status:** `.orkestrel/veneer/units/fh-2-status.txt`. It lists `guides/veneer.md`, `tests/app/browser/integration.test.ts`,
  `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupBrowser.test.ts`, and `tests/setupBrowser.ts`.
- `tests/setupBrowser.ts` gains the `createOutlineCapture` function and the `worn` key, plus the prose fixes.
- `tests/setupBrowser.test.ts` gains the factory proof and uses the factory.
- `tests/setup.ts` gains the prose fixes.
- `tests/app/browser/integration.test.ts` gains the P1, N1, N2, C1, and W1 changes.
- `guides/veneer.md` § Tests gains the re-wrapped paragraphs.

## Deviation state

The unit did not stop. It made these decisions within its scope:

- **Names.** The focus reading's binding is `focusReading` and the factory is `createOutlineCapture`, as the deviation
  contract allowed.
- **Copies keep `copied`.** See N2.
- **Pre-existing lines left as found.** A comment re-wrapping pass also touched pre-existing lines outside this
  unit's hunks. Those hunks were reversed exactly, so only this unit's own hunks remain re-wrapped.
