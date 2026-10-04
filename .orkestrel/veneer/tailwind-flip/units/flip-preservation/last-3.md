Stopped at the prescribed control deviation. The 1280 px reading has **zero preflight and zero unattributed departures**, but the planted-preflight control produces no departure. The first brief requires stopping when a control does not fail.

The complete prescribed report, including diagnostics, is [report-3.md](/home/user/veneer/tmp/units/flip-preservation/report-3.md).

| Width | Elements | Signatures | Utility | Resolved | Dependent | Dependents excluded with anchor | Admitted | Excluded chrome | Preflight | Unattributed |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1280 | 9611 | 1455 | 3282 | 72 | 0 | 14 | 3 | 218 | 0 | 0 |
| 390 | Not reached | — | — | — | — | — | — | — | — | — |

No boxes were lost at 1280 px.

The controls read:

- **Stripped curation:** `h5.card-title` departs in `font-size` (20px → 16px) and `font-weight` (500 → 400), both attributed to preflight. The empty-rejections assertion fails as required.
- **Planted preflight:** appending `@layer base { h6 { font-weight: 300 } }` produces `[]`. Its detection assertion fails with `AssertionError: expected false to be true`.
- Both stylesheet mutations were restored.

The propagation helper tests pass. The focused gate exits **1**, taking **31.44 s Vitest wall / 33.092 s launcher wall**, before reaching 390 px. Full-journey timing is unmeasured.

Caption rows, the guide sentence, formatting, and the acceptance sequence were not reached. Post-stop `git diff --check` passes, and both stylesheet digests remain unchanged:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  dist/src/bootstrap/index.css
b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662  dist/src/tailwindcss/index.css
```

Final tracked status remains confined to the owned files:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Nothing was committed.