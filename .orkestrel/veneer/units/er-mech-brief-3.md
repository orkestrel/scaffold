# Unit ER-MECH round 3 — the Receipts Platform check, one title, and the engine-strict reading

Successor to `er-mech-brief-2.md`. What changed: the fix-round audit 2 (`erm-audit-2-verdict.md`) confirmed every claim
but claim 5 and accepted F1 and R3. This round carries those three.

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in `/home/user/veneer-erm`, which holds rounds 1 and 2
uncommitted over `873f715`. The harness environment block may name another directory as the primary working directory;
start every shell command with `cd /home/user/veneer-erm &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{tests,typescript,writing}.md` first. No skill
applies.

## Items

1. **The Receipts Platform check (F1).** In `readReceipts` in `tests/setupServer.ts`, refuse a Platform cell that is not
   a member of `NODE_PLATFORMS`, `—` included (a receipt records the platform its run read), with the message
   `Receipt row N: invalid Platform X`, where N is the row's position as the Commands refusal counts it and X the cell.
   Update `readReceipts`' TSDoc to say so. In the receipts scratch-guide case in `tests/setupServer.test.ts` (the case
   titled `reads receipts only within their Hosts subsection and refuses each malformed cell`), add rows with Platform
   `Linux` and `—`, each expecting that refusal. Plant: delete the new check, run the case, and read it fail with an
   `AssertionError`; restore byte-identically.
2. **The title (claim 5).** Move the case `lists the platform this process runs on among the platforms Node reports`
   into its own `describe('NODE_PLATFORMS', …)` block beside it and retitle it, verbatim:
   `holds the platform this process runs on, and each platform once`.
3. **The engine-strict reading (R3).** Copy `tmp/units/erm-2-engines.sh` to `tmp/units/erm-3-engines.sh`, add the same
   two probes with `npm_config_engine_strict=true` in the environment, run it to `tmp/units/erm-3-engines.log.txt`, and
   read what npm 11.19.1 does with a script under an excluded `engines.node` in each configuration. If the two readings
   differ, reword the `guides/veneer.md` § Hosts sentence beginning `npm 11.19.1 refuses to run a script` to state
   both, naming `engine-strict`; if they agree, leave the sentence and record the reading.

## Execution

Perform the assignment directly and spawn nothing. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH` and set
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. No git command that writes, no install, no `npm run format`; the scratch
packages of item 3 go under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/erm3/`. Format the
changed files with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`, then run `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:guides`, and `npm run test:policy`, each
logged to `tmp/units/erm-3-<gate>.log.txt` with `echo "exit=$?"` appended. Write `git diff 873f715` to
`tmp/units/erm-3.diff` and `git status --short` to `tmp/units/erm-3-status.txt`.

## Output

Write `tmp/units/erm-report-3.md` and return the same text: each item's change and evidence; the plant's result quoted
with its restore digest; the engine-strict readings; the gate table; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This round settles the case order inside the
scratch-guide case and the wording of the TSDoc sentence. Stop and report if the real guide's Receipts table holds a row
the new check refuses, if the plant passes, or if a gate reads red.

## Acceptance criteria

The Receipts reader refuses a Platform cell outside `NODE_PLATFORMS` with the named message, its plant fails the case
with an `AssertionError`, and the restore is byte-identical; the case carries the verbatim title in its own describe
block; the engine-strict reading is retained and the sentence matches it; every gate exits 0.
