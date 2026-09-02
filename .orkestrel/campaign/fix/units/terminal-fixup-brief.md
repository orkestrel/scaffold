# Unit terminal-fixup — close the terminal unit's audit findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; the substitution is
recorded). You perform the assignment directly and spawn nothing.

## Objective

`@orkestrel/terminal` at commit `01c6754` states the manager's accessor behavior without a claim
about the caller, names the fence's members instead of tallying them, and pins the undecoded-key
path with an executed assertion at the reducer and the line editor.

## Context

**Findings, each with its ruling.** Apply in this order.

1. **Subjective R1 — a claim about the caller.** `guides/terminal.md:467` ends "A name is the key a
   caller already holds", and `src/core/types.ts:650-651` reads "Neither accessor reports the
   names: an endpoint's name is the key a caller already holds to reach it." `PromptInterface`
   carries no `name` (`src/core/types.ts:490-501`), so a consumer handed a manager it did not
   populate cannot map a broker back to its key. Ruling: the Methods cell states behavior only —
   "List every mounted broker, in insertion order." — and the remark states where a name comes
   from (the methods that take one; `terminals()` returns brokers, not keys) without asserting
   what the caller holds. Verify against `TerminalManagerInterface` which methods take a name
   before naming them.
2. **Subjective R2 and the objective referral — `both`.** `guides/terminal.md:957` reads
   `manager.terminals() // both endpoints' PromptInterface brokers, in insertion order`. Ruling:
   `// the 'agent' and 'user' brokers, in insertion order`.
3. **Subjective R3 — the undecoded-key claim has no executed assertion.**
   `guides/terminal.md:590-591` claims "every reducer reads it as a key it does not consume", and
   the guard at `src/core/helpers.ts:811` is what makes it true, but
   `tests/src/core/helpers.test.ts:288-295` feeds `editLine` only decoded keys. Ruling: add
   `expect(editLine('ab', parseKey(`${KEY_CSI}999~`))).toBeUndefined()` to that `describe`, and one
   reducer case in the same file driving `inputReduce(createInputState(FIELD), parseKey(`${KEY_CSI}999~`))`
   and asserting `status` is `'active'` with `state` equal to the input state; build `FIELD` as the
   file's other reducer cases build a `TextField`. Insert the failing proof first: remove the
   `key.name !== undefined &&` guard at `helpers.ts:811`, run
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`,
   record the failing assertion and count, restore the guard by editing the exact text back, and
   record the same command green. Confirm with `git diff --stat src` that `src` is unchanged
   afterwards.
4. **Count in an owned file.** `guides/terminal.md:162` and the test title at
   `tests/src/core/helpers.test.ts:312` carry "four shared line shapes". `AGENTS.md` § Writing
   bans a count. Ruling: name the shapes or drop the number in both places.

Recorded, no change: the report's `grep … → exit 0 — 0 hits` line (objective F3) and its missing
Carry disposition (objective F4, vacuous in this package) are report defects recorded in the
verdict; `render*` for the view and header helpers stands; `teardown` is the fleet's noun for the
destroy phase; `filter*` needs a prefix-table row in `.claude/rules/names.md` and is recorded for
scaffold; `moveUp` and `redrawPrefix` and the name-enumeration capability are successor rows; the
helpers file's mixed TSDoc mood belongs to the voice wave.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/documentation.md` § Parity;
`.claude/rules/tests.md`; `.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/terminal` at commit `01c6754`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings. Build a throwaway probe, if you need one, under the system temporary directory, never
under the checkout's `tmp/`.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/types.ts`, `guides/terminal.md`, `tests/src/core/helpers.test.ts`, and
`src/core/helpers.ts` only for the temporary guard removal in finding 3, restored before the
gates run — each only at the sites the findings name.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command (`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`). Tree-wide
`format` only to converge after `npm run lint`; then the non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order, run the word-boundary sweep and the case-insensitive inflected sweep for `already holds`,
`both`, and `four shared` over `src`, `tests`, `guides/terminal.md`, `README.md`, classifying
every hit, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the red-then-green record for finding 3 (command, failing assertion, count, then the
green run, then `git diff --stat src`); the sweep and every hit classified; each gate command
with its exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the reducer case cannot be built from the file's existing fixtures, or when a
gate fails for a cause you cannot attribute after the re-run. Decide, record, and carry on from
the wording of a sentence.

## Acceptance criteria

1. `rg -n 'already holds' src guides/terminal.md` returns no hit; the Methods cell and the remark
   read as ruled.
2. `guides/terminal.md:957` names the `'agent'` and `'user'` brokers.
3. The two new assertions exist, went red under the removed guard, and are green with it
   restored; `git diff --stat src` shows only `src/core/types.ts` changed.
4. `rg -n 'four shared' guides/terminal.md tests` returns no hit.
5. The gate chain exits 0.
6. `git status --short` lists only owned files.
