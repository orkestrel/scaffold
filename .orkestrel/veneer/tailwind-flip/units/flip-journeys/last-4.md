**U6 remains incomplete. Nothing was committed.** Ruling 4 required a stop: the same-page partition returned **892 violations**, against the required zero.

The [complete report](/home/user/veneer/tmp/units/flip-journeys/report.md) includes the specimen triples, transition tables, case dispositions, command evidence, and artifact paths.

At 1280px, every face read **8,112 elements**, carrying **192 utility names and 17 component names**:

| Clause | Comparisons | Resolved skips | Undefined-variable skips | Masked-width skips | Contextual-style skips | Violations |
|---|---:|---:|---:|---:|---:|---:|
| V | 79,046 | 0 | 0 | 21 | 0 | 1 |
| C | 5,198 | 0 | 0 | 0 | 0 | 580 |
| U | 50,651 | 47 | 0 | 0 | 0 | 311 |

The measured partition was **11,421 distinct utility element-longhand differences** between `tailwindcss` and `unexcluded`. The case took **17.530 seconds**; Vitest reported **27.72 seconds** overall, exit **1**, uncapped.

Representative failures were:

| Clause | Key | Longhand | Face | Expected | Read |
|---|---|---|---|---|---|
| U | `0: a.visually-hidden-focusable.d-inline-block.p-2` | `padding-top` | tailwindcss | `8px` | `0px` |
| V | `2: div.me-auto` | `margin-right` | unexcluded | `172.969px` | `95.5px` |
| C | `196: div.container.bg-body-tertiary.border.rounded.py-2` | `max-width` | unexcluded | `1140px` | `1280px` |

The [full violation list](/home/user/veneer/tmp/units/flip-journeys/fourth-violations.md) records every key, longhand, face, expected value, and reading.

The implementation applies the fourth brief’s enumerated skips; the preceding geometry and competing-class skips are absent. Hypothesis: same-page baselines remove scratch-context errors but still compare layout-dependent values and values overridden by another class.

The partition retains `it.skipIf(VARIANT !== 'light-1280')`, with both widths inside the case. The assertion stopped before 390px and before the planted `.mt-3`, restored-important, inverse, and stripped-curation controls. All remain present.

The focused setup run passed **2 tests**, including the planted/removed utility control and the added same-page border-color control. The latter detected the planted changes and returned zero violations after restoration.

Inherited evidence remains clearly separated from this run:

- **Statecharts:** nine face rows and six pair rows passed the earlier setup run. Journey harness counts per variant remain unmeasured; [exact rows](/home/user/veneer/tmp/units/flip-journeys/statechart-rows.json).
- **Specimens:** all 23 triples repeated in the first run without a P5 departure; row 23 at 768px read `left / left / left`. Every triple at 1280 and 390 appears in the complete report.
- **Census, light-1280:** 33 undeclared tokens under Bootstrap and 21 under each Tailwind face; [exact lists](/home/user/veneer/tmp/units/flip-journeys/census.json).
- **Engine equality, light-1280:** alert, popover, carousel, modal, and scrollspy-1280 matched across three faces, including six shown-popover switches.
- **390px header:** unmeasured.
- **Full journey wall:** baseline **314.30 seconds**; no green amended run exists, so the amended comparison against **235 seconds** remains unmeasured.

Acceptance commands, in the required order:

| Command | Exit this run |
|---|---|
| `npm run check` | **0**; launched before the final shorthand edit, not a final-tree verification |
| `npm run lint:check` | **1** |
| `npm run format:check` | Not run after stop |
| `npm run test:setup:browser` | Not run; focused setup **0** |
| `npm run build` | Not run after stop |
| `npm run build:showcase` | Not run after stop |
| `npm run test:journey` | Not run; focused partition **1** |
| `npm run test:app:browser` | Not run after stop |
| `git diff --check` | **0** |
| `sha256sum dist/src/bootstrap/index.css` | **0**, matched |

The lint error remains at `tests/app/browser/integration.test.ts:1032:37`:

```text
error typescript(array-type): Array type using 'readonly T[]' is forbidden for non-simple types. Use 'ReadonlyArray<T>' instead.
```

The focused partition reported:

```text
AssertionError: expected [ Array(892) ] to deeply equal []
Test Files  1 failed (1)
Tests  1 failed | 20 skipped (21)
Duration  27.72s
```

Unrun commands emitted no error or skip line. The focused runs’ skipped cases were excluded by title filters. Only the three owned files were formatted, exit **0**.

Edited files are [setupBrowser.ts](/home/user/veneer/tests/setupBrowser.ts), [setupBrowser.test.ts](/home/user/veneer/tests/setupBrowser.test.ts), and [integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts). See the [case-by-case dispositions](/home/user/veneer/tmp/units/flip-journeys/fourth-case-inventory.md), [complete diff](/home/user/veneer/tmp/units/flip-journeys/fourth-changes.patch), and [every unit artifact path](/home/user/veneer/tmp/units/flip-journeys/fourth-artifact-manifest.txt).

`showcase/browser.html` SHA-256, unchanged before and after:

```text
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699
```

Bootstrap SHA-256, unchanged before and after:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

`flip-probe-3`’s files remain untouched; none appears in porcelain status.