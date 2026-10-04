# Unit flip-integration-3 — finish U4 flip-integration after the witness ruling

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files. The `flip-probe-3` lane may still write `/home/user/veneer/tmp/probes/flip4/**`; list its entries as not yours and change none.

## Objective

Complete unit U4 exactly as `/home/user/scaffold/tmp/codex/flip-integration-brief.md` (with its appended § Rulings) and `/home/user/scaffold/tmp/codex/flip-integration-2-brief.md` (the pseudo-element ruling) specify, starting from the partial tree the second run left uncommitted, under the ruling in § The witness ruling. The second run's report is `/home/user/scaffold/tmp/codex/flip-integration-2-last.md`: read it for what is done, what is pending, and the measured values. Every section of the earlier briefs binds here except where this brief says otherwise.

## State at launch

`git status --porcelain` reads six modified tracked files, all U4's: `tests/fixtures/tailwindcss/preflight.json` (regenerated, 2595 rows, `chromium: 141`, byte-identical on repeat), `tests/fixtures/tailwindcss/incompatible.json` (re-derived under `[built, unexcluded]`, 1870 rows, only the `border` and `border-0` to `border-5` rows changed), `tests/setup.ts` and `.test.ts` (the typed `chromium` guard with controls), `tests/setupStyles.ts` and `.test.ts` (the instruments, 33 scoped cases passing, the portable helper with the pseudo-element skips). Writers under `/home/user/veneer/tmp/units/flip-integration/` pass twice. Measured and ready to pin: the reverse order `[unexcluded, built]` reads no differing longhand on the witnesses and no incompatible delta difference; every heading reads `rgb(33, 37, 41)` under the recipe; the CSSOM sequence reads 8042 tuned rows against 8041 recipe rows, differing by exactly the `.dropstart .dropdown-toggle::after` `display: inline-block` row; the portable instrument accepts the pre-regeneration record (502 reproduced, 2096 skipped, eight permitted `table` rows). No integration describe is edited yet; the baseline `npm run test:integration` reads 9 failed and 45 passed.

## The witness ruling

The second run stopped because 127 witness longhands preflight declares read differently under the recipe and under the preflight-only composition: `h1` `border-top-color` (`rgb(0, 0, 0)` against `rgb(33, 37, 41)`), `a[href]` `color`, `button` and `input` `font-family`. Each is a declaration preflight writes as `inherit`, `currentColor`, or a shorthand that resolves through the parent (`font: inherit`), whose computed value depends on an ancestor's value that Bootstrap's reboot sets under the recipe (the body color and font) and Tailwind's defaults set under preflight alone. The declaration is the same in both compositions; the computed value is not, and that is the design working, not a departure.

Rulings:

1. **The witness case compares by the declaration's value class.** For each witness element and each longhand preflight declares for it (read from the Tailwind `base` layer in CSSOM, shorthands expanded as the instruments already do): when the declared value is `inherit`, or the longhand is a color longhand declared as `currentColor` (`currentcolor`) or through a shorthand like `border: 0 solid` that leaves the color at `currentColor`, the recipe's computed value equals, respectively, the parent element's computed value under the recipe or the element's own computed `color` under the recipe; when the declared value is absolute (`0`, `border-box`, `none`, a length, a keyword that resolves without the parent), the recipe's computed value equals the preflight-only reading. A declared `var()` resolves against Tailwind's theme in both compositions and compares as absolute after resolution. Report the count of longhands in each class per witness.
2. **The Bootstrap-alone clause stands** as § 6 states: on every longhand the reboot declares and preflight does not (body color and background, `hr` opacity, `dt` weight, heading color, and whatever else the two sheets' declared sets yield when read from CSSOM), the recipe equals Bootstrap alone; `line-height` beside a moved `font-size` is read as the declared ratio.
3. **Settling instead of stopping.** Where a witness longhand fits neither class as written, derive the comparison from the declaration's value class, record the rule and the longhand in the report, and continue. Stop only when a recipe reading matches none of: the inheritance rule, the preflight-only reading, Bootstrap alone (expected, found, element, longhand, both values).
4. **Controls** stay: a deleted `base` block moves the preflight-class longhands back to Bootstrap's values; a planted `div` row refuses the record case under both branches of the version gate.

## Scope deltas against the earlier briefs

None beyond § The witness ruling. The Tailwind describes of `tests/integration.test.ts` are rewritten as the second run's disposition table lists (amend, delete, add, retitle), with the misuse case, the witness case, and the CSSOM statement-sequence case added, and the three host-bound titles mapped (kept, renamed to what, or deleted and replaced by what) with each successor's exit.

## Acceptance criteria

The earlier briefs' criteria, bare, in order, each with its exit in the report: the writers twice; `npm run test:setup`; `npm run test:setup:browser`; each Tailwind describe of `tests/integration.test.ts` by `-t`; `npm run test:integration` with every failing title listed and ruled host-bound or not (none in a Tailwind describe); `npm run check`; `npm run lint:check`; `npm run format:check`; `git diff --check`; both sheet digests unchanged (`7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`, `f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40`).

## Return shape

As the earlier briefs, plus the per-witness class counts of ruling 1 and the host-bound title mapping. Nothing committed.

## Deviation contract

As the earlier briefs, with ruling 3 replacing the second run's stop.
