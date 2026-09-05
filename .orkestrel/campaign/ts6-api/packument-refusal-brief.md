# Brief — packument-refusal

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/scaffold`.

## Objective

Restore, on the single-version `buildPackument(version: string, edges?)` API, the refusal of an unnamed version: `buildPackument('')` throws `A packument publishes at least one version, and every version is named`, and one test row proves it.

## Context

Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/typescript.md`, and `/home/user/scaffold/.claude/rules/writing.md` first. The fixture builder is `buildPackument` in `/home/user/scaffold/tests/setupServer.ts` (near line 1670) and its rows sit under `describe('the upstream fixtures')` in `/home/user/scaffold/tests/setupServer.test.ts` (rows near lines 497 to 580 call it). A reverted commit carried this refusal on a widened `string | readonly string[]` signature; that widening served a two-major packument the fleet no longer needs and is not restored. Keep the signature `buildPackument(version: string, edges?: TestPackumentEdges): string`.

Host facts: Linux, bash, Node v22.22.2, npm 10 on PATH; the tree is committed and clean apart from the untracked `.orkestrel/campaign/ts6-api/` folder and `tmp/`. `npm run test:setup` is the scoped suite for these files and runs in well under a minute.

## Unknowns

None.

## Scope

- Owned: `/home/user/scaffold/tests/setupServer.ts`, `/home/user/scaffold/tests/setupServer.test.ts`.
- Off-limits: every other file. Never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format`, or lint `--fix`. Never commit.

## Execution

1. In `buildPackument`, before the `JSON.stringify` return, add:

```ts
	if (version.length === 0) {
		throw new Error('A packument publishes at least one version, and every version is named')
	}
```

2. In its TSDoc, add a `@throws` tag after `@returns`: `@throws Error - When the version is empty; a packument names every version it publishes.` Keep every other sentence as it is.
3. In `tests/setupServer.test.ts`, inside `describe('the upstream fixtures')`, directly after the row `it('serves the abbreviated packument fields the registry serves, and omits an edge set it was not given', ...)` (it starts near line 494 and ends before the row `it('lists every organization package under the access map the registry serves', ...)`), add:

```ts
	it('refuses to publish an unnamed version', () => {
		expect(() => buildPackument('')).toThrow(
			'A packument publishes at least one version, and every version is named',
		)
	})
```

4. Run `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts tests/setupServer.test.ts`; if it reports a file, run `npx oxfmt --config .oxfmtrc.json --write` on those two files only and re-check.
5. Run `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupServer.ts tests/setupServer.test.ts`.
6. Run `npm run test:setup`.

## Output

Write `/home/user/scaffold/tmp/units/ts6-packument-refusal-report.md` with: the exact diff (`git diff -- tests/setupServer.ts tests/setupServer.test.ts`), `git status --short`, and each command from steps 4 to 6 with its exit code and last lines. No process diary.

## Deviation contract

If the builder's signature differs from the one named here, if the message string already exists in the file, or if any command in steps 4 to 6 fails for a reason outside the two owned files, stop, write the report with expected, found, evidence, done or not done, and at most one hypothesis, and end.

## Acceptance criteria

1. `git status --short` names only the two owned files.
2. `buildPackument('')` throws the named message; `buildPackument('0.0.8')` still returns the recorded JSON.
3. The format check, the lint check, and `npm run test:setup` exit 0.
