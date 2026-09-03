# Unit conform-relation fix round 1 — the parsed descriptors and the sweep record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/relation`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's findings F1 and F2 (`units/l3/relation-objective-r1.md`): no test binds a parsed value to `Relation` without a guard, and the report's `§` sweep row states the pattern that proves the old form gone beside the retained named citations.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Non-negotiable rules (never `any`; accept `unknown` and narrow with guards; never a type assertion); `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.claude/rules/writing.md`.

**F2, the sites** (line numbers from the lane's reading at 20:2x UTC; read each before changing it): `tests/src/core/helpers.test.ts:119`, `:120`, `:121`, and `:131` each write `const NAME: Relation = JSON.parse('…')`. `JSON.parse` returns `any`, so the annotation types a value as `Relation` that the case's own premise says is not one — an assertion by another route. The Orchestrator's ruling on the shape: bind every parse at `unknown`; prove the refusal at the guard, `expect(isRelationDescriptor(value)).toBe(false)`, beside the existing validator cases; keep a `resolveRelation` throw case only where a value assignable to `Relation` with no annotation trick is malformed at runtime (read `Relation`'s union in `src/core/types.ts` and `resolveRelation` in `src/core/helpers.ts` to find one, such as a descriptor whose optional members are all absent if the resolver refuses it); where no such value exists for a wrong-typed member, remove that `resolveRelation` case and state in the surrounding comment that the guard's refusal is the proof because the signature admits no wrong-typed member. Keep every case's title naming what it proves. Run `npm --prefix /home/user/fleet/relation run test:src:core` before and after: the refactor must leave the suite green, and the guard cases must still read red if `isRelationDescriptor`'s member-type check is planted out (plant once, capture, restore by editing).

**F1, the record.** The report's § Sweeps row for `§` (`report.md:120`) reads "empty in the package's own files; remaining hits are vendored dependency guides", while `guides/relation.md:105`, `:133`, `:138`, `:140` and `guides/README.md:3` carry the named-rule citations the operative repair requires. Rewrite the row to the pattern that proves the old form gone — `AGENTS §[0-9]|\(§[0-9]|§[0-9]+`, case-insensitive, over `src`, the non-vendored `tests`, `guides/relation.md`, `guides/README.md`, and `README.md` (run it) — and add one line recording the retained named citations at the five sites.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/relation run <script>`, `npm --prefix /home/user/fleet/relation test`, `cd /home/user/fleet/relation && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/relation status --short`, `git -C /home/user/fleet/relation diff`, `node /home/user/scaffold/tmp/work/evidence.mjs relation`, `cd /home/user/fleet/relation && npx scaffold audit --offline`, `mkdir -p /home/user/work/evidence/relation-proofs`, and `grep -rniE '<pattern>' <paths>`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`; capture a runner with `> /home/user/work/evidence/relation-proofs/<name>.txt 2>&1`.

**Standing condition.** The tree carries the conform-relation unit's uncommitted edits; leave every edit outside the Sites as it is.

## Scope

**Owned.** `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts` (only to add a guard case F2 needs), `/home/user/scaffold/tmp/units/conform/conform-relation-report.md`.

**Off-limits.** Everything else, `src/**` included. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. F2: the four sites, per the ruling; the planted-guard red and green captured as `fix1-guard-red.txt` and `fix1-guard-green.txt`.
2. F1: the sweep row and the retained-citations line.
3. Append a `## Fix round 1` section: each site with the line now, the captures, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs relation`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when no value assignable to `Relation` reaches `resolveRelation`'s `INVALID` throw at all (then the throw case for a malformed descriptor cannot exist and you say so), or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. `grep -n 'JSON.parse' tests/src/core/helpers.test.ts` shows every parse bound `: unknown`; no `: Relation =` annotation follows a parse.
2. The guard captures read red with the plant and green without it; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's paths.
