# FRAME-HELPERS round 3 (`fh`) report

The `opus` role on Opus 5.5 ran this round natively in `/home/user/veneer-fh`, on `b-frame-helpers-brief-3.md`. N3
and W3 are closed and every gate exits 0. Round 3 edited only its owned files: `tests/setupBrowser.test.ts`,
`tests/setupBrowser.ts`, and `tests/app/browser/integration.test.ts`. Nothing is committed.

## N3: names in the helper proofs and the example

- **Lift proof** ("puts the specimen back when the action throws…"): the detached copy is named `copied`.
- **Ring proof:** the old proof bound two focus readings, `whole` and `cropped`, and lifted a `host`. I split it into
  two proofs, so each binds one `focusReading` in its own scope and lifts a `specimen`:
  - "reaches a ring with Tab from the wrapper, and reads its reach and the focus it held at the shot";
  - "lists every edge of a frame that holds none of the ring past its element".
- **Outline proof:** the old proof bound `reading` and `unpainted` through two managers. I split it the same way, and
  each part binds one `focusReading`:
  - "reads an outline from the strip it changes between a painted and a suppressed frame";
  - "reads no change from an outline that paints nothing, and refuses an outline with no portfolios to read it".
- **`focus` TSDoc example** in `tests/setupBrowser.ts`: it binds `focusReading`, and a `specimen` line keeps it within
  the line width.
- **Remaining `whole` bindings.** Those left in `tests/setupBrowser.test.ts` name image regions, not focus readings.

## W3: two sentences

- **Page-strip comment** in `tests/app/browser/integration.test.ts`: "The Page 1 link sits in the item that follows
  the previous-page arrow, which leads the strip."
- **`FocusOptions.worn` doc** in `tests/setupBrowser.ts`: "Holds the element that wears the ring, the element the
  installed `readRing` function takes as its `worn` parameter."

## Gates

The runner is `.orkestrel/veneer/units/fh-instruments/fh3-gates.sh`. Each log is under `tmp/units/` and ends with its exit line.

| Gate | Exit | Result line | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` | `fh3-format.log.txt` |
| `npm run lint:check` | 0 | no diagnostics | `fh3-lint.log.txt` |
| `npm run check` | 0 | no diagnostics | `fh3-check.log.txt` |
| `npm run test:setup:browser` | 0 | `Tests  83 passed (83)` | `fh3-setup-browser.log.txt` |
| `npm run test:guides` | 0 | `Tests  20 passed (20)` | `fh3-test-guides.log.txt` |

The `setup:browser` result rose from round 2's `81 passed (81)` because the split added two proofs.

## Files

- **Diff:** `.orkestrel/veneer/units/fh-3.diff`, the whole change over `5afa37b`. Its stat line is
  `6 files changed, 1756 insertions(+), 2218 deletions(-)`.
- **Status:** `.orkestrel/veneer/units/fh-3-status.txt`. It lists `guides/veneer.md`, `tests/app/browser/integration.test.ts`,
  `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupBrowser.test.ts`, and `tests/setupBrowser.ts`.
  - `guides/veneer.md`, `tests/setup.test.ts`, and `tests/setup.ts` carry earlier rounds' changes only.
- **Shared patch:** `.orkestrel/veneer/units/fh-shared.patch` stands unchanged, and `git apply --check` exits 0 on it.

## Deviation state

The unit did not stop. It made one decision within its scope: it gave the proofs that bound two readings separate
scopes by splitting each into two tests, not by nesting blocks.
