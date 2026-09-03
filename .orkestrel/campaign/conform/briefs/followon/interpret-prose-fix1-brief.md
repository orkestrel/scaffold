# Unit interpret-prose fix round 1 — the tally sites outside the first round's scope

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/interpret`. Perform the assignment directly and spawn nothing.

## Objective

Every remaining sentence in the package's own prose that tallies the pipeline's stages as "five" names the stages or drops the number, on the tree the interpret-prose unit left uncommitted, with the gate chain green.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing (never state a count over a set anyone can add to; name the members or write the sentence without the number).

**The unit's reading** (`units/followon/interpret-prose-report.md` § Row 5): its sweep found tally sites in files the first brief kept off-limits — `src/core/Interpret.ts:49` ("five-stage pipeline —"), `src/core/Interpret.ts:454` ("so `stages` always holds exactly five, digest over the known"), `src/core/helpers.ts:17` ("Stateful orchestration (the five-stage"), `src/core/factories.ts:40` ("runs the fixed five-stage"), `README.md:66` ("runs the fixed five-stage"), `README.md:73` ("the `Interpret` orchestrator, the five pipeline"). The forms the first round used: name the pipeline as `[normalize, extract, clarify, format, generate]`, or write "one record per phase", or "the fixed pipeline". Line numbers can have moved; read each site before changing it, and read the whole sentence across its line breaks.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/interpret run <script>`, `npm --prefix /home/user/fleet/interpret test`, `cd /home/user/fleet/interpret && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/interpret status --short`, `git -C /home/user/fleet/interpret diff`, `node /home/user/scaffold/tmp/work/evidence.mjs interpret`, `cd /home/user/fleet/interpret && npx scaffold audit --offline`, and `grep -rniE '<pattern>' /home/user/fleet/interpret/src /home/user/fleet/interpret/README.md /home/user/fleet/interpret/guides/interpret.md /home/user/fleet/interpret/guides/README.md`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the interpret-prose unit's uncommitted edits; leave them as they are.

## Scope

**Owned.** `src/core/Interpret.ts`, `src/core/helpers.ts`, `src/core/factories.ts` (comment and doc sentences only), `README.md`, `/home/user/scaffold/tmp/units/followon/interpret-prose-report.md`.

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. Rewrite the six sites.
2. Sweep `\bfive\b|\b5[- ](stage|phase|record)` case-insensitively over `src`, `README.md`, `guides/interpret.md`, and `guides/README.md`, and rule every remaining hit by sense.
3. Append a `## Fix round 1` section to the report: each site with the line now, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs interpret`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep reads empty of tally senses in `src`, `README.md`, and both guides.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths plus the first round's.
