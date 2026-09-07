# Unit brief — D4-fix-2: the two consumer patches the guide head start forces, and one rule row

Successor of `d4-fix-brief.md`: K1's callback parameter `entry` shadowed the enclosing loop's `entry` binding and failed `lint:check` (`eslint(no-shadow)`); the parameter is `method` at every site, and criterion 1 counts that spelling. Nothing else changed.

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Every edit is exact; perform the assignment directly and spawn nothing.

## Objective

Scaffold's `tests/guides.test.ts` reads method entries as the records `@orkestrel/guide` returns after D1 (`SourceInterface.methods(name)` and `MethodGroup.methods` are `readonly MethodEntry[]`, each `{ name, summary? }`), so the pre-existing case `publishes read without the former files reader method` goes green again and `documents the members of every behavioural declaration` compares names rather than `[object Object]` strings; and `.claude/rules/workspace.md`'s `guides` project row states the gate D4 landed.

## Read first

`/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-scaffold-gate-report.md` § Deviation (the probe readings behind each patch); `tests/guides.test.ts:118-196`; `.claude/rules/workspace.md:130-134`.

## Standing conditions

The tree carries D4's four files uncommitted (`tests/guides.test.ts`, `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `host.json`); that state is what you edit. `npm run test:guides` is red on `keeps every compared summary and example equal to its source` and `opens the README with the guide tagline` by design, and on `publishes read without the former files reader method` by the defect this unit repairs. Never a discard-class git command, never a commit, never `npm install`. `oxfmt` formats Markdown, so a table's padding is the formatter's.

## Edits, exact

**K1.** `tests/guides.test.ts`, the case `documents the members of every behavioural declaration`: at `:126` read `const listed = [...group.methods].map((method) => method.name).sort().join(', ')`; at `:127` read `const members = source.methods(group.interface).map((method) => method.name).join(', ')`; at `:134` read `const members = source.methods(symbol.name).map((method) => method.name)`; at `:142` read `const owed = implementing ? source.methods(contract).map((method) => method.name).join(', ') : undefined`. The joins at `:143-144` read the mapped `members` and need no edit.

**K2.** `tests/guides.test.ts:192`, the case `publishes read without the former files reader method`: read `const methods = inspected.flatMap(({ source }) => source.methods('UpstreamInterface').map((method) => method.name))`.

**K3.** `.claude/rules/workspace.md:132`, the `guides` row's `Proves` cell: `Every documented API exists, every public API is documented, and every compared summary, example, and pitch equals its source`. Let `oxfmt` re-pad the table; confirm with `git diff -w -- .claude/rules/workspace.md` that only that cell and the separator row moved.

**K4.** `npm run build` so `host.json` carries the vendored rule's new digest, then `npm run build:inventory` once more and record `sha256sum host.json` before and after that re-run.

## Scope

- Owned: `tests/guides.test.ts`, `.claude/rules/workspace.md`, `host.json` (by regeneration alone).
- Off-limits: everything else, `.claude/rules/documentation.md` and `.claude/rules/tests.md` included (D4's landed edits).
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:policy`, `npm run build`, `npm run build:inventory`. Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -c "map((method) => method.name)" tests/guides.test.ts` prints 5.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0; `npm run test:policy` exits 0.
3. `npm run build` exits 0; the `host.json` digest is identical across the `build:inventory` re-run.
4. `npm run test:guides` exits 1 with exactly two cases red — `keeps every compared summary and example equal to its source` and `opens the README with the guide tagline` — and every other case green, `publishes read without the former files reader method` and `documents the members of every behavioural declaration` included; record the summary line.

## Output

Write `/home/user/scaffold/tmp/units/docs-d4-fix-report.md`: each edit with `file:line`, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims; no count in prose. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a quoted line is not at the named site or nearby, when `test:guides` reddens any case beyond the two by-design ones after K1 and K2, when a criterion needs an off-limits file, or when a gate fails outside the owned files. Nothing else is yours to decide.
