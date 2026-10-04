Completed browse-11-7 in commit `52cc34fb3744dd9d74f34554cae32f8dc70ef4e1` on `browse-11-repair`. Claims 1, 4, and 5 remain covered and passing. Both capture placements contain the repairs; every added capture case runs against both.

The findings have these repairs and evidence:

| Finding | Repair | Evidence |
| --- | --- | --- |
| Claim 2 | Select the native rendered `switch` branch; lower an SVG when its nearest `svg, foreignObject` ancestor is a `foreignObject`. Preserve the inner SVG's text during collection. | Command A: 6 failures on `cfc3ad4`, then those 6 pass. Covers duplicate `Order total`, lost `Deep label`, and unsupported `requiredExtensions` selecting the text fallback. Empty and hidden selected branches also pass. |
| Claim 3 | Exclude direct reads of arbitrary descendants beneath lowered controls. Preserve supported direct `option` and `optgroup` reads. | Command A: 4 failures on `cfc3ad4`, then those 4 pass, covering textarea and non-selected option descendants in both placements. |
| Claim 6 | Move the sibling-pointer comment to the walk, describe the final privacy sweep as guarding copy/live-tree divergence, and format the specified type-documentation tokens as code. | Diff inspection, formatting, lint, and type gates pass. No behavioral red run applies to these prose repairs. |
| N1 | Assert that serialized child-frame HTML excludes `private-frame` and `hidden-payload`. | Command B: unchanged baseline passes; a temporary frame-input leak mutation fails the added assertion while the text assertion passes; restored source passes. Counts follow. |
| N2 | Remove the DOM benchmark row's indexed control; retain the compiled comparison and the keep decision. | Compiler test file: 53 passed, exit 0. No benchmark run. |
| N3 | Read a `text` element only when it has no `text` ancestor in the same SVG. Add the nested-text input to `CAPTURE_CASES`. | Command A: 2 failures on `cfc3ad4` (`AB B`), then both pass (`AB`). |

Command A was identical for the red and green runs:

```text
npx vitest run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t 'SVG|direct read under.*control'
```

Baseline: exit 1, 12 failed, 8 passed, 270 filtered out. Immediate repaired run: exit 0, 20 passed, 270 filtered out. Final run, including the empty and hidden branch controls: exit 0, 24 passed, 270 filtered out. The full helper file passed all 294 tests.

Command B was identical for the baseline, mutation, and restored runs:

```text
npx vitest run --config vite.config.ts --project service tests/service/document.test.ts -t 'captures direct roots'
```

Baseline: exit 0, 1 passed, 44 filtered out. Mutation: exit 1, 1 failed, 44 filtered out. Restored source: exit 0, 1 passed, 46 filtered out after the additional capture rows. The mutation was removed before the gates and commit.

The switch repair adds an O(k) child scan and up to O(k) native rectangle reads per switch, with O(k) temporary references. Native reads can trigger layout; no timing was measured. The SVG descendant query is unchanged in count; added ancestor lookups cost O(h) each for ancestor depth h. The sibling-pointer walk remains intact.

The prescribed gates ran after the final source edit on Windows:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:src:core` | 0 | 1202 passed |
| `npm run test:src:browser` | 0 | 417 passed, 1 skipped |
| `npm run test:src:server` | 1, then 0 | Initially 1 failed, 252 passed, 9 skipped; rerun 253 passed, 9 skipped |
| `npm run test:src:bin` | 0 | 4 passed, 1 skipped |
| `npm run test:guides` | 0 | 248 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run test:setup` | 0 | 175 passed, 3 skipped |
| `npm run test:setup:browser` | 0 | 22 passed |
| `npm run build` | 0 | Passed |
| `npm run test:service` | 0 | 144 passed |
| `git diff --check` | 0 | Passed |

Deviations: a pristine-baseline N1 failure could not be recorded because `cfc3ad4` already removes the frame's private inputs; mutation evidence proves the added assertion detects their leakage. The blanket control-ancestor prescription initially broke the existing direct-option test in both placements, so the repair preserves direct control lowering to retain claim 5 without changing its public contract.

The server gate timed out in `FileBrowserStore`'s empty-lock-removal race test at its existing 5000 ms limit. Running `npx vitest run --config vite.config.ts --project src:server tests/src/server/stores/FileBrowserStore.test.ts` alone passed with 21 passed and 1 skipped, exit 0; the whole server gate then passed. No timeout was changed. No service timeout occurred.

The supplemental discovery script exited 1 and misclassified the Chromium-suffixed browser project names as ungated/empty; their prescribed gates collected and passed them. It found no undiscovered test files. No added case is skipped.

One commit was made. Nothing was pushed, published, or installed. Final `git status --porcelain` output is empty.