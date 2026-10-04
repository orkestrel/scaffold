The gate passes at **1280 and 390 px**, with zero `preflight`, zero `unattributed` departures, and zero lost boxes. Controls, caption rows, guide sentence, and acceptance commands are complete. Nothing is committed.

The prescribed report, including all caption text, exact readings, and unabridged failure diagnostics, is saved in [report-4.md](/home/user/veneer/tmp/units/flip-preservation/report-4.md).

| Reading | 1280 px | 390 px |
| --- | ---: | ---: |
| Elements / signatures | 9611 / 1455 | 9611 / 1455 |
| Utility / resolved | 3282 / 72 | 3284 / 14 |
| Inherited / attributed dependents | 0 / 0 | 0 / 0 |
| Dependents excluded with anchor | 14 | 14 |
| Admitted description-list margins | 3 | 3 |
| Excluded chrome / outer shell | 218 | 218 |
| Preflight / unattributed | 0 / 0 | 0 / 0 |
| Boxes before / lost | 9358 / 0 | 9168 / 0 |

The curated `h6` plant reads `[]`. Stripped curation rejects the card-title size and weight departures. The verified `word-spacing` plant reads `0px → 4px` as `preflight` and triggers rejection. The wrong-caption control fails on expected `501`, measured `500`; the expectation was restored.

All **22 added caption rows** agree with the captions across three faces, both widths, and both color modes. No caption, fragment, guide, or stylesheet was edited.

The proposed guide sentence is:

> Tailwind wins the shared utility conflicts, while `attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths` checks main-region component signatures in light mode at 1280 and 390 px, rejects `preflight` and `unattributed` causes after the declared exclusions and admitted description-list margins, and rejects lost component boxes.

| Acceptance | Result | Exit |
| --- | --- | ---: |
| `check` | Passed | 0 |
| `lint:check` | Passed | 0 |
| `format:check` | Passed | 0 |
| Focused gate | Passed; **46.623 s** case wall | 0 |
| `test:setup:browser` | 144 passed | 0 |
| `test:app:browser` | 237 passed | 0 |
| `test:journey` | 87 passed, 3 host-bound failures, 6 skipped | 1 |
| `git diff --check` | Clean | 0 |
| Digests | Both unchanged | 0 |
| Tracked status | Only five owned files | 0 |

The gate takes **62.398 s inside the full journey**, exceeding the 60-second reporting threshold; the report records its cost drivers. Full journey wall time is **591.13 s**. Its three failures are exactly the allowed light-390 J8 and accordion `motion=false`, and dark-390 collapse `motion=false` titles.

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  dist/src/bootstrap/index.css
b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662  dist/src/tailwindcss/index.css
```

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```