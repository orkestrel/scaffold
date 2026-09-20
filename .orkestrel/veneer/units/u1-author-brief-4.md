# Unit U1-author — successor brief 4

## What this supersedes

This brief supersedes `tmp/codex/u1-author-brief-3.md`, which amends brief 2, which amends brief 1;
all three stay in place unedited. Read them in order, then this one. Every section of those
briefs stands except where this file amends them.

## Why a successor

Run 3 (journal `../scaffold/tmp/codex/u1-author-3.jsonl`, thread
`01a0bd9f-0fa9-7dc0-a3bc-34396e65634e`) implemented the styles axis, proved it, and stopped on
two conflicts the briefs caused:

1. The vendored surface policy rejected `src/styles/index.ts` (`import './index.scss'`) as a
   barrel. That was a scaffold defect: the workspace rule prescribes exactly that entry. Scaffold
   `e8a34296` makes `readPolicySurface` accept the styles entry on its own terms, and repair pass 5
   vendored that copy into this checkout. `npm.cmd run test:policy` is green with the styles axis
   present (`109 passed | 1 skipped`).
2. `Theme`, `ThemeOptions`, and `createTheme` belong to `@orkestrel/console` under the fleet
   name-ownership rule. The engine's names change under § Amended names.

The Orchestrator committed run 3's styles axis as `f5d31f8` ("Land the styles axis and vendor the
surface-policy fix"); the checkout is clean at that commit. Those files remain yours to refine.

## Amended evidence

**Measurements at `f5d31f8` (2026-09-20, Orchestrator, outside the sandbox).** `format:check` 0;
`lint:check` 0; `check` 0 (all three scoped projects); `test:policy` 0; `test:config` 0
(`173 passed | 1 skipped`); `test:setup` 0 (`6 passed`, both setup proofs); `test:src:styles` 0
(`1 passed`); `scaffold audit --offline` reports no drift. `test:guides` stays red with the six
findings brief 2 lists; `test:journey` stays red on the empty suite. `dist/src/styles/` holds
`index.css`, `index.rtl.css`, and `index.js` from run 3's build.

**Fleet name ownership.** Before declaring any public name, read
`node_modules/@orkestrel/scaffold/dist/host/guides/*.md` for a `Surface` row carrying that name as
a code span; a name any hosted guide claims belongs to that package. Every name under § Amended
names was free on 2026-09-20. Record in the report each name you checked.

## Amended names

Replace brief 2's theme vocabulary everywhere, including the guide, the shell, the setup module,
and the test names:

| Brief 2 name      | Name to use            | Kind                                          |
| ----------------- | ---------------------- | --------------------------------------------- |
| `ThemeMode`       | `ColorScheme`          | `'light' \| 'dark'`                           |
| `ThemeOptions`    | `ColorModeOptions`     | interface, same members                       |
| `ThemeInterface`  | `ColorModeInterface`   | interface, same members (`mode: ColorScheme`) |
| `Theme` (class)   | `ColorMode`            | class in `src/browser/color-mode/ColorMode.ts` |
| `createTheme`     | `createColorMode`      | factory in `src/browser/factories.ts`         |
| `isThemeMode`     | `isColorScheme`        | guard in `src/browser/validators.ts`          |
| `THEME_ATTRIBUTE` | `COLOR_MODE_ATTRIBUTE` | `'data-bs-theme'`, frozen constant            |
| `THEME_KEY`       | `COLOR_MODE_KEY`       | `'theme'`, frozen constant (Bootstrap's documented storage key) |

The `mode` member keeps its name: it reads the `ColorScheme` the root carries. The method names
`apply`, `toggle`, and `destroy` stand. The mirrors are `tests/src/browser/color-mode/ColorMode.test.ts`,
`tests/src/browser/factories.test.ts`, `tests/src/browser/validators.test.ts`,
`tests/src/browser/constants.test.ts`, and `tests/src/browser/types.test.ts` only where the policy
mirror rule requires a proof for that module; the `## Tests` section of `guides/veneer.md` links the
three that carry behavior. The `## Methods` heading is `#### \`ColorModeInterface\``.

## Amended scope

**Owned, in addition to every earlier list.** `src/browser/color-mode/ColorMode.ts` and its mirror.
`src/browser/theme/` is not created. The styles files run 3 authored stay owned.

## Amended execution

Step 1 (styles axis) is done; do not redo it, but keep it green. Continue from brief 2's step 1b
under the amended names, then steps 2 through 9 as briefs 1 and 2 state, with brief 3's
placement amendment in force. In step 6, `PLANT-TYPE` now names `src/browser/index.ts` exporting a
function whose return type is `Ref<number>` imported from `vue`; keep the control's name out of
the tests as before.

## Output

As brief 2 states: overwrite `tmp/codex/u1-author-report.md` with the full report. Add one table
of the public names declared with the hosted guide each was checked against.
