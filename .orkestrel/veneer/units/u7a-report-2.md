<!-- Retained from u7a-2-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-2.jsonl, thread 01a0c12d-f205-77b3-aff2-22beb621e0f8, exit 0, 2026-09-20 19:55. A stop before editing: the inherited close-family deferral collides with the U3-retained --bs-btn-close-filter declaration; superseded by units/u7a-brief-3.md. -->

# U7a successor report

Stopped before implementation because the close-family deferral requirement conflicts with a property the baseline already ships. Button CSS has not shipped. The conformance-list scope correction in `u7a-brief-2.md` resolves the previous stop.

## Deviation

- **Expected:** Defer the `--bs-btn-close-*` family to its later owner, keep every deferred name absent from the built cascade, and change `_mixins.scss` only for `focus-ring`.
- **Found:** `src/styles/_mixins.scss:138` already declares `--bs-btn-close-filter` inside `theme-tokens`. The root and theme scopes include that mixin. Adding this property to the deferral table makes the real presence scanner reject the built baseline, even while Button's CSS rows remain `accepted`.
- **Exact evidence:** The focused run returned `Deferred name --bs-btn-close-filter is present in the built cascade`. `tests/setupConformance.ts:596` emits that rejection. The same run accepted the baseline without deferrals and accepted the absent `--bs-btn-close-opacity` property as deferred.
- **Conflicting existing contract:** `guides/veneer.md:390` explicitly retains `--bs-btn-close-filter` until the owning component supplies its canonical token. The research ledger assigns this property's root and dark entries to U3 Tokens at lines 321 and 394. The analyst's design report also says to retain it. The inherited brief instead assigns the `--bs-btn-close-*` family to later units without naming this existing exception.
- **Scope:** Removing the declaration changes `theme-tokens`, outside the grant for `focus-ring` alone. It also conflicts with the root and dark compatibility inventories in the off-limits `tests/setupStyles.ts:475` and `tests/setupStyles.ts:553`. Leaving it declared but deferring it fails the scanner. Treating it as an exception to the brief's family-wide deferral requires a ruling on that requirement.
- **Done:** Read the effective brief, governing contracts, design evidence, and relevant source. Confirmed HEAD `2bc922d` and a clean tracked tree. Built the baseline cascade and executed the focused scanner comparison.
- **Not done:** No product, guide, or tracked test edits; no Button implementation, shipped-row flip, conformance-list change, browser calibration, or acceptance controls.
- **Required correction:** Explicitly retain the already-declared `--bs-btn-close-filter` property as the U3 exception, outside U7a's close-family deferrals and token-binding obligation, while its component owner retains responsibility for canonicalizing it.

## Executed evidence

The baseline build command exited 0:

```text
npm.cmd run build:src:styles
dist/src/styles/index.css      31.41 kB │ gzip: 4.06 kB
dist/src/styles/index.rtl.css  31.41 kB │ gzip: 4.06 kB
dist/src/styles/index.js        0.00 kB │ gzip: 0.02 kB
✓ built in 245ms
```

The focused instrument command exited 1:

```text
node node_modules/vitest/vitest.mjs run --config tmp/u7a/deferral.config.ts --no-cache --reporter=verbose

✓ accepts the baseline without a close-filter deferral
✓ accepts an absent close-family property as deferred
× requires the deferred close-filter property to be absent

Expected: undefined
Received: "Deferred name --bs-btn-close-filter is present in the built cascade"

Test Files  1 failed (1)
     Tests  1 failed | 2 passed (3)
  Duration  954ms (transform 83ms, setup 0ms, import 688ms, tests 115ms, environment 0ms)
```

The instrument invokes the actual `scanCompatibilityPresence` function with `readCompatibility()`, `readOracleInventory()`, and `readBuiltCascade()`. Its coverage is the existing cascade's deferral handling. It does not prove Button selectors, rendering, or a shipped-row transition. The absent close-opacity comparison distinguishes a valid family deferral from the present close-filter rejection. No source mutation was needed.

The brief marks the `prove` tool blocked. This run is fallback instrument evidence, not a `prove` receipt. The executed instrument and its configuration remain under `tmp/u7a/` for review.

## Diff per file

No tracked file changed. The scratch additions are `tmp/u7a/deferral.config.ts`, `tmp/u7a/deferral.test.ts`, and this report, `u7a-report-2.md`.

The final `git diff` and `git status --porcelain` readings contained no entries. Git printed a permission warning for `C:\Users\mikes/.config/git/ignore`; the commands exited 0. The scratch files are under ignored `tmp/`.

## Bindings, deferrals, and mixer

No Button binding table or deferral table landed. The selector and variable rows remain `accepted`, and the explicit conformance list remains empty.

No mixer decision landed. The calibration records bare hover as `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)` in light mode and `color(srgb 1 1 1 / 0.12)` in dark mode. This unit performed no browser comparison of candidate mixes.

## Controls and gates

`PLANT-SELECTOR`, `PLANT-PHYSICAL`, and `PLANT-TOKEN` were not run. Nothing was planted in the shipped source, so no restoration or byte comparison was required.

The ordinary `test:conformance` red-on-flip run and the acceptance gates were not run: `format:check`, `lint:check`, `check`, `test:src:styles`, `test:src:core`, `test:conformance`, and `test:guides`. The Edge styles run with `PLAYWRIGHT_CHANNEL=msedge` was not run. There are no Chromium or Edge Button readings to report.

The SHA-256 of `dist/src/styles/index.css` after the successful baseline build is:

```text
8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
```

This digest identifies the baseline cascade, not a completed Button artifact.

No agents were spawned. Nothing was installed, staged, or committed. The CLI journal path and session identifier were not supplied to this executor and were not found among this checkout's U7a scratch artifacts; the launching Orchestrator owns that provenance.