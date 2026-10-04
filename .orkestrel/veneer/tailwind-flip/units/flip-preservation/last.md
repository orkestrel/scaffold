Stopped under the brief’s deviation contract. The focused gate found **6,541 unattributed departures outside the admitted set**. Nothing is committed.

The [complete report](/home/user/veneer/tmp/units/flip-preservation/report.md) contains every signature key, specimen, class list, longhand, baseline/recipe reading, and the **untruncated failure output**. [Structured readings](/home/user/veneer/tmp/units/flip-preservation/readings.json) and the [patch](/home/user/veneer/tmp/units/flip-preservation/unit.patch) are also saved.

### 1. Findings

| Reading | 1280px | 390px |
|---|---:|---:|
| Elements | 9,829 | 9,829 |
| Signatures | 1,469 | 1,469 |
| Utility | 3,335 | 3,336 |
| Resolved | 77 | 19 |
| Preflight | 3 | 3 |
| Inherited | 0 | 0 |
| Unattributed | 3,301 | 3,246 |
| Rejected outside admitted set | 3,298 | 3,243 |
| Lost boxes | 0 | 0 |
| Seconds | 20.404 | 21.436 |

Exclusions:

| Kind | 1280px | 390px |
|---|---:|---:|
| Layout | 4,641 | 3,706 |
| Typography | 0 | 0 |
| Invisible | 6,503 | 6,495 |
| Tab-size/shorthand | 1,469 | 1,469 |
| Position-area | 0 | 0 |
| Grid tracks | 7 | 2 |

At both widths, the description-list specimen produced these admitted readings:

| Element | Longhand | Bootstrap → recipe | Cause |
|---|---|---|---|
| `dl.row` | `margin-bottom` | 16px → 0px | preflight |
| `dl.row` | `margin-block-end` | 16px → 0px | unattributed |
| `dd.col-sm-9` | `margin-bottom` | 8px → 0px | preflight |
| `dd.col-sm-9` | `margin-block-end` | 8px → 0px | unattributed |
| `dd.col-sm-8` | `margin-bottom` | 8px → 0px | preflight |
| `dd.col-sm-8` | `margin-block-end` | 8px → 0px | unattributed |

The appended ruling’s expected utility attribution was **not observed**.

Hypothesis: missing logical-to-physical property correspondence explains many rejected readings. The report also exposes face-toolbar class changes. These findings do not establish that every reported component visibly breaks.

The focused case took **41.938 seconds**, versus the archived partition’s 53 seconds. Full-journey cost against the 449/487-second references remains unmeasured.

Production controls were not reached; no failing lines are claimed for them. The helper controls passed.

### 2. Caption rows

None added: execution stopped at the gate before caption work.

### 3. Proposed guide sentence

Pending a passing gate, for **Tailwind + layer**:

> The `attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths` case checks component preservation against the same-page Bootstrap baseline at 1280 and 390 pixels, reports declared candidate causes, and rejects preflight and unattributed departures outside the admitted description-list set.

The guide remains unchanged.

### 4. Acceptance

| Command | Expected | Measured |
|---|---|---|
| `npm run check` | Exit 0 | Development run: 0; final tree unverified |
| `npm run lint:check` | Exit 0 | Corrected development rerun: 0 |
| `npm run format:check` | Exit 0 | 1; four owned files formatted; not rerun |
| `npm run test:setup:browser` | Exit 0 | Baseline: 0, 134 passed, 145.70s; final run not reached |
| `npm run test:journey` | No new failures | Full run not reached |
| `npm run test:app:browser` | Exit 0 | Not reached |
| `git diff --check` | Exit 0 | 0 |

Focused gate: **exit 1**, one failed, 21 skipped:

```text
AssertionError: expected [ …(6541) ] to deeply equal []
```

Its title is absent from the Host-bound set, requiring the stop. Complete exact outputs for all failed checks are in report §4.

### 5. Edited files and final status

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```