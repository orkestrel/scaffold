# Unit U3-policy report (builder, native Sonnet, 2026-09-20, 227 s)

## Diff summary

`tests/setupPolicy.ts`:

- Added `POLICY_INDEX_FILE = 'guides/README.md'` beside `POLICY_CATALOG_FILE` and
  `POLICY_CATALOG_HEADING`.
- Added `POLICY_INDEX_LINK = /\]\((?:\.\/)?([^/)]+)\.md\)/gu` beside `POLICY_MIRROR_PATTERN`.
- Added `readPolicyIndex(root)`: each distinct sibling `<name>.md` link target of
  `guides/README.md`, first-link order, `\r\n` normalized; `[]` when the index is absent.
- `isPolicyStray`: a name the index links is no longer a stray
  (`!readPolicyCatalog(root).includes(name) && !readPolicyIndex(root).includes(name)`); its
  `@returns` reads "neither this package's own, nor the index, nor a guide the index links, nor a
  catalog row".
- `inspectPolicyProse` violation message:
  `"guide is the package's own, the map, a guide the map links, or a catalog row"`.
- The `@remarks` on `isPolicyMirror` and the stray rule name the guide index as a second piece of
  evidence beside the catalog table.
- The `rejects a top-level guide the catalog does not register` control's `membership` and
  `message` take the new form.
- New control row `accepts a top-level guide the index links`: manifest, catalog (`other`,
  `sample`), a `README.md` front page carrying `via`, a `guides/README.md` linking `tokens.md`,
  and `guides/tokens.md`; the linked guide reports no stray while the front page's term reports.

`tests/policy.test.ts`:

- Imports `POLICY_INDEX_FILE`, `POLICY_INDEX_LINK`, `readPolicyIndex`.
- The renamed case `accounts for every top-level guide as this package, the index, a linked guide,
  or a catalog row` keeps every prior assertion and adds assertions on `POLICY_INDEX_FILE`, a
  `POLICY_INDEX_LINK` match, and
  `readPolicyIndex(root)` equal to
  `['scaffold', 'console', 'contract', 'emitter', 'markdown', 'process', 'template', 'guide']`;
  `isPolicyStray(root, 'guides/absent.md')` stays the control.

## Control: red before the fix, green after

With the new row and case in place and `isPolicyStray` reverted to its pre-fix body,
`npm run test:policy`:

```
FAIL  |policy| tests/policy.test.ts > prose policy > accepts a top-level guide the index links [membership: top-level guides the workspace index links]
AssertionError: expected [ { rule: 'prose', …(3) }, …(1) ] to have a length of 1 but got 2
 Tests  1 failed | 110 passed (111)
```

With the fixed body restored: `Test Files 1 passed (1)`, `Tests 111 passed (111)`.

## Gate commands

| Command | Reading |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 3706ms on 228 files using 16 threads.` |
| `npm run lint:check` | exit 0, no output |
| `npm run check` | root and `check:src:core`, `check:src:server`, `check:src:bin` exit 0 |
| `npm run test:policy` | `Test Files 1 passed (1)`, `Tests 111 passed (111)` |
| `npm run test:setup` | `Test Files 3 passed (3)`, `Tests 164 passed | 3 skipped (167)` |
| `npm run test:config` | failed: `keeps the committed host inventory aligned with the vendored checkout bytes` — `The committed host inventory is stale at tests/policy.test.ts, tests/setupPolicy.ts` |
| `npm run test:guides` | `Test Files 1 passed (1)`, `Tests 23 passed (23)` |

## Deviation

Expected every gate green. Found `test:config` red on the committed `host.json` digests for the two
vendored files, which `npm run build` regenerates and the brief put off-limits. Owned-file gates
green; `test:config` not green inside the unit.

Orchestrator's integration: `npm run build` regenerated `host.json` (`build-inventory: staged 175
file(s) into host.json`) and `npm run test:config` then read `Tests 173 passed | 1 skipped (174)`.

## Review evidence

`git diff --stat`: `tests/policy.test.ts | 17 +`, `tests/setupPolicy.ts | 60 +`
(68 insertions, 9 deletions). `git status --porcelain` (tracked): ` M tests/policy.test.ts`,
` M tests/setupPolicy.ts`; after the build also ` M host.json`.
