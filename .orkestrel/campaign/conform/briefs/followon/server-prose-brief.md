# Unit server-prose — the banned-sense `via` sites outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/server`. Perform the assignment directly and spawn nothing. Dispatched after the conformance landing of server (`6dafcea`), from that landed tip.

## Objective

Every banned-sense `via` in server's own prose (`src/**`, `tests/**` minus the vendored set, `guides/server.md`, `guides/README.md`, `README.md`) reads `through` or `by using` by sense, with the gate chain and the guide parity project green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (the `via` row: `through`, `by using`; rule every hit by the sense the row bans; a literal code identifier is exempt) and § Claims and time; `/home/user/scaffold/AGENTS.md` § Writing.

**Evidence** (server's fix round 1 sweep, 2026-09-03 21:22 UTC, `/home/user/scaffold/.orkestrel/campaign/conform/ledgers/followons.md:72`): the case-insensitive `\bvia\b` sweep over `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md` (mirrors excluded) left banned-sense hits at `src/server/helpers.ts:249,400,412,455,832,884,1333,1410`, `src/server/constants.ts:47`, `src/server/Server.ts:53,54,57,58,61`, `src/server/types.ts:78,153,574,625,713,716`, `src/server/errors.ts:15,115`, `tests/src/server/helpers.test.ts:160`, `tests/src/server/Server.test.ts:1346`, and `guides/server.md:6,8,349,371`, every one outside the unit's rows. Three later fix rounds and the landing moved lines: re-run the sweep on the landed tip and rule every hit; the list is the minimum, not the population.

**Host.** POSIX shell; `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Never commit or push. The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. Where a guide sentence you rewrite is transcribed in `tests/guides.test.ts`, change the transcription in the same edit. Where a rewritten TSDoc line changes a table cell's width in `guides/server.md`, run `npx oxfmt --config .oxfmtrc.json guides/server.md` and read the diff before accepting it. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rniE <pattern> <paths>`, `ls`, `cat`, `sed -n`.

## Scope

**Owned.** The prose lines the sweep rules banned in `src/**`, `tests/**` (minus the vendored set), `guides/server.md`, `guides/README.md`, and `README.md`; `tests/guides.test.ts` where it transcribes an edited guide sentence. **Off-limits.** Everything else; never a code identifier, never a vendored file, never `package.json`.

## Rows

1. Run `grep -rniE '\bvia\b' src tests guides/server.md guides/README.md README.md` (excluding the vendored set and `node_modules`). Rule every hit: banned-sense (`via` as a preposition meaning through or by using) → rewrite by sense; permitted (a code identifier, a fixture string that is data, a proper noun) → record as permitted. Record the pattern, the paths, every hit, and its ruling.
2. After the rewrites, the same sweep returns permitted hits alone.
3. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides` exit 0; the scoped `src:server` runs over `tests/src/server/helpers.test.ts` and `tests/src/server/Server.test.ts` exit 0.

## Output

Write `/home/user/scaffold/tmp/units/followon/server-prose-report.md` and return it as your final message: each rewrite with `file:line` before and after; the sweep record with every hit ruled; `git status --short`; each gate's exit code. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens or when a hit sits in a code identifier a rewrite would rename. Decide, record, and carry on for an ancillary question: `through` against `by using` for one sentence.

## Acceptance criteria

1. The recorded sweep's remaining hits are each ruled permitted with the reason.
2. The gates and scoped runs exit 0; `git status --short` lists only owned files.
