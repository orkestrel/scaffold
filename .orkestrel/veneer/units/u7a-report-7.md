<!-- Retained from u7a-7-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-7.jsonl, thread 01a0c172-44b3-7ff0-a300-9c01f9c289e4, exit 0, 2026-09-20 20:57. The fix round closed findings 3 and 5 and stopped on finding 9: the light mixer as the text token breaks the calibration proofs (the reviewer's premise was false); superseded by units/u7a-brief-8.md, which reverts finding 9 and continues. -->

# U7a fix report 7

Stopped under the inherited deviation contract after the finding 9 change made the styles gate
red. The requested body-text binding passes the added retuning proof, but it fails the existing
light-mode calibration proofs. The assignment is incomplete. The working tree remains
uncommitted at HEAD `2bc922d`; the changes and failing expectations remain in place.

The effective brief is `u7a-brief-7.md`. Its inherited stop condition is “a gate red
after your own fix inside owned files.” No later finding, control, or final gate ran after that
condition occurred.

## Stop evidence

Expected: replacing the light mixer with `var(--vn-text-body-base)` preserves the calibration
strings while making the interaction tints follow a retuned body-text token.

Found: `npm.cmd run test:src:styles` exits 1 after that substitution. The retuning case passes,
but the following calibration cases fail:

- The filled-role light-mode cases for `primary`, `secondary`, `tertiary`, `success`, `info`,
  `warning`, `danger`, `light`, and `dark`, at the hover comparison in
  `tests/src/styles/components/button.test.ts:58`.
- The checked-label active-paint case in `tests/src/styles/components/button.test.ts:156`.
- The bare-button light-mode case at the hover comparison in
  `tests/src/styles/elements/button.test.ts:84`.

Each failure reports `AssertionError: expected false to be true` from `matchesColor`. The
existing expected colors were not changed. Log: `tmp/u7a/step-9-after-7.log`.

Hypothesis: the calibrated light endpoint is not the sRGB rendering of the body-text token.
No further investigation ran after the stop.

## Findings

The following table records this pass in the required execution order.

| Finding | Change and result |
| --- | --- |
| 3 — state-token ownership | Moved `--vn-state-mixer`, `--vn-state-hover`, and `--vn-state-active` into `theme-tokens`, reading their map entries. Removed the hand declarations from `_tokens.scss` and `_theme.scss`, and removed the unused `sass:map` import from `_tokens.scss`. The styles suite passes. This consolidation has no red proof claimed. |
| 5 — neutral focus defaults | Added `$highlight` and `$reset` parameters to `focus-ring`, defaulting to `--vn-focus-highlight` and `--vn-focus-reset`. Added those names to `TOKEN_NAMES.focus`, their `Highlight` and `none` values to the light and dark maps, and their declarations to `theme-tokens`. The element and component Button callers pass their button tokens explicitly. Added the neutral token row to the guide. Token parity ran red before the declarations and green afterwards. Forced-colors browser behavior was not measured in this pass. |
| 9 — light mixer binding | Added `retunes the light interaction tints with the body text token`, which reads hover and held active paint after a body-text override. The case ran red against the literal mixer. Changed the light map entry to `var(--vn-text-body-base)`. The retuning case then passes, but the styles suite fails on the existing calibration expectations. This finding remains open. |
| 6 — disabled compatible shadow | Not attempted before the stop. |
| 7 — unchecked-label active paint | Not attempted before the stop. |
| 2 — light foreground and role contrast | Not attempted before the stop. The light role still uses `--vn-palette-white-base`; no role/mode contrast measurements were taken. |
| 4 — installed interaction helpers | Not attempted before the stop. The inherited `userEvent` uses remain. |
| 8 — guarded mixin focus proof | Not attempted before the stop. |
| 1 — outline active and focus proofs | Not attempted before the stop. |

The registry parity assertions derive their population from `TOKEN_NAMES`, so adding
`focus.highlight` and `focus.reset` required no expected-name list edit. This pass adds no setup
export and changes no export-inventory assertion.

## Executed commands

Every run below invokes `npm.cmd run test:src:styles`, which builds the cascade before running
the browser suite. The corresponding `.cmd` instrument clears `PLAYWRIGHT_CHANNEL` to select
managed Chromium. These readings were taken on Windows on 2026-09-20.

After finding 3, `tmp/u7a/step-3-7.cmd` exits 0. The final lines of
`tmp/u7a/step-3-7.log` are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  20:53:32
   Duration  12.16s (transform 0ms, setup 371ms, import 317ms, tests 7.26s, environment 0ms)
```

For finding 5, `tmp/u7a/step-5-red-7.cmd` exits 1 after adding the registry names but before
declaring their values. The token partition and right-to-left partition assertions name the
missing `--vn-focus-highlight` and `--vn-focus-reset` declarations. The final lines of
`tmp/u7a/step-5-red-7.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  2 failed | 67 passed (69)
   Start at  20:54:06
   Duration  9.68s (transform 0ms, setup 377ms, import 287ms, tests 7.51s, environment 0ms)
```

After the finding 5 implementation, `tmp/u7a/step-5-green-7.cmd` exits 0. The final lines of
`tmp/u7a/step-5-green-7.log` are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  20:54:59
   Duration  9.57s (transform 0ms, setup 351ms, import 286ms, tests 7.38s, environment 0ms)
```

For finding 9, `tmp/u7a/step-9-red-7.cmd` exits 1 before changing the mixer. Only the added
retuning case fails, at its hover assertion. The final lines of `tmp/u7a/step-9-red-7.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  1 failed | 69 passed (70)
   Start at  20:55:43
   Duration  9.66s (transform 0ms, setup 351ms, import 295ms, tests 7.50s, environment 0ms)
```

After the mixer substitution, `tmp/u7a/step-9-after-7.cmd` exits 1. The retuning case passes,
but this is not a green pair for the gate. The final lines of `tmp/u7a/step-9-after-7.log` are:

```text
 Test Files  2 failed | 7 passed (9)
      Tests  11 failed | 59 passed (70)
   Start at  20:56:11
   Duration  8.82s (transform 0ms, setup 358ms, import 289ms, tests 6.67s, environment 0ms)
```

## Controls and final gates

`PLANT-LIGHT` and `PLANT-CHECK` did not run. No control was planted, and no byte-restoration
proof is claimed.

The final gate chain did not run. This includes `npm.cmd run format:check`,
`npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run test:src:core`,
`npm.cmd run test:setup -- tests/setupStyles.test.ts`, the final
`npm.cmd run test:src:styles`, `npm.cmd run test:conformance`, `npm.cmd run test:guides`, and
`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`. There are no final-gate lines or Edge
readings to report from this pass. The inherited shipped rows remain unchanged; the presence
check was not rerun.

## Digest and Git evidence

The SHA-256 of `dist/src/styles/index.css` after the failing finding 9 run is
`6c13f0785eb46eb0fe8921ebfcef5e1abfb897aff257b0957fde5525d1776b40`.
This digest identifies the stopped tree, not an accepted cascade.

`node tmp/u7a/evidence-7.mjs` exits 0 and retains the actual diff in
`tmp/u7a/actual-diff-7.patch`, including the untracked source and test files through
`git diff --no-ext-diff --no-index`. The diff SHA-256 is
`352edeb1379b68f5ec793dc8401ebb11e1b6d4b1b8ab0d5d41b81e6d83f694fc`.
`git diff --check` exits 0.

The actual `git diff --stat` output is:

```text
 guides/veneer.md                | 180 +++++++++++++++++++++++++++----
 src/core/constants.ts           |  16 +++
 src/styles/_mixins.scss         |  20 ++++
 src/styles/_tokens.scss         |  17 +++
 src/styles/index.scss           |   2 +
 tests/conformance.test.ts       |   2 +-
 tests/setupStyles.test.ts       |  69 ++++++++++++
 tests/setupStyles.ts            | 228 ++++++++++++++++++++++++++++++++++++++++
 tests/src/styles/index.test.ts  |  17 ++-
 tests/src/styles/mixins.test.ts |  16 +++
 10 files changed, 537 insertions(+), 30 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
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

Removing the hand declarations makes `_theme.scss` equal HEAD, so it no longer appears in
status. The report, instruments, logs, and diff artifact are under ignored `tmp/`. Git warns
that it cannot access `C:\Users\mikes/.config/git/ignore`; the evidence commands succeed.

No agent was spawned, dependency installed, commit made, or scaffold-owned file edited. No
full build, tree-wide formatter, lint fix, or prohibited Git recovery command ran. The brief
marks `prove` blocked, so this report carries command evidence and no receipt. The dispatch
did not supply the launching CLI journal path or session identifier. Independent acceptance
has not run.