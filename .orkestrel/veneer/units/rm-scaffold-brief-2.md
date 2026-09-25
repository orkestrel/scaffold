# Unit RM-SCAFFOLD round 2 — the title, the comments, the setup-file move, and the provenance re-run

Successor to `rm-scaffold-brief.md`. What changed: the audit (`rm-audit-verdict.md`) confirmed the fix, the end-to-end
pin, the mutation, and the host log, and carries claims 4, 7, and 8, F1, F2, and the `src/core/compilers.ts` comment.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/scaffold-rm`, which holds round 1
uncommitted over `392aa1e0`. The end-to-end case spawns Vitest and npm, which a bench sandbox's child cannot. The harness
environment block may name another directory as the primary working directory; start every shell command with
`cd /home/user/scaffold-rm &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold-rm/AGENTS.md`, the rules `/home/user/scaffold-rm/.claude/rules/{tests,workspace,typescript,names,documentation,writing,quality}.md`,
and the round's verdict and lane verdicts beside it under `/home/user/scaffold/.orkestrel/veneer/units/`. No skill
applies.

## Items

1. **The vendored title (claim 8).** Retitle the case in `tests/config.test.ts` titled `runs every project in the mode
   Vitest was invoked with` to a title that states what it proves: every registered project factory returns the
   invocation's mode and no other invocation field. This unit settles the wording.
2. **The stale comments (claim 7).** Rewrite the comment near the factory-registration case in
   `tests/src/core/templates.test.ts` (it says registration makes Vitest read the command line's mode inside the
   project) and the comment in `tests/src/core/compilers.test.ts` that describes the invocation record as refused, so
   each distinguishes a factory receiving the record from returning its mode.
3. **The compiler comment.** In `src/core/compilers.ts`, the comment beside `projects.push('appBrowser')` becomes,
   verbatim and wrapped by the formatter: `The row is the factory itself, never a call of it. Vitest hands the command
   line's --mode only to a project it calls, and mergeOverride sets that mode on the project it returns, so an
   evaluated row silently turns the release-mode publish gate into a skip.` (keep the code spans as backticks around
   `--mode` and `mergeOverride`).
4. **The guide sentence (F2).** In `guides/scaffold.md`'s release paragraph, the sentence round 1 added becomes one that
   names the factories that receive the invocation record, says each of their projects runs in the invocation's mode,
   says Vitest runs a project whose factory returns no mode in Vitest's own `test` mode, where the proof skips, and
   names that a journey project, whose birth-owned wrapper drops the record, runs in `test`.
5. **The setup-file move (F1).** Move the end-to-end case's rival-scenario table and a reader of the Vitest JSON report
   into `tests/setupServer.ts` as exported, typed declarations, prove each in `tests/setupServer.test.ts`, and route
   both report-reading sites in `tests/distribution.test.ts` through the one reader. The case's assertions and its
   reading stay the same.
6. **The provenance re-run (claim 4).** Put the `392aa1e0` bytes of `src/core/templates.ts` and `vite.config.ts` in
   place (from `git show 392aa1e0:<path>`), write each site's SHA-256 as the first lines of the log, run the two red
   commands round 1 ran, logging to `tmp/units/rm-2-red-config.log.txt` and `tmp/units/rm-2-red-distribution.log.txt`,
   then restore the fixed bytes and write each restored digest after the run. Both runs must fail with an assertion.

## Context

- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. `npm run build` regenerates
  `host.json` and `dist/`; run it after the edits and before any gate that reads either. Other checkouts run suites at
  the same time; a timing failure under load is an observation with its reading.
- **Scope.** Owned: round 1's files, `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `src/core/compilers.ts`
  (the one comment). Off-limits: `src/core/constants.ts`, `package.json`, `package-lock.json`, `.claude/**`,
  `.agents/**`, `.orkestrel/**`, and every other path. No git command that writes, no install, no `npm run format`.

## Execution

Perform the assignment directly and spawn nothing. Do the items in order; item 6 runs before any gate. Then run
`npm run build`, `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm test`, each logged to
`tmp/units/rm-2-<gate>.log.txt` with `echo "exit=$?"` appended, and the end-to-end case alone with
`npm run test:distribution -- -t "fails the release run of a generated distribution proof"` to
`tmp/units/rm-2-e2e.log.txt`. Write `git diff 392aa1e0` to `tmp/units/rm-2.diff` and `git status --short` to
`tmp/units/rm-2-status.txt`.

## Output

Write `tmp/units/rm-report-2.md` and return the same text: each item's change and evidence; the provenance digests and
readings; the gate table; the diff and status paths. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This round settles the case title, the comment
wording in item 2, the guide sentence's wording, and the setup-file declarations' names. Stop and report if a base-byte
red run passes, if the move changes the case's reading, or if a gate reads red outside the change's reach.

## Acceptance criteria

Each item is in place; both provenance runs fail with an assertion on digest-recorded base bytes and the restores are
byte-identical; the end-to-end case reads green; every gate in Execution exits 0.
