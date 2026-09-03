# Unit conform-router fix round 2 — the pointers the unit wrote, the temporal `once`, the sweep record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/router`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutation of claim 4 and its findings F1 to F3 (`units/l2b/router-objective-r2.md`): the two `below` pointers the unit added to test comments read `that follows`; the temporal `once` in the guide's hash-mode fence comment reads `after`; the report's substitution sweep lists every hit in its population, permitted hits included, and its file accounting states the measured entries.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding`, `following`, `earlier`, `later`, never `above` or `below`) and § Substitutions (`once` temporal → `after`; record a hit in a permitted sense as permitted rather than dropping it; name the pattern and the paths behind every sweep result); `/home/user/scaffold/AGENTS.md` § Writing.

**Sites, as the lane read them at 20:0x UTC.** Line numbers can have moved; read each site before changing it.

- F1: `tests/guides.test.ts:193` "// Each block below is one `guides/router.md` fence, run against the real barrel…" and `tests/src/browser/Navigator.test.ts:791` "// Each block below is one `guides/router.md` fence importing `@orkestrel/router/browser`, run…" → "Each block that follows is one …" in both.
- F2: `guides/router.md:531` "// sets location.hash; `active` updates once the hashchange fires" → "// sets location.hash; `active` updates after the hashchange fires". The transcription at `tests/src/browser/Navigator.test.ts:822-826` asserts values, not comment text; confirm with `npm --prefix /home/user/fleet/router run test:guides` after the edit.
- Claim 4: the report's sweep row at `report.md:131` records `\bvia\b|e\.g\.|\bsimply\b|\babove\b|\bbelow\b` over `src`, `guides/router.md`, `guides/README.md`, `README.md` with "no `above`", while `src/core/constants.ts:75` reads "literal segment and above a wildcard segment at the same position", a permitted comparison the row dropped. Re-run `grep -rniE '\bvia\b|e\.g\.|\bsimply\b|\babove\b|\bbelow\b|\bonce\b'` over `src`, the non-vendored `tests` (exclude `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), `guides/router.md`, `guides/README.md`, and `README.md` after the F1 and F2 edits, and rewrite the row so every hit is listed by its sense: the comparisons at `src/core/helpers.ts:324`, `:342`, `src/core/constants.ts:74`, `:75`, and `guides/router.md:262` permitted, any banned-sense hit named and fixed in the same round.
- F3: `report.md:236` states "`git status --short` lists 35 files" while `:235` and the status carry 37 entries; § Diffstat (`:68-91`) and § Files touched (`:39-63`) describe the round-0 tree. Correct `:236` to the measured count from `node /home/user/scaffold/tmp/work/evidence.mjs router`'s output, and add one sentence at the head of § Files touched and § Diffstat stating that they record the round-0 tree and that § Fix round 1 § Sites changed carries the fix-round paths.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/router run <script>`, `npm --prefix /home/user/fleet/router test`, `cd /home/user/fleet/router && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/router status --short`, `git -C /home/user/fleet/router diff`, `node /home/user/scaffold/tmp/work/evidence.mjs router`, `cd /home/user/fleet/router && npx scaffold audit --offline`, and `grep -rniE '<pattern>' <paths>`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing conditions.** The tree carries the conform-router unit's uncommitted edits and fix round 1's; leave every edit outside the Sites as it is. The offline audit reports one drift row, `configs/browsers.ts` stale — the vendored baseline the landing repairs; record it and do not repair it.

## Scope

**Owned.** `tests/guides.test.ts` (the one comment), `tests/src/browser/Navigator.test.ts` (the one comment), `guides/router.md` (the one fence comment), `/home/user/scaffold/tmp/units/conform/conform-router-report.md`.

**Off-limits.** Everything else, every other fleet checkout included. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. F1, F2: the three edits; `test:guides` green.
2. Claim 4: the sweep re-run and the row rewritten with every hit ruled.
3. F3: the accounting sentence and the two section notes.
4. Append a `## Fix round 2` section: each finding, the edit, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs router`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary. State no count in authored prose; the measured entry count from the evidence script is a measurement.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep over the named population returns no banned-sense hit; every permitted hit is listed in the row.
2. `test:guides` exits 0; every gate exits 0; the audit reports only the `configs/browsers.ts` baseline row; `git status --short` lists only the unit's paths.
