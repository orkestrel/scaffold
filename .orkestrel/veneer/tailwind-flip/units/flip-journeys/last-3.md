**U6 remains incomplete. Nothing was committed.** Ruling 4 required a stop: the revised partition returned **2,416 violations**, against the required zero.

The failures comprise 2,376 clause-3 border-color comparisons and 40 clause-1 border-style departure comparisons. The first failure is:

| Key | Longhand | Face | Expected | Read |
|---|---|---|---|---|
| `2464: div.bg-dark.border.rounded.p-2` | `border-top-color` | `unexcluded` | `rgb(222, 226, 230)` | `rgb(73, 80, 87)` |

The [complete violation list](/home/user/veneer/tmp/units/flip-journeys/third-violations.md) records every key, longhand, face, expected value, and reading.

Hypothesis: standalone references and the inherited competing-declaration detection do not model border values supplied by local color contexts or variable-bearing shorthands. This run does not establish a product defect.

The focused partition failed in **16.543 seconds**, within its unchanged 300-second timeout. Vitest’s wall time was **28.87 seconds**; launcher time was **30.152 seconds**, exit **1**, uncapped.

At 1280 px, each face read **8,112 elements**, carrying all **192 utility names and 17 component names**. Counts were:

| Clause | Comparisons | Declared-scope skips | Resolved-value skips | Masked-width skips | Geometry skips | Competing-class skips | Violations |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 97,596 | 34,204 | 47 | 21 | 1,112 | 720 | 40 |
| 2 | 3,990 | 3,264 | 3,225 | 0 | 6 | 576 | 0 |
| 3 | 77,138 | 5,835 | 1,118 | 21 | 41 | 749 | 2,376 |

The partition retains `it.skipIf(VARIANT !== 'light-1280')`, with both widths inside the case. The 390px reading and all four controls remain unreached. Clause 5 attribution is outside the partition-scope ruling.

The inherited evidence remains:

- **Statecharts:** nine face rows and six pair rows passed the first run’s setup case. Journey harness counts remain unmeasured. See [exact transitions](/home/user/veneer/tmp/units/flip-journeys/statechart-rows.json).
- **Specimens:** all 23 triples repeated in the first run, with no P5 departure; row 23 at 768 read `left / left / left`. The [complete report](/home/user/veneer/tmp/units/flip-journeys/report.md) includes every triple at 1280 and 390.
- **Census, light-1280:** 33 undeclared tokens under Bootstrap and 21 under each Tailwind face. See [exact lists](/home/user/veneer/tmp/units/flip-journeys/census.json).
- **Engine equality, light-1280:** alert, popover, carousel, modal, and scrollspy-1280 matched across three faces; all six shown-popover switches passed in 45.049 seconds.
- **390px header:** unmeasured by U6.
- **Full journeys:** baseline 314.30 seconds, with 40 failures and 48 passes. No green amended run exists, so the amended wall against 235 seconds remains unmeasured.

Acceptance commands, in order:

| Command | Exit this run |
|---|---|
| `npm run check` | Not run after stop |
| `npm run lint:check` | Not run after stop |
| `npm run format:check` | Not run after stop |
| `npm run test:setup:browser` | Not run after stop |
| `npm run build` | Not run after stop |
| `npm run build:showcase` | Not run after stop |
| `npm run test:journey` | Not run; focused partition **1** |
| `npm run test:app:browser` | Not run after stop |
| `git diff --check` | **0** |
| Bootstrap SHA-256 | **0**, matched |

Only the three owned files were formatted, exit **0**. Unrun commands emitted no error or skip line. The focused run reported:

```text
AssertionError: expected [ { …(6) }, { …(6) }, …(2414) ] to deeply equal []
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
Duration  28.87s
```

The [complete report](/home/user/veneer/tmp/units/flip-journeys/report.md) contains the case-by-case dispositions and remaining work. The [artifact manifest](/home/user/veneer/tmp/units/flip-journeys/third-artifact-manifest.txt) lists every unit file; the [complete diff](/home/user/veneer/tmp/units/flip-journeys/third-changes.patch) records the tracked changes.

Edited tracked files are [tests/setupBrowser.ts](/home/user/veneer/tests/setupBrowser.ts), [tests/setupBrowser.test.ts](/home/user/veneer/tests/setupBrowser.test.ts), and [tests/app/browser/integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts).

`showcase/browser.html` before and after:

```text
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699
```

Bootstrap before and after:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

`flip-probe-3`’s files under `tmp/probes/flip4` are not mine and remain untouched; none appears in porcelain status.