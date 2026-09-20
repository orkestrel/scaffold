# Unit U3-policy — report 9

## Diff summary

`git diff --stat` at return: `guides/scaffold.md | 18 ++--`, `tests/policy.test.ts | 177
++++++++++++--`, `tests/setupPolicy.ts | 268 +++++++++++++++++++++++--` (3 files changed, 428
insertions(+), 35 deletions(-)).

- **`tests/setupPolicy.ts`**:
  - `POLICY_INDEX_ROW` now requires the path cell to refuse a leading `/`, a `..` segment, and any
    `:`, and confines `link` to the row's own second cell (stops at the next unescaped `|`, with
    `\\.` admitted as an escaped pipe), instead of reading to the last pipe on the line. Remark
    rewritten to state those exclusions and the cell confinement.
  - `POLICY_INDEX_LINK` moved the trailing `#fragment` group inside each branch instead of sharing
    one group after the alternation, and excluded `:` from both name classes. This refuses
    `https:sample.md` (colon in a bare name), `<sample.md>#fragment` (fragment after the angled
    branch's own close), and `<sample.md#first>#second` (a second fragment after the branch's own).
    Remark rewritten to name the per-branch fragment ownership and the new refused forms.
  - `readPolicyIndex`'s remark rewritten: states the reader scans every line after fence blanking
    and reads every row wherever it sits, and that a concept-index row does not take the row shape
    (its first cell names a concept, not a backticked path) — replacing the old "in another table's
    cell" phrasing.
  - `isPolicyMirror`'s remark gained the finding-11 sentence: a catalog row wins over a
    directory-index row carrying the same name, because `catalog` overwrites such a file with the
    mirror.
  - `isPolicyStray`'s remark rewritten: dropped "accounted for four ways" for "accounted for as …
    or as …", and added the direct recovery: add a directory-index row for an unaccounted authored
    guide; restore catalog evidence for a fetched mirror; never rewrite the mirror to clear the
    finding; a mapped guide's term sweep diagnoses nothing about the catalog.
  - Fixed the one remaining "directory-table row" wording at the old `POLICY_INDEX_LINK` remark
    (now folded into the rewritten remark above).
  - Two new `PROSE_POLICY_CONTROLS` rows: `accounts for a directory-index row inside an unclosed
    fence` and `accounts for a directory-index row inside a fence indented four or more spaces`,
    each with `violations: []`, proving the two fence limits the remarks name: a row inside either
    still accounts for its guide because `POLICY_FENCE_PATTERN` (`^ {0,3}(...)`) does not blank a
    marker indented 4+ spaces or a fence with no closing marker.
- **`tests/policy.test.ts`**: added one refused-form case to the ordinary-link-forms test
  (`https:sample.md`), two refused-form cases to the fragment-branch test
  (`<sample.md>#fragment`, `<sample.md#first>#second`), and one new direct test (`confines a row
  path to a relative cell and its link to the second cell`) exercising `readPolicyIndex` against a
  three-row scratch fixture: an absolute-path row, a three-cell row, and an ordinary row, asserting
  only `['tokens']` is read.
- **`guides/scaffold.md`** (owned sweep paragraph): removed "accounted for four ways" / "the four
  accountings"; renamed the remaining "directory-table row" instances to "directory-index row";
  added the same direct-recovery sentence (add a row for an unaccounted guide; restore catalog
  evidence for a mirror; never rewrite the mirror) and the "diagnoses nothing about the catalog's
  accuracy" close.

## New case readings

- `POLICY_INDEX_ROW` cell confinement (`readPolicyIndex` against a three-row map): `` | `/outside`
  | [tokens](tokens.md) | `` → row refused (leading `/`), accounts for nothing;
  `` | `src/styles` | no guide | [tokens](tokens.md) | `` → row matches, `link` captures only `no
  guide` (stops at the row's own second-cell pipe), which `POLICY_INDEX_LINK` does not match, so it
  accounts for nothing; `` | `src/styles` | [`tokens.md`](tokens.md) | `` → captures `tokens`.
  Combined result: `readPolicyIndex(scratch.path)` → `['tokens']`.
- `POLICY_INDEX_LINK` new refusals: `](https:sample.md)` → no match (colon excluded from the bare
  class); `](<sample.md>#fragment)` → no match (fragment sits after the angled branch's own close);
  `](<sample.md#first>#second)` → no match (a second fragment after the branch's own).
- Fence-limit controls: an unclosed `` ```md `` fence around the row → `guides/console.md` carries
  no `prose` violation (accounted for); a fence whose `` ``` `` markers sit 4 spaces in, with the
  row itself at column 0 → same, no violation. Both prove `POLICY_FENCE_PATTERN`'s `{0,3}` leading
  space limit rather than asserting it descriptively.

## Fleet readings

- Veneer (`C:/Users/mikes/WebstormProjects/veneer`): clean at both paths before the swap. With this
  checkout's `tests/policy.test.ts` and `tests/setupPolicy.ts` copied over, `npx vitest run
  --config vite.config.ts --no-cache --reporter=dot --project policy` → `Test Files 1 passed (1)`,
  `Tests 122 passed | 1 skipped (123)`.
- Test (`C:/Users/mikes/WebstormProjects/test`): clean at both paths before the swap. Same command →
  `Test Files 1 passed (1)`, `Tests 122 passed | 1 skipped (123)`.
- Both targets restored from the scratch copies taken before overwriting
  (`%TEMP%/claude/u3-policy-9/{veneer,test}/`); `git status --porcelain` for both, scoped to
  `tests/policy.test.ts tests/setupPolicy.ts`, is empty after restore.

## Gate readings (this checkout)

- `npm run format:check` → exit 0: "All matched files use the correct format." (228 files).
- `npm run lint:check` → exit 0, no output (oxlint clean).
- `npm run check` → exit 0 (root `tsc`, then `check:src:core`, `check:src:server`, `check:src:bin`,
  all silent/clean).
- `npm run test:policy` → exit 0: `Test Files 1 passed (1)`, `Tests 123 passed (123)`.
- `npm run test:setup` → exit 0: `Test Files 3 passed (3)`, `Tests 164 passed | 3 skipped (167)`.
- `npm run test:config` → exit 1, one failure: `keeps the committed host inventory aligned with the
  vendored checkout bytes` — "The committed host inventory is stale at guides/scaffold.md,
  tests/policy.test.ts, tests/setupPolicy.ts". This is the brief's named exception at step 5: the
  inventory is stale at exactly the three files this unit changed; 172 other tests passed, 1
  skipped.
- `npm run test:guides` → exit 0: `Test Files 1 passed (1)`, `Tests 23 passed (23)`.

## Deviations

None. Every item (1, 2, 3, 4, 5b, 5c) from the brief landed as specified; no gate stayed red after
a fix; no off-limits file was touched; no target was dirty at the swapped paths.

## Review evidence

`git status --porcelain` (this checkout):
```
 M .claude/rules/styles.md
 M guides/scaffold.md
 M host.json
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```
`.claude/rules/styles.md` and `host.json` are pre-existing modifications this unit did not touch,
matching acceptance criterion 4 exactly.
