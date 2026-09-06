# Unit brief — U5-fix: the audit round's findings on the generated-text readers (scaffold)

Follows `u5-generated-readers-brief.md`. Carries the round-1 findings `u5-audit-verdict.md` § Findings outside the claims names: subjective F2, F3, F4, F5 (`u5-audit-subjective.md`), the objective lane's `structuredClone` and narrowing readings (`u5-audit-objective.md` claim 11 and the subjective referral), and objective F1 as measured by the Orchestrator (`orchestrator-measurements.md` § M7).

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/scaffold` for the life of this unit.

## Objective

Close the round's findings without changing what any test proves: the `findParameters` non-vacuity guard reads through the parser, the drive comments name their mechanism, the drives narrow without a clone, the reader test selects its subject by name, and the reader's span unit is pinned by a non-ASCII control.

## Context

- Read first: `/home/user/scaffold/AGENTS.md` § Non-negotiable rules and § Design laws, `.claude/rules/tests.md` § Shared test infrastructure and § Probes, `.claude/rules/typescript.md`, `.claude/rules/writing.md`; then the sites named under Edits.
- Measured, 2026-09-06 (M7): `parseSync` from `vite` reports `start` and `end` as UTF-16 code-unit offsets; over a source carrying an em dash and a curly quote before the declaration, `source.slice(node.start, node.end)` returns `"export const factory = (mode: Mode): UserConfig => value"`, `"mode: Mode"`, and `"UserConfig"` exactly, and the program's `end` equals the string's `length` (103) rather than its byte length (107).
- The declared ecosystem guard is `isArray<T = unknown>(value: unknown): value is readonly T[]` from `@orkestrel/contract` (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:2278`), the package each owned file already imports `isRecord` from (`tests/src/core/templates.test.ts:8`, `tests/guides.test.ts:2`); `AGENTS.md` and `.claude/rules/patterns.md` § Declared ecosystem capabilities reuse it over scaffold's own `isCollection`, so `isArray` is the guard edit 3 names.
- The tree is committed and clean apart from U5's four files, which are uncommitted; commit nothing.
- Host: Linux, bash, Node v22.22.2; commands run from `/home/user/scaffold`.

## Scope

Owned: `tests/src/core/templates.test.ts`, `tests/guides.test.ts`, `tests/setupServer.test.ts`. Off-limits: everything else, `tests/setupServer.ts` included.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`. A scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>` is permitted.

## Edits

1. **The `findParameters` guard** (`tests/src/core/templates.test.ts`, about lines 965 to 973). Replace `expect(browser).toContain('function applicationBrowser(showcase: boolean): UserConfig {')` with a read through the reader: find the statement whose `declarations` carry the name `applicationBrowser`, assert its `declarations` equal `[{ name: 'applicationBrowser', parameters: ['showcase: boolean'], returns: 'UserConfig' }]` (this assertion fails when the statement is absent, which is what keeps the empty finding non-vacuous), then assert its `exported` is `undefined`, then keep `expect(findParameters(browser)).toStrictEqual([])`. Rewrite the comment above it to say the declaration is read through the reader and asserted unexported, so the assertion states the property the rule depends on rather than a spelling.
2. **The drive comments.** In `tests/src/core/templates.test.ts` (the comment above `driveClassifier`, about line 326) replace "and the call list is a second module that imports the first — nothing here is evaluated from a string." with "and the call list is a second module that imports the first, so the loader evaluates real modules over a real specifier graph in place of a `vm` context." In `tests/guides.test.ts` (about lines 349 to 351) replace "and the call list is a second module that imports them, so nothing here is evaluated from a string." with "and the call list is a second module that imports them, so the loader evaluates real modules over a real specifier graph in place of a `vm` context."
3. **The drives' narrowing and clone.** In both files: `!Array.isArray(driven.answers)` becomes `!isArray(driven.answers)` with `isArray` added to the existing `@orkestrel/contract` import beside `isRecord` (it narrows to `readonly unknown[]`, so no `any[]` step remains); in `tests/src/core/templates.test.ts` `return structuredClone(driven.answers)` becomes `return driven.answers`; in `tests/guides.test.ts` `expect(structuredClone(driven.answers)).toStrictEqual(expected)` becomes `expect(driven.answers).toStrictEqual(expected)`. The return type `Promise<readonly unknown[]>` stays.
4. **The reader test's positional subject** (`tests/setupServer.test.ts`, about lines 494 to 511). Select the `build` statement by its declared name (the statement whose `declarations` carry `name === 'build'`) into a local `const`, and assert `text` and `body` on it in place of `statements[4]`. Replace `expect(statements.filter(({ body }) => body.length > 0)).toHaveLength(1)` with an assertion that the `syntax` list of every statement carrying a body is `['FunctionDeclaration']`. Keep the comments' substance.
5. **The span control** (`tests/setupServer.test.ts`, a new case in the reader's `describe` after the refusal case). Name it for what it proves: `slices by code unit, so a non-ASCII character before the declaration moves nothing`. Its source is `"// an em dash — and a curly quote ’ before it\nexport const factory = (mode: Mode): UserConfig => value\n"`. First assert the fixture's premise, `new TextEncoder().encode(source).length` greater than `source.length`, so an edit that removed the non-ASCII characters reddens the case rather than hollowing it; then assert the one statement's `text` is `"export const factory = (mode: Mode): UserConfig => value"` and its `declarations` equal `[{ name: 'factory', parameters: ['mode: Mode'], returns: 'UserConfig' }]`. Add a one-line comment naming why the premise assertion exists.
6. Change nothing else. Run the scoped formatter over each owned file after editing.

## Output

Write `tmp/units/ts6-u5-fix-report.md` with the lines before and after per edit, every criterion below with PASS or FAIL and its evidence (the command and its exit code, the summary block of a Vitest run), and any deviation. Return it as your final message.

## Deviation contract

Stop and report when a site is not where the brief says or its "before" text differs, when `isArray` does not resolve from `@orkestrel/contract` in an owned file, or when a retuned assertion reddens. Comment wording inside an edit is yours to decide and record.

## Amendment before launch (2026-09-06 18:00 UTC)

The guard named in edit 3 was corrected from scaffold's `isCollection` to `@orkestrel/contract`'s `isArray` after the Orchestrator read the installed declarations; nothing else changed.

## Acceptance criteria, cheapest first

1. `git diff --stat -- tests/src/core/templates.test.ts tests/guides.test.ts tests/setupServer.test.ts` names those files; `git status --short` shows no file outside U5's four modified.
2. `grep -n "structuredClone\|Array.isArray\|evaluated from a string" tests/src/core/templates.test.ts tests/guides.test.ts` prints nothing; `grep -n "statements\[4\]" tests/setupServer.test.ts` prints nothing.
3. `npx oxfmt --config .oxfmtrc.json --check tests/src/core/templates.test.ts tests/guides.test.ts tests/setupServer.test.ts` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
4. `npm run test:setup`, `npm run test:guides`, and `npm run test:src:core` exit 0, with the setup project reporting one more case than the 73 U5 recorded.
