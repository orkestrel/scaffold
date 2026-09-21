<!-- Retained from u7a-5-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-5.jsonl, thread 01a0c144-d819-7343-a531-d0fdf62a76aa, exit 0, 2026-09-20 20:31. Implementation complete and gates green; a stop on the case-matrix placement rule (tests.md: matrices belong in a setup file) the grant did not cover; superseded by units/u7a-brief-6.md. -->

# U7a successor report 5

Stopped on the test-fixture placement contract after the requested gates passed. Button's cascade,
browser proofs, compatibility partition, and guide changes are present, but the returned tests
carry inline case matrices that scaffold requires in a setup file. This tree is not ready for
acceptance. It remains uncommitted at HEAD `2bc922d`.

The effective brief is `u7a-brief-5.md`, carrying its predecessors. This report
supersedes `u7a-report-4.md`. The earlier export-inventory stop is closed.

## Deviation requiring a successor

- **Expected:** Complete the Button proofs under scaffold's testing law and the brief's file grants.
- **Found:** I introduced inline calibration and size matrices in the owned Button test files.
  Scaffold's [.claude/rules/tests.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:187)
  requires: “Data tables and case matrices belong in a setup file at any size; test registration
  does not.” The final contract review caught my placement error; the executed gates did not.
- **Exact evidence:** `tests/src/styles/elements/button.test.ts:24` holds the bare-button matrix.
  `tests/src/styles/components/button.test.ts:25` holds the filled-role matrix, line 219 the mode
  matrix, line 221 the outline-role matrix, and line 254 the size matrix. Brief 4, line 43, grants
  `tests/setupStyles.ts` for “one new exported helper beside `matchesDirectionSensitive`
  (and its doc block) alone.” Brief 5 extends enumerating assertions, but doesn't grant these
  fixture declarations.
- **Done:** The behavior is implemented and the requested commands returned exit 0. The matrices
  remain visible in the returned diff. No setup fixture export was added outside the grant.
- **Not done:** Move the matrices into setup-owned exports and import them from the test files.
  That correction needs a grant for the fixture declarations and their consumers. The existing
  setup export-inventory assertion can grow under brief 5's standing clause.
- **Stop rule:** The inherited deviation contract stops on a need to edit an off-limits surface.
  I stopped instead of widening the helper-only setup grant.

The forced-colors browser reading is a separate, authorized open row. The installed
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1621` declares `MediaOptions` with
`print` and `motion` only. The mixin and component fallbacks ship, and the guide's Compatibility
sentence records the later Test unit's missing axis. No Button forced-colors browser proof is claimed.

## Diff per file

The [actual diff artifact](C:/Users/mikes/WebstormProjects/veneer/tmp/u7a/actual-diff-5.patch)
contains the unabridged per-file `git diff --no-ext-diff` output. For untracked files, it contains
`git diff --no-ext-diff --no-index` against the empty `tmp/u7a/empty-5.txt` file; those commands
returned the expected difference exit 1. Its SHA-256 is `8cc7b647a8e4b58e18fcc60c692ba7427d75044fd66370067e66c51953176572`.

The following table identifies each file's change.

| File | Returned change |
| --- | --- |
| `src/core/constants.ts` | Carries the inherited frozen state and button token groups. |
| `src/styles/_tokens.scss` | Carries the inherited mixer maps, percentages, button opacity, shadow, transparent, and system-color defaults. |
| `src/styles/_theme.scss` | Closes the state tokens inside explicit light and dark scopes. |
| `src/styles/_mixins.scss` | Adds the parameterized focus-ring declaration mixin and its forced-colors outline. The theme-tokens mixin is unchanged. |
| `src/styles/elements/_button.scss` | Adds the bare-button geometry, type, tint states, focus ring, disabled paint, and reduced-motion transition. |
| `src/styles/components/_button.scss` | Adds the compatible properties, filled and outline role loop, sizes and group-size mates, link treatment, checkbox-label states, disabled hosts, forced-colors fallbacks, and transition. |
| `src/styles/index.scss` | Loads the element and component partials; the component import has an explicit Sass namespace. |
| `tests/setupStyles.ts` | Adds the inherited rule-local symmetry filter; uses the lint-required ReadonlyArray spelling for its readonly tuple collection. |
| `tests/setupStyles.test.ts` | Adds the helper cases and its export-inventory entry. |
| `tests/src/styles/index.test.ts` | Applies the symmetry filter separately to each CSSStyleRule before flattening guard findings. |
| `tests/src/styles/mixins.test.ts` | Adds the mounted focus-ring proof through the element caller. |
| `tests/src/styles/elements/button.test.ts` | Adds the bare-button browser readings; its matrix needs the placement correction recorded earlier. |
| `tests/src/styles/components/button.test.ts` | Adds role, outline, size, link, checked-label, disabled-host, override, and reduced-motion readings; its matrices need the placement correction recorded earlier. |
| `tests/conformance.test.ts` | Changes only the explicit listed array to ['btn']. |
| `guides/veneer.md` | Adds the partial rows, deferral partition, token and binding tables, tertiary departure, forced-colors limit, and shipped selector/variable status. Removes the fulfilled tint and focus-ring deferrals. |

No change was needed in `src/core/types.ts` or `tests/src/core/index.test.ts`: the existing
derived types, path grammar, freeze checks, and uniqueness proof accept the added token groups.

## Enumerating assertion: setup exports

Case: “exports the scanner, the predicates, the collectors, and the compatibility oracle, and
nothing the document has to answer”. Added name: `filterAsymmetricDeclarations`.
This was the first edit under brief 5. The requested setup command returned exit 0 with 71 passing
tests at 20:03:30 on 2026-09-20. The final setup reading follows under Gates.

## Enumerating assertion: shipped components

Case: “carries every shipped component selector and custom property in the built cascade”.
Added name: `btn`, through `const listed: readonly string[] = ['btn']`.
The selector and variable rows changed to shipped in the same step. Before the component partial
landed, `npm.cmd run test:conformance` returned exit 1 with:

`Shipped component btn is missing selector .btn-check`

The measurement in `tmp/u7a/presence-red-5.log` ended with 1 failed and 7 passed tests at 20:05:50.
After the partial landed, the same command returned exit 0. No other existing enumerating
assertion needed an update.

## Bindings as landed

The base class declares the following bindings.

| Compatible property              | Binding on `.btn`                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `--bs-btn-padding-x`             | `var(--vn-space-6)`                                                                              |
| `--bs-btn-padding-y`             | `var(--vn-space-3)`                                                                              |
| `--bs-btn-font-family`           | `var(--vn-font-sans)`                                                                            |
| `--bs-btn-font-size`             | `var(--vn-size-2)`                                                                               |
| `--bs-btn-font-weight`           | `var(--vn-weight-body)`                                                                          |
| `--bs-btn-line-height`           | `var(--vn-line-body)`                                                                            |
| `--bs-btn-color`                 | `var(--vn-text-body-base)`                                                                       |
| `--bs-btn-bg`                    | `var(--vn-button-transparent)`                                                                   |
| `--bs-btn-border-width`          | `var(--vn-border-width)`                                                                         |
| `--bs-btn-border-color`          | `var(--vn-button-transparent)`                                                                   |
| `--bs-btn-border-radius`         | `var(--vn-radius-base)`                                                                          |
| `--bs-btn-box-shadow`            | `var(--vn-button-shadow)`                                                                        |
| `--bs-btn-focus-shadow-rgb`      | `var(--vn-color-primary-rgb)`                                                                    |
| `--bs-btn-focus-box-shadow`      | `0 0 0 var(--vn-focus-width) var(--vn-focus-color)`                                              |
| `--bs-btn-hover-color`           | `var(--vn-text-body-base)`                                                                       |
| `--bs-btn-hover-bg`              | `color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-hover), var(--vn-button-transparent))`  |
| `--bs-btn-hover-border-color`    | `var(--vn-button-transparent)`                                                                   |
| `--bs-btn-active-color`          | `var(--vn-text-body-base)`                                                                       |
| `--bs-btn-active-bg`             | `color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-active), var(--vn-button-transparent))` |
| `--bs-btn-active-border-color`   | `var(--vn-button-transparent)`                                                                   |
| `--bs-btn-active-shadow`         | `var(--vn-button-shadow)`                                                                        |
| `--bs-btn-disabled-color`        | `var(--vn-text-body-base)`                                                                       |
| `--bs-btn-disabled-bg`           | `var(--vn-button-transparent)`                                                                   |
| `--bs-btn-disabled-border-color` | `var(--vn-button-transparent)`                                                                   |
| `--bs-btn-disabled-opacity`      | `var(--vn-button-opacity)`                                                                       |

Filled variants substitute the role fill for resting and disabled background and border, and white
for text. Their hover and active backgrounds mix the role fill with the state mixer, while their
borders retain the role fill. Outline variants use role text and border over transparent, fill on
hover, and use the active mix while pressed. Their disabled state restores role text and transparent
background. The primary focus ring serves every role.

The link class reads the link color, hover color, and decoration tokens over transparent. Small
and large sizes bind the existing space, type, and radius steps; the group-size selectors share
those declarations. The inherited `--bs-gradient` binding remains
`var(--vn-surface-gradient)`. The retained `--bs-btn-close-filter` remains U3's declaration,
unchanged, and appears in no U7a binding or deferral row.

## Deferral table as landed

Each row names an official selector or custom property withheld from the built cascade, its reason,
and the owning unit that deletes the row when it ships the name.

| Name                                                                | Owner      | Reason                                           |
| ------------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| `.input-group .btn`                                                 | Forms      | The owning component supplies this relationship. |
| `.input-group .btn:focus`                                           | Forms      | The owning component supplies this relationship. |
| `.input-group-lg > .btn`                                            | Forms      | The owning component supplies this relationship. |
| `.input-group-sm > .btn`                                            | Forms      | The owning component supplies this relationship. |
| `.btn-group`                                                        | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical`                                               | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn`                                                 | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn`                                        | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn-check:checked + .btn`                            | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn-check:focus + .btn`                              | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn:hover`                                           | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn:focus`                                           | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn:active`                                          | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn.active`                                          | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn-check:checked + .btn`                   | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn-check:focus + .btn`                     | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn:hover`                                  | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn:focus`                                  | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn:active`                                 | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn.active`                                 | Passive    | The owning component supplies this relationship. |
| `.btn-toolbar`                                                      | Passive    | The owning component supplies this relationship. |
| `.btn-toolbar .input-group`                                         | Forms      | The owning component supplies this relationship. |
| `.btn-group > :not(.btn-check:first-child) + .btn`                  | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn-group:not(:first-child)`                         | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`          | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn.dropdown-toggle-split:first-child`               | Disclosure | The owning component supplies this relationship. |
| `.btn-group > .btn-group:not(:last-child) > .btn`                   | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn:nth-child(n+3)`                                  | Passive    | The owning component supplies this relationship. |
| `.btn-group > :not(.btn-check) + .btn`                              | Passive    | The owning component supplies this relationship. |
| `.btn-group > .btn-group:not(:first-child) > .btn`                  | Passive    | The owning component supplies this relationship. |
| `.btn-sm + .dropdown-toggle-split`                                  | Disclosure | The owning component supplies this relationship. |
| `.btn-group-sm > .btn + .dropdown-toggle-split`                     | Disclosure | The owning component supplies this relationship. |
| `.btn-lg + .dropdown-toggle-split`                                  | Disclosure | The owning component supplies this relationship. |
| `.btn-group-lg > .btn + .dropdown-toggle-split`                     | Disclosure | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn-group`                                  | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn:not(:first-child)`                      | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn-group:not(:first-child)`                | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle)` | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn-group:not(:last-child) > .btn`          | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn:nth-child(n+3)`                         | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > :not(.btn-check) + .btn`                     | Passive    | The owning component supplies this relationship. |
| `.btn-group-vertical > .btn-group:not(:first-child) > .btn`         | Passive    | The owning component supplies this relationship. |
| `.btn .badge`                                                       | Passive    | The owning component supplies this relationship. |
| `.alert-dismissible .btn-close`                                     | Overlays   | The owning component supplies this relationship. |
| `.btn-close`                                                        | Passive    | The owning component supplies this relationship. |
| `.btn-close:hover`                                                  | Passive    | The owning component supplies this relationship. |
| `.btn-close:focus`                                                  | Passive    | The owning component supplies this relationship. |
| `.btn-close:disabled`                                               | Passive    | The owning component supplies this relationship. |
| `.btn-close.disabled`                                               | Passive    | The owning component supplies this relationship. |
| `.btn-close-white`                                                  | Passive    | The owning component supplies this relationship. |
| `.toast-header .btn-close`                                          | Overlays   | The owning component supplies this relationship. |
| `.modal-header .btn-close`                                          | Overlays   | The owning component supplies this relationship. |
| `.offcanvas-header .btn-close`                                      | Overlays   | The owning component supplies this relationship. |
| `.placeholder.btn::before`                                          | Passive    | The owning component supplies this relationship. |
| `--bs-btn-close-color`                                              | Passive    | Close button supplies this property.             |
| `--bs-btn-close-bg`                                                 | Passive    | Close button supplies this property.             |
| `--bs-btn-close-opacity`                                            | Passive    | Close button supplies this property.             |
| `--bs-btn-close-hover-opacity`                                      | Passive    | Close button supplies this property.             |
| `--bs-btn-close-focus-shadow`                                       | Passive    | Close button supplies this property.             |
| `--bs-btn-close-focus-opacity`                                      | Passive    | Close button supplies this property.             |
| `--bs-btn-close-disabled-opacity`                                   | Passive    | Close button supplies this property.             |

The conformance gate checks the official names against the shipped cascade and this partition,
including absence of the deferred names. The size-group comma mates ship and aren't deferred.

## Mixer decision and calibrated readings

The light endpoint is `color(srgb 0.00742457 0.0232852 0.0925134)`; the dark endpoint is
`var(--vn-palette-white-base)`. Hover is 12%; active is 22%. The bare calibration strings that
fix the decision are `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` and
`color(srgb 1 1 1 / 0.12)`, with active readings at `/ 0.22`.

The filled-primary readings include light hover `color(srgb 0.0288046 0.226321 0.817248)`,
light active `color(srgb 0.0263751 0.203249 0.734892)`, dark hover
`color(srgb 0.0248835 0.714208 0.933359)`, and dark active
`color(srgb 0.135692 0.746684 0.940932)`. The component proof transcribes the run-6 strings
for primary, secondary, tertiary, success, information mapped to info, warning, and danger.
Light and dark retain Bootstrap's gray fills and use the stated state mix; they have no Elements
specimen. Every comparison uses installed `matchesColor` over resolved `readStyle` strings.
The Chromium and Edge readings pass; no calibrated color departure was needed.

The ring reads a 3px spread with outline suppressed, using the calibrated primary color at 45%
alpha. Bare padding is 6px block and 12px inline, border 0, and radius 6px. Class-driven buttons
use a 1px border; small and large cases read 4/8px and 8/16px padding, with 4px and 8px radii.
Disabled opacity retains Bootstrap's 0.65 because the calibration did not measure Elements' opacity.

The guide records the tertiary class additions and the Elements choices of white filled text and
unchanged state borders. The installed comparison checks painted color within its tolerance;
these results do not claim byte-identical serialization across engines.

## Controls and restoration

The controls mutated `src/styles/components/_button.scss` through
`tmp/u7a/control-5.mjs`. Each restoration compared the file's bytes with its pre-plant backup.
Every comparison passed, with restored SHA-256
`5a022ec296a9f1b772ab2ad81ee4e705dad8a2c26026ed604f79a2c2409e1769`.
Scoped formatting occurred after these comparisons. No control remains in the returned sources.

| Control | Red reading | Log |
| --- | --- | --- |
| PLANT-SELECTOR | Commented out .btn-link:hover, rebuilt, then conformance exited 1 naming that missing selector; 1 failed and 7 passed tests at 20:15:04. | tmp/u7a/selector-red-5.log |
| PLANT-PHYSICAL | Planted margin-left: 1px; the styles guard exited 1 naming that declaration; 1 failed and 68 passed tests at 20:12:51. | tmp/u7a/physical-red-5.log |
| PLANT-ASYMMETRIC | Planted border-left-width: 1px without a twin; the styles guard exited 1 naming it; 1 failed and 68 passed tests at 20:13:22. | tmp/u7a/asymmetric-red-5.log |
| PLANT-TOKEN | Planted --vn-unregistered at root; canonical parity failed in the normal and emitted RTL cascades; 2 failed and 67 passed tests at 20:14:31. | tmp/u7a/token-red-5.log |

The final rebuilt styles and conformance runs passed after restoration. These controls establish
the named absence, asymmetric-declaration, and registry checks. They don't prove forced colors or
the unenforced fixture-placement law. The RTL artifact was read by the existing parity case;
no RTL implementation was authored.

## Other resolved deviations

- Sass initially rejected the element and component imports sharing the default button namespace.
  The component import takes the explicit button-component namespace. The styles and conformance
  commands passed after that fix; see `partials-fixed-5.log` and `presence-fixed-5.log`.
- The mounted mixin proof initially failed forward Tab traversal. It uses the native focus method
  and asserts the actual focus-visible state. Button interaction proofs use real pointer helpers
  and keyboard input. The corrected mixin run passed; see `mixin-confirmed-5.log`.
- PowerShell's stderr redirection classified npm notices as NativeCommandError even when Vitest
  passed. Subsequent logged gates use cmd redirection and report its actual exit code.
- Lint rejected extra expect message arguments and the helper's tuple-array spelling. Removing
  those arguments and using the equivalent ReadonlyArray spelling cleared lint.
- Typechecking rejected an outline-matrix destructure as possibly undefined. Fixing the literal
  tuple shape with as const cleared the comprehensive check. That typing fix doesn't close the
  separate placement violation that stops this report.

## Gates

These readings ran on Windows on 2026-09-20. The styles command builds the cascade before its
browser suite. Chromium and Edge each ran the complete styles project, including the Button
files. The other gates are Node or static checks and have no browser-channel axis.

### npm.cmd run format:check

Exit 0. Log: `tmp/u7a/format-final-5.log`. The final lines are:

```text
npm notice run @orkestrel/veneer@0.0.1 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 756ms on 86 files using 16 threads.
```

### npm.cmd run lint:check

Exit 0. Log: `tmp/u7a/lint-final-5.log`. The final lines are:

```text
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

### npm.cmd run check

Exit 0. Log: `tmp/u7a/check-fixed-5.log`. The final lines are:

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:styles
npm notice run tsc --noEmit -p configs/src/tsconfig.styles.json
npm notice run @orkestrel/veneer@0.0.1 check:app
npm notice run npm run check:app:browser
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

### npm.cmd run test:src:styles — managed Chromium

Exit 0. Log: `tmp/u7a/styles-final-5.log`. The final lines are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  20:16:26
   Duration  9.50s (transform 0ms, setup 369ms, import 288ms, tests 7.33s, environment 0ms)
```

### npm.cmd run test:src:core

Exit 0. Log: `tmp/u7a/core-final-5.log`. The final lines are:

```text
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  20:16:54
   Duration  245ms (transform 41ms, setup 31ms, import 27ms, tests 35ms, environment 0ms)
```

### npm.cmd run test:conformance

Exit 0. Log: `tmp/u7a/conformance-final-5.log`. The final lines are:

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  20:16:56
   Duration  3.83s (transform 77ms, setup 31ms, import 652ms, tests 2.99s, environment 0ms)
```

### npm.cmd run test:guides

Exit 0. Log: `tmp/u7a/guides-final-5.log`. The final lines are:

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  20:17:02
   Duration  507ms (transform 50ms, setup 30ms, import 305ms, tests 6ms, environment 0ms)
```

### PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles — Edge

Exit 0. Log: `tmp/u7a/edge-final-5.log`. The final lines are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  20:17:33
   Duration  16.59s (transform 0ms, setup 388ms, import 308ms, tests 8.02s, environment 0ms)
```

### npm.cmd run test:setup -- tests/setupStyles.test.ts

Exit 0. Log: `tmp/u7a/setup-final-5.log`. The final lines are:

```text
 Test Files  1 passed (1)
      Tests  71 passed (71)
   Start at  20:18:04
   Duration  1.18s (transform 119ms, setup 32ms, import 760ms, tests 239ms, environment 0ms)
```

The cascade SHA-256 after the final Edge build is:

`d544aae8cd656efcbf4e843427633a87c362e385fcfdbb3794134c328f0a6f7a`

## Status and provenance

`git diff --check` returned exit 0. The actual `git status --porcelain --untracked-files=all`
output is:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_theme.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/index.test.ts
 M tests/src/styles/mixins.test.ts
?? src/styles/components/_button.scss
?? src/styles/elements/_button.scss
?? tests/src/styles/components/button.test.ts
?? tests/src/styles/elements/button.test.ts
```

Git warned that it couldn't access `C:\Users\mikes/.config/git/ignore`; the status command
succeeded. The report, instruments, logs, and diff artifact live under ignored `tmp/`.

The brief marks prove blocked, so this report carries ordinary command output and no receipt.
No agent was spawned, dependency installed, commit made, scaffold-owned file edited, full build
run, tree-wide formatter run, lint fix run, or prohibited Git recovery command run.
The launching CLI's journal path and session identifier weren't supplied to this executor;
the launching Orchestrator must attach that provenance. Independent acceptance has not run.