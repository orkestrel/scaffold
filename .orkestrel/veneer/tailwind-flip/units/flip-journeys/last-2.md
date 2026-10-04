**U6 remains incomplete. Nothing was committed.** The partition returned without timing out, but its assertion conflicts with the pinned specimen readings.

The ruling requires shared utilities under `unexcluded` to equal Bootstrap alone on every longhand Tailwind declares. At 1280, the `.border-1` specimen reads:

| Property | Bootstrap alone | Unexcluded |
|---|---|---|
| Border style | `none` | `solid` |
| Border width | `0px` | `1px` |

This agrees with the first run’s repeated `0px / 1px / 1px` specimen triple. Requiring equality would reject that accepted reading. The exact failing subject is `8086: div.border-1.bg-body-tertiary.px-2`. See the [partition evidence](/home/user/veneer/tmp/units/flip-journeys/second-partition.json).

Hypothesis: the ruling equates Bootstrap’s winning border-width declaration with its computed width, although Tailwind’s border style changes the computed width.

The focused case failed in **16.283 seconds**, within its unchanged 300-second limit. Vitest’s wall time was **22.90 seconds**; the launcher measured **24.168 seconds**.

At 1280, each face read **8,112 elements**, carrying all **192 utility names and 17 component names**:

| Measurement | Count |
|---|---:|
| Clause 1 comparisons | 97,698 |
| Clause 2 comparisons | 5,439 |
| Clause 3 comparisons | 48,849 |
| Competing-class skips | 938 |
| Geometry skips | 1,697 |
| Violations | 162 |

Other failures include context-dependent auto margins and interacting border declarations; these are not established product defects. Clause 5 attribution was removed under the ruling.

The partition uses `it.skipIf(VARIANT !== 'light-1280')`, with both widths inside the case. The 390 reading and planted, restored-important, inverse-face, and stripped-curation controls were not reached. Specimen, census, and contrast coverage remains assigned to all four variants.

The inherited findings remain:

- **Statecharts:** all nine face rows and six pair rows passed the first run’s setup case. Amended journey harness counts remain unmeasured. [Exact rows](/home/user/veneer/tmp/units/flip-journeys/statechart-rows.json).
- **Specimens:** all 23 triples repeated across two first-run measurements; no P5 departure. Row 23 at 768 read `left / left / left`. [Every triple at 1280 and 390](/home/user/veneer/tmp/units/flip-journeys/report.md).
- **Census, light-1280:** 33 undeclared tokens under Bootstrap; 21 under each Tailwind face. [Exact lists](/home/user/veneer/tmp/units/flip-journeys/census.json).
- **Engine equality, light-1280:** alert, popover, carousel, modal, and scrollspy-1280 matched across three faces; all six shown-popover switches passed in the 45.049-second case.
- **390 header:** still unmeasured.
- **Full journeys:** baseline **314.30 seconds**, with 40 failures and 48 passes. No green amended full run exists, so the **235-second budget** remains unmeasured after amendment.

Acceptance commands, in order:

| Command | Exit this run |
|---|---|
| `npm run check` | **0** |
| `npm run lint:check` | Not run after stop |
| `npm run format:check` | Not run after stop |
| `npm run test:setup:browser` | Not run after stop |
| `npm run build` | Not run after stop |
| `npm run build:showcase` | Not run after stop |
| `npm run test:journey` | Not run; focused partition **1** |
| `npm run test:app:browser` | Not run after stop |
| `git diff --check` | **0** |
| Bootstrap SHA-256 | **0**, matched |

Only the three owned files were formatted. Unrun commands emitted no error or skip line. The focused run reported:

```text
AssertionError: expected [ …(162) ] to deeply equal []
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
Duration  22.90s
```

The [complete report](/home/user/veneer/tmp/units/flip-journeys/report.md) contains the specimen table, case-by-case dispositions, implementation limitations, and pending work. The [artifact manifest](/home/user/veneer/tmp/units/flip-journeys/second-artifact-manifest.txt) lists every unit file.

Edited tracked files:

- [tests/setupBrowser.ts](/home/user/veneer/tests/setupBrowser.ts)
- [tests/setupBrowser.test.ts](/home/user/veneer/tests/setupBrowser.test.ts)
- [tests/app/browser/integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts)

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

`flip-probe-3`’s ignored files under `tmp/probes/flip4` are not mine and remain untouched; none appears in porcelain status.