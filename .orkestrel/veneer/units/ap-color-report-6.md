# Unit AP-COLOR round 6 report

`opus` on Opus 5.5, native, in `/home/user/veneer-apc` (uncommitted over `712ae72`). Brief: `tmp/units/apc-brief-6.md`. Status: done, no stop.

The case-1 title now reads the brief's text verbatim, and every named gate exits 0. No other line of `tests/src/styles/utilities/color.test.ts` changed from round 5, and no assertion changed.

## The title line

This is `diff` of the round-5 copy (`tmp/units/apc-6-round5-color.test.ts.txt`) against the file after `oxfmt`, recorded in `tmp/units/apc-6-round5-delta.txt`. It is the whole difference:

```text
33c33
< 		'resolves each text color to the value the release records, and each role outside the neutral roles to its on-canvas tier, in %s mode',
---
> 		'resolves each role outside the neutral roles to its on-canvas tier rather than the value the release records, and every other text color to that value, in %s mode',
```

`oxfmt` left the line as written.

## Gate table

The chain is `tmp/units/apc-6-gates.sh`, run with `CAPTURE` unset.

| Gate | Result | Log |
| --- | --- | --- |
| Scoped color proof: `npm run build:src:styles`, then `vitest run` of `color.test.ts` | exit 0; the renamed case ran and passed in light and dark mode | `tmp/units/apc-6-scoped-color.log.txt` |
| `npm run format:check` | exit 0 | `tmp/units/apc-6-format-check.log.txt` |
| `npm run lint:check` | exit 0 | `tmp/units/apc-6-lint-check.log.txt` |
| `npm run check` | exit 0 | `tmp/units/apc-6-check.log.txt` |

`git status --short` (`tmp/units/apc-6-status.txt`) equals round 5's `tmp/units/apc-5-status.txt`.

## Artifacts

- `/home/user/veneer-apc/tmp/units/apc-6.diff`: `git diff 712ae72 -- tests/src/styles/utilities/color.test.ts`.
- `/home/user/veneer-apc/tmp/units/apc-6-round5-delta.txt`: the before-and-after difference.
- `/home/user/veneer-apc/tmp/units/apc-6-status.txt`: `git status --short`.
- `/home/user/veneer-apc/tmp/units/apc-6-gates.sh`: the gate chain.
