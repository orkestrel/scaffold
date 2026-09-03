# Unit router-prose — the unit citations and the count outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/router`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of router (`8c78fd9`), from the landed tip.

## Objective

The `U1`, `U3`, and `U6` unit citations that resolve to no document a consumer can read leave the published TSDoc and the tests, and the tally "three faces" at `tests/guides.test.ts:38` names the faces, with the gate chain green.

## Context

**Law.** `AGENTS.md` § Writing (never state a count over a growable set); `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (claim only what the reader can check) and § Code tokens, references, and links.

**Evidence** (the round-2 objective lane, `units/l2b/router-objective-r2.md` F4 and F5; line numbers from the pre-landing tree and can have moved): `src/core/types.ts:214` and `src/core/constants.ts:63`, `:78`, `:94` cite "(U1 `helpers.ts`)"; `tests/src/core/Dispatcher.test.ts:15` reads "The net-new test mirror slice of `src/core/Dispatcher.ts` — U6-scoped" and `:20` "is U3's own suite"; `tests/guides.test.ts:38` reads "guide spans three faces (core/browser/server)". Replace each citation with the fact it stands on — "(the path compiler in `helpers.ts`)" for `U1`, "the type-level surfaces" for `U6-scoped`, and for `U3` the suite the sentence means, read from the file — and rewrite the tally as "spans the core, browser, and server faces".

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/router run <script>`, `npm --prefix /home/user/fleet/router test`, `cd /home/user/fleet/router && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/router status --short`, `git -C /home/user/fleet/router diff`, `node /home/user/scaffold/tmp/work/evidence.mjs router`, `cd /home/user/fleet/router && npx scaffold audit --offline`, and `grep -rniE '<pattern>' <paths>`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. The offline audit reports one drift row, `configs/browsers.ts` stale — the vendored baseline the landing repairs; record it and do not repair it.

## Scope

**Owned.** `src/core/types.ts` and `src/core/constants.ts` (the citation sentences only), `tests/src/core/Dispatcher.test.ts` (the two comments), `tests/guides.test.ts` (the one sentence).

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. The citation rewrites.
2. The tally rewrite.
3. Sweep `\b[UOS][0-9]+\b` over `src` and the non-vendored `tests` (exclude `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`) and `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b` case-insensitively over the non-vendored `tests`, ruling every hit by sense.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs router`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/router-prose-report.md`: per site the line now, the sweeps with their rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweeps read empty of unit citations and tally senses in the Owned files.
2. Every gate exits 0; the audit reports only the `configs/browsers.ts` baseline row; `git status --short` lists only Owned paths.
