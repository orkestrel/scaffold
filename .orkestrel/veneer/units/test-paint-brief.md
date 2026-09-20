# Unit Test-paint — the paint readers read the modern colour spaces

## Role and engine

`sol` on Astra through `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/test`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. Sole writer in the Test checkout; commit nothing; install nothing; run no
`scaffold repair`, no tree-wide `format`, no lint `--fix`, no `npm run build`; never run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git add`.

## Objective

Make `@orkestrel/test`'s browser paint readers read every colour space a cascade hands back as a
computed value, so a consumer whose tokens are `oklch()` (Veneer) can measure contrast and rings
over its calibrated surface; and make an unreadable painted layer a refusal rather than a silent
skip.

## Law

Read from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`; `.claude/rules/tests.md`,
`typescript.md`, `architecture.md`, `names.md`, `browser.md`, `documentation.md`. Test's own
`AGENTS.md` resolves its law against that checkout. The governing guide is `guides/test.md` in the
Test checkout (its § Surface rows and doc-block summaries are parity targets `tests/guides.test.ts`
drives).

## Context

**The tree.** `HEAD` is `ed9b102` (named in the dispatch message); the working tree is clean
except `tmp/`. `node_modules` carries `@orkestrel/scaffold` 0.0.76. The browser project runs on
managed Chromium inside this sandbox (a browser project launched Playwright here on 2026-09-20).

**Measured facts.**

- `src/browser/helpers.ts` declares `parseColor(value): Color | undefined` (line 1693: reads
  `rgb()`/`rgba()` and `color(srgb r g b [/ a])` with channels `[\d.]+`, so a negative channel is
  refused), `parseCSSColor(value)` (line 1747: stages a probe and reads the computed `color`
  through `parseColor`), `matchesColor`, `blendColor`, `measureLuminance`, `measureContrast`,
  `readLayers(element)` (line 1886: walks ancestors reading `backgroundColor`, `continue`s on a
  layer `parseColor` refuses, breaks on an opaque one), `readBackdrop`, `readContrast(element,
  floor?)` (line 1962), `readRing(control, worn?)` (line 2018). `Color` is a readonly
  `[red, green, blue, alpha]` tuple on the 0 to 255 scale in `src/browser/types.ts`.
- Chromium serializes a computed `oklch()` or `oklab()` declaration as `oklch(L C H [/ a])` or
  `oklab(L a b [/ a])` (not as `rgb()`), and a `color-mix()` result as `color(srgb r g b [/ a])`
  whose channels can fall outside 0 to 1 (a negative or above-one channel for an out-of-gamut
  mix). Veneer's `src/styles/_tokens.scss` declares its palette in `oklch()` and mixes tints with
  `color-mix(in srgb, …)`.
- The mirrored proof for the helpers is `tests/src/browser/helpers.test.ts`; the
  `src:browser` project runs it on managed Chromium through `npm.cmd run test:src:browser`;
  `tests/guides.test.ts` asserts guide parity (`guides/test.md` § Surface carries `parseColor`
  and `readContrast` rows), so a changed doc-block summary changes the guide's row.

**Host.** Windows. Your exec shell is PowerShell with script execution disabled: run scripts as
`npm.cmd run <name>`; a `.ps1` file is refused. The `prove` tool is blocked here. Write
instruments under `tmp/test-paint/`. `git status` warns about a missing global ignore file; the
exit code is 0.

## Unknowns

- Which colour spaces beyond `oklch`, `oklab`, `lab`, `lch`, and `color(<space> …)` a Chromium or
  Edge computed value can carry for a `color` or `background-color` declaration; measure by
  declaring each on a probe and reading the computed string, and read what you measured.
- Whether an out-of-gamut `color(srgb …)` mix is clipped or gamut-mapped by the reader; rule it
  (clip to the 0 to 255 scale after conversion, and say so in the doc block) and prove it.

## Scope

**Owned.** `src/browser/helpers.ts` (the colour parsers and readers), `src/browser/types.ts` (only
if a shape must change), the mirrored proof file(s) under `tests/src/browser/`, `guides/test.md`
(the rows and summaries the changed doc blocks drive), the report. **Off-limits.** Everything
else: every content-owned and vendored path, `src/core/**`, `src/server/**`, `tests/setup*.ts`,
`package.json`.

## Execution

Perform the assignment directly and spawn nothing. Red first for every reading: the case over a
real browser control, run it red, implement, run it green; record each pair. Add no dependency:
the conversions are native arithmetic.

1. **`parseColor` reads the modern spaces.** It reads, in addition to the two forms it reads
   today: `oklch(L C H [/ a])` and `oklab(L a b [/ a])` (L as a number or a percentage, C and the
   a and b axes as numbers, H in degrees, `none` as zero), `lab()`, `lch()`, and `color(<space> …)`
   for `srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `xyz`,
   `xyz-d50`, and `xyz-d65`, and signed channels in every form; each converts to straight sRGB on
   the 0 to 255 scale through the CSS Color 4 matrices (OKLab to linear sRGB, XYZ D65 to linear
   sRGB, the D50 to D65 adaptation for `lab`, `lch`, `xyz-d50`, and `prophoto-rgb`, the sRGB
   transfer function), then clips each channel to the scale; every other input still returns
   `undefined`. Export the conversions it composes as their own helpers (`convert*` per the
   helper-prefix table) from the module and case each against a browser control:
   `parseCSSColor('color-mix(in srgb, <value> 100%, transparent)')` hands back the browser's own
   sRGB reading of the same colour, and the two agree within the `matchesColor` tolerance.
2. **A refused layer refuses.** `readLayers` throws an `Error` naming the element and the computed
   value when a painted layer (alpha above zero) resolves to no readable colour, instead of
   skipping it; `readBackdrop`, `readContrast`, and `readRing` therefore refuse too. Prove the
   refusal over a control the reader cannot read (a `background-image` layer is not a colour and
   stays outside this reader; use a colour syntax you deliberately leave unread, and name it in
   the doc block).
3. **The calibrated readings.** Cases over a mounted specimen whose `color` and `background-color`
   are `oklch()` declarations (Veneer's values `oklch(0.208 0.042 265.755)` over
   `rgb(255, 255, 255)` and `oklch(0.929 0.013 255.508)` over `oklch(0.21 0.013 256)`): `readContrast`
   returns the ratio the browser's own sRGB readings give; `readRing` over a focused control whose
   ring is an `oklch()` `box-shadow` returns its width; a `color-mix()` tint with an out-of-gamut
   channel reads and clips.
4. **Doc blocks and the guide.** Each changed reader's doc block states what it reads now;
   `guides/test.md` rows follow through `npm.cmd run test:guides`.
5. **Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:src:browser`, `npm.cmd run test:guides`, `npm.cmd run test:policy`; record
   each command's final lines.

## Output

Write `test-paint-report.md` and return its content: the diff per file; the computed
strings you measured for each space on Chromium; each red-then-green pair; each gate's final
lines; `git status --porcelain`; deviations in the usual shape.

## Deviation contract

Stop and report on: a colour space whose computed serialization you cannot measure; a gate red
after your own fix inside owned files; a need to edit an off-limits file. Decide, record, and
carry on from: helper names within the prefix table, case order, doc-block wording, the tolerance
the controls use.

## Acceptance criteria

1. `parseColor` reads every form item 1 names, with a browser control per space agreeing within
   tolerance; the conversions are exported and cased.
2. `readLayers` refuses an unreadable painted layer with an `Error` naming it; the refusal is
   cased.
3. The three calibrated readings pass on managed Chromium.
4. `format:check`, `lint:check`, `check`, the browser proof, `test:guides`, and `test:policy`
   exit 0; guide parity green.
5. `git status --porcelain` shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
