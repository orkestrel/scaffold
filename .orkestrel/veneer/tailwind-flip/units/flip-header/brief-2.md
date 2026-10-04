# Unit flip-header-2 — finish the header after the neutrality ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit `flip-header` exactly as `/home/user/scaffold/tmp/codex/flip-header-brief.md` specifies (with its appended rulings and the Orchestrator confirmation), starting from the partial tree the first run left uncommitted, under the ruling in § The neutrality ruling. The first run's report is `/home/user/scaffold/tmp/codex/flip-header-last.md`; the complete report `/home/user/veneer/tmp/units/flip-header/report.md`; the P4 output `/home/user/veneer/tmp/units/flip-header/out/p4.json`.

## State at launch

`git status --porcelain` reads twelve modified tracked files, all this unit's (`app/browser/Showcase.ts`, `constants.ts`, `factories.ts`, `helpers.ts`, `sections/tailwindcss.html`; `tests/app/browser/Showcase.test.ts`, `constants.test.ts`, `factories.test.ts`, `helpers.test.ts`, `integration.test.ts`; `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`). Done: the compact sticky header (48px tall at 1280 × 800; the three face buttons `Bootstrap`, `Tailwind, no layer`, `Tailwind + layer` and the two mode buttons on one row at 1280 with no text wrapping), the hidden status, the brand line, the `ResizeObserver` writing `scroll-padding-top` and the contents column's `top` and `max-height`, the neutrality case with its planted `px-3` control, the scroll case, the label updates across the tests; the Showcase file passes 19. Not done: the P4 rerun (stopped at 1280 on 94 longhand departures), the 390px readings, every gate after the stop, the builds, the journey.

## The neutrality ruling

The first run's P4 criterion read strict equality of every computed longhand on the header between faces, and found 94 departures per Tailwind face at 1280: `tab-size` (preflight's `html { tab-size: 4 }` inherited; Bootstrap sets none) and zero-width `border-*-style` (`none` to `solid` from preflight's `* { border: 0 solid }`). Neither paints a pixel. The chrome rule of verdict § 5 and the first P4 (U5b) define a chrome departure as a box departure or a longhand departure outside the probe's invisible classes.

Rulings:

1. **The header neutrality criterion** is: zero box departures on the header and its descendants between the three faces at 390 and 1280, and zero computed-longhand departures after these exclusions: `tab-size`; a `border-*-style` longhand on a side whose width reads `0px` under the `bootstrap` face; a `border-*-color` longhand on such a side; the four replaced-class longhands U5b's P4 permits (`display` on the column, `flex-grow`, `min-height`, `min-block-size` on the figure) where they occur; and an inherited preflight default on `html` or `body` that the header's own classes do not set (`font-family`, `line-height`, `-webkit-text-size-adjust`, `font-feature-settings`, `font-variation-settings`, `tab-size`): report each excluded longhand's count. A departure outside these classes fails the case and the probe.
2. **The neutrality case** in `tests/app/browser/Showcase.test.ts` applies the same exclusions (as a declared list with a comment naming the ruling) and keeps its planted `px-3` control, which must still fail (a padding departure is not excluded).
3. **The P4 rerun** reports, per width, the box departures (expected 0), the excluded longhand counts by class, and the remaining departures (expected 0), twice, byte-identical.

## Scope deltas against the original brief

None beyond § The neutrality ruling.

## Acceptance criteria

The original brief's list, bare, in order, each with its exit in the report: `npm run check`; `npm run lint:check`; `npm run format:check`; `npm run test:app:browser`; `npm run test:setup:browser`; `npm run build`; `npm run build:showcase` (digest reported, not committed); `npm run test:journey` (every failing title ruled against § Host-bound set in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`; none new); the P4 rerun twice with `cmp`; `git diff --check`; `sha256sum dist/src/bootstrap/index.css` at `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

## Return shape

As the original brief, plus the excluded longhand counts per width, the 390px header height and the five buttons' boxes, the content share at 390 × 844 (expected at least 70%), the scroll readings (the first and a deep heading's top after a contents click, below the header by 8px, at both widths), and the journey's result. Nothing committed.

## Deviation contract

As the original brief, with ruling 1 replacing the first run's stop.
