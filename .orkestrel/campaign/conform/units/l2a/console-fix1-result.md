Fix round 1 of unit conform-console is complete. Every row closed, gates green, nothing deviated.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/console/tests/guides.test.ts` | Added the surface (`:11-26`), server (`:598-620`), and `inferColumns` (`:668-672`) fence transcriptions with their presence guards; dropped the nested `visible`; imports `normalizeVisible` and the `setupServer.ts` stream fixtures |
| `/home/user/fleet/console/tests/setup.ts` | Added the exported host-independent `normalizeVisible` helper with its doc comment |
| `/home/user/fleet/console/tests/setup.test.ts` | Added the `normalizeVisible` cases |
| `/home/user/fleet/console/src/core/helpers.ts` | `i.e.` → `that is` at line 127 |
| `/home/user/fleet/console/src/core/factories.ts` | Split the `createCaptureResult` `@example` — one per overload, the async one awaited |
| `/home/user/fleet/console/tests/src/browser/helpers.test.ts` | Control planted and removed; file ends as it began |
| `/home/user/fleet/console/guides/console.md` | Three fence controls planted and removed; file ends as it began |
| `/home/user/scaffold/tmp/units/conform/conform-console-report.md` | Rewritten for the whole unit with a `## Fix round 1` section |
| `/home/user/work/evidence/console-proofs/**` | Control and gate captures |

Round diffstat over owned code: `src/core/factories.ts` 59, `src/core/helpers.ts` 69, `tests/guides.test.ts` 409, `tests/setup.test.ts` 33, `tests/setup.ts` 20 changed lines. Whole tree: `39 files changed, 1056 insertions(+), 625 deletions(-)`.

## Failing-first tests, by name

| Control | Test that read red | Counts |
| --- | --- | --- |
| `fix1-fence-surface-control-red.txt` | `flagship fences > carries the surface fence lines the transcription copies` | 1 failed, 90 passed (91) → 91 passed |
| `fix1-fence-server-control-red.txt` | `flagship fences > carries the server fence lines the transcription copies` | 1 failed, 90 passed (91) → 91 passed |
| `fix1-fence-columns-control-red.txt` | `flagship fences > carries the server-helper fence line the transcription copies` | 1 failed, 90 passed (91) → 91 passed |
| `console-obj-3-control-red.txt` | none — no red is producible | 79 passed (79) planted, 79 passed restored |

**console-fix1-3 could not read red, and this is the reason.** The plant was the banned truncating reading (`Math.trunc(performance.now())` at both ends) at `tests/src/browser/helpers.test.ts:243-245`; `npm run test:src:browser` reported `79 passed (79)`. The case's only timing assertion is the upper bound `expect(elapsed).toBeLessThan(2000)`, and truncation can only lower a measured interval. `.claude/rules/tests.md` names the defect `performance.now()` prevents as under-reporting by a millisecond, which fails a lower bound or an equality and can never cross an upper bound. The row granted this branch explicitly, so it is recorded rather than reported as a deviation.

## Validation, scoped and read

| Command | Exit | Capture |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-format-check.txt` |
| `npm run lint:check` | 0 | `gate-lint-check.txt` |
| `npm run check` | 0 | `gate-check.txt` |
| `npm run build` | 0 | `gate-build.txt` |
| `npm test` | 0 | `gate-test.txt` — `src` 638, `policy` 111, `config` 46, `setup` 23, `guides` 91 |

The `npm test` reading was taken inside this unit's own exec; the deciding run is yours after exit. `git diff --stat` confirms `guides/console.md` (119+/120-) and `tests/src/browser/helpers.test.ts` (15+/15-) are back to their pre-plant state. Evidence regenerated: `/home/user/work/evidence/conform-console.diff` 3835 lines, `conform-console.status` 39 entries.

## Sweeps

Recorded in the report with pattern, paths, and a ruling per hit: the two re-run narrow sweeps (`complet(e|es|ed|ing|ion)` case-insensitive and `\b(out|err)\s*:`, over `src`, `tests`, `guides/console.md`, `guides/README.md`, `README.md`), a word-boundary plus inflection sweep for every row the lane listed (console-obj-6/7/8/9, console-subj-6/7/10/11/13/14/15), and the substitution sweep with `e\.g\.|i\.e\.` added — `src/**/*.ts` is now clean of the whole set.

## Shared-file patches

None. Every edit landed inside owned files.

## Ancillary decisions (recorded, carried on from)

- `visible` became **`normalizeVisible`** on the move: an exported shared helper takes `{verb}{Noun}`, and a bare adjective reads as a predicate away from its entity context.
- The server fence's `mirror: true` replay runs through `createWriteProbe` installed as the current `process.stderr.write` before `start()` — the precedent `tests/src/server/ProcessCapture.test.ts` sets — so the real interception, buffering, mirror, and restore all run while the suite stays output-clean. The pristine `write` is restored before the assertions.
- `inferColumns` is asserted on each documented branch through `createStreamTarget`, plus the fence's own live call, rather than re-deriving the helper's condition.

## Findings for a successor unit (outside this round's rows and owned files)

- `src/core/errors.ts:13` still reads `the one throw site in this codebase today`; console-subj-10's population was `ConsoleErrorCode`, which is clean.
- `src/server/factories.ts:40` imports `@src/core` in a published `@example` — the same class as R4, which did not name this site.
- The substitution set (`via`, `just`, `simply`, `should`, `e.g.`) survives across `tests/**/*.ts` at the sites the report lists; R3 named only the two `tests/src/browser/helpers.test.ts` hits.
- `tests/src/core/Spinner.test.ts:315` and `tests/src/core/Progress.test.ts:204` still inline `normalizeVisible`'s expression and can now route through the shared helper.

## Deviation state

No deviation. Every row closed inside its scope.
