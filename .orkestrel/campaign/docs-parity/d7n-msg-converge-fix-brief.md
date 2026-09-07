# Brief — `d7n-msg-converge-fix` (slice 1's audit findings on msg)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/msg` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing, `.claude/rules/documentation.md` § Parity, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice1-audit-verdict.md`, `rulings.md` § Ruling 9 and § Ruling 11, the subjective lane's F1 and the objective lane's F4 in `d7n-slice1-audit-{subjective,objective}.md`.

## Items

1. **The titled example's heading (Ruling 9).** The titled `@example` on `createMSG` (`src/core/factories.ts`) carries the title `Factories`, the structural heading over its fence in `guides/msg.md`. Add a heading one level deeper directly above that fence (`#### <verb phrase naming what the fence demonstrates>`, for example `#### Parse a message from bytes`; read the fence and word it against what it shows), confirm the text occurs once heading-scoped (`grep -n '^#\+ <text>' guides/msg.md`), retitle the block to that text, run `npm run docs` (expect the pair reported once, then zero after the retitle), and confirm `npm run docs -- --to source` reads `written: 0` afterwards. `### Factories` stays.
2. **The `Shape` idiom (objective F4).** `guides/msg.md` states one `Shape` idiom (members in braces) and the `MSGSourceInterface` row (`:60` region) writes call signatures with return types. Write that row's `Shape` cell as bare members in braces (`{ parse, attachment }`), the way sse's `SSEParserInterface` row does at `/home/user/fleet/sse/guides/sse.md:42`; splitting the row on a pipe not preceded by a backslash. Compare every other cell of the row against the baseline afterwards.
3. `npm run docs` at zero and `npm run test:guides` green after both items.

## Scope

Owned: `guides/msg.md`, `src/core/factories.ts` (the `@example` title line only). Off-limits: everything else, including `src/core/MSG.ts` (the class-method blocks are the owner's question, not this unit's).

## Acceptance criteria

1. `npx oxfmt --check guides/msg.md src/core/factories.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings guides/msg.md src/core/factories.ts`, `npm run check` exit 0.
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `--to guide` and `--to source` at `written: 0`; `npm run test:guides` and `npm run test:policy` exit 0.
3. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-msg-converge-fix-report.md`: per item the hunk and the runs, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if the retitled pair does not converge under `--to source` at `written: 0`, or if a correction needs a file outside the owned pair.
