# Unit T5 round 7 report — split the park sentences

Role and engine: `opus` on Opus 5.5, a native Claude subagent resumed with its round-6 context. Checkout
`/home/user/test-tf`, uncommitted over `80c419e`, with `dist/` left untouched. Brief: `t5-test-frame-brief-7.md`. It was read with `t5-audit-6-verdict.md`. Every log is retained under `.orkestrel/veneer/units/t5-instruments-7/`.

## Outcome

G1 is closed. Both passages carry the brief's sentences verbatim, re-wrapped only to the formatter's width. Nothing
else changed.

## Changes by site

- **`src/browser/helpers.ts`, the `releasePointer` remarks.** The paragraph that began "The park point is (-1, -1)"
  now reads:

  > The park point is (-1, -1) in the runner page's coordinates, one pixel above and to the left of that page's
  > viewport. The browser hit-tests nothing outside the viewport, so no element takes a `mouseover` event or hover
  > paint from the parked pointer until the next pointer verb. This holds even where a staging, scroll, or offset
  > lays content over the park point.

- **`guides/test.md`, the `releasePointer` bullet.** The text from "It releases at the recorded point first" through
  "lays content over that point." now reads:

  > It releases at the recorded point first, which can produce a click. It then clears hover by moving to (-1, -1)
  > in the runner page's coordinates, one pixel above and to the left of that page's viewport. The browser hit-tests
  > nothing outside the viewport, so no element takes a `mouseover` event or hover paint from the parked pointer
  > until the next pointer verb. This holds even where a staging, scroll, or offset lays content over the park
  > point.

  The bullet's following sentence, "Register it with `afterEach` before a hover or hold.", keeps its place on the
  last re-wrapped line.

## Change against the round-6 tree (criterion 3)

`.orkestrel/veneer/units/t5-instruments-7/t5-7-since-r6.log.txt` records the comparison against the round-6 copies saved before the edit
(`t5-7-helpers-r6.ts.txt`, `t5-7-guide-r6.md.txt`):

| File | Change since round 6 |
| --- | --- |
| `src/browser/helpers.ts` | Only lines 724 to 726, the park paragraph. |
| `guides/test.md` | Only lines 1704 to 1708, the bullet's replaced span. |
| `tests/src/browser/helpers.test.ts` | None: `sha256sum -c` against the round-6 digest reads `OK`, and its hunk in `t5-7.diff` equals its hunk in `t5-6.diff`. |
| `src/browser/types.ts` | None: its hunk in `t5-7.diff` equals its hunk in `t5-6.diff`. |

Before the edit, the live `git diff 80c419e` equalled `t5-6.diff`, checked with `cmp`, and `helpers.ts` equalled
`t5-6-helpers-final.ts.txt`.

## Gates

`.orkestrel/veneer/units/t5-instruments-7/t5-7-gates.sh` ran these. Each log ends with the exit status the run itself wrote.

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check src/browser/helpers.ts guides/test.md` | 0 | `All matched files use the correct format.` | `t5-7-gate-format.log.txt` |
| `npm run lint:check` | 0 | No diagnostics | `t5-7-gate-lint.log.txt` |
| `npm run check` | 0 | Root and every `check:src` project clean | `t5-7-gate-check.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  375 passed \| 2 expected fail (377)` | `t5-7-gate-file.log.txt` |

## Evidence files

- `.orkestrel/veneer/units/t5-7.diff`, the whole change over `80c419e`. Diffstat: 4 files changed, 879 insertions, 44 deletions.
- `.orkestrel/veneer/units/t5-7-status.txt`: `M` on `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and
  `tests/src/browser/helpers.test.ts`. The last two carry their earlier rounds' changes only.

## Deviation state

- **Stop condition:** not reached. Each sentence fits its site.
- **Shared-file patches:** none.
