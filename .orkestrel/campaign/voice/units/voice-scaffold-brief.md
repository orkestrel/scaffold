# Unit voice-scaffold — migrate the TSDoc voice of `@orkestrel/scaffold`

Successor of `.orkestrel/campaign/fix/tsdoc-wave-brief.md` (the shared wave brief, read it in full
first; every section there binds unless this file narrows it). What this file adds: the package,
its checkout, its tip, the measured population, the standing conditions of the breaking wave, and
the evidence the unit must leave on disk.

## Role and engine

`implementer` on Claude Opus 5, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Every TSDoc block under `src/` and `app/` of `/home/user/scaffold` opens with a third-person `-s` verb
sentence that never repeats the symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`, with no other change to the tree.

## Context

**Host.** Linux, bash. Repository `/home/user/scaffold` at commit `e70e811`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the fleet closure staged as tarballs. Do not run `npm install`. Run only the gate chain the
shared brief names; `test:distribution` and any live-service suite are outside it.

**Measured population at launch** (`instruments/voice-scan.mjs`, an over-approximating
classifier — it counts a first sentence as verbless when it opens with a noun, an article, or a
backtick token, so read each hit before rewriting): files=27, blocks=462,
imperative=236, verbless=195, boolean `@returns` in another wording=28.

**Standing conditions.**
- A guide parity test in some packages compares `@example` fences and backticked symbol names in
  TSDoc against the guide and the barrel (for example `tests/guides.test.ts`). The wave leaves
  `@example` blocks and every backtick token untouched, so those tests stay green; a test that
  pins a first sentence is a deviation to report, never a guide edit.
- The breaking wave landed before this unit: symbol names in the tree are the ruled names. Never
  rename a symbol, and never touch a guide or a test.
- `lsp` and `test` already open every first sentence in the third person; if this package's scan
  shows zero in a bucket, that bucket needs no sweep.

## Unknowns

none.

## Scope

**Owned.** TSDoc comment text under `src/**` and `app/**` of `/home/user/scaffold`, and the evidence files
named under Output.

**Off-limits.** Every non-comment token; `tests/**`; `guides/**`; `README.md`; `package.json`;
`package-lock.json`; `AGENTS.md`; `.claude/**`; `.agents/**`; `configs/**`;
`tests/setupPolicy.ts`; `tests/policy.test.ts`; every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `npm run lint` then `npm run format` only to converge, then the
non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Sweep as the shared brief
directs, run the gate chain, then write the evidence files:

```text
git diff > /home/user/scaffold/tmp/units/voice/voice-scaffold.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-scaffold.status
```

## Output

Return, as data: the count of blocks rewritten by kind (first sentence from the imperative,
first sentence given a verb, first sentence reworded to drop the symbol's name, boolean
`@returns`); the files touched; each gate command with its exit code and an excerpt for any
failure; the two evidence paths; deviations (expected, found, evidence, done or not, one
hypothesis) or `none`.

## Deviation contract

Stop and report when a rewrite would change meaning, when a test pins a sentence you must
change, or when the gate chain fails for a cause you cannot attribute after one re-run. Wording
choices within the rule are yours: decide, continue.

## Acceptance criteria

1. `git diff` shows changes inside comment text only (the checker reads the diff hunks).
2. No doc block under `src/` or `app/` opens with an imperative verb or a bare noun phrase, and no
   boolean `@returns` uses another wording (the Orchestrator re-runs `voice-scan.mjs` after
   landing as the acceptance instrument).
3. Every `@example`, `@param`, `@remarks`, `@throws`, and later sentence is byte-identical to
   the launch tree.
4. The gate chain exits 0 at every step (observation for `npm test` timing; the Orchestrator's
   landing chain is the authoritative run).
5. `git status --short` lists only files under `src/` and `app/`.
