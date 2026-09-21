# Unit CL3b — fix round report (brief 3)

Analyst 9 is closed. All three case registrations in `tests/src/styles/tokens.test.ts` read the
`TEXT_MODES` export from `tests/setupStyles.ts`. No inline mode matrix remains in the styles
suite. Every gate in the chain exits 0 on managed Chromium and on Edge, with the round-1 counts
`Test Files 30 passed (30)` and `Tests 162 passed (162)`.

## The change as landed

One owned file changed: `tests/src/styles/tokens.test.ts`. The import at line 19 gained
`TEXT_MODES` in its existing sorted named-import block from `../../setupStyles.js`, between
`RETAINED_LENGTH_ALIASES` and `THEME_DARK_ADDITIONS`.

| Site (final line)                     | Case                                                                                                            | Was                        | Is                      |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------- |
| `tests/src/styles/tokens.test.ts:440` | `code calibration tokens` > resolves text and surface to the code-inline record in `%s` mode                    | `it.each(['light', 'dark'])(` | `it.each(TEXT_MODES)(` |
| `tests/src/styles/tokens.test.ts:466` | `content calibration tokens` > resolves the muted text and the raised surface to the content record in `%s` mode | `it.each(['light', 'dark'])(` | `it.each(TEXT_MODES)(` |
| `tests/src/styles/tokens.test.ts:513` | `content calibration tokens` > resolves the shorter monospace stack and the code block rhythm in `%s` mode       | `it.each(['light', 'dark'])(` | `it.each(TEXT_MODES)(` |

Nothing else in the file changed by hand: the assertions, the expected values, and the anchor
proof (`leaves the dark role border tiers on the anchor the raised surface no longer carries`)
stand as round 1 left them. `tests/setupStyles.ts` and `tests/setupStyles.test.ts` are untouched;
`TEXT_MODES` was already exported and already listed in the setup inventory assertion
(`tests/setupStyles.test.ts:80`).

The scoped formatter reflowed the code-calibration case after the substitution. `TEXT_MODES` is
shorter than the array literal it replaced, so `oxfmt` collapsed that registration's callback onto
the `it.each` line and re-indented its body one level out. That is the canonical rewrite the
standing clause grants, run scoped to the owned file
(`npx oxfmt --config .oxfmtrc.json --write tests/src/styles/tokens.test.ts`, exit 0). It accounts
for the bulk of that file's diffstat; the substantive edit is the import line and the three
`it.each` arguments.

`TEXT_MODES` is `Object.freeze(['light', 'dark'] as const)`, so `mode` narrows to
`'light' | 'dark'` at each site and every `mode === 'light'` branch in the three bodies typechecks
unchanged. `npm run check` exits 0.

## The sweep

Population: every file under `tests/src/styles/**` — 30 test files plus the
`tests/src/styles/fixtures/mixins.scss` fixture. Patterns run over that population, each recorded
with what it admitted.

| Pattern                                            | Purpose                                            | Result                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `\.each\(`                                         | every case registration in the suite               | 30 hits. All read a setup export: `BUTTON_*_CASES` and `TEXT_*_CASES` from `tests/setupStyles.ts` at the element and component proofs, and the three `TEXT_MODES` sites this round fixed. No `describe.each` and no `test.each` anywhere.                                                                          |
| `it\.each\(\['`                                    | a surviving inline array matrix                    | 0 hits.                                                                                                                                                                                                                                                                                                            |
| `for \(const .* of \[`                             | a matrix driven by a loop rather than by `each`    | 0 hits.                                                                                                                                                                                                                                                                                                            |
| `\.forEach\(`                                      | registration through a callback                    | 0 hits.                                                                                                                                                                                                                                                                                                            |
| `'light'` and `'dark'`                             | a mode literal outside a setup case                | 12 hits, all ruled non-matrix: single-specimen scope selectors in `tokens.test.ts` at lines 60, 61, 78, and 295, and the `data-bs-theme` attribute writes and `color-scheme` readings in `theme.test.ts` at lines 32, 48, 54-57, and 67, which are the subject of those tests rather than a matrix over them.      |
| `const .* = \[`, `const .* = \{$`, `Object.freeze` | a local data table or expected-value table         | 6 hits, ruled in the following list.                                                                                                                                                                                                                                                                               |

The local-array and local-object hits, each ruled:

- `tests/src/styles/tokens.test.ts:73` (`scopes`) and `:90` (`scopes`) — two mounted DOM elements
  held for one assertion. A specimen handle, not a table.
- `tests/src/styles/tokens.test.ts:229` (`steps`) and `:253` (`sizes`) — lists of `TOKEN_NAMES`
  members naming which tokens the one test mounts. These select the subject and carry no expected
  values, which sit inline in that test's own `toEqual([2, 24, 48])` and the density rescale beside
  it. They register nothing, so the case-matrix law in `.claude/rules/tests.md` § Shared test
  infrastructure does not reach them. **Reported, not edited**: relocating them would need
  `tests/setupStyles.ts`, which this brief puts off-limits.
- `tests/src/styles/mixins.test.ts:195` (`drift`) and `tests/src/styles/index.test.ts:9` (`order`)
  — empty accumulators the test fills.
- `tests/src/styles/mixins.test.ts:212` (`expected`) — an expectation derived from the breakpoint
  law inside the loop (`reading >= width ? 1 : 0`), recomputed per reading. Not a table.
- `tests/src/styles/elements/heading.test.ts:18` (`headings`) — a `querySelectorAll` result.

Sweep result: the three sites this round fixed were the styles suite's last inline mode matrices.
Nothing outside the owned file needs an edit. Nothing was found that this brief's owned set cannot
reach, apart from the two subject-selection lists named earlier, which are reported as
non-findings rather than as deferred work.

## Red then green

The plant set one expected value wrong in each of the three cases, on both branches of each case's
mode ternary, so a case that stopped registering either mode would show as a missing failure rather
than as a pass:

- line 453, code-inline text colour: `oklch(0.208 0.042 265.755)` to `oklch(0.108 0.042 265.755)`
  in light, and `oklch(0.929 0.013 255.508)` to `oklch(0.829 0.013 255.508)` in dark;
- line 483, muted text colour: `oklch(0.446 0.043 257.281)` to `oklch(0.546 0.043 257.281)` in
  light, and `oklch(0.704 0.04 256.788)` to `oklch(0.604 0.04 256.788)` in dark;
- line 527, the shorter monospace stack: `'SFMono-Regular, Menlo, monospace'` to
  `'SFMono-Regular, Consolas, monospace'`, which is mode-independent and so reddens both modes.

Command: `npm run test:src:styles`.

Red, with the plant in place:

```text
 FAIL  tests/src/styles/tokens.test.ts:441:2 > code calibration tokens > resolves text and surface to the code-inline record in light mode
 FAIL  tests/src/styles/tokens.test.ts:441:2 > code calibration tokens > resolves text and surface to the code-inline record in dark mode
 FAIL  tests/src/styles/tokens.test.ts:470:2 > content calibration tokens > resolves the muted text and the raised surface to the content record in light mode
 FAIL  tests/src/styles/tokens.test.ts:470:2 > content calibration tokens > resolves the muted text and the raised surface to the content record in dark mode
 FAIL  tests/src/styles/tokens.test.ts:517:2 > content calibration tokens > resolves the shorter monospace stack and the code block rhythm in light mode
 FAIL  tests/src/styles/tokens.test.ts:517:2 > content calibration tokens > resolves the shorter monospace stack and the code block rhythm in dark mode
 Test Files  1 failed | 29 passed (30)
      Tests  6 failed | 156 passed (162)
```

Six failures, two per case: each of the three `it.each(TEXT_MODES)` registrations produced a light
case and a dark case, and each bound its planted value. Nothing outside `tokens.test.ts` moved.

Green, with the plant removed:

```text
 Test Files  30 passed (30)
      Tests  162 passed (162)
```

## Plant removal

The pre-plant file was copied to the session scratchpad as `tokens.test.ts.fixed` before the plant
and copied back to restore it, so the restoration is byte-exact rather than a re-edit. No
`git checkout`, `restore`, `stash`, `reset`, or `clean` ran. Verification after the restore: lines
453, 483, and 527 read their record values again, and a count of `it.each(['` in the file returns
0. Every gate reported in the following section ran on the restored file.

## Gates

Run in the brief's order from `C:/Users/mikes/WebstormProjects/veneer` on Windows Git Bash. No
`.scss` file changed this round, so no rebuild preceded the styles proofs; the `dist/src/styles`
cascade the proofs load is the one `npm run build` produced.

| Gate                                         | Engine           | Exit | Final lines                                                                                              |
| -------------------------------------------- | ---------------- | ---- | -------------------------------------------------------------------------------------------------------- |
| `npm run format:check`                       | —                | 0    | `All matched files use the correct format.` then `Finished in 805ms on 140 files using 16 threads.`       |
| `npm run lint:check`                         | —                | 0    | `oxlint --config .oxlintrc.json --deny-warnings .` with no diagnostic                                    |
| `npm run check`                              | —                | 0    | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, last of the project chain, with no diagnostic   |
| `npm run build`                              | —                | 0    | `dist/app/browser/assets/index-CHWi8lVB.js 11.18 kB │ gzip: 3.25 kB` then `✓ built in 433ms`             |
| `npm run test:src:styles`                    | managed Chromium | 0    | `Test Files 30 passed (30)`, `Tests 162 passed (162)`, `Duration 22.06s`                                 |
| `npm run test:setup`                         | —                | 0    | `Test Files 3 passed (3)`, `Tests 126 passed (126)`, `Duration 6.28s`                                    |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | Edge      | 0    | `Test Files 30 passed (30)`, `Tests 162 passed (162)`, `Duration 23.97s`                                 |

The round's first `npm run format:check` exited 1 naming `tests/src/styles/tokens.test.ts`, which
is the formatter reflow described earlier. The scoped `oxfmt --write` on that one file settled it,
and the rerun recorded in the table is the gate result.

## Tree state

`git diff --stat`:

```text
 guides/veneer.md                          | 50 ++++++++++-------
 src/core/constants.ts                     |  7 ++-
 src/styles/_mixins.scss                   |  5 +-
 src/styles/_tokens.scss                   | 19 +++++--
 src/styles/elements/_address.scss         |  1 +
 src/styles/elements/_dl.scss              |  1 +
 src/styles/elements/_pre.scss             |  3 +-
 src/styles/elements/_samp.scss            |  1 +
 src/styles/elements/_var.scss             |  3 +-
 tests/setupStyles.ts                      | 14 +++--
 tests/src/styles/elements/address.test.ts |  2 +-
 tests/src/styles/elements/code.test.ts    |  5 +-
 tests/src/styles/elements/dl.test.ts      | 39 ++++++++------
 tests/src/styles/elements/kbd.test.ts     |  5 +-
 tests/src/styles/elements/pre.test.ts     |  8 +--
 tests/src/styles/elements/samp.test.ts    |  5 +-
 tests/src/styles/elements/var.test.ts     |  5 +-
 tests/src/styles/tokens.test.ts           | 89 ++++++++++++++++++++++++++-----
 18 files changed, 185 insertions(+), 77 deletions(-)
```

`git status --porcelain --untracked-files=all`:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/elements/_address.scss
 M src/styles/elements/_dl.scss
 M src/styles/elements/_pre.scss
 M src/styles/elements/_samp.scss
 M src/styles/elements/_var.scss
 M tests/setupStyles.ts
 M tests/src/styles/elements/address.test.ts
 M tests/src/styles/elements/code.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/elements/kbd.test.ts
 M tests/src/styles/elements/pre.test.ts
 M tests/src/styles/elements/samp.test.ts
 M tests/src/styles/elements/var.test.ts
 M tests/src/styles/tokens.test.ts
```

CL3b's eighteen paths, with nothing added and nothing removed. HEAD is still `9bb306e`; nothing was
committed, pushed, or staged. `cl3b-report-2.md` does not appear because the root
`.gitignore` file ignores `tmp/`.

## Acceptance criteria

1. **Met.** No inline mode matrix or expected-value table remains in
   `tests/src/styles/tokens.test.ts`; the three cases at lines 440, 466, and 513 read `TEXT_MODES`,
   and the `it.each(['` pattern matches nothing in the file.
2. **Met.** The sweep's population, patterns, and rulings are recorded in § The sweep.
3. **Met.** `npm run test:src:styles` reports `Test Files 30 passed (30)` and
   `Tests 162 passed (162)` on managed Chromium and on Edge, and the plant reddened every
   registration of the three cases.
4. **Met.** Every gate exits 0, recorded with its final lines in § Gates.
5. **Met.** The status lists CL3b's eighteen paths and nothing else.

## Deviations

None. One ancillary choice was settled inside the deviation contract's grant: the sweep is recorded
as a pattern table with a per-hit ruling rather than as a raw match list. The two subject-selection
lists at `tokens.test.ts:229` and `:253` are reported rather than edited, because relocating them
would need `tests/setupStyles.ts`, which this brief puts off-limits, and because under the
case-matrix law they are not findings.
