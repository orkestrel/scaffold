# Unit M1 report — migrate roughnotes onto the scaffold 0.0.72 configs group

The configs group landed and the four-variant journey fan-out survives. Two acceptance criteria
stayed open, both because closing them requires editing off-limits files.

## Criteria

| #   | Criterion                                                            | State                                                                 |
| --- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | `npm run test:journey` collects four journey projects and passes     | done                                                                  |
| 2   | The four named `tests/config.test.ts` cases pass                     | **3 of 4**; the fourth needs an off-limits file                       |
| 3   | `npm test` exits 0                                                   | **not done**; the same case fails, every other project passes         |
| 4   | `npm run build` succeeds, no `deprecat` line, CSS at 323.24 kB       | done                                                                  |
| 5   | `npx scaffold audit` drift named with reasons                        | done; drift fell from 3 paths to 1                                    |
| 6   | `npm run format:check` and `npm run lint:check` clean                | format done; **lint not done**, 37 errors all in off-limits files     |
| 7   | Nothing off-limits modified; `git status --short` reported           | **deviation**: `overwrite` wrote `guides/` and `.claude/agents/orkestrel.md` |

## What the overwrite wrote and removed

`scaffold overwrite --groups configs` refused the dirty tree first:

```text
TARGET: The target at . carries 10 uncommitted changes. Commit them, or pass --dirty to waive the refusal.
```

Committing is barred by the brief, so I re-ran with the documented waiver, `--dirty`. Before doing
so I enumerated the configs group's 15 planned paths against the tree and confirmed every file under
`configs/` and every planned root dotfile is plan-owned, so nothing this workspace owns was at risk
of deletion. That answers the first unknown: **the overwrite deletes nothing here.**

```text
0 of 15 planned paths drifted from the plan. Audit compared bytes at 14, existence at 1, and nothing at 0.
vite.config.ts replaced (131 lines removed).
.oxlintrc.json replaced (71 lines added).
.prettierignore replaced (3 lines added).
12 written, 13 unchanged, 0 removed in ..
50 published, 8 guides fetched, 0 no longer listed.
```

- `vite.config.ts` — regenerated from the plan; every journey and workspace-local span dropped.
- `.oxlintrc.json` — promotes `policy/no-malformed-summary` and `policy/no-banned-term` from absent
  to **top-level** rules, and adds two override blocks over `app/**` and `configs/**`. That widening
  is what the three named config cases were measuring.
- `.prettierignore` — adds the `host.json` exclusion.
- `0 removed`. Nothing was deleted.

**Side effect beyond the configs group.** `overwrite` runs the catalog step regardless of `--groups`,
as its own help text states ("do everything repair and catalog do"). It therefore rewrote
`.claude/agents/orkestrel.md`, refreshed `guides/guide.md` and `guides/scaffold.md`, and added
`guides/contract.md`, `guides/emitter.md`, `guides/html.md`, `guides/probe.md`, `guides/router.md`,
and `guides/test.md`. `guides/` is on the brief's off-limits list, and the brief's owned-files clause
"anything else `overwrite --groups configs` writes" covers it — the two lines conflict. I did not
revert, because reverting needs a git command the brief bars and because the baseline audit had
already flagged those mirrors as drifted. **Reported, not decided.**

## The guard release

I removed only the `test:journey` script definition, not the `test` chain's `npm run test:journey`
reference. Ruling: the guard reads `--project` flags out of script bodies, and the chain reference
names a script rather than a project, so dropping the definition alone releases the guard. It did.
The chain reference then pointed at a missing script for the length of one command, which nothing ran.

`package.json`'s `scripts` block is now **byte-identical to HEAD** — verified by diffing the block
against `git show HEAD:package.json`. The only `package.json` diff against HEAD is the dependency
range re-pin the inherited visit made before this unit started.

## Spans restored into the regenerated `vite.config.ts`

Captured verbatim to `tmp/units/m1-vite-config-capture.ts` before running anything.

| Span                                                       | Where it landed                                              | Change from the capture                        |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `JourneyVariant` interface                                 | line 39, ahead of `mergeOverride`                            | verbatim                                       |
| `VARIANTS` and its doc block                               | line 52                                                      | verbatim                                       |
| `JOURNEY_INCLUDE`                                          | line 60                                                      | verbatim                                       |
| `exclude: [JOURNEY_INCLUDE]` and its comment               | line 179, inside the regenerated `appBrowser` test block     | verbatim                                       |
| `journey(variant)` and its doc block                       | line 325, after the plan's factories                         | summary sentence and label colour changed      |
| `...VARIANTS.map((variant) => () => journey(variant))`     | line 348                                                     | verbatim                                       |
| `appShowcase`                                              | line 213                                                     | summary sentence changed                       |
| `css.preprocessorOptions.scss.silenceDeprecations`         | line 154                                                     | verbatim, with its comment                     |
| `optimizeDeps.include`                                     | line 158                                                     | verbatim                                       |

Three spans need their reasoning stated.

**The journey factory composes on the regenerated `appBrowser` unchanged.** The plan's
`appBrowser(override?)` returns `mergeOverride(project, override)`, and `mergeOverride` returns the
base when the override is absent, so `appBrowser()` still yields the plain configuration object the
journey spread reads. The doc paragraph explaining that a journey **replaces** the browser test
block rather than passing it as an override is intact and now carries more weight, because the
regenerated factory does take an override.

**Two spans the brief did not name, restored because the criteria require them.** The regenerated
`appBrowser` dropped this workspace's `css.preprocessorOptions.scss.silenceDeprecations` block and
its `optimizeDeps.include` list. Neither is in the plan and neither is in the brief's survival list.
The Sass block is load-bearing for criterion 4: no other file in the tree handles Sass deprecations
(`grep -rn "deprecat" configs/ tests/setup.ts tests/setupBrowser.ts` returns nothing), so dropping it
puts Bootstrap's deprecation warnings back into the build log. With it restored the build log carries
zero `deprecat` lines.

**`appShowcase` had to come back, and the typecheck is what proved it.** The 0.0.72 plan omits
`appShowcase` for a workspace with no `configs/app/vite.showcase.config.ts`. My first ruling was to
let it go. `npm run check` refused:

```text
tests/conformance.test.ts(11,22): error TS2614: Module '"../vite.config.js"' has no exported member 'appShowcase'.
```

`tests/conformance.test.ts` is off-limits and imports `appShowcase` and drives it through ten
assertions, so the export is a live consumer and the restore belongs in the owned file. Restored from
the capture; the conformance project passes.

Two summary sentences changed, because the widened `.oxlintrc.json` now enforces
`policy/no-malformed-summary` at top level, which refuses a symbol's own name in its first sentence:

- `journey` — "Builds the Vitest project that drives every journey at one variant." became
  "Builds the Vitest project that runs the browser walkthrough suite at one variant."
- `appShowcase` — "Builds the showcase configuration on the browser configuration." became
  "Builds the browser configuration written to its own output directory."

The journey label colour moved from `magenta` to `green`, because the plan now gives `conformance`
the `magenta` label and a dot report reads better with distinct colours. Ancillary; recorded, not
escalated.

**The second unknown is answered: 0.0.72 plans both `conformance` and `setup`.** Neither needed
restoring. The plan's `setup` carries `color: 'white'` where this workspace used `red`, and its
`conformance` carries `magenta` where this workspace used `green`. Both are the plan's now.

## The journey proof

Four distinct projects, each collecting the suite once:

```text
$ npx vitest list --config vite.config.ts --project 'journey:*' --filesOnly
[journey:light-1280 (chromium)] tests/app/browser/integration.test.ts
[journey:dark-1280 (chromium)] tests/app/browser/integration.test.ts
[journey:light-390 (chromium)] tests/app/browser/integration.test.ts
[journey:dark-390 (chromium)] tests/app/browser/integration.test.ts
```

They run and pass:

```text
$ npm run test:journey
 Test Files  4 passed (4)
      Tests  76 passed | 4 skipped (80)
   Duration  38.77s
```

The shared browser project still excludes the journey suite. Listing `app:browser` returns 43 files
and `grep -c "integration.test.ts"` over that listing returns `0`.

## The coupling, before and after

Command: `npm run test:config`.

- Before: `Tests  4 failed | 167 passed | 2 skipped (173)` — `tmp/units/m1-config-before.log.txt`
- After: `Tests  1 failed | 170 passed | 2 skipped (173)` — `tmp/units/m1-config-after.log.txt`

Three of the four named cases now pass:

- `root configuration > keeps policy rules active across every linted workspace path` — passes
- `policy plugin > enables every plugin rule over the population its law names` — passes
- `policy plugin > loads every configured policy rule through the real binary` — passes

The fourth does not, and the configs group cannot close it. See the later section on what I did not
close.

## Gate evidence

| Gate                   | Result                                                                        |
| ---------------------- | ----------------------------------------------------------------------------- |
| `npm run format:check` | exit 0, "All matched files use the correct format", 129 files                 |
| `npm run lint:check`   | **exit 1**, 37 errors, every one in an off-limits file                        |
| `npm run check`        | exit 0                                                                        |
| `npm run build`        | exit 0, CSS asset `index-hhVhdyP4.css` at **323.24 kB**, zero `deprecat` lines |
| `npm test`             | **exit 1** at `test:config`                                                   |

Per-project counts. `npm test` stops at `test:config`, so I ran the two projects after it directly.

| Project                     | Files          | Tests                                  |
| --------------------------- | -------------- | -------------------------------------- |
| `app:core` and `app:browser` | 43 passed (43) | 192 passed (192)                       |
| `journey:*`                 | 4 passed (4)   | 76 passed, 4 skipped (80)              |
| `policy`                    | 1 passed (1)   | 101 passed, 1 skipped (102)            |
| `config`                    | 1 failed (1)   | 1 failed, 170 passed, 2 skipped (173)  |
| `setup`                     | 1 passed (1)   | 3 passed (3)                           |
| `conformance`               | 1 passed (1)   | 12 passed (12)                         |

Zero `deprecat` lines across every test log and the build log.

## Audit drift

Drift fell from 3 paths to 1.

```text
$ npx scaffold audit
┌────────────────┬─────────┬───────┐
│ path           │ group   │ drift │
├────────────────┼─────────┼───────┤
│ vite.config.ts │ configs │ stale │
└────────────────┴─────────┴───────┘
1 of 40 planned paths drifted from the plan.
```

`vite.config.ts` stays stale by design. It carries the `JourneyVariant` interface, `VARIANTS`,
`JOURNEY_INCLUDE`, the `journey` factory, the fan-out spread, the `appBrowser` exclusion, the Sass
deprecation silencing, and the `optimizeDeps` pre-bundling list — none of which the plan knows about.
`.oxlintrc.json` and `.prettierignore` are now aligned.

The accompanying notes:

- `projects: ... journey:*` — returns with the restored script. This is the same guard the objective
  worked around, and it fires on every audit while the fan-out exists.
- `setup: tests/setupBrowser.ts carries no proof` — pre-existing, unrelated to this unit.
- `guides: guides/test.md differs from the hosted guide` — **new, and created by this unit's own
  overwrite**. The catalog step fetched the file and the audit immediately reports it stale; two
  consecutive audits give the same answer, and the file carries no CRLF. The guides group itself
  reports `0 of 3 planned paths drifted`, so this is a note rather than a drift row. Worth a look in
  scaffold; outside this unit's scope, and `guides/` is off-limits here.
- Three `dependencies` major-version notes — pre-existing, unchanged.

The baseline's two guide notes, on `guides/guide.md` and `guides/scaffold.md`, are closed.

## What I did not close

### Criteria 2 and 3 — the fourth config case needs an off-limits file

`tests/config.test.ts > configuration helpers > reads the compiler scope and fixed extractor override
a declaration roll-up requires` fails, and no configs-group change can fix it:

```text
Error: The workspace declares no face project
 ❯ tests/config.test.ts:2161:33
```

The case derives its subject from `configs/src/tsconfig.{core,browser,server}.json`:

```ts
const faces = ['core', 'browser', 'server']
const face = faces.find((candidate) =>
	existsSync(resolve(root, `configs/src/tsconfig.${candidate}.json`)),
)
if (face === undefined) throw new Error('The workspace declares no face project')
```

roughnotes has no `src/` axis at all, so it vendors no `configs/src/` wrapper, and the scaffold plan
does not plan one: `scaffold audit --groups configs` lists 15 planned paths and none is under
`configs/src/`. The case therefore fails on **every app-only workspace**, and the brief's diagnosis —
that all four failures trace to the stale `.oxlintrc.json` — holds for three of them only.

This reads as a defect in the vendored test rather than in this workspace. Its sibling case in the
same file, `requires and validates every selected target wrapper`, walks both axes and skips a
missing one:

```ts
for (const axis of ['src', 'app']) {
	for (const environment of ['core', 'browser', 'server']) {
		if (!existsSync(resolve(root, axis, environment))) continue
```

`tests/config.test.ts` is off-limits and is vendored from the published package, so the fix belongs
in the scaffold repository's generator. Two options:

- **Walk both axes**, `src` first then `app`, so an app-only workspace resolves its face from
  `configs/app/tsconfig.core.json`. Cost: the case then measures an app wrapper, and a declaration
  roll-up is a published-library concern, so it would be measuring something it was not written for.
- **Guard on the `src/` axis** — throw only where `existsSync(resolve(root, 'src'))` is true, and
  skip otherwise. Cost: none that I can see; a workspace that vendors no published library has no
  declaration roll-up to measure, and a `src` workspace that lost its face project still throws.

Recommendation: the guard. Route it to the scaffold repository as a successor unit.

### Criterion 6 — `lint:check` needs two off-limits files

37 errors, every one under `tests/app/browser/`, which the brief lists as off-limits:

| File                           | Rule                            | Count |
| ------------------------------ | ------------------------------- | ----- |
| `tests/app/browser/setup.ts`   | `policy(no-malformed-summary)`  | 36    |
| `tests/app/browser/App.test.ts` | `policy(no-banned-term)`       | 1     |

The cause is this unit's own `.oxlintrc.json`, and the change is intended by scaffold. The 0.0.63-era
configuration carried `policy/no-mocking` and `policy/no-keyword-privacy` at top level and nothing
else; 0.0.72 adds `policy/no-malformed-summary` and `policy/no-banned-term` there, so both now reach
`tests/**` for the first time. That widening is exactly what the config case `keeps policy rules
active across every linted workspace path` asserts, so the lint failures are real drift in this
workspace's own test files that the stale configuration had been hiding.

The `no-malformed-summary` sites are noun-phrase TSDoc summaries on constants, for example
`tests/app/browser/setup.ts:795`:

```ts
/** The opaque fill a composited stack ends on, which is what the reader's walk must reach. */
export const STACK_BASE = 'rgb(255, 255, 255)'
```

The rule wants a third-person verb opening. The single `no-banned-term` site is the word `just`
inside the doc block starting at `tests/app/browser/App.test.ts:33`.

Every site is listed with its line number in `tmp/units/m1-offlimits-lint.txt`. This is a
well-specified mechanical rewrite over two files and needs its own unit with those files owned.

## Files this unit changed

Confirmed by diffing `git status --short` before and after against
`tmp/units/m1-status-before.txt`. Every other modified path in the tree was already modified by the
inherited visit.

| File                                                                                                       | Change                                                                                     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `vite.config.ts`                                                                                           | regenerated from the 0.0.72 plan, then the journey, Sass, pre-bundling, and showcase spans restored |
| `.oxlintrc.json`                                                                                           | regenerated from the plan                                                                  |
| `.prettierignore`                                                                                          | regenerated from the plan                                                                  |
| `package.json`                                                                                             | `test:journey` removed and restored; scripts block byte-identical to HEAD                  |
| `.claude/agents/orkestrel.md`                                                                              | catalog side effect of `overwrite`                                                         |
| `guides/guide.md`, `guides/scaffold.md`                                                                    | catalog side effect; refreshed from the hosted guides                                      |
| `guides/contract.md`, `guides/emitter.md`, `guides/html.md`, `guides/probe.md`, `guides/router.md`, `guides/test.md` | catalog side effect; new mirrors                                          |

### `git status --short`

```text
 M .claude/agents/orkestrel.md
 M .claude/settings.json
 M .oxlintrc.json
 M .prettierignore
 M configs/helpers.ts
 M configs/policy.ts
 M guides/guide.md
 M guides/scaffold.md
 M package-lock.json
 M package.json
 M scripts/ollama.sh
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M vite.config.ts
?? .orkestrel/roughnotes/m1-brief.md
?? guides/contract.md
?? guides/emitter.md
?? guides/html.md
?? guides/probe.md
?? guides/router.md
?? guides/test.md
```

### Diffstat, this unit's files only

```text
 .claude/agents/orkestrel.md |  104 +--
 .oxlintrc.json              |   73 +-
 .prettierignore             |    3 +
 guides/guide.md             |  971 ++++++++++++++++-----
 guides/scaffold.md          | 1135 +++++++++++++++---------
 package.json                |   10 +-
 vite.config.ts              |  277 +++---
```

`package.json`'s 10 changed lines are the inherited visit's dependency re-pin, not this unit's.

Untouched and verified: `app/`, `tests/app/`, `tests/conformance.test.ts`, `tests/setup.ts`,
`tests/setup.test.ts`, `.orkestrel/`, `tests/config.test.ts`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`, `configs/helpers.ts`, `configs/policy.ts`.

`package-lock.json` was not touched by this unit — its mtime is `08:59:45`, before the `09:06:04`
overwrite, and `scaffold overwrite` performs no install. `node_modules/.orkestrel-lock.sha256` holds
`67e37f3832a820a7bfb8a2296d15b69cb1b06f10629f05367b29b43f28516d54`, which matches the lockfile's
current digest, so the marker needs no write.

## Retained artifacts

Under `tmp/units/`:

- `m1-vite-config-capture.ts`, `m1-package-json-capture.json`, `m1-oxlintrc-capture.json`,
  `m1-prettierignore-capture.txt` — pre-overwrite captures
- `m1-restore.mjs`, `m1-restore-showcase.mjs`, `m1-restore-script.mjs`, `m1-drop-journey.mjs`,
  `m1-fix-summary.mjs` — the exact edit instruments
- `m1-overwrite.log.txt`, `m1-config-before.log.txt`, `m1-config-after.log.txt`, `m1-journey.log.txt`,
  `m1-check.log.txt`, `m1-format.log.txt`, `m1-lint.log.txt`, `m1-build.log.txt`, `m1-test.log.txt`,
  `m1-test-setup.log.txt`, `m1-test-conformance.log.txt`, `m1-audit-after.log.txt`
- `m1-offlimits-lint.txt` — every lint site with its line number
- `m1-status-before.txt`, `m1-status-after.txt`, `m1-tracked-before.txt`
- `m1-preview/` — a throwaway copy of the tree used to read the planned configs group before running
  the real overwrite. Safe to delete.
