# Unit brief — U4-fix: the round-1 findings on the distribution proof template (scaffold)

Follows `u4-proof-template-brief.md`. Carries the U4 round-1 findings (`u4-audit-subjective.md` claim 8, F1, F2; `u4-audit-objective.md` F1, F2, F4), reconciled in `u4-audit-verdict.md`. Every edit is a lane's prescription, fully specified.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/scaffold` for the life of this unit.

## Objective

Close the substantiated findings on the generated distribution proof: the require drive's silent empty case, the scratch project name collision, the `Entry.declaration` fields nothing reads, the browser drive's machinery around one known driver, and two shipped comment sentences that fail the writing rules.

## Context

- Read first: `/home/user/scaffold/AGENTS.md` § Design laws and § Writing, `.claude/rules/writing.md`, `.claude/rules/tests.md` § Discovery and adequacy, then the whole proof block of `src/core/templates.ts` (from `distribution: Object.freeze({` near line 1024 to the end of that entry near line 2078). The block is a template string: every backtick and `${` inside it is escaped as the surrounding text shows; keep that escaping.
- The tree carries U4's uncommitted edit of `src/core/templates.ts` and `tests/distribution.test.ts`; commit nothing.
- Host: Linux, Node 22.22.2, npm 11 at `/opt/npm11/bin`. The template's own behaviour is proved by emitting it into a staged copy of this workspace: the instrument the first unit used is `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/` (`emit.mjs`, `stage/`, `plant.sh`, `logs/`); read `emit.mjs` and `plant.sh` before using them, and write nothing under `/home/user/scaffold` from them.

## Scope

Owned: `src/core/templates.ts`, the distribution proof block only. Off-limits: everything else, in particular `tests/distribution.test.ts`, `tests/src/core/templates.test.ts`, every vendored file, `package.json`, and `.orkestrel/**`.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no `npm run build`, no tree-wide `format` or lint `--fix`.

## Edits

1. **The require drive's empty case.** In the require drive (about lines 1905 to 1916), give the driver selection the guard the import drive has at about line 1892: `const drivers = selectDrivers(entry, 'commonjs')` then `expect(drivers).not.toStrictEqual([])` before the `flatMap`, so an entry whose `require` condition resolves a target no driver's conditions reach is reported rather than passed with nothing compared. Rewrite the comment above it (about lines 1908 to 1911) as: "A subpath whose `require` resolves to a module that no typed CommonJS consumer can compile against carries no declared side to compare here, and whether it may publish one at all is the untypable set's question rather than this drive's. The preceding runtime drive ran either way." (`whose … that` restores the dropped relative pronouns; `preceding` replaces `above`.)
2. **One scratch project per surface.** In `checkSurface` (about line 1563), the project name carries the extension: `const name = \`surface.\${surface.driver.label}\${slug}.\${surface.extension}\`` and the module becomes `\`\${name}\`` — that is, name the module `surface.<label><slug>.<extension>` and the project `tsconfig.surface.<label><slug>.<extension>.json` — so one entry's `.ts` and `.cts` surfaces under one driver, and the browser and Node faces under `bundler`, never share a project file or a module path. Keep the escaping the template uses.
3. **`Entry.declaration` as the facts its readers use.** Every reader of `entry.declaration.<face>` reads presence only (the classification at about lines 1651 to 1653 and the three `=== undefined` guards at about lines 1887, 1904, and 2032). Reduce the interface (about lines 1173 to 1177) to `readonly declaration: { readonly module: boolean; readonly commonjs: boolean; readonly browser: boolean }`, set each from `resolveDeclaration(...) !== undefined` in `buildStage` (about lines 1669 to 1675) with the `join(installed, …)` dropped, change each reader to read the boolean (`!entry.declaration.module` and the like), and keep the interface comment truthful about what the members now name (the declarations its consumer formats resolve, as facts).
4. **The browser drive's driver.** Replace the filter, the assertion over the filter, and the `flatMap` over one element (about lines 2046 to 2050) with one module-scope binding beside `RESOLUTIONS`: `const BROWSER_DRIVER = RESOLUTIONS.find((driver) => driver.label === 'bundler')` guarded the way the file's other module-scope work is (throw when `undefined`, naming the missing row), then `const reported = checkSurface(stage, { entry, extension: 'ts', published, driver: BROWSER_DRIVER })`. Drop the `BUNDLER` constant, restore the literal `label: 'bundler'` in `RESOLUTIONS`, and keep the comment above the drive.
5. **Prose sweep of the block.** Search the proof block for `above`, `below`, `should`, `simply`, `easy`, `just`, and a count of a growable set; rule each hit and rewrite the ones the writing rules refuse. Report the pattern and every hit's ruling.

## Unknowns

- Whether the emitted proof over the staged copy stays green after edits 1 to 4: emit the template through `emit.mjs` (or the equivalent you read there) into the staged copy and run its proof; report the summary. If the staged copy is stale against `dist/`, rebuild `dist/src/core` and `dist/bin` with `npm run build:src:core` and `npm run build:src:bin` first — those two scoped builds are permitted.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u4-fix-report.md` with: per edit one to three sentences and the lines; the sweep's pattern, paths, and rulings; the unknown answered with the exact commands and summaries; every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when an edit needs a file you do not own, when the emitted proof reddens on something the edit did not touch, or when a reader of `entry.declaration` needs the path after all. Comment wording beyond the quoted sentences is yours.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts` exits 0.
3. `grep -n "BUNDLER\|drive above\|The runtime drive above" src/core/templates.ts` prints nothing; `grep -c "join(installed, declaration" src/core/templates.ts` prints 0.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npm run test:src:core` exits 0 (the parity and lift rows over the emitted proof).
6. The emitted proof over the staged copy exits 0 (the unknown), with its summary quoted.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
