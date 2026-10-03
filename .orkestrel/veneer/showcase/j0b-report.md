Committed **`5d99d2e65a523ed74c22155468063652f8404920`** with both requested trailers. The working tree is clean. Nothing was pushed.

The comparable verbose/JSON run improved from **464.65 seconds, failed**, to **188.79 seconds, 48 passed**. The baseline had 40 passed, 1 failed, and 7 incomplete after Chromium exhausted memory.

Per-test seconds are **before → after**. “Incomplete” means the baseline produced no completed result.

| Test | light-1280 | dark-1280 | light-390 | dark-390 |
|---|---:|---:|---:|---:|
| J1 arrival | 3.015 → 2.812 | 2.401 → 2.039 | 1.774 → 1.811 | 2.199 → 2.364 |
| J2 keyboard | 36.213 → 6.269 | 40.092 → 6.940 | 35.990 → 7.458 | 33.965 → 8.340 |
| J3 sections | 50.249 → 50.082 | 53.555 → 50.362 | 75.069 → 72.621 | 73.724 → 74.214 |
| J4 stylesheets | 4.763 → 4.649 | 4.922 → 4.739 | 4.732 → 4.417 | 4.516 → 4.156 |
| J6 vocabulary | 2.055 → 1.819 | 1.902 → 1.871 | 1.570 → 1.802 | 1.899 → 1.828 |
| J7 native controls | 13.591 → 14.169 | 14.034 → 14.864 | 13.068 → 13.785 | 13.748 → 13.122 |
| J8 live engine | 17.533 → 17.333 | 17.818 → 18.448 | 15.519 → 15.828 | 16.201 → 17.313 |
| Disabled refusals | 0.561 → 1.176 | 0.761 → 1.187 | 0.488 → 0.983 | 0.539 → 1.112 |
| Frozen specimens | 3.260 → 3.019 | 2.742 → 3.316 | 2.747 → 3.430 | 2.583 → 3.274 |
| Matrix | 132.346 → 30.150 | 134.730 → 31.156 | 132.444 → 32.210 | 132.827 → 33.220 |
| Statechart | Incomplete → 18.864 | Incomplete → 20.120 | 120 timeout → 14.645 | Incomplete → 16.287 |
| Portfolio | Incomplete → 1.466 | Incomplete → 1.252 | Incomplete → 0.972 | Incomplete → 1.254 |

See the [baseline reporter](/home/user/veneer/tmp/j0-before.json) and [after reporter](/home/user/veneer/tmp/j0b-four.json).

The changes retain these proofs:

- **One matrix per project:** [Matrix](/home/user/veneer/tests/app/browser/integration.test.ts:504) reads its own viewport/theme. Every variant retains full longhand, pseudo-element, and box comparisons over 79 blocks; image-revert and unexcluded-compile controls; Tailwind readings; census; style escapes; and contrast controls. Surface maps are cleared after comparison.
- **Theme and viewport preparation:** [buildJourney](/home/user/veneer/tests/setupBrowser.ts:408) prepares every test and statechart mount. [Setup tests](/home/user/veneer/tests/setupBrowser.test.ts:72) prove preparation. Arrival, sections, native/engine interactions, vocabulary, refusals, and captures remain exercised in every variant.
- **Direct keyboard readings:** [J2](/home/user/veneer/tests/app/browser/integration.test.ts:157) reads the focused element’s role and name. [Traversal tests](/home/user/veneer/tests/setupBrowser.test.ts:108) cover role discrimination, hidden stops, and missing destinations. Omitting the forward Tab act failed J2; restoring it passed.
- **One statechart execution:** [The harness](/home/user/veneer/tests/app/browser/integration.test.ts:644) executes both complete transition tables and proves object/markup tallies, eliminating duplicate standalone execution.
- **Bounded concurrency:** [The configuration](/home/user/veneer/configs/app/vite.journey.config.ts:23) caps execution groups at four projects.

The concurrency measurements selected four as the faster tested setting:

| Concurrent projects | Wall seconds | Sampled peak bytes | Result |
|---|---:|---:|---|
| 2 | 302.53 | 11,453,489,152 | 48 passed |
| 4 | 188.79 | 9,963,581,440 | 48 passed |

Memory was sampled every 100 ms against the **14,345,035,776-byte** cgroup limit. The capture run peaked at **9,751,756,800 bytes**.

All required gates passed:

| Gate | Exit | Result |
|---|---:|---|
| `npm run format:check` | 0 | 357 files formatted correctly |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | All type checks passed |
| `npm run test:app:browser` | 0 | 218 passed; 8 files |
| `npm run test:setup:browser` | 0 | 69 passed; 2 files |
| `npm run test:journey` | 0 | 48 passed; 4 variants; 194.63 s |
| `CAPTURE=1 npm run test:journey` | 0 | 48 passed; 4 variants; 245.17 s |
| `npm run test:policy` | 0 | 119 passed; 1 existing skip |

The capture comparison found **304 before, 304 after, zero missing, zero extra**. See the [before list](/home/user/veneer/tmp/j0-before-captures.txt) and [regenerated list](/home/user/veneer/tmp/j0b-after-captures.txt).

For scoped iteration, export the required PATH and use this common command with the suffix listed below:

```bash
export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true

./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --reporter=json --outputFile=tmp/iteration.json
```

| Append to command | Measured wall time | Result |
|---|---:|---|
| `--project 'journey:light-1280*'` | 137.18 s | 12 passed |
| `--project 'journey:dark-390*' -t 'J2 reaches'` | 19.73 s | 1 passed; 11 filtered |
| `--project 'journey:light-390*' -t 'showcase statechart'` | 29.03 s | 1 passed; 11 filtered |

**Deviations:** none from J0b. No installs, network fetches, or source edits outside the authorized files. Browser evidence is limited to Chromium.