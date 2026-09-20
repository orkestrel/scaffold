# Unit U3-policy — report 8

## Diff summary

`git diff --stat` at return: `guides/scaffold.md | 15 ++--`, `tests/policy.test.ts | 154
++++++++++++++++++++++++++++++++----`, `tests/setupPolicy.ts | 219
+++++++++++++++++++++++++++++++++++++++++++++++----` (3 files changed, 353 insertions(+), 35
deletions(-)).

- **`tests/setupPolicy.ts`**: imports `blankPolicyText` and `POLICY_FENCE_PATTERN` from
  `../configs/policy.js`. Rewrote `readPolicyIndex` to blank only fenced code, split by line, match
  each line against `POLICY_INDEX_ROW`, and apply `POLICY_INDEX_LINK` to the row's `link` group —
  it no longer reads a bare prose link. Rewrote the remarks on `readPolicyGuide`, `isPolicyMirror`,
  and `isPolicyStray` to the map/directory-index vocabulary and deleted the sentence that called an
  index link a claim to author a guide; `isPolicyStray`'s remarks now state the four accountings
  and that a directory-index row is the workspace's own statement, an ordinary link in prose is
  navigation. Updated the `inspectPolicyProse` violation message to `"guide is the package's own,
  the map, a guide the directory index maps, or a catalog row"`. Renamed and rewrote five
  `PROSE_POLICY_CONTROLS` rows: `rejects a top-level guide with no catalog row and no
  directory-index row` (renamed, now carries `violations`), `accepts a top-level guide a
  directory-index row maps` (renamed, now carries `violations`), a new merged row `sweeps a guide
  linked in prose but mapped by no row, while a row-mapped guide is accounted for` (finding 9's
  required stray/accounted control, one row with two fixtures — `guides/console.md` linked only in
  prose stays a stray; `guides/tokens.md` mapped by a directory-index row is accounted), `ignores a
  directory-index row written inside a fence` (renamed; proves the fence limit the remarks name),
  and `reads a directory-index row whose link cell wraps its link text in a code span` (replaces the
  old "code span" control; proves the remarks' claim that a span is not blanked before the row/link
  read).
- **`tests/policy.test.ts`**: import list drops `POLICY_INDEX_FILE`, adds `POLICY_INDEX_ROW`,
  `POLICY_MAP_FILE`, `POLICY_MANIFEST_FILE`. Split the `prose policy` describe's control loop into
  two loops matching the `SKILL_POLICY_CONTROLS` shape — one `toEqual(control.violations)` for rows
  that declare `violations`, one exactly-one-violation-of-rule for rows that do not. Renamed
  "accounts for every top-level guide…" to name the map/directory-index vocabulary and removed its
  live-root `guides/absent.md` assertion; added a new scratch-rooted test
  (`reports a top-level guide neither the catalog nor a directory-index row accounts for as a
  stray`) that proves the same claim with a crafted manifest, catalog, and map instead of against
  `process.cwd()`. Moved the `readPolicyGuide` "guide name for another package" test off
  `process.cwd()` onto a `createPolicyScratch` fixture (item 3; closes the `other`-name assumption).
  Renamed `reads the ordinary link forms a guide index writes` to name the directory-index row's
  link cell and swapped `POLICY_INDEX_FILE` for `POLICY_MAP_FILE`. Renamed `reads a fragment or a
  space only inside the angle-bracket form` to `admits a fragment in either branch and a space only
  inside the angle-bracket form` and added the four cases item 2 named. Added a direct
  `POLICY_INDEX_ROW` case test. Renamed `reads first-link order and drops a repeated link` to `reads
  first-row order and drops a repeated row` and rewrote its fixture as a three-row directory-index
  table. Added `reads no name from a link written outside a directory-index row` proving acceptance
  criterion 1's "link outside a row accounts for nothing" directly against `readPolicyIndex`.
- **`guides/scaffold.md`** (`:1145-1157` region, the owned sweep paragraph): rewrote the paragraph
  to state the four accountings, name `guides/README.md` as the map, describe a directory-table row
  as the workspace's own statement that its second cell documents its first cell's directory, and
  removed the retired "index link is a claim to author" framing in favor of "a mirror the catalog
  stops registering while a directory-table row still maps it is swept."

## New case and row readings

- Pattern cases (`admits a fragment in either branch and a space only inside the angle-bracket
  form`): `](sample.md#topic.md)` → `bare: sample`; `](<./sample.md>)` → `angled: sample`;
  `](sample.md#bad fragment)` → no match; `](sample.md#bad>)` → no match. All four passed
  unchanged against the existing `POLICY_INDEX_LINK` pattern — round 7's earlier work had already
  landed the fragment/`./`-prefix/duplicate-group-name fixes; this unit added the tests, not a
  pattern edit.
- `POLICY_INDEX_ROW` direct case: `| \`src/styles\` | [\`tokens.md\`](tokens.md) |` →
  `{ path: 'src/styles', link: '[\`tokens.md\`](tokens.md)' }`; `'not a row'` → no match.
- `readPolicyIndex` row case: three-row fixture (`beta`, `alpha`, repeated `beta`) → `['beta',
  'alpha']`. Outside-row case: a bare prose link with no table → `[]`.
- `sweeps a guide linked in prose but mapped by no row…` control: `guides/console.md` (prose link
  only) → one `prose` violation naming that exact path; `guides/tokens.md` (row-mapped) → no
  violation.
- `ignores a directory-index row written inside a fence`: a row-shaped line inside a fenced block →
  the guide it would otherwise map stays a stray (one `prose` violation on `guides/console.md`).

## Fleet readings

- Veneer (`C:/Users/mikes/WebstormProjects/veneer`): clean at both paths before the swap. With this
  checkout's `tests/policy.test.ts` and `tests/setupPolicy.ts` copied over, `npx vitest run
  --config vite.config.ts --no-cache --reporter=dot --project policy` → `Test Files 1 passed (1)`,
  `Tests 119 passed | 1 skipped (120)`. `guides/tokens.md` is accounted for by its `src/styles`
  directory-index row, as expected.
- Test (`C:/Users/mikes/WebstormProjects/test`): clean at both paths before the swap. Same command →
  `Test Files 1 passed (1)`, `Tests 119 passed | 1 skipped (120)`.
- Both targets restored from the scratch copies taken before overwriting
  (`%TEMP%/claude/.../scratchpad/u3-policy-8/{veneer,test}/`); `git status --porcelain` for both,
  scoped to `tests/policy.test.ts tests/setupPolicy.ts`, is empty after restore.

## Gate readings (this checkout)

- `npm run format:check` → exit 0: "All matched files use the correct format." (228 files).
- `npm run lint:check` → exit 0, no output (oxlint clean).
- `npm run check` → exit 0 (root `tsc`, then `check:src:core`, `check:src:server`, `check:src:bin`,
  all silent/clean).
- `npm run test:policy` → exit 0: `Test Files 1 passed (1)`, `Tests 120 passed (120)`.
- `npm run test:setup` → exit 0: `Test Files 3 passed (3)`, `Tests 164 passed | 3 skipped (167)`.
- `npm run test:config` → exit 1, one failure: `keeps the committed host inventory aligned with the
  vendored checkout bytes` — `The committed host inventory is stale at guides/scaffold.md,
  tests/policy.test.ts, tests/setupPolicy.ts`. This is the brief's named exception at step 6: the
  inventory is stale at exactly the three files this unit changed, and the Orchestrator rebuilds it.
  172 other tests passed, 1 skipped.
- `npm run test:guides` → exit 0: `Test Files 1 passed (1)`, `Tests 23 passed (23)`.

## Review evidence

`git diff --stat` and `git status --porcelain` at return (both captured above and reproduced
below).

`git status --porcelain` here: `M .claude/rules/styles.md`, `M guides/scaffold.md`, `M host.json`,
`M tests/policy.test.ts`, `M tests/setupPolicy.ts`, plus the untouched `.orkestrel/veneer/**`
campaign-artifact churn already present before this unit started.

## Deviations

- **`.claude/rules/styles.md` is dirty and outside acceptance criterion 6's named set.** It was
  already modified before this unit ran (part of the standing dirty tree the dispatch named:
  "Veneer's tree is dirty elsewhere on purpose," and this file's modification predates this unit —
  I never opened or wrote it). I did not touch it. Criterion 6 lists `host.json`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md` as the complete set; the
  actual `git status --porcelain` here also carries `.claude/rules/styles.md`, pre-existing and
  off-limits to this unit. Flagging rather than silently working around it.
- Everything else closed as scoped: no off-limits file touched, no gate red after my own fix, no
  dirty target at either fleet path, and every `violations` shape matched the runner's `toEqual`
  contract on the first read (no runner-contract surprise to report).
