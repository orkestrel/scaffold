# Brief — `d7n-abort-dropin` (the pilot's drop-in takes Ruling 13's two corrections)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/abort` (branch `claude/orkestrel-npm-audit-deps-14ibta`, clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13 and `/home/user/scaffold/.claude/rules/writing.md` § Sentence and paragraph order first.

## Items

1. `tests/guides.test.ts`, the `INTERNAL` doc block (`:33-40` region): "and the second assertion below fails when a name here stops being stranded" → "and the assertion that follows it fails when a name here stops being stranded" (no ordinal, no `below`).
2. The same file: the equality case `keeps every compared summary and example equal to its source` moves to sit before the import walk case `imports only real exports through published specifiers in every ts fence` inside the manifest loop's `describe`, with its leading comment; nothing else in the file moves.
3. `npm run format` over the file; `npm run test:guides` green (record the summary).

## Scope

Owned: `tests/guides.test.ts`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0; `npm run check` exit 0.
2. `npm run test:guides` exit 0 (record the summary).
3. `git status --short` lists `tests/guides.test.ts` only.

## Output

`/home/user/scaffold/tmp/units/d7n-abort-dropin-report.md`: the hunks, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if a before-text is not found verbatim.
