# Unit D6b — template-rename: the generated distribution proof's boolean members read as assertions

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the subjective lane's unit (a naming ruling with a mechanical rename behind it). Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing.

## Objective

The distribution proof template in `src/core/templates.ts` names its `Entry` record's boolean members as assertions under `.claude/rules/names.md` § General vocabulary ("Booleans read as assertions"), and the proof it generates still passes in the generated workspace.

## Read first

`/home/user/scaffold/AGENTS.md`; `.claude/rules/names.md` § General vocabulary and § Rejected naming; `.claude/rules/typescript.md`; `src/core/templates.ts:1170-1200` (the `Entry` record: `declaration.{module, commonjs, browser}`, and the top-level `browser`, `module`, `commonjs`, `required`) and every site in the same template that reads those members; `tests/src/core/templates.test.ts:330-560` (the template's pinned text); `tests/distribution.test.ts` (which generates a workspace from the template and runs its proof); `.orkestrel/campaign/ts6-api/ledger.md:140` (the finding).

## What is fixed

- Rule each boolean member of `Entry` and of `Entry.declaration` against the assertion form. `module: boolean` is the finding; `commonjs`, `browser`, and `required` are ruled the same way, and a member that already reads as an assertion stays. Record each ruling in one line.
- Rename at the declaration, at every read and write site in the template text, and in every test that pins the template text. No behaviour changes.
- Scaffold's own `tests/distribution.test.ts` is not the template's output and does not move.

## Standing conditions

D4, D5, and D6 are accepted and uncommitted on this tree; `npm run test:guides` is green at dispatch. `node_modules/@orkestrel/guide` is a `--no-save` head start; never `npm install`. `npm run test:distribution` runs for about 70 seconds; a timing red is the Orchestrator's to re-run alone.

## Scope

- Owned: `src/core/templates.ts` (the `Entry` members and their read sites only), `tests/src/core/templates.test.ts`.
- Off-limits: everything else.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run build`, `npm run test:distribution` (an observation). Never `npm install`, lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "readonly module: boolean" src/core/templates.ts` prints nothing.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:core` exits 0.
4. `npm run build` exits 0.
5. Observation: `npm run test:distribution` exit code and last lines.

## Output

Write `/home/user/scaffold/tmp/units/docs-d6b-template-rename-report.md`: the rulings, each edit with `file:line`, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a member's meaning cannot be read from the template's own comments and read sites, or when a gate fails outside the owned files. The names are yours to decide and record.
