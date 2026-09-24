# FOCUS-FRAME (`ff`) report, round 3

All five round-3 items are done in `/home/user/veneer-ff`, and every gate passed. The unit edited only the `tests/setup.ts` file and the `tests/app/browser/integration.test.ts` file, and it did not stop.

## Changes

1. **Horizontal offset row (claim 3).** `RING_SHADOW_CASES` in `tests/setup.ts` gains the row `rgb(0, 0, 0) -5px 2px 3px 1px`, reach 9. Its TSDoc now names both offset rows, which together show that the larger offset is read on either axis. Each mutation that drops the horizontal term now fails; each passed on the round-2 table without the new row.
   - `Math.abs(y)` only: fails, with 1 test failing out of 305.
   - `Math.max(x, Math.abs(y))`: fails, with 1 test failing out of 305.
   - The same two mutations with the new row removed: both pass, 305 of 305.
   - The failing case in both is "reads a ring reach from the largest outer shadow layer, whatever color syntax precedes it".
2. **`none` branch (claim 3).** `computeRingReach` no longer checks for `none`; it now reads `shadow.split(',').map(...)`. `npm run test:setup` passes (305 of 305). The value `none` splits into one layer with no pixel lengths, so it reads 0 either way.
3. **List-group control (claim 2).** I ran the list-group case at `dark-1280` with the suppressed state setting the outline color instead of removing the outline. The case failed at the `outline.get('suppressed')` assertion with `expected 0.9952076677316294 to be +0` (1 test failing, 46 skipped). I then restored the file.
4. **GUARD-TERM.** The outline frames are now written under `tmp/capture/outline/painted` and `tmp/capture/outline/suppressed`. The local frame manager in the skip-link and list-group cases is renamed `outlineFrames`. The rename touches none of the guide text in `ff-shared-2.patch`, so that patch stands.
5. **SETUP-FOCUS-UNIVERSAL.** The `SHOWCASE_KEYS` TSDoc in `tests/setup.ts` no longer claims that every focus frame uses a padded wrapper. It now says a focus frame shot on a padded wrapper holds the ring, and that the journey case shooting each focus frame states which placement it uses.

## Gates

Every command ran in `/home/user/veneer-ff` with the npm 11 `PATH` entry and `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts` | 0 | `All matched files use the correct format.` | `ff-3-gate-format.log.txt` |
| `npm run lint:check` | 0 | no diagnostic | `ff-3-gate-lint.log.txt` |
| `npm run check` | 0 | no diagnostic | `ff-3-gate-check.log.txt` |
| `npm run test:setup` | 0 | `Tests  305 passed (305)` | `ff-3-gate-setup.log.txt` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-1280*" -t "reveals the skip link\|drives one list-group action"` | 0 | `Tests  2 passed \| 45 skipped (47)` | `ff-case3-gate-dark-1280.log.txt` |

The pipe in the `-t` pattern is escaped in the table; the command ran with a plain `|`. In that capture run the outline reading was 1 painted and 0 suppressed for the skip link, and 0.995 painted and 0 suppressed for the list-group row. The frames are under the `tmp/capture/outline` directory.

## Artifacts

All under `/home/user/veneer-ff/tmp/units/`:
- `ff-mutations-3.log.txt`: every mutation and control run, with its site, command, exit, result line, failing case, and log.
- `ff-3.diff`: all rounds against `e4a6d7c`. The diffstat is 1277 insertions and 323 deletions across the three owned files.
- `ff-3-status.txt`: lists `tests/app/browser/integration.test.ts`, `tests/setup.ts`, and `tests/setup.test.ts` as modified, and nothing else.
