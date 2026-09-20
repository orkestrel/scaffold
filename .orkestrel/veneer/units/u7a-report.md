<!-- Retained from u7a-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a.jsonl, thread 01a0c12a-a2e9-7ab3-badc-3546bcc95ea2, exit 0, 2026-09-20 19:48. A stop before editing: the brief's scope withheld tests/conformance.test.ts, whose explicit shipped list the row flip requires; superseded by units/u7a-brief-2.md. -->

# U7a report

Stopped before implementation because acceptance requires editing an explicitly off-limits file. Button CSS has not shipped.

## Deviation

- **Expected:** Flip Button's `selector` and `variable` compatibility rows to `shipped`, then pass `npm.cmd run test:conformance` using only owned files.
- **Found:** `tests/conformance.test.ts:55` declares `const listed: readonly string[] = []`. Its assertion at lines 59–61 requires `collectShippedComponents(readCompatibility())` to equal that empty list.
- **Exact evidence:** `tests/setupConformance.ts:537–549` includes a component when it has selector and variable rows and every such row is `shipped`; it excludes only the `engine` component. The Button rows are at `guides/veneer.md:505` and `guides/veneer.md:515`. Changing their statuses as required therefore adds `btn` to the returned list. After the cascade presence assertion passes, the independent list assertion would compare `['btn']` with `[]`. This is a source-derived blocker, not a recorded test failure.
- **Scope:** The brief explicitly makes `tests/conformance.test.ts` off-limits and requires stopping on a need to edit an off-limits file. Adding an accepted Button CSS row to withhold the component would evade the required shipped status rather than complete the assignment.
- **Done:** Read the brief and inspected the governing contracts, design evidence, token implementation, and conformance gate. Confirmed HEAD is `2bc922d` and the tracked working tree is clean.
- **Not done:** No source, test, or guide edits; no implementation gates, controls, or browser readings.
- **Required correction:** Authorize changing the conformance test's explicit component list to `['btn']` with this unit, or land that coordinated change through its owner before redispatch.

## Diff per file

`u7a-report.md` contains this report. No other file was changed.

The final `git diff --stat` and `git status --porcelain` readings produced no entries. Git printed a permission warning for `C:\Users\mikes/.config/git/ignore`. The report lives under ignored `tmp/` and does not appear in ordinary status output.

## Bindings and deferrals

No Button binding table or deferral table landed. The guide's Button CSS rows remain `accepted`.

## Mixer decision

No mixer decision landed. The calibration records bare hover as `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` in light mode and `color(srgb 1 1 1 / 0.12)` in dark mode. No implementation or engine comparison was performed.

## Controls

`PLANT-SELECTOR`, `PLANT-PHYSICAL`, and `PLANT-TOKEN` were not run. Nothing was planted, and no restoration was needed.

## Gates and digest

The following commands were not run because the scope blocker was found before editing: `build:src:styles`, `format:check`, `lint:check`, `check`, `test:src:styles`, `test:src:core`, `test:conformance`, and `test:guides` through `npm.cmd run`. The Edge styles run with `PLAYWRIGHT_CHANNEL=msedge` was also not run. There are no gate final lines or browser receipts to report.

`dist/src/styles/index.css` exists, but this unit did not build it. No acceptance digest was taken.

No agents were spawned. Nothing was installed, staged, or committed.