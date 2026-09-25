# Unit E-ID-MOTION-REDUCED round 2 — report

Applied Items 1 to 6 in `guides/veneer.md`, `src/styles/components/_spinner.scss`,
`tests/src/styles/components/spinner.test.ts`, and `tests/src/styles/components/placeholder.test.ts`. All named
gates exit 0, and Item 6's plant failed the rendering assertion as required, then was restored byte-identically.

## Item 1 — § Spinner classes, "keeps it turning"

Before: "The release slows each spinner to `1.5s` instead and keeps it turning, so § Departures"

After: "The release slows each spinner to `1.5s` instead and keeps each one moving, so § Departures"

## Item 2 — the status-role sentence

Before: "A spinner's status role and its label are what report the wait, so a still spinner still reports that work
is running."

After: "A spinner's status role and its label report the wait to assistive technology, so there a still spinner
loses only its motion; on screen the border spinner rests as an open ring and the grow spinner as a whole disc."

## Item 3 — "each spinner turns" and the `spinner-grow` keyframes cell

Before (prose): "each spinner turns without the reduced-motion preference and stands still under it"

After (prose): "each spinner runs its animation without the reduced-motion preference and stands still under it"

Before (`spinner-grow` row): "and its dot keeps pulsing."

After (`spinner-grow` row): "and its disc keeps pulsing."

## Item 4 — `_spinner.scss` comment lines

Before:
```
// still. The spinner's status role and its label are what report the wait, so a still spinner
// keeps saying that work is running.
```

After:
```
// still. The spinner's status role and its label report the wait to assistive technology, so there
// a still spinner loses only its motion.
```

## Item 5 — test titles

Before: `'stops $name under the reduced-motion preference and turns it again without it'`

After: `'stops $name under the reduced-motion preference and runs it again without it'`

Before (`spinner.test.ts`): `'gates nothing on a width boundary'`

Before (`placeholder.test.ts`): `'gates its animations on the reduced-motion preference and nothing on a width
boundary'`

After (both files): `'gates this family on the reduced-motion preference alone'`

## Item 6 — remove the `readText` assertion, and the plant

Removed `expect(readText(spinner)).toBe('Loading...')` and the `readText` import (no other use in the file).

Plant: added `.visually-hidden { display: none; }` under `@include reduced-motion` in the `.spinner-grow` rule.
Reading, from `mred-instruments/r2/mred-2-plant-label.log.txt`:

```
FAIL  tests/src/styles/components/spinner.test.ts:183:2 > spinner classes > shows 'spinner-grow' as a whole still
disc under the reduced-motion preference and keeps its label
AssertionError: expected false to be true // Object.is equality
 ❯ tests/src/styles/components/spinner.test.ts:195:29
    195|    expect(isRendered(label)).toBe(true)
Tests  2 failed | 31 passed (33)
exit=1
```

The plant failed at the rendering assertion (`expect(isRendered(label)).toBe(true)`) with an `AssertionError`, on
both the `spinner-grow` and `spinner-grow-sm` cases. Restored `_spinner.scss` byte-identically afterward; the
re-run in `mred-instruments/r2/mred-2-vitest.log.txt` shows both files green (33 passed, exit 0).

## Gate table

| Gate | Log | Exit |
| --- | --- | --- |
| `npm run build:src:styles` (pre-plant) | `mred-instruments/r2/mred-2-build.log.txt` | 0 |
| plant vitest run | `mred-instruments/r2/mred-2-plant-label.log.txt` | 1 (expected failure) |
| `npm run build:src:styles` (post-restore) | `mred-instruments/r2/mred-2-build2.log.txt` | 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts` spinner + placeholder | `mred-instruments/r2/mred-2-vitest.log.txt` | 0 |
| `npm run check` | `mred-instruments/r2/mred-2-check.log.txt` | 0 |
| `npm run lint:check` | `mred-instruments/r2/mred-2-lint.log.txt` | 0 |
| `oxfmt --check` on owned files | `mred-instruments/r2/mred-2-oxfmt-check.log.txt` | 0 |
| `npm run test:conformance` | `mred-instruments/r2/mred-2-conformance.log.txt` | 0 |
| `npm run test:guides` | `mred-instruments/r2/mred-2-guides.log.txt` | 0 |
| `npm run test:policy` | `mred-instruments/r2/mred-2-policy.log.txt` | 0 |

## Artifacts

- `mred-2.diff` — `git diff 21c821a`.
- `mred-2-status.txt` — `git status` after all edits.
