# Unit U7a — fix round brief 7: the audit's implementation findings

## What changed and why

This brief supersedes `u7a-brief-6.md`; that brief stands (with briefs 5 to 1 it
carries), and `u7a-report-6.md` with `u7a-report-5.md` is the baseline. The
audit round on the brief-6 tree (claims `../u7a-audit-claims.md`; the verifier's whole
chain exit 0 on Chromium and Edge, cascade digest `d544aae8…`) confirmed every claim except the
outline-state proofs and returned the implementation findings below. Audits cover implementation
only by the user's ruling; every item here is code, and no wording, comment, or guide-prose
change is asked for beyond the binding rows the checker's probe compares with the partial.

## Findings carried

Each names its source lane and site. Close every one; record each closure in the report with
the red-then-green pair where a case pins it.

1. (analyst claim 9; reviewer 24) `tests/src/styles/components/button.test.ts:98-121` reads the
   outline variant at rest, hover, and disabled only; the outline active mix
   (`src/styles/components/_button.scss:160-165`) and the ring on an outline host (`:94-103`)
   are read nowhere. Add, for each outline role and mode, the active paint read while held
   (`holdAccessible`, `releasePointer`) and the focus-visible ring after a guarded keystroke,
   with expectations in the exported setup tables (`BUTTON_OUTLINE_CASES` or a sibling).
2. (reviewer 16) `src/styles/components/_button.scss:131,134,141,148,156` bind every filled and
   hovered-outline role's text to `var(--vn-palette-white-base)`, including `light`, whose fill
   is near-white: `.btn-light` paints a white label on a white surface (about 1.07:1) and
   `.btn-outline-light:hover` the same. Bind the `light` role's text (filled, and outline on
   hover and active) to the dark foreground token Bootstrap uses for it, update the binding
   rows the guide's table carries for those properties if any changes, and assert each
   role's text-over-fill contrast per mode with `readContrast` (or `measureContrast` over the
   two read colours) against the 4.5:1 floor, with the expectations in the setup tables; run
   red first on `light`.
3. (reviewer 17) `src/styles/_tokens.scss:264-266` and `src/styles/_theme.scss:12-14,20-22`
   declare `--vn-state-mixer`, `--vn-state-hover`, and `--vn-state-active` by hand in every
   mode scope while `theme-tokens` (`_mixins.scss:80`) owns every mode-dependent token and its
   maps already carry the three keys. Move the three declarations into `theme-tokens`
   (`#{map.get($values, 'state-mixer')}` and the two percentages) and delete the hand copies;
   the token parity case and the mode cases stay green.
4. (reviewer 18) The two Button test files reach `userEvent` from `vitest/browser` for
   keyboard, hover, and click (`elements/button.test.ts:13,55`;
   `components/button.test.ts:13,50,150,152,158,207`) while the installed
   `@orkestrel/test/browser` exports `pressKeys`, `hoverAccessible`, and `clickAccessible`
   (`AGENTS.md`: reuse an installed `@orkestrel/*` primitive whose semantics match). Replace
   every `userEvent` use with the installed helper; no `vitest/browser` import remains in the
   two files except what the installed helpers need.
5. (reviewer 19) `src/styles/_mixins.scss:30-31`: the shared `focus-ring` mixin reads
   `--vn-button-highlight` and `--vn-button-shadow` in its forced-colours branch, coupling a
   generic mixin to the button token group. Give the mixin `$highlight` and `$reset`
   parameters with neutral defaults (a `--vn-focus-*` token the mixin owns, added to the
   registry and the theme closure), and pass the button values from the button callers.
6. (reviewer 20) `src/styles/components/_button.scss:114` writes
   `box-shadow: var(--vn-button-shadow)` in the disabled rule while every other declaration
   reads the `--bs-btn-*` layer; read `var(--bs-btn-box-shadow)` there as `:32` does.
7. (reviewer 21; checker observation) `src/styles/components/_button.scss:85` adds a bare
   `.btn:active` to the active group, a superset of the official
   `:not(.btn-check) + .btn:active` and `.btn:first-child:active`, so a `.btn` label after an
   unchecked `.btn-check` takes the active paint Bootstrap withholds. Drop `.btn:active`;
   add a case that presses an unchecked `.btn-check + .btn` label and reads no active paint.
8. (reviewer 23) `tests/src/styles/mixins.test.ts:31-32` asserts `:focus-visible` after a bare
   `specimen.focus()`, which holds only while no pointer interaction precedes the case. Send
   the same guarded keystroke the Button proofs send (through `pressKeys`) before reading.
9. (reviewer 25) `src/styles/_tokens.scss:18` holds the light mixer as the literal
   `color(srgb 0.00742457 0.0232852 0.0925134)`, the srgb rendering of `$light['text']`; make
   the light mixer end the text token (`var(--vn-text-body-base)`) so a retune moves the tint
   with the text, and confirm the bare hover and active readings still match the calibration
   strings on Chromium and Edge (the mix space is srgb, so the rendering is identical).

Not carried (recorded in the verdict): reviewer 22 (`--bs-btn-focus-shadow-rgb` declared and
unread — a compatibility departure U7e records in one row; the ring stays calibrated);
reviewer 26 (the symmetric-pair admission trades enforcement for the build's shorthand merge;
the RTL byte-copy invariant is unharmed); the dual-engine configuration remark (the Edge run is
the verifier's step 12, exit 0, through the `PLAYWRIGHT_CHANNEL` override this workspace uses).

## Role, engine, law, context, host, unknowns, output, deviation contract

As in `u7a-brief-6.md`, verbatim, with the standing clause on enumerating assertions.
`HEAD` is `2bc922d`; the working tree carries the complete brief-6 result, uncommitted. Continue
from it; do not restore or reset anything. Instruments under `tmp/u7a/`.

## Scope

As in brief 6 (the two partials, `_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`src/core/constants.ts`, the two Button test files, `mixins.test.ts`, `tests/setupStyles.ts`
tables, `tests/setupStyles.test.ts` inventory, `guides/veneer.md` binding rows and the token
rows a new `--vn-focus-*` token adds, `tests/src/core/index.test.ts` if the registry's shape
changes). Everything else stands.

## Controls

`PLANT-LIGHT`: set the `light` role's text back to white; the contrast case must red naming the
role; restore. `PLANT-CHECK`: restore the bare `.btn:active` selector; the unchecked-label case
must red; restore. Byte comparison on restore; name no test for a control.

## Execution

Close the findings in order 3, 5, 9, 6, 7, 2, 4, 8, 1 (tokens and mixin first, then partials,
then proofs), running `npm.cmd run test:src:styles` after each; then the two controls; then
record: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
`npm.cmd run test:src:core`, `npm.cmd run test:setup -- tests/setupStyles.test.ts`,
`npm.cmd run test:src:styles`, `npm.cmd run test:conformance`, `npm.cmd run test:guides`,
`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`, and the cascade's SHA-256.

## Output

Write `u7a-report-7.md` and return its content: per finding, the change and its
red-then-green pair (command and counts); the light role's text token and the contrast
readings per role and mode; the controls' red readings and restore proofs; each gate's final
lines; the digest; the actual `git diff --stat` and `git status --porcelain
--untracked-files=all`. Do not repeat reports 5 and 6.

## Acceptance criteria

1. Every finding 1 to 9 is closed with its case green on managed Chromium and Edge; the
   contrast case covers every role in every mode; no `userEvent` remains in the two files.
2. The two controls reddened and are restored byte-for-byte.
3. Every gate in § Execution exits 0; the presence check still passes with the rows `shipped`.
4. `git status --porcelain --untracked-files=all` shows only the owned set and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 5 and 6.
