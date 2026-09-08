# Report — U2-fix-2 (scaffold)

## Edits

### 1. `.claude/rules/tests.md` — type-probe bullet

```diff
- lives in the source tree beside what it measures. Delete it before the unit returns; a leaked one
- fails the placement sweep, because a probe filename is not a centralized kind file.
+ lives in the source tree beside what it measures. Delete it before the unit returns; a leaked one
+ fails the `policy` plugin's placement rules, because a probe filename is not a centralized kind
+ file.
```

### 2. `.claude/rules/tests.md` and `.claude/rules/workspace.md` — `Proves` cell

```diff
-| `tests/policy.test.ts`       | The sweep proves the path- and text-shaped policy laws: mirrors, suppressions, the rule map, filenames, manifest scripts, skills, and bridges |
+| `tests/policy.test.ts`       | The path- and text-shaped policy laws: mirrors, suppressions, the rule map, filenames, manifest scripts, skills, and bridges   |
```

Same change in `workspace.md`'s copy of the row. Both tables were realigned with
`npx oxfmt --config .oxfmtrc.json --write .claude/rules/tests.md .claude/rules/workspace.md`, which
also reflowed the neighbouring rows in each table to the new column width.

### 3. `.claude/rules/architecture.md` — "cleanup sweep" to "cleanup pass"

```diff
-- Perform a cleanup sweep after implementation: no stray implementation-file declarations, ...
+- Perform a cleanup pass after implementation: no stray implementation-file declarations, ...
```

```diff
-- The cleanup sweep and independent review prove kind purity across those files. A helper misfiled
+- The cleanup pass and independent review prove kind purity across those files. A helper misfiled
```

### 4. Rename `inspectPolicyPopulations` to `inspectPolicyWiring`

Renamed the export in `tests/setupPolicy.ts` (declaration and its `@returns` line unchanged), and
every import and call site in `tests/policy.test.ts` and `tests/config.test.ts`. TSDoc first
sentence and the pushed message strings are unchanged. Import lists were kept alphabetical.

```diff
-export function inspectPolicyPopulations(
+export function inspectPolicyWiring(
```

### 5. `isPolicyRecord` guard

Added beside `normalizePolicyPath` in `tests/setupPolicy.ts`:

```ts
/** Whether a parsed configuration value is a plain record rather than an array or a primitive. */
export function isPolicyRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
```

Routed every inline record test inside `inspectPolicyConfiguration` and `inspectPolicyWiring`
through it: the top-level `configuration` guard, the `rules` record test, the `override` and
`overrideRules` tests, the `entry` test, and the `record` test in the enabled-rule loop. Each
branch's behaviour is unchanged — for example:

```diff
-	if (typeof configuration !== 'object' || configuration === null || Array.isArray(configuration)) {
+	if (!isPolicyRecord(configuration)) {
 		return ['Oxlint configuration must be a record']
 	}
```

```diff
-			if (typeof override !== 'object' || override === null || Array.isArray(override)) {
+			if (!isPolicyRecord(override)) {
 				violations.push('override entries must be records')
```

### 6. `tests/policy.test.ts` controls

Deleted the control `reports nothing for the real configuration over the plugin rules and glob
populations` and its now-unused imports (`policyPlugin`, `POLICY_ENDING_GLOBS`,
`POLICY_PLACEMENT_GLOBS`, `readFileSync`; `join` stays, used elsewhere in the file). Added:

```ts
it('reports a configuration that is not a record', () => {
	expect(inspectPolicyWiring([], [], [])).toEqual(['Oxlint configuration must be a record'])
})

it('admits a plain record and refuses an array, null, and a primitive', () => {
	expect(isPolicyRecord({})).toBe(true)
	expect(isPolicyRecord([])).toBe(false)
	expect(isPolicyRecord(null)).toBe(false)
	expect(isPolicyRecord('record')).toBe(false)
})
```

`tests/config.test.ts`'s parity case (`enables every plugin rule over the population its law
names`) is untouched and keeps the real-configuration proof.

### 7. `configs/policy.ts` — `pathToPolicyRelative`

```diff
-/** The workspace-relative path when the file sits under the directory the linter resolved it against, else the path as given. */
+/**
+ * The workspace-relative path when the file sits under the directory the linter resolved it
+ * against, else the path as given. The linter resolves each file against its own directory, the
+ * workspace root under the `lint` scripts and its package directory under `RuleTester`, so a file
+ * outside that directory keeps its path and matches no registered domain folder, because a
+ * registered folder is workspace-relative. A drive-letter case difference between the two
+ * arguments is not folded.
+ */
 export function pathToPolicyRelative(filename: string, cwd: string): string {
 	const normalizedFile = filename.replaceAll('\\', '/')
-	const normalizedCwd = cwd.replaceAll('\\', '/')
+	const normalizedCwd = cwd.replaceAll('\\', '/').replace(/\/+$/u, '')
 	const prefix = `${normalizedCwd}/`
 	return normalizedFile.startsWith(prefix) ? normalizedFile.slice(prefix.length) : normalizedFile
 }
```

### 8. `tests/config.test.ts` — suffix wording and fixture comment

```diff
-				name: 'rejects a function in a nested folder whose suffix matches a registered domain',
+				name: 'rejects a function in a nested folder whose suffix matches a registered domain [membership: module function syntax whose file is absent from the function register]',
```

This matches the exact suffix wording its two sibling `no-misplaced-function` invalid cases already
carry (`rejects a function module in an unregistered folder [...]` and `rejects a property-held
arrow in a route table [...]`), so no further rewording was needed.

```diff
 			// The line-ending population reaches src, app, and configs alone, so this module
 			// outside them carries the same defect and must draw no diagnostic.
+			// The `debugger` statement is the arrival control the root `no-debugger` rule reports,
+			// which proves the file entered the run the absence assertion below reads.
 			scratch.write(
```

## Acceptance criteria

1. `grep -rn 'inspectPolicyPopulations' tests configs` — exit 1 (no matches).
   `grep -n 'cleanup sweep' .claude/rules/architecture.md` — exit 1 (no matches).
   `grep -n 'The sweep proves' .claude/rules/tests.md .claude/rules/workspace.md` — exit 1 (no
   matches).
2. `npx oxfmt --config .oxfmtrc.json --check <every owned file>` — exit 0:
   `All matched files use the correct format. Finished in 745ms on 7 files using 4 threads.`
3. `npx oxlint --config .oxlintrc.json --deny-warnings configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts tests/config.test.ts` — exit 0, no output.
4. `npm run test:policy` — exit 0: `Test Files 1 passed (1)` / `Tests 77 passed (77)`.
5. `npm run test:config` — exit 1, apart from the host-inventory case: `Test Files 1 failed (1)` /
   `Tests 1 failed | 107 passed (108)`. The one failure is
   `keeps the committed host inventory aligned with the vendored checkout bytes`, reporting the
   vendored files this unit edited (`.claude/rules/architecture.md`, `.claude/rules/tests.md`,
   `.claude/rules/workspace.md`, `configs/policy.ts`, `tests/config.test.ts`,
   `tests/policy.test.ts`, `tests/setupPolicy.ts`) as stale against the committed host inventory.
   This is the case the brief names as the verifier's `build` closes; recorded as red per
   instruction.
6. `npm run check` — exit 0 (`tsc --noEmit` root project, then `check:src:core`, `check:src:server`,
   `check:src:bin`, all clean).

## `git status --short`

```
 M .claude/rules/architecture.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M .orkestrel/campaign/ts6-api/ledger.md
 M .oxlintrc.json
 M configs/policy.ts
 M guides/scaffold.md
 M host.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
?? .orkestrel/campaign/ts6-api/u2-audit-brief.md
?? .orkestrel/campaign/ts6-api/u2-audit-checker.md
?? .orkestrel/campaign/ts6-api/u2-audit-objective.md
?? .orkestrel/campaign/ts6-api/u2-audit-subjective.md
?? .orkestrel/campaign/ts6-api/u2-audit-verdict.md
?? .orkestrel/campaign/ts6-api/u2-fix-2-audit-brief.md
?? .orkestrel/campaign/ts6-api/u2-fix-2-brief.md
?? .orkestrel/campaign/ts6-api/u2-fix-2-verify-brief.md
?? .orkestrel/campaign/ts6-api/u2-fix-audit-brief.md
?? .orkestrel/campaign/ts6-api/u2-fix-audit-checker.md
?? .orkestrel/campaign/ts6-api/u2-fix-audit-objective.md
?? .orkestrel/campaign/ts6-api/u2-fix-audit-subjective.md
?? .orkestrel/campaign/ts6-api/u2-fix-audit-verdict.md
?? .orkestrel/campaign/ts6-api/u2-fix-brief.md
?? .orkestrel/campaign/ts6-api/u2-fix-report.md
?? .orkestrel/campaign/ts6-api/u2-fix-verify-brief.md
?? .orkestrel/campaign/ts6-api/u2-fix-verify-report.md
?? .orkestrel/campaign/ts6-api/u2-fix.diff.txt
?? .orkestrel/campaign/ts6-api/u2-fix.status.txt
?? .orkestrel/campaign/ts6-api/u2-policy-plugin-brief.md
?? .orkestrel/campaign/ts6-api/u2-policy-plugin-report.md
?? .orkestrel/campaign/ts6-api/u2-policy-plugin.diff.txt
?? .orkestrel/campaign/ts6-api/u2-policy-plugin.status.txt
?? .orkestrel/campaign/ts6-api/u2-verify-brief.md
?? .orkestrel/campaign/ts6-api/u2-verify-report.md
?? .orkestrel/campaign/ts6-api/u7-probe-typestage-brief.md
```

`host.json` and `guides/scaffold.md` show as already modified from before this unit started; this
unit did not touch either (both are off-limits and neither appears in any edit above). Every other
modified path is an owned file this unit edited. The untracked `.orkestrel/campaign/ts6-api/*` files
predate this unit and are campaign artifacts, not files this unit wrote.

## What could not be closed

- `npm run test:config`'s host-inventory case stays red, as the brief anticipated: it compares the
  seven owned files this unit just edited against the committed vendored copy, and that copy
  updates only through the verifier's `build` step, which is out of this unit's scope.

## Flags on my own claims

- Edit 8's sibling-suffix match: I confirmed the exact wording by reading the two sibling invalid
  cases in the same `no-misplaced-function` block (`tests/config.test.ts:1079` and `:1085`) and
  found they already carry the identical bracketed suffix the brief specifies, so no rewording was
  applied. I flag this because the brief's "if it differs" branch was not exercised; the literal
  text from the brief matched the siblings verbatim.
- `git status --short` mixes pre-existing dirty state from earlier units in this campaign (`host.json`,
  `guides/scaffold.md`, `.oxlintrc.json`, `.orkestrel/campaign/ts6-api/ledger.md`) with this unit's
  edits. I did not run `git diff` against a clean baseline commit, so I cannot independently confirm
  from git alone that those four paths were dirty before I started; I infer it from the fact that
  none of my eight edits touch them, and the brief's host facts state the tree already carried prior
  uncommitted work.
