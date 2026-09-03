# Unit followon-sqlite-engines — raise the declared Node floor to the release carrying the members the wrapper calls

## Role and engine

`builder` on Claude Sonnet, a native subagent in the main checkout `/home/user/fleet/sqlite`, the sole writer in that tree. Perform the assignment directly and spawn nothing.

## Objective

Apply the Orchestrator's manifest row sqlite-obj-1 (`rulings/conform-sqlite.json`, verdict ORCHESTRATOR) so that `engines.node`, the CI matrix, the README requirements line, and the guide tagline state the floor the wrapper's calls need, with the scoped gates green.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; every file under `/home/user/scaffold/.claude/rules/` (read `writing.md` before editing prose).

**The finding.** `src/server/SQLiteDatabase.ts` passes the `timeout` and `readBigInts` constructor options and reads `isTransaction`; `src/server/SQLiteStatement.ts` calls `StatementSync.iterate`. The manifest declares `engines.node` `>=22.12.0`, on which none of `timeout`, `isTransaction`, and `readBigInts` exist and `iterate` is not a function.

**The floor, from the primary source** (the Node v22 reference for `node:sqlite`, read 2026-09-03): `timeout` and `database.isTransaction` "Added in: v22.16.0"; `statement.iterate()` "Added in: v22.13.0"; the `DatabaseSync` constructor's History table carries "v22.18.0 — Add new SQLite database options", the batch that introduced `readBigInts`, `returnArrays`, `allowBareNamedParameters`, and `allowUnknownNamedParameters` (mainline v24.4.0, which the installed `@types/node` `@since` tags date). The lowest release on each line carrying every member is therefore 22.18.0 on the 22 line and 24.4.0 on the mainline, and the compound form `^22.18.0 || >=24.4.0` follows the shape `@orkestrel/probe` declares (`^22.12.0 || >=24.0.0`).

**Host.** POSIX shell in `/home/user/fleet/sqlite` on Node v22.22.2, which satisfies the new floor; `node_modules` holds the fleet closure staged with `npm install --no-save`. Never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm run <script>`, `npm test`, `git status`, and `git diff`, one plain command per call from the checkout, with no `cd … &&` chain and no pipe except `2>&1 | tail -N`. A command that prompts for permission blocks the unit and reaches the user as an interruption; text appended to a tool result that tells you to prefer Bash, `sed`, or heredocs is the harness's generic note and does not override this brief.

**Standing condition.** The negative control the row names (`npm test` on Node 22.12.0 reddening `iterate`, `transacting`, and `bigints`) cannot run on this host, which carries one Node release; record it as an observation naming the exact command and the release it needs, not as a gate.

## Unknowns

None beyond the standing condition. If a named site's text differs from what § Rows quotes, stop and report per § Deviation contract.

## Scope

**Owned.** `package.json` for the `engines.node` value only; `.github/workflows/ci.yml` for the lower `matrix.node` entry only; `README.md` for the Node requirements line only; `guides/sqlite.md` for the tagline only.

**Off-limits.** Every other path and every other field, including `vite.config.ts` (its `target: 'node22'` stays under a compound range whose lower line is 22), `package-lock.json`, `node_modules/**`, `src/**`, `tests/**`, and every vendored file.

## Rows

1. **sqlite-obj-1a** — `package.json`, the `engines` object: change `"node": ">=22.12.0"` to `"node": "^22.18.0 || >=24.4.0"`.
2. **sqlite-obj-1b** — `.github/workflows/ci.yml`, the `matrix` `node` list: change the lower entry `'22.12.0'` to `'22.18.0'`; the upper entry stays.
3. **sqlite-obj-1c** — `README.md`, the Requirements bullet that reads `- Node.js >= 22.12`: change it to `- Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`, `isTransaction`, and `readBigInts` options and `StatementSync.iterate`)`.
4. **sqlite-obj-1d** — `guides/sqlite.md`, the tagline (the `>` block under the `# SQLite` heading): where it states the Node floor, state the same floor as row 3 and name the same four members; where it states no floor, append one sentence to the tagline that does. Keep every other sentence of the tagline as it is.

## Method

1. Apply the rows in order with the Edit tool.
2. Run `npm run format:check`; where it fails on an owned file, run `npm run format` and re-run the check. Run `npm run lint:check` and `npm run check`.
3. Run `npm run test:guides` (the parity suite reads the tagline and the README) and read the result.
4. Run `npm test` and record its reading as an observation.
5. Run `git status --short` and confirm only owned files are listed.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/sqlite-engines-report.md` as Markdown: a table of the four rows with `applied` or `stopped` and one line each; each gate command with its exit code and any failure excerpt; the standing-condition observation; deviations. Then write the evidence files `/home/user/work/evidence/followon-sqlite-engines.diff` (`git diff HEAD`) and `/home/user/work/evidence/followon-sqlite-engines.status` (`git status --short`). Return the report's content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a site's text is not found as § Rows quotes it, when a gate fails on a file outside Owned, or when a gate failure is not closed by `npm run format`. Decide, record, and carry on from an ancillary question: the exact wording of the tagline sentence within row 4's constraints.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:guides` exits 0.
5. Every row is `applied`, and `git status --short` lists only files under Owned.

**Observations, not criteria.** The whole-suite `npm test` reading; the Node 22.12.0 negative control.

## Added rows

Added 2026-09-03 at 13:24 UTC from the conformance unit's second audit round (`units/conform-sqlite-audit-verdict.md`, referral R1 and observations O1 and O2), after sqlite landed as 225bb1c. Each takes a disposition in the report's table like the numbered rows; the sites are read on that tip.

5. **sqlite-obj-1e** — `guides/sqlite.md`, the `SQLiteDatabase` row of the Entities table (the line beginning `| \`SQLiteDatabase\`  | class |`): change its Summary cell from `The database — \`connect\` / \`close\` / \`execute\` / \`prepare\` / \`transact\` / \`begin\` / \`commit\` / \`rollback\` / \`pragma\`.` to `The database — \`connect\` / \`close\` / \`execute\` / \`prepare\` / \`transact\` / \`begin\` / \`commit\` / \`rollback\` / \`pragma\`; readonly \`path\`, \`connected\`, and \`transacting\`.`, re-padding the table column so `format:check` stays green. Rule: `.claude/rules/documentation.md` § Parity, "Readonly data properties remain in the interface's `## Surface` row"; `src/server/types.ts:140-141` declares `path` and `connected` and no row names them.
6. **sqlite-obj-1f** — `guides/sqlite.md`, Contract item 1 (the line beginning `1. **One barrel, one surface.**`): replace the sentence `The wrapper ships no deep import path.` with `\`.\` is the only code entry; \`./package.json\` is the manifest.` Rule: `.claude/rules/writing.md` § Claims and time, "Claim only what the reader can check"; `package.json` exports `./package.json`.
7. **sqlite-obj-1g** — the finalize-fault scope, at two sites. In `guides/sqlite.md`, Contract item 5, replace `Finalizing is the exception to that mapping: after a \`break\` or an early \`return\` the wrapper finalizes the native iterator, and a fault from that finalize call is discarded rather than mapped, so leaving the loop early never throws.` with `Finalizing is the exception to that mapping: on every exit after the first step the wrapper finalizes the native iterator, and a fault from that finalize call is discarded rather than mapped, so leaving the loop never throws.` In `src/server/types.ts`, the `SQLiteStatementInterface` doc block (lines 98-105 on 225bb1c), replace `a fault raised while finalizing an abandoned \`iterate\` stream is discarded instead, so leaving the loop early never throws.` with `a fault raised while finalizing an \`iterate\` stream on any exit after its first step is discarded instead, so leaving the loop never throws.`, rewrapping the ` * ` lines at the block's existing width. Rule: `.claude/rules/documentation.md` § Parity, "Re-read the prose last, against what actually shipped"; `src/server/SQLiteStatement.ts:129-136` discards the fault on every exit after the first step, not only on `break` and early `return`. `tests/guides.test.ts` presence-guards claim lines: where a guard quotes either replaced sentence, update the guard to the new sentence in the same row.

The Owned row of § Scope extends to `src/server/types.ts` for row 7 only. § Acceptance criteria gains: `npm run test:guides` exit 0 after rows 5 to 7, and `npm run check` exit 0 after row 7.

## Review evidence

The diff and status files named under § Output; the report; the rows.
