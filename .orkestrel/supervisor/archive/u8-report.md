# U8 report — implementer (Opus 5) continuation from f4f7721, returned 2026-08-15T12:08Z

U8 complete. Report follows the brief's Output section.

## Touched files (relative to f4f7721)

| File | Change |
| --- | --- |
| `/workspace/supervisor/tests/setupBrowser.ts` | Capture lifecycle (`captureFrame`, `stagePane`, `releasePane`) that unscales **and** lifts the tester out of the runner's clipping split panel, then hands it back; shared shell mounter (`mountShell`/`MountedShell`) and resolvers (`findControl`, `findField`, `findText`, `pressControl`); `readFocus` made keyboard-real and async; `Reading` carries its bar |
| `/workspace/supervisor/tests/app/browser/portfolio.test.ts` | Uses the shared mounter and capture helper; always-on registry proof (`Portfolio registry`); per-state placement assertion; roster fixture typed to `Executor` |
| `/workspace/supervisor/tests/app/browser/contrast.test.ts` | **New.** 29 measured readings per theme, written to `tmp/contrast/<theme>.md` |
| `/workspace/supervisor/tests/app/browser/ApplicationView.test.ts` | Multi-channel fault-voice inventory |
| `/workspace/supervisor/tests/app/browser/integration/setup.ts` | `createApplicationReplyInput`, `startApplicationWorkflow(…, input)`, `captureJourneyFrame`, region-scoped `resolveJourneyTargetWithin` + shared `resolveJourneyScope`, `combobox` role |
| `/workspace/supervisor/tests/app/browser/integration/journey.test.ts` | Reply journey (confirm → choice → feed) with its captures and the journey membership proof |

```
 tests/app/browser/ApplicationView.test.ts     |  55 ++++++
 tests/app/browser/integration/journey.test.ts | 122 ++++++++++++
 tests/app/browser/integration/setup.ts        | 177 +++++++++++++++--
 tests/app/browser/portfolio.test.ts           | 155 +++++++--------
 tests/setupBrowser.ts                         | 263 +++++++++++++++++++++++---
 5 files changed, 657 insertions(+), 115 deletions(-)
 tests/app/browser/contrast.test.ts            | 346 (untracked, new)
```

## Registry and variant count

**Shell (17)** login, refused, roster, stopped, severed, open, prompted, terminal, history, loading, empty, error, partial, filtered, unmatched, bounded, stale.
**Journey (3)** confirm, choice, feed.
**Variants (4)** narrow-light, narrow-dark, wide-light, wide-dark — narrow 390×844, wide 1440×900.
**Portfolio** 20 × 4 = **80 frames**, all present in `tests/app/browser/__screenshots__/portfolio/` (`ls | wc -l` → 80).

## Measured ratio table

Both themes, 29 readings each, in `/workspace/supervisor/tmp/contrast/{light,dark}.md`. Every informative text ≥ 4.5:1 and every mark ≥ 3:1 in both themes. Range: text 4.65–18.77 (light), 4.65–17.10 (dark); marks 4.96–13.57 (light), 3.71–12.11 (dark). Tightest text: `badge: completed` 4.65:1 in both themes. Tightest mark: `signature mark: paused/stopped` 4.96:1 light, `drawer mark: live` 3.71:1 dark.

Focus chrome, recorded as a finding rather than passed:

| surface | light | dark | bar |
| --- | --- | --- | --- |
| focus ring: theme switch | 4.32:1 | 3.54:1 | 3:1 |
| focus ring: filter | 4.90:1 | **2.24:1** | 3:1 |
| focus ring: drawer | **2.30:1** | **1.59:1** | 3:1 |

## Per-criterion proofs

**1. Registry × variants, both proofs green, ordinary run.**
`npm run test:app:browser` — before: `Tests 10 failed | 431 passed (441)`; after: `Test Files 38 passed (38) / Tests 445 passed (445)`. Journey half: `npm run test:app:browser:integration` → `Test Files 3 passed (3) / Tests 14 passed (14)`, membership proof comparing 12 placed frames to `buildPortfolio(JOURNEY_STATES)`.

**2. Contrast green as tests.** `npx vitest run --project app:browser tests/app/browser/contrast.test.ts` → `Tests 2 passed (2)`. Instrument was falsified first: with programmatic focus every ring read exactly 1.00:1, which is the control at rest — `readFocus` now presses Tab and refuses a reading unless `:focus-visible` matches.

**3. Reply/feed journeys green with films.** `confirm-*`, `choice-*`, `feed-*` at 4 variants each. `feed-wide-dark.png` shows the two asks, two settlements, `completed` status and the rail's "Last seen completed".

**4. H7 carriers.** All three closed and on film in `bounded-wide-dark.png`: quoted term (`a name containing "a name no run carries"` in both sentences), Clear standing beside Filter without resizing the fields, `Filter by run id`. `grep -rn "run ID\|Run ID" app/ guides/ tests/` returns nothing.

**5. Pool.**
- 390px glyph legibility — **fixed** at checkpoint (icon font in the shared cascade); verified in every narrow frame.
- Mis-tap adjacency — **fixed** at checkpoint (`py-3 py-lg-2`, ≥48px in the drawer, <48px in the column).
- Address raw JSON — **fixed** at checkpoint (`deriveAddress`); `open-narrow-light.png` reads `build / verify / test`. A unit row still prints its token verbatim, by design: the token is that attempt's own address.
- Triple "updates stopped" — **recorded, pinned by test.** `stopped-wide-light.png` shows all three at once. Each keeps a distinct job: the banner mark says the counts beside it are stale (and is the only one a drawer reader sees), the rail notice carries the reason and Retry, the status line is the region's one announcement. Dropping any one removes a capability; the choice needs a design ruling, not an implementer's.
- Fault-voice inventory — **closed as a proof**: `gives each failed channel one voice with its own reason and recovery` asserts one alert per failed channel with its own reason and recovery, two distinct announcements, one banner mark, and an empty toast surface.
- Navbar shrink — **judged sound, no fix**: at 390 the bar sheds grants → identity → captions and fits with room; `open-narrow-light.png`.

## Harness defect found and repaired (not in the brief)

The checkpoint's shell frames were unreviewable: the runner clips its tester inside a split panel, so unscaling alone painted a 178px sliver of the surface plus the runner's dashboard, in all 68 frames, while the membership proof stayed green. Repaired in `stagePane`: the tester is unscaled **and** lifted to the window origin at its declared size, and released after every shot. Verified by eye at both viewports after regeneration. Two related defects the same work exposed and fixed: the staging leaked across tests (a pinned tester puts controls beyond pointer reach, which had produced 9 of the 10 red tests), and the marker attribute alone is lost to a runner re-render.

## Parity delta

**None.** `guides/` documents the published `src/` surface; no guide quotes the application's filter sentences, its help text, or `run id` (`grep -rn "name containing\|starting with\|Clear the filter\|run id" guides/src/*.md` → no interface prose). `npm run test:guides` → `374 passed`.

## Gates

`format:check` → clean, 370 files · `lint:check` → clean · `check` → all six projects clean · `build` → src + app built · `npm test` → src `251 passed (22 files)`, app `782 passed (67 files)`, policy `17 passed`, guides `374 passed`. Chain exit 0. Baseline f4f7721 was **not** green: `npm run check` reported `tests/app/browser/portfolio.test.ts(30,7): error TS2322` (the earlier run's exit code was masked by a `| tail` pipeline).

```
git status --porcelain
 M tests/app/browser/ApplicationView.test.ts
 M tests/app/browser/integration/journey.test.ts
 M tests/app/browser/integration/setup.ts
 M tests/app/browser/portfolio.test.ts
 M tests/setupBrowser.ts
?? tests/app/browser/contrast.test.ts
```

## Deviations

1. **Skill path.** `orkestrel-human-journey` does not exist under `/workspace/supervisor/.agents/skills/`; read from `/home/user/scaffold/.agents/skills/orkestrel-human-journey/` (SKILL.md + `layer.md` + `captures.md`). Proceeded — same canonical text.
2. **Focus chrome below 3:1, recorded not fixed.** Two secondary-outline controls' focus indicators measure 1.59–2.30:1. No utility closes it (`focus-ring-*` only retints the same quarter-opacity halo), and the application ships **no stylesheet at all** — closing it means creating the project's first one, which the styles rule governs structurally and which is outside this unit's scope. Pinned per theme in `contrast.test.ts` so a fix must rewrite that line. The shared-file patch that would close it belongs in the vendored `vite.config.ts`/style layer, not here.
3. **`vite.config.ts` untouched.** `appBrowser()` refuses configuration overrides by construction and the file is vendored. The runner's browser window (800×513 with the UI, 1280×720 under `CI=1`) is smaller than both declared viewports; the repair above works around it inside owned files, so no patch is required, but a `--window-size` launch argument upstream would remove the workaround.