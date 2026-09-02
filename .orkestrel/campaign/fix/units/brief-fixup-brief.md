# Unit brief-fixup — close the brief unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/brief` at commit `3b94bdb` states no count over a set in its guide, and its test
setup explains the bound `remove` delegate once.

## Context

**Findings, each with its ruling.**

1. **Objective F1 — the guide treats one closed set two ways.** The carrier deleted the tally at
   the six ruled sites while the same tallies stand elsewhere in `guides/brief.md`: `:17` ("the
   four pipeline phases"), `:93` ("the four fixed pipeline phases"), `:97` ("the four DISJOINT
   file partitions"), `:231` ("the four partitions present"), `:378` ("six readiness rules"),
   `:509` and `:544` ("the four partitions are disjoint"), `:749` ("the same six rules"), `:849`
   ("four DISJOINT partitions"), `:871` ("Read the four to decide"), `:1204`. `AGENTS.md` § Writing:
   "Delete a count you find. Do not correct it." Ruling: sweep
   `\b(two|three|four|five|six|seven|eight|nine|ten|twelve)\b` and `\b[0-9]+\b` case-insensitively
   over `guides/brief.md` and `README.md`, rule every hit — a count over a set (phases, partitions,
   rules, path sets, members, steps) is deleted or the members named; a value the reader needs (a
   limit, a size, a version, a duration, a measurement) stays — and record every hit with its
   ruling. Where the sentence needs a word, write "every" or name the members.
2. **Objective F2 — one comment repeated verbatim.** `tests/setup.ts:137-139`, `:188-190`,
   `:408-410`, `:437-439` carry the same three-line explanation of `real.remove.bind(real)`.
   Ruling: keep the explanation at the first stub and drop the other three copies, leaving the
   bound reference alone at each.

Recorded, no change: the s13-30 refusal stands as an Orchestrator engineering ruling on its two
verified grounds (a positional parameter rename binds no caller; `output` shadows the module's
own export in the same file), with the `result`/`output` synonym pair recorded as a successor
naming row; `guides/interpret.md` is a vendored mirror the re-pin refreshes; the pre-unit
`tests/guides.test.ts` was red under `format:check` at `3b94bdb~1` (`oxfmt --check` on the
pre-image reports format issues), so the reflow rode in the unit as disclosed.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`; `.claude/rules/documentation.md`.
Read the copies under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the
checkout's `.claude/rules/` differs.

**Host.** Linux, bash. Repository `/home/user/fleet/brief` at commit `3b94bdb`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** `tests/guides.test.ts` checks guide parity; a deleted word inside a
table cell may re-pad the table, which is expected.

## Unknowns

none.

## Scope

**Owned.** `guides/brief.md`, `README.md`, `tests/setup.ts` — at the sites the findings name and
the sweep's hits.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply finding 1 with its
sweep, then finding 2, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the sweep with every hit and its ruling (count deleted, members named, or value kept);
each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when deleting a count makes a sentence false, or when a gate fails for a cause you
cannot attribute after the re-run. Decide, record, and carry on from the wording of a sentence.

## Acceptance criteria

1. No hit of the sweep in `guides/brief.md` or `README.md` is a count over a set; every kept hit
   is recorded as a value.
2. `tests/setup.ts` explains the bound delegate once.
3. The gate chain exits 0.
4. `git status --short` lists only owned files.
