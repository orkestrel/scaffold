# Implementation brief — U-record

## Role and engine

`builder`, native Claude subagent on the cheap tier, sole serial writer in `/home/user/scaffold`
from the clean committed baseline you read with `git log --oneline -1`. You run after U-probe has
landed. This is fully specified prose against measured rows; you exercise no judgment about the
facts.

## Objective

Correct the one `ROADMAP.md` row that this session's measurements falsified, and record the two
findings this change carries forward rather than fixes.

## Owned file

`ROADMAP.md` only.

## Off-limits

Every other file.

## The edit

Find the `**scaffold**:` row that begins "the release-mode distribution proof" and names npm
`10.9.7`, npm `11.19.1`, and the question "rule whether the proof launches the npm the `engines`
field names or the field names npm 11" (around lines 370-375). Replace that row's text with a row
stating, in the file's existing voice and bullet style:

- The measured boundary: npm `10.9.7` and every npm from `11.0.0` through `11.5.0` crash resolving a
  lockfile-free generated workspace at `@npmcli/arborist`'s `#loadPeerSet` with an unguarded
  `node.parent` dereference; npm `11.6.0` is the first that resolves it; `vitest` alone reproduces
  it and `@types/node` is not involved. Measured on `2026-09-13`.
- The ruling: the proof launches the npm the generated manifest names. Every generated manifest
  carries `devEngines.packageManager` at `>=11.6.0` with `onFail` error, and the distribution proof
  provisions that npm when the ambient one is below the floor. `engines.npm` and `engine-strict` were
  measured and rejected because the crash fires before engine validation.
- Node floor `22.18.0`, where type stripping is unflagged, so the vendored lint plugin loads; Node 22
  and Node 24 stay supported.

Then add two rows in the same list, each beginning `**scaffold**:` in the file's style:

- The `test` script is an `&&` chain in scaffold, toolbox, and ollama (`scaffold/package.json`,
  `toolbox/package.json`, `ollama/package.json`), so one failing project hides every project after
  it; on `2026-09-13` one red case in `src:server` suppressed five projects that each pass when
  invoked singly. Rule on a composition that runs every project and reports every failure; the repair
  edits the generated manifest and three packages, so it is a successor version's.
- `src/core/constants.ts` pipes scaffold's own `@types/node` range into every generated workspace,
  which typechecks against Node 26's declaration surface while declaring a `22.18.0` floor. Rule
  whether the emitted `@types/node` range tracks the declared floor.

## Writing rules — `AGENTS.md` § Writing and `.claude/rules/writing.md` bind this prose

Never state a count; name members instead. No `should`, `simply`, `just`, `via`, `currently`,
`now`. Write a date as `YYYY-MM-DD`. Code tokens in backticks followed by a noun. Active voice. One
idea per sentence. Match the surrounding rows' wrap width and indentation exactly.

## Execution

Perform this assignment directly and spawn no agent.

## Deviation contract

Stop and report if the row to replace cannot be found by its content, or if the prose sweep rejects a
word you cannot rephrase within the facts above.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits `0`.
2. `npm run test:policy` exits `0` — the prose sweep reads every authored Markdown file.
3. `git diff --stat` names `ROADMAP.md` only.
4. The old row's phrase "the field names npm 11" no longer appears anywhere in `ROADMAP.md`.

## Output

Return, as structured data: each criterion with its exit code, and the deviation state. No process
diary.
