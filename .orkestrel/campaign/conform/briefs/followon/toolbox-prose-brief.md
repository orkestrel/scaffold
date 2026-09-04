# Unit toolbox-prose — the banned substitution tokens outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/toolbox`. Perform the assignment directly and spawn nothing. Dispatched after the conformance landing of toolbox (the commit `git log --oneline -1` names), from that landed tip.

## Objective

Every banned-sense hit of the substitution table in toolbox's own prose (`src/**`, `tests/**` minus the vendored set, `guides/toolbox.md`, `guides/README.md`, `README.md`) reads its replacement by sense — `via` → `through` or `by using`; `e.g.` → `for example`; `i.e.` → `that is`; `currently` → delete or give the date; `simply` and `just` → delete; `and/or` → `and`, `or`, or `both`; `ensure` and `guarantee` as a claim about behaviour → the checkable behaviour — with the gate chain and the guide parity project green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (rule every hit by the sense its row bans; a literal code identifier is exempt; record a permitted sense as permitted) and § Claims and time (`ensure` and `guarantee` are banned as claims about behaviour; `ensure` addressed to an executor as a directive is not); `/home/user/scaffold/AGENTS.md` § Writing.

**Evidence.** A Grok 4.6 sweep of the tree during fix round 1 (2026-09-04 14:50 UTC, `/home/user/scaffold/.orkestrel/campaign/conform/units/l56/toolbox-prose-sweep-grok.result.md`): its `## Hits` table quotes every sentence with a proposed rewrite per row and rules 4 hits permitted; its `## Patterns` section names each pattern with the command and its reading (`via` 54 lines: `src` 26, `tests` 14, `guides/toolbox.md` 14; `currently` 10; `e.g.` 9; `guarantee` 3; `simply`, `just`, `i.e.`, `ensure`, `and/or` singles). The landing and a fix round moved lines after that sweep: open the map for the sentence and the proposed rewrite, re-run each pattern on the landed tip, and rule every hit yourself; the map is the minimum, not the population. Adopt a proposed rewrite where it reads plainly; write your own where it does not, and record which.

**Host.** POSIX shell; `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Never commit or push. The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. Where a guide sentence you rewrite is transcribed in `tests/guides.test.ts`, change the transcription in the same edit. Where a rewritten TSDoc line changes a guide table cell (the guide's Surface and Methods cells mirror TSDoc first sentences; `npm run test:guides` proves parity), edit the cell in the same edit and run `npx oxfmt --config .oxfmtrc.json guides/toolbox.md`, reading the diff before accepting it. A model-facing `description:` string in `src/core/shapers.ts` or `src/core/constants.ts` is prose the model reads and is in scope; a JSON Schema wire body is data and is not. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rniE <pattern> <paths>`, `ls`, `cat`, `sed -n`.

## Scope

**Owned.** The prose lines the sweep rules banned in `src/**`, `tests/**` (minus the vendored set), `guides/toolbox.md`, `guides/README.md`, and `README.md`; `tests/guides.test.ts` where it transcribes an edited guide sentence. **Off-limits.** Everything else; never a code identifier, never a vendored file, never `package.json`.

## Rows

1. Run each pattern of the map's `## Patterns` section (`\bvia\b`, `e\.g\.`, `i\.e\.`, `\bcurrently\b`, `\bsimply\b`, `\bjust\b`, `\band/or\b`, `\bensure`, `\bguarantee`, case-insensitive) over `src`, `tests` (minus the vendored set), `guides/toolbox.md`, `guides/README.md`, and `README.md`. Rule every hit: banned-sense → rewrite by the row's replacement and the sentence's sense; permitted (a code identifier, a fixture string that is data, an `ensure` directive to an executor, a proper noun) → record as permitted with the reason. Record each pattern, the paths, every hit, and its ruling.
2. After the rewrites, each sweep returns permitted hits alone.
3. `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides` exit 0; the scoped runs over every test file you edited exit 0.

## Output

Write `/home/user/scaffold/tmp/units/followon/toolbox-prose-report.md` and return it as your final message: each rewrite with `file:line` before and after (name which adopt the map's proposal and which are yours); the sweep record with every hit ruled; `git status --short`; each gate's exit code. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens after your edits, when a hit sits in a code identifier a rewrite would rename, or when a guide cell's rewrite changes the parity suite's reading in a way an edit to the transcription cannot restore. Decide, record, and carry on for an ancillary question: `through` against `by using` for one sentence, deleting `currently` against dating it.

## Acceptance criteria

1. The recorded sweeps' remaining hits are each ruled permitted with the reason.
2. The gates and scoped runs exit 0; `git status --short` lists only owned files.
