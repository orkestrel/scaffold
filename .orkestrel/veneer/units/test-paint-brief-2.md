# Unit Test-paint — successor brief 2: the ring reads a contrast ratio

## What changed and why

This brief supersedes `test-paint-brief.md`; that brief stands except for item 3's
ring reading, and `test-paint-report.md` is the baseline (the unit stopped before
editing because the brief said `readRing` "returns its width" while `guides/test.md` and
`src/browser/helpers.ts` define `readRing` as the contrast ratio the painted outline or box-shadow
reaches against its backdrop). The brief's wording was the Orchestrator's error; the API's
contract is unchanged.

## Role, engine, law, context, scope, host, controls, unknowns

As in `test-paint-brief.md`, verbatim.

## Execution

As in the previous brief, with item 3 corrected: the calibrated readings are `readContrast`
returning the ratio the browser's own sRGB readings give for the two `oklch()` pairs, `readRing`
over a focused control whose ring is an `oklch()` `box-shadow` returning the contrast ratio that
ring reaches against its backdrop (the number the existing proof at
`tests/src/browser/helpers.test.ts` asserts for a black ring over white is the pattern), and a
`color-mix()` tint with an out-of-gamut channel reading and clipping.

## Output, deviation contract, acceptance criteria, review evidence

As in the previous brief, with acceptance criterion 3 reading "The three calibrated readings,
with the ring read as a contrast ratio, pass on managed Chromium." Write the report to
`test-paint-report-2.md`.
