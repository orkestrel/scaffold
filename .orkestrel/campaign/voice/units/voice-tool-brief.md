# Unit voice-tool — migrate the TSDoc voice of `@orkestrel/tool`

Successor of `.orkestrel/campaign/fix/tsdoc-wave-brief.md` (the shared wave brief, read it in full
first; every section there binds unless this file narrows it). What this file adds: the package,
its checkout, its tip, the measured population, the standing conditions of the breaking wave, and
the evidence the unit must leave on disk.

## Role and engine

`implementer` on Claude Opus 5, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Every TSDoc block under `src/` and `app/` of `/home/user/fleet/tool` opens with a third-person `-s` verb
sentence that never repeats the symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`, with no other change to the tree.

## Context

**Host.** Linux, bash. Repository `/home/user/fleet/tool` at commit `1ba9528`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the fleet closure staged as tarballs. Do not run `npm install`. Run only the gate chain the
shared brief names; `test:distribution` and any live-service suite are outside it.

**Measured population at launch** (`instruments/voice-scan.mjs`, an over-approximating
classifier — it counts a first sentence as verbless when it opens with a noun, an article, or a
backtick token, so read each hit before rewriting): files=7, blocks=43,
imperative=15, verbless=26, boolean `@returns` in another wording=2.

**Standing conditions.**
- A guide parity test in some packages compares `@example` fences and backticked symbol names in
  TSDoc against the guide and the barrel (for example `tests/guides.test.ts`). The wave leaves
  `@example` blocks and every backtick token untouched, so those tests stay green; a test that
  pins a first sentence is a deviation to report, never a guide edit.
- The breaking wave landed before this unit: symbol names in the tree are the ruled names. Never
  rename a symbol, and never touch a guide or a test.
- `lsp` and `test` already open every first sentence in the third person; if this package's scan
  shows zero in a bucket, that bucket needs no sweep.
- The rule file: read `.claude/rules/typescript.md` in the checkout where it exists; a target
  checkout carries no `.claude/rules/`, so read the vendored copy at
  `node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md`. That is not a
  deviation.
- Lessons the pilot slice's audits ruled, binding here: when a rewrite drops a noun phrase, keep
  every referent a later clause depends on (a pronoun such as `it` must still resolve to the
  same noun); add no quantifier the sentence did not carry (`each`, `every`, `all`); keep a
  possessive on the noun it modified (the emitter's handler stays the emitter's handler); where
  a constant's sentence names the symbol's own identifier as a code token, drop the token only
  when the sentence still names the value (`the null byte` for `NUL`), and keep a domain term
  that is the value's own name (a wire field, a byte's name); a boolean `@returns` rewrite
  drops the backticked `true`/`false` tokens by design.
- The scan's buckets are a population estimate: `Options for …` and `Whether …` openers sit
  in the wrong bucket, so sweep every block and rule by reading, not by the bucket.

## Unknowns

none.

## Scope

**Owned.** TSDoc comment text under `src/**` and `app/**` of `/home/user/fleet/tool`, and the evidence files
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
git diff > /home/user/scaffold/tmp/units/voice/voice-tool.diff
git status --short > /home/user/scaffold/tmp/units/voice/voice-tool.status
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
