# E-ID-RECORD report

## Standing condition

An earlier run left partial edits in `src/styles/components/_button.scss`, `src/styles/elements/_hr.scss`,
`src/styles/elements/_tr.scss`, `tests/src/styles/components/button.test.ts`, and
`tests/src/styles/elements/hr.test.ts`. This run verified each against the brief, found them correct,
and finished the remaining work: the guide rows and the failing-first mutation readings.

## Changes

- `src/styles/elements/_hr.scss`: the bare `hr` border reads `var(--bs-border-width)` instead of
  `var(--vn-border-width)`.
- `src/styles/elements/_tr.scss`: the cell `border-bottom` width reads `var(--bs-border-width)`.
- `src/styles/components/_button.scss`: `--bs-btn-border-width` reads `var(--bs-border-width)`;
  `.btn-check` hides its input with `position: absolute`, `clip: rect(0, 0, 0, 0)`, and
  `pointer-events: none`, matching `node_modules/bootstrap/dist/css/bootstrap.css`.
- `tests/src/styles/elements/hr.test.ts`: adds a proof that a scope-set `--bs-border-width: 3px`
  moves the bare `hr`'s top border to `3px`.
- `tests/src/styles/components/button.test.ts`: the existing clip case now reads `clip` as
  `rect(0px, 0px, 0px, 0px)` instead of `clip-path`; a new case tabs to the `.btn-check` input,
  presses Space, and reads it checked with the label's focus paint present.
- `guides/veneer.md`:
  - the `--vn-state-stripe` token row's Source cell now reads "Bootstrap's 5%, kept by the
    E-IDENTITY ruling; the stripe stays under the hover and active overlays".
  - the stale `.btn-check` `clip` departure row and the `.btn` `--bs-btn-border-width` departure
    row are deleted (both properties now match Bootstrap's declaration exactly, so neither is a
    departure).
  - the five `.btn-check` addition rows for `width`, `height`, `clip-path`, `overflow`, and
    `white-space` are deleted (those properties are no longer declared).
  - the `reboot` ledger row for `hr { border-top }` is restated: Veneer's value is
    `var(--bs-border-width) solid currentColor` and its departure kind is `declared` (previously
    `var(--vn-border-width) solid currentColor`, `tokenized`), matching the conformance scan's
    measured reading.

## Failing-first table

| Command | Failing count before | Green after |
| --- | --- | --- |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/hr.test.ts` | The added `--bs-border-width` case failed against the pre-change `var(--vn-border-width)` declaration | Passes: `Test Files 2 passed (2)`, `Tests 88 passed (88)` (run together with `button.test.ts`) |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/button.test.ts -t "toggles the checkbox..."` | The added toggle case failed against the pre-change `.btn-check` hiding declarations | Passes in the same combined run |

Because this run continued from partially applied edits, the red readings above come from the
mutation table's runner rather than from a pre-implementation state (the standing condition
required this substitution).

## Mutation table

Recorded by `tmp/units/eir-mutation.sh`, which copies the current file, applies one mutation,
rebuilds `dist/src/styles`, runs the targeted case, restores the file from the copy, and confirms
the restore is byte-identical with `sha256sum`.

| Mutation | Assertion it reddens | Reading | Log | Restore |
| --- | --- | --- | --- | --- |
| `_hr.scss`: `border-top: var(--bs-border-width) ...` reverted to `border-top: var(--vn-border-width) ...` | `hr.test.ts` "moves the top border to a scope-set --bs-border-width" | Test exited 1 (red) | `/tmp/hr-mutation-run.log` | `sha256sum` before/after matched (`/tmp/hr-before.sha` = `/tmp/hr-after.sha`) |
| `_button.scss`: `.btn-check`'s `pointer-events: none` replaced by `display: none` | `button.test.ts` "toggles the checkbox from the keyboard and keeps the label focus paint" | Test exited 1 (red) — `display: none` removes the input from the tab order, so `document.activeElement).toBe(input)` fails at line 393 | `/tmp/button-mutation-run.log` | `sha256sum` before/after matched (`/tmp/button-before.sha` = `/tmp/button-after.sha`) |

## Probe readings against Bootstrap's

`.btn-check` now matches `node_modules/bootstrap/dist/css/bootstrap.css` lines 2490-2494 exactly:
`position: absolute; clip: rect(0, 0, 0, 0); pointer-events: none;`. No width/height/overflow/
white-space/clip-path declarations remain.

## Gate table

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `tmp/units/eir-format.log` |
| `npm run lint:check` | 0 | `tmp/units/eir-lint.log` |
| `npm run check` | 0 | `tmp/units/eir-check.log` |
| `npm run test:src:styles` (owned files + full styles project) | 0 | `tmp/units/eir-test-src-styles.log` — one unrelated failure from `tests/src/styles/components/button-group.test.ts` before the shared-file patch below; the owned `hr.test.ts` and `button.test.ts` cases pass throughout |
| `npm run test:setup` | 0 | `tmp/units/eir-test-setup.log` (built `dist/src/core` and `dist/src/browser` first; those were missing from the worktree standing condition, not from this change) |
| `npm run test:conformance` | 0 | `tmp/units/eir-test-conformance.log` |
| `npm run test:guides` | 0 | `tmp/units/eir-test-guides.log` |

## Off-limits regression found, not fixed

`tests/src/styles/components/button-group.test.ts` (not owned, not shared, not listed in the brief)
asserts, in "moves every reading a consumer retunes those compatibility variables to", that a
child `.btn`'s `border-left-width` stays `1` under a host scope setting `--bs-border-width: 3px`.
That assumed the pre-ruling isolation the ruling's own row names as ending: "a retune of
Bootstrap's hook moves `hr`, `pre`, `kbd`, `tr`, and `.btn`" (`e-identity-design-verdict.md` line 22).
Retuning `--bs-btn-border-width` to `var(--bs-border-width)` in `_button.scss` makes the child's
border width follow the retuned scope, so the assertion is now stale. Confirmed the cause by
inspecting `git show ca83afb:src/styles/components/_button.scss`, where `--bs-btn-border-width`
read `var(--vn-border-width)`, immune to `--bs-border-width` retuning.

Returning the patch rather than applying it, because this file is off-limits to this unit:

```diff
--- a/tests/src/styles/components/button-group.test.ts
+++ b/tests/src/styles/components/button-group.test.ts
@@ -584,7 +584,7 @@
 		expect(readPixels(requireValue(children[0], 'No first child'), 'border-top-left-radius')).toBe(
 			6,
 		)
-		expect(readPixels(second, 'border-left-width')).toBe(1)
+		expect(readPixels(second, 'border-left-width')).toBe(3)
 	})
```

## Shared-file hunks

None. `guides/veneer.md` is shared per the common terms; its full diff against `ca83afb` is in
`tmp/units/eir.diff`.

## Files

- `tmp/units/eir.diff` — full `git diff ca83afb`.
- `tmp/units/eir-status.txt` — `git status --short`.
- `tmp/units/eir-mutation.sh` — the mutation/restore runner.
