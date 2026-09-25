# E-ID-BUTTON-CLASSES report

Unit `opus` on Opus 5.5, native, sole writer in `/home/user/veneer-ebcl` (branch `unit/ebcl`, baseline `2376710`).

**Deviation state: complete, no stop. Three choices are recorded for the Orchestrator to rule on.**

1. **Placement.** The per-class proofs sit in `tests/src/styles/elements/button.test.ts` as one `it.each` case per class. They are not in the eight component test files that Execution step 2 names. Every class's proof drives the same routine: it mounts both forms in both cascades, drives four states, reads, and diffs. Putting that routine in eight files is the near-duplicate helper that `.claude/rules/tests.md` § Shared test infrastructure calls a defect. The routine's home is `tests/setupBrowser.ts`, which this brief puts off-limits. `tests/setupStyles.ts` reads no document. One `it.each` over the case matrix keeps the routine in one place inside owned files, and each class keeps its own case, which its own include's mutation turns red. The component test files are untouched. Per-file placement would need a grant for `tests/setupBrowser.ts` to take the routine.
2. **Reading the release stylesheet.** The proof reads `node_modules/bootstrap/dist/css/bootstrap.css` with `commands.readFile`. It does not import it. A `?raw` import failed `npm run test:conformance`: the case "imports no forbidden runtime package from source, application, or tests" reported `forbidden: "bootstrap/dist/css/bootstrap.css?raw"`. That log was overwritten by the green rerun, and the reading is quoted here. Reading the file as data follows `recordButtonOracle` in `tests/setupServer.ts`, which reads the same file with `readFileSync`. The tenets allow external packages for reference behavior and conformance. The gate reads import specifiers only, so the Orchestrator must confirm that a file read fits the gate's intent.
3. **A second holder.** `BUTTON_RETUNED_HOLDER_STYLE` extends `BUTTON_HOLDER_STYLE` rather than widening it. `tests/service/tailwind/consumer.test.ts` (unowned) pins `padding-top: 6px` and `padding-left: 12px` under the old holder, and retuning the space tokens would break that pin.

**Observation, timing under load:** in the final gate sweep, `npm run test:setup` exited 1. `tests/setupServer.test.ts` › "records and reads official control state and rejects contradicted or absent obligation steps" reported `Test timed out in 10100ms`, and every other case passed. That case launches a browser. This unit changes no input to it. An earlier run of the same gate, with the same `tests/setupStyles.ts`, passed `Tests 321 passed (321)`. Its log was overwritten by the final sweep. The deciding rerun is yours.

## Release difference sets (step 1)

Instrument: `tmp/units/ebcl-probe/pages.mjs`, with the cases and the holder extracted from `tests/setupStyles.ts` into `cases.json` and `holder.txt`. It uses standalone Playwright pages, one carrying only `bootstrap.css` and one carrying only `dist/src/styles/index.css`. Output: `tmp/units/ebcl-probe/pages.json`. The first reading, under CASCADE's holder with every counterpart given the `disabled` class, is in `tmp/units/logs/ebcl-probe-forms-baseline.log.txt`.

The following table lists, for each class, the longhands where the release's button form resolves apart from its counterpart, with the button form's value. It excludes custom properties. The sets are stable across states except where the Changes column says otherwise.

| Class | Counterpart | Every state | Changes by state |
| --- | --- | --- | --- |
| `btn-close` | focusable `div` | `appearance: button`, `cursor: pointer`, `display: inline-block`, `font-weight: 400`, `text-align: center`, `unicode-bidi: normal` | disabled: `cursor: default` |
| `navbar-toggler` | focusable `div` | `appearance`, `cursor: pointer`, `font-weight: 400`, `text-align: center`, `unicode-bidi: normal` | disabled: `cursor: default` |
| `accordion-button` | focusable `div` | `appearance`, `cursor: pointer`, `font-weight: 400`, `unicode-bidi: normal` | disabled: `cursor: default` |
| `dropdown-item` | anchor | `appearance` | focused: adds `outline-offset: 0px`; disabled: adds `cursor: default` |
| `nav-link` (tabs markup) | anchor | `appearance`, `text-align: center` | focused: adds `outline-offset: 0px` |
| `list-group-item` | anchor | `appearance`, `font-weight: 400` | focused: adds `outline-offset: 0px`; disabled: adds `cursor: default` |
| `page-link` | anchor | `appearance`, `font-weight: 400`, `text-align: center` | focused: adds `outline-offset: 0px`; disabled: adds `cursor: default` |
| `carousel-control-prev`, `carousel-control-next` | focusable `div` | `appearance`, `cursor: pointer`, `font-weight: 400`, `unicode-bidi: normal` | disabled: `cursor: default` |
| carousel indicator | focusable `div` with `data-bs-target` | `appearance`, `color: rgb(0, 0, 0)` and every longhand derived from `currentcolor` (`outline-color` among them), `font-weight: 400`, `text-align: center`, `unicode-bidi: normal` | focused: drops `outline-color`; disabled: the colors read `rgba(16, 16, 16, 0.3)` |

- Every entry comes from the user agent's button or the release's reboot, and none comes from a class rule. The Veneer page reads the same sets at the same button values in every state. On the counterpart side the values differ where Veneer calibrates, such as the heading weight the accordion counterpart inherits.
- Under hover and press the release's `a:hover` rule changes `--bs-link-color-rgb` on the anchor counterparts only. Custom properties are left out of the comparison, because a custom property is not a surface longhand.

## Oracle per state and the disabled ruling

- **Holder.** `BUTTON_RETUNED_HOLDER_STYLE` retunes every token the surface reads. These are the space, face, size, weight, line-height, text, fill, corner, shadow, disabled-opacity, state-mixer, motion, and focus-ring tokens. It leaves the forced-colors highlight alone, because no proof runs under forced colors.
- **Rest.** Read before reduced motion is staged, so a transition the surface writes still shows.
- **Hovered, pressed, keyboard focus.** Read with reduced motion. Each element is driven alone: `userEvent.hover`, then `driveHold`, then `focus()` followed by `{ArrowRight}`. The pointer is released and parked between readings. Each element must match `:hover`, `:active`, or `:focus-visible` after its drive, and one assertion collects the misses.
- **Disabled.** A counterpart cannot be `:disabled`. Where the release writes the class's `:disabled` rule beside a `.disabled` rule, the counterpart takes the `disabled` class and `aria-disabled="true"`. This is the `paired: true` field, set for `btn-close`, `dropdown-item`, `nav-link`, and `list-group-item`. Where the release writes no `:disabled` rule for the class, the counterpart is read at rest. This is `paired: false`, set for `navbar-toggler`, `accordion-button`, `page-link` (the release writes `.page-link.disabled` alone), the carousel controls, and the indicator. With this pairing, a class-written disabled treatment resolves alike on both forms. Pairing `page-link` with its `disabled` class instead left calibrated class colors in the difference (see the baseline log).
- **Comparison.** For each state, the proof keeps every longhand where the button form resolves apart from its counterpart, with the button form's value. The Veneer map must equal the release map, which covers both where the forms differ and what the button reads there. A value the class writes resolves alike on both forms and drops out. A surface leak shows either as an extra longhand or as a retuned button value.
- **Release cascade in the test.** A shadow root holds `bootstrap.css` alone, under the same holder and inside `data-bs-theme="light"`. The release declares its root variables on that attribute, and `:root` does not match inside a shadow tree. **Instrument check:** the shadow-root release reading equals the standalone release page in every case and state. The test's Veneer reading equals the standalone Veneer page. Readings: `tmp/units/logs/shadow-*.json` against `tmp/units/ebcl-probe/pages.json`. That check ran while the stylesheet was a `?raw` import, and `commands.readFile` returns the same file text.
- **Guard.** Every release state must list `appearance`, so a reading that cannot tell a button from its counterpart fails.

## Proofs

- `tests/src/styles/elements/button.test.ts` › "resolves the $name button form apart from its counterpart on the same longhands, at the same button values, as the release does, at rest, hovered, pressed, under keyboard focus, and disabled". Its cases are `'btn-close'`, `'navbar-toggler'`, `'accordion-button'`, `'dropdown-item'`, `'nav-link'`, `'list-group-item'`, `'page-link'`, `'carousel-control-prev'`, `'carousel-control-next'`, and `'carousel indicator'`, driven by `BUTTON_REBOOT_CASES`.
- `tests/src/styles/mixins.test.ts` › "writes every reset declaration in the built cascade that names revert with revert as its whole value, on each class the release builds on a button". It sits beside the property-set case and reads `dist/src/styles/index.css?raw` through postcss under `@layer components`. It holds the `:where(` reset selectors equal to `BUTTON_REBOOT_SELECTORS` and every declaration naming `revert` equal to `revert`.

These are coverage proofs, not defect proofs. They pass on the baseline cascade, and the following mutations are their failing-first evidence.

## Mutations

Driver: `tmp/units/ebcl-probe/mutate.sh <name>`, run by `mutations.sh`. Each log records the applied diff, the build, the run (verbose and JSON reporters), and the restore. The restore is checked by digest, by `cmp` against the backup in `tmp/units/ebcl-probe/`, and by an empty `git diff --stat -- src`. Every restore passed all three checks. The final check against `2376710` is in `tmp/units/logs/ebcl-restore-check.log.txt`. Each run covered both proof files. Every failure listed here is an `AssertionError`.

| Mutation | Log | Cases it turns red |
| --- | --- | --- |
| `_close.scss` include removed | `tmp/units/logs/ebcl-mutation-close.log.txt` | `'btn-close'`; the mixin property-set case; the minifier guard (selector set) |
| `_navbar.scss` include removed | `…-navbar.log.txt` | `'navbar-toggler'`; property-set; guard selector set |
| `_accordion.scss` include removed | `…-accordion.log.txt` | `'accordion-button'`; property-set; guard selector set |
| `_dropdown.scss` include removed | `…-dropdown.log.txt` | `'dropdown-item'`; property-set; guard selector set |
| `_nav.scss` include removed | `…-nav.log.txt` | `'nav-link'`; the plain nav link reboot case; property-set; guard selector set |
| `_list-group.scss` include removed | `…-list-group.log.txt` | `'list-group-item'`; property-set; guard selector set |
| `_pagination.scss` include removed | `…-pagination.log.txt` | `'page-link'`; property-set; guard selector set |
| `_carousel.scss` controls include removed | `…-carousel-controls.log.txt` | `'carousel-control-prev'`; `'carousel-control-next'`; property-set; guard selector set |
| `_carousel.scss` indicators include removed | `…-carousel-indicators.log.txt` | `'carousel indicator'`; property-set; guard selector set |
| `_mixins.scss`: `transition-delay: 1s` after `transition: revert` | `…-minifier.log.txt` | the minifier guard's revert assertion; property-set; `'btn-close'`, `'dropdown-item'`, `'list-group-item'` |

- The minifier plant compiled every reset's declaration to `transition:revert 0s 1s`, as round 5 measured.
- An example of a kill: with the close include removed, the `'btn-close'` difference gains `font-family: fantasy`, `font-size: 17px`, `font-weight: 700`, `line-height: 32.3px`, `padding-*: 4.25px`, and the retuned shadow. Those are the holder's retuned surface values.
- Every other case in both files stayed green under every mutation.

## Partial fixes

None. No reading showed a class's button form apart from the release in any state, so no partial changed. `git diff --stat -- src` is empty.

- **Unknown 1 answered:** no class's button form differs from the release in any state.
- **Unknown 2 answered:** see the preceding difference-set table.
- **Carried `.dropdown-item` weight finding:** the class writes the weight itself, and it is not a leak. Under the holder, both forms read the class's `var(--vn-weight-body)`, so the value drops out of the difference, and the release's difference for `dropdown-item` names no weight.

## Gates

Driver: `tmp/units/ebcl-probe/gates.sh`. Every log ends with `exit=<code>`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| scoped `oxfmt --check` over the touched files | 0 | formatted | `tmp/units/logs/ebcl-gate-format-scoped.log.txt` |
| scoped `oxlint --deny-warnings` over the touched `.ts` files | 0 | clean | `tmp/units/logs/ebcl-gate-lint-scoped.log.txt` |
| `npm run check` | 0 | clean | `tmp/units/logs/ebcl-gate-check.log.txt` |
| `npm run build:src` | 0 | built | `tmp/units/logs/ebcl-gate-build-src.log.txt` |
| owned files (`button.test.ts`, `mixins.test.ts`) | 0 | `Tests 70 passed (70)` | `tmp/units/logs/ebcl-gate-owned.log.txt` |
| `npm run test:src:styles` | 0 | `Tests 1516 passed (1516)` | `tmp/units/logs/ebcl-gate-test-src-styles.log.txt` |
| `npm run test:setup` | **1** | `Tests 1 failed \| 320 passed (321)`; the failure is the timeout in the opening observation | `tmp/units/logs/ebcl-gate-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `Tests 26 passed (26)` | `tmp/units/logs/ebcl-gate-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `Tests 20 passed (20)` | `tmp/units/logs/ebcl-gate-test-guides.log.txt` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)`; the skip is the vendored `skipIf` | `tmp/units/logs/ebcl-gate-test-policy.log.txt` |

## Shared-file hunks

These files are edited in the worktree, and each patch is taken against `2376710`.

- `tests/setupStyles.ts`, patch `tmp/units/ebcl-shared-setupStyles.patch`: the hunk adds `BUTTON_RETUNED_HOLDER_STYLE` and `BUTTON_REBOOT_CASES` after `BUTTON_REBOOT_SELECTORS`.
- `tests/setupStyles.test.ts`, patch `tmp/units/ebcl-shared-setupStyles-test.patch`: the export list gains `'BUTTON_REBOOT_CASES'` and `'BUTTON_RETUNED_HOLDER_STYLE'` in sorted positions.
- `guides/veneer.md`, patch `tmp/units/ebcl-shared-veneer.patch`: § Outside the ledger, in the paragraph that begins "The button reboot rules come after those names". It names the mixin proof's minifier guard, the button proof's per-class form comparison with its holder, its states, both cascades, and the disabled pairing, and the nav link case.

## Touched files

- `tests/src/styles/elements/button.test.ts` (owned): the per-class form proof, plus the `build`, `driveHold`, `commands`, and `userEvent` imports.
- `tests/src/styles/mixins.test.ts` (owned): the minifier guard, plus the `postcss` `parse` import and the built-cascade `?raw` import.
- `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md` (shared): as the preceding section lists.

Diffstat against `2376710`: 5 files changed, 282 insertions(+), 6 deletions(-).

## Artifacts

- Diff: `tmp/units/ebcl.diff` (`git diff 2376710`). Status: `tmp/units/ebcl-status.txt`.
- Instruments: `tmp/units/ebcl-probe/` (`forms.mjs`, `forms.json`, `pages.mjs`, `cases.json`, `holder.txt`, `pages.json`, `mutate.sh`, `mutations.sh`, `gates.sh`).
- Logs: `tmp/units/logs/`. Every plant backup, script, and log is inside this worktree. The one early backup written to the Orchestrator's scratchpad, of `button.test.ts` during a readings dump, was restored before any mutation ran and then deleted.
