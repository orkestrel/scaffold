# Report — U2-fix (scaffold)

## F1 — `isPolicyDomain` anchors to the workspace root

`configs/policy.ts`:

```diff
 export interface PolicyContext {
 	readonly filename: string
+	/** The directory Oxlint resolves `filename` against. */
+	readonly cwd: string
 	report(diagnostic: PolicyDiagnostic): void
 }
```

```diff
 export function pathToPolicyFolder(filename: string): string {
 	const normalized = filename.replaceAll('\\', '/')
 	const boundary = normalized.lastIndexOf('/')
 	return boundary === -1 ? '' : normalized.slice(0, boundary)
 }
+
+/** The workspace-relative path when the file sits under the directory the linter resolved it against, else the path as given. */
+export function pathToPolicyRelative(filename: string, cwd: string): string {
+	const normalizedFile = filename.replaceAll('\\', '/')
+	const normalizedCwd = cwd.replaceAll('\\', '/')
+	const prefix = `${normalizedCwd}/`
+	return normalizedFile.startsWith(prefix) ? normalizedFile.slice(prefix.length) : normalizedFile
+}
```

```diff
-export function isPolicyDomain(filename: string): boolean {
-	const file = pathToPolicyFile(filename)
-	const folder = pathToPolicyFolder(filename)
-	return (
-		FUNCTION_DOMAIN_FOLDERS.some(
-			(registered) => folder === registered || folder.endsWith(`/${registered}`),
-		) &&
+export function isPolicyDomain(filename: string, cwd: string): boolean {
+	const relative = pathToPolicyRelative(filename, cwd)
+	const file = pathToPolicyFile(relative)
+	const folder = pathToPolicyFolder(relative)
+	return (
+		FUNCTION_DOMAIN_FOLDERS.some((registered) => folder === registered) &&
```

Call sites in `reportFunction` and `reportDomain` now pass `context.cwd`:

```diff
-	if (isPolicyDomain(context.filename)) return
+	if (isPolicyDomain(context.filename, context.cwd)) return
```

```diff
-	if (!isPolicyDomain(context.filename)) return
+	if (!isPolicyDomain(context.filename, context.cwd)) return
```

`tests/config.test.ts`: added, under `no-misplaced-function` invalid cases:

```diff
+			{
+				name: 'rejects a function in a nested folder whose suffix matches a registered domain',
+				filename: 'src/server/execution/nested/src/server/execution/thing.ts',
+				code: 'export function run(): void {}',
+				errors: [{ messageId: 'function' }],
+			},
```

and under `no-malformed-domain` valid cases:

```diff
+			{
+				name: 'accepts a nested folder whose suffix matches a registered domain',
+				filename: 'src/server/execution/nested/src/server/execution/thing.ts',
+				code: 'export const VALUE = 1',
+			},
```

## F2 — the function rule takes its own name

`configs/policy.ts`: `PLACEMENT_RULE` → `FUNCTION_RULE`, `reportPlacement` → `reportFunction`, every reference and TSDoc, and the `'no-misplaced-function': FUNCTION_RULE` map entry. The rule id `no-misplaced-function` and the message id `function` are unchanged.

`tests/config.test.ts`: import renamed `PLACEMENT_RULE` → `FUNCTION_RULE`; `tester.run('no-misplaced-function', FUNCTION_RULE, {...})`.

## F3 — the rule prose names its instrument

`.claude/rules/architecture.md` § What the policy instruments prove: applied every prescribed sentence replacement (plugin/sweep attribution on each bullet, the ambient-file bullet rewritten in full, "review findings, not instrument diagnostics", and "whether or not an instrument can see the violation"), re-wrapped to the file's 100-column width.

## F4 — the placement law's other carriers

- `.claude/rules/workspace.md` project table, `policy` row Proves cell: "The sweep proves the path- and text-shaped policy laws: mirrors, suppressions, the rule map, filenames, manifest scripts, skills, and bridges".
- `.claude/rules/tests.md` path table, same cell text for `tests/policy.test.ts`.
- `guides/scaffold.md` § Tests bullet for `tests/policy.test.ts` rewritten to the same law list.
- Ran `npx oxfmt --config .oxfmtrc.json --write` on all three files to re-align the Markdown tables.

## F5 — the workspace case's name

`tests/policy.test.ts`:

```diff
-	it('enforces placement and mirrors over the real workspace', () => {
+	it('enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace', () => {
```

## F6 — the absence assertion gets a presence control

`tests/config.test.ts`: added `debugger` to the scratch `scripts/read.ts` fixture, ran the case (throwaway probe under `/tmp`, real `oxlint` binary against the real `.oxlintrc.json`) to read the exact reported code: `eslint(no-debugger)`. Added the presence assertion directly before the existing negative assertion:

```diff
 			scratch.write(
 				'scripts/read.ts',
 				[
 					'export function readLines(text: string): readonly string[] {',
+					'\tdebugger',
 					"\treturn text.trim().split('\\n')",
 					'}',
 				].join('\n'),
 			)
...
+			expect(violationCodes).toContain('eslint(no-debugger) scripts/read.ts')
 			expect(violationCodes).not.toContain('policy(no-host-line-endings) scripts/read.ts')
```

## F7 — one construction path for the violation record

`tests/setupPolicy.ts`:

```diff
 export function createPolicyViolation(
 	rule: PolicyRule,
 	path: string,
 	message: string,
+	line?: number,
 ): PolicyViolation {
-	return { rule, path, message }
+	return line === undefined ? { rule, path, message } : { rule, path, line, message }
 }
```

Both object-literal sites now route through it:

```diff
-				violations.push({
-					rule: 'suppression',
-					path,
-					line: index + 1,
-					message: 'file carries a lint suppression directive',
-				})
+				violations.push(
+					createPolicyViolation(
+						'suppression',
+						path,
+						'file carries a lint suppression directive',
+						index + 1,
+					),
+				)
```

```diff
-				violations.push({
-					rule,
-					path,
-					line: index + 1,
-					message: 'skill documents contain no template TODOs',
-				})
+				violations.push(
+					createPolicyViolation(rule, path, 'skill documents contain no template TODOs', index + 1),
+				)
```

## F8 — one exported population reader

`tests/setupPolicy.ts`: added `inspectPolicyPopulations(configuration, rules, populations)`, using the same record guards `inspectPolicyConfiguration` uses. Parameter type is written `ReadonlyArray<readonly string[]>` rather than the brief's literal `readonly (readonly string[])[]` — see Flag below.

```ts
export function inspectPolicyPopulations(
	configuration: unknown,
	rules: readonly string[],
	populations: ReadonlyArray<readonly string[]>,
): readonly string[] {
	if (typeof configuration !== 'object' || configuration === null || Array.isArray(configuration)) {
		return ['Oxlint configuration must be a record']
	}
	const records: unknown[] = [Object.getOwnPropertyDescriptor(configuration, 'rules')?.value]
	const declaredPopulations: string[] = []
	const overrides: unknown = Object.getOwnPropertyDescriptor(configuration, 'overrides')?.value
	if (Array.isArray(overrides)) {
		for (const entry of overrides) {
			if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) continue
			records.push(Object.getOwnPropertyDescriptor(entry, 'rules')?.value)
			const files: unknown = Object.getOwnPropertyDescriptor(entry, 'files')?.value
			if (Array.isArray(files)) declaredPopulations.push(files.join(' '))
		}
	}
	const enabled = new Set<string>()
	for (const record of records) {
		if (typeof record !== 'object' || record === null || Array.isArray(record)) continue
		for (const name of Object.getOwnPropertyNames(record)) enabled.add(name)
	}
	const violations: string[] = []
	for (const rule of rules) {
		if (!enabled.has(rule)) violations.push(`${rule} is enabled by no top-level or override rules record`)
	}
	for (const population of populations) {
		const joined = population.join(' ')
		if (!declaredPopulations.includes(joined)) {
			violations.push(`no override files list declares the population exactly: ${joined}`)
		}
	}
	return violations
}
```

`tests/policy.test.ts`: added `describe('policy configuration wiring', ...)` with three controls: a configuration missing one rule, one missing a population, and the real `.oxlintrc.json` against the plugin's declared rule ids and `[POLICY_PLACEMENT_GLOBS, POLICY_ENDING_GLOBS]` reporting nothing.

`tests/config.test.ts`: `enables every plugin rule over the population its law names` now calls the reader and asserts `toEqual([])`, keeping the two `declared` containment assertions (`no-misplaced-function`, `no-host-line-endings`). `POLICY_WIRING_RULES` untouched.

## Acceptance criteria

1. `grep -n -E 'PLACEMENT_RULE|reportPlacement' configs/policy.ts tests/config.test.ts` — exit 1, no output. `grep -n 'endsWith' configs/policy.ts` — one match, in `isPolicyAmbient`, none inside `isPolicyDomain`.
2. `npx oxfmt --config .oxfmtrc.json --check <owned files>` — exit 0: "All matched files use the correct format."
3. `npx oxlint --config .oxlintrc.json --deny-warnings configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts tests/config.test.ts` — exit 0, no diagnostics.
4. `npm run test:policy` — exit 0. `Test Files 1 passed (1)`, `Tests 76 passed (76)`.
5. `npm run test:config` — exit 1 overall, but the only red case is `keeps the committed host inventory aligned with the vendored checkout bytes` (`Tests 1 failed | 107 passed (108)`), which the brief names as expected until the verifier's `build` runs. Treated as met per the brief.
6. `npm run check` — exit 0, no diagnostics from `tsc` across root, `check:src:core`, `check:src:server`, `check:src:bin`. `npm run test:guides` — exit 0, `Tests 17 passed (17)`.

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
?? .orkestrel/campaign/ts6-api/u2-fix-brief.md
?? .orkestrel/campaign/ts6-api/u2-policy-plugin-brief.md
?? .orkestrel/campaign/ts6-api/u2-policy-plugin-report.md
?? .orkestrel/campaign/ts6-api/u2-policy-plugin.diff.txt
?? .orkestrel/campaign/ts6-api/u2-policy-plugin.status.txt
?? .orkestrel/campaign/ts6-api/u2-verify-brief.md
?? .orkestrel/campaign/ts6-api/u2-verify-report.md
?? .orkestrel/campaign/ts6-api/u7-probe-typestage-brief.md
```

`.oxlintrc.json`, `host.json`, and every `.orkestrel/campaign/**` entry predate this unit (U2's uncommitted edits and the regenerated host inventory named in the brief's host facts); this unit did not touch them.

## `git diff --stat`

```
 .claude/rules/architecture.md         |   90 +--
 .claude/rules/tests.md                |   20 +-
 .claude/rules/workspace.md            |   20 +-
 .orkestrel/campaign/ts6-api/ledger.md |    4 +
 .oxlintrc.json                        |   20 +
 configs/policy.ts                     |  724 +++++++++++++++++++++-
 guides/scaffold.md                    |    4 +-
 host.json                             |   14 +-
 tests/config.test.ts                  |  523 +++++++++++++++-
 tests/policy.test.ts                  |  210 ++-----
 tests/setupPolicy.ts                  | 1055 +++------------------------------
 11 files changed, 1414 insertions(+), 1270 deletions(-)
```

This total mixes U2's pre-existing uncommitted diff with this unit's edits, because the tree arrived
already dirty per the brief's host facts; the counts above cannot be split from `git diff --stat`
alone. The per-finding hunks earlier in this report are the isolated edits this unit made.

## Not closed / flags

- **Criterion 5 caveat, self-flagged as expected, not closed by this unit.** `npm run test:config`
  exits non-zero because of the host-inventory case, which the brief names as expected until the
  verifier's `build` runs. No fix attempted, per the brief.
- **F8 type deviation, self-flagged.** The brief's literal signature type
  `readonly (readonly string[])[]` fails `typescript/array-type` under
  `npx oxlint --config .oxlintrc.json --deny-warnings` ("Array type using 'readonly T[]' is
  forbidden for non-simple types"). Wrote the equivalent `ReadonlyArray<readonly string[]>` instead,
  which is the same type and satisfies the rule while keeping criterion 3 green. Every call site
  (`tests/policy.test.ts`, `tests/config.test.ts`) passes literal array-of-arrays values, which are
  assignable to either spelling.
