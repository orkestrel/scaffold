Figure derivation runs: **M** = `task75-u8b-journey-2`, `task75-u9-journey-1`, and `task75-u9-journey-2`; journey-1 is excluded for outside load. **I** = `task75-u9-integration-1` and `-2`.

Component titles below expand to `showcase statecharts drives the 'FAMILY' table through its controls with motion=VALUE`. All values are milliseconds.

| Title | Runs | Slowest reading | Margin | Ceiling | Figure |
|---|---|---:|---:|---:|---:|
| accordion, true | M | 49,109.1 | 1.040414 | 1,600 | 53,600 |
| modal, false | M | 25,329.0 | 1.084327 | 1,600 | 29,600 |
| responsive-offcanvas-390, true | M | 22,650.7 | 1.040414 | 1,600 | 25,600 |
| scrollspy-1280, false | M | 35,606.8 | 1.059805 | 1,600 | 39,600 |
| scrollspy-390, false | M | 57,619.5 | 1.040414 | 1,600 | 61,600 |
| scrollspy-390, true | M | 71,531.3 | 1.040414 | 1,600 | 76,600 |
| tab, true | M | 40,332.8 | 1.041314 | 1,600 | 43,600 |
| reads equal witness longhands in both raw composition orders and rejects a planted difference | I | 6,833.6 | 1.043521 | 0 | 8,000 |
| Preservation, 1280 px | M | 100,081.4 | 1.080947 | 1,600 | 110,600 derived; **held, not landed** |
| Preservation, 390 px | M | 89,826.9 | 1.093981 | 1,600 | 100,600 derived; shared fallback retained |

Component maxima above are from `task75-u9-journey-2`; witness maximum is from integration-2. Both preservation widths retain their shared 300,000 ms timeout. All header families are held and retain 120,000 ms. The [complete 35-title hold report lists every title, ratio, and inversion pair](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-evidence-closed/stdout.log:766).

[Full diff](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-evidence-closed/stdout.log:147). No commit was created.

```text
 M tests/app/browser/integration.test.ts
 M tests/integration.test.ts
 M tests/setupBrowser.ts
```

Gate folders below resolve under `/home/user/veneer/tmp/units/journey-cost/runs/`, with prefix `task75-u9-`.

Every queued command used:

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

Command definitions:

```text
J: CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json
I: ./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json --project integration
F: ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/setupBrowser.ts tests/app/browser/integration.test.ts tests/integration.test.ts
W: F with --write replacing --check
L: ./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/setupBrowser.ts tests/app/browser/integration.test.ts tests/integration.test.ts
T: ./node_modules/.bin/tsc --noEmit --project tsconfig.json
E: node --input-type=module-typescript -e CHECKER
```

`J` used kind `journey`; everything else used `command`. Each folder’s `start.json` records its exact command, including inline checkers.

| Command | Folder suffixes | Exit | Bare result |
|---|---|---:|---|
| J | journey-1, journey-2, journey-accept, journey-final | 0 each | `Tests 94 passed (94)` |
| I | integration-1, integration-2, integration-accept | 0 each | `Tests 60 passed (60)` |
| F | format-check, format-check-2, format-check-final, format-check-closed | 0 each | `All matched files use the correct format.` |
| W | format-write, format-write-2, format-write-final | 0 each | No output |
| L | lint-check | 1 | Three `eslint(no-shadow)` warnings |
| L | lint-check-2, lint-check-final, lint-check-closed | 0 each | No output |
| T | typecheck, typecheck-2, typecheck-final, typecheck-closed | 0 each | No output |
| E | static-check, static-final | 0 each | `Balanced-parenthesis scan (TypeScript parser): 17 calls; zero two-argument calls; fifteen budgets added; predicates and descriptions preserved.` |
| E | reproduction | 0 | `R4 reproduction: 13 map entries, preservation, and witness match; no held map entry.` |
| E | evidence-closed | 0 | `R4 reproduction: 7 map entries and witness match; preservation retains its held fallback; no held map entry.` |
| E | evidence-closed | 0 | `Journey titles byte-identical: 94/94 in both measurement runs and both acceptance runs.` |
| E | evidence-closed | 0 | `Integration titles byte-identical: 60/60; witness title unchanged.` |
| E | evidence-closed | 0 | `Diff whitespace check: passed.` |

Instrument and comparison commands, including all `--omit` pairs, are [recorded verbatim here](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-evidence-closed/stdout.log:802).

| Command | Folder / output | Exit | Bare result |
|---|---|---:|---|
| `durations.ts`, legacy inputs | journey-1 / durations-legacy.md | 0 | `Wrote …/durations-legacy.md` |
| `durations.ts`, current inputs | journey-2 / durations-current.md | 0 | `Wrote …/durations-current.md` |
| `durations.ts`, post-U7c inputs | journey-2 / durations-post-u7c.md | 0 | `Wrote …/durations-post-u7c.md` |
| `durations.ts`, eligible history with omissions | journey-2 / durations-eligible.md | 0 | `Wrote …/durations-eligible.md` |
| `durations.ts`, witness inputs, ceiling 0 | integration-2 / durations-witness.md | 0 | `Wrote …/durations-witness.md` |
| `durations.ts`, including acceptance | journey-accept / durations-post-u7c.md | 0 | `Wrote …/durations-post-u7c.md` |
| `durations.ts`, including final run | journey-final / durations-post-u7c.md | 0 | `Wrote …/durations-post-u7c.md` |
| `compare.ts`, U3 baseline pair, empty host-bound set, registration 94/0 | journey-accept / compare.md | 0 | `Equal: every gate holds.` |
| Same comparison | journey-final / compare.md | 0 | `Equal: every gate holds.` |

Every deviation:

| Expected | Found and evidence | Done or not | One hypothesis |
|---|---|---|---|
| Measurement readings eligible for sizing | Journey-1 passed 94/94 but outside CPU was 82.66 s, exceeding the current-set threshold of 68.75 s. [Instrument](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-journey-2/durations-current.md:7) | Done: excluded from sizing; U8 and journey-2 supply eligible readings. | Additional outside process activity increased load. |
| Unheld tables and families receive measured bounds | 35 titles are held, including every header family and preservation at 1280 px. [Names, ratios, inversion pairs](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-evidence-closed/stdout.log:766) | Done: no held map entry; existing fallbacks retained. Diagnosis not done. | Arrangement or scheduling variability is not explained by aggregate outside CPU alone. |
| Lint exits 0 | Initial registration variable `row` produced three shadowing warnings. [Evidence](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-lint-check/stdout.log) | Done: renamed to `registration`; subsequent lint gates exit 0. | The outer binding collided with existing callback parameters. |
| Latest browser acceptance covers the final source revision | The last 94/94 run added modal-true and offcanvas-true holds. Their 48,600/30,600 ms overrides were subsequently removed, restoring the 230,000 ms fallback. [Hold evidence](/home/user/veneer/tmp/units/journey-cost/runs/task75-u9-journey-final/durations-post-u7c.md) | Done: final format, lint, typecheck, reproduction, and static checks pass. No further browser run after these two timeout relaxations. | Unchanged test bodies that passed tighter bounds remain valid under the larger fallbacks. |
| Guide describes the current inner budget | [Guide](/home/user/.wave/veneer-containment/guides/veneer.md:2695) says 5,000 ms; source uses U8’s 1,600 ms. | Not changed: guide is outside owned files. | Documentation was not updated with U8. |