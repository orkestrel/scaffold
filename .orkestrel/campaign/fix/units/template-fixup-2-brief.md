# Unit template-fixup-2 — apply the batch rule to the template manager's remove(ids)

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/template` at commit `2eccc62` removes every listed template it can and reports `true`
only when all of them were present, as `.claude/rules/patterns.md` § Managers § Batch operations
prescribes for an id list, and its guide and tests state that one batch meaning.

## Context

**Finding and ruling.** The L2 fix-round audit recorded, against the template unit, "align
template's `remove(ids)` to partial-apply-and-report and state the one batch meaning in
`guides/template.md`"; the workspace unit's objective lane found the row uncarried.
`src/core/TemplateManager.ts:185-192` pre-checks every id and returns `false` before removing
anything when one is absent (all-or-nothing); `tests/src/core/TemplateManager.test.ts:194-207`
and `:241-252` pin that; `guides/template.md:197` reads "`remove`'s array form is all-or-nothing"
and `:238` reads "the all-or-nothing batch `remove`". The rule text: "An id list applies to those
items and returns true only when all succeed." The fleet reads that as apply-each-and-report —
`@orkestrel/workspace`'s guide states "applies to every entry it can and reports `true` only when
all of them succeeded, so one absent path turns the batch's answer `false` while the present
paths still move or drop", and its `remove(paths)` and the registry's `remove(ids)` do so.
Ruling: the array branch removes each present id, emitting `remove` per removed instance, and
returns `true` only when every id was present; delete the pre-check loop. The test at `:194`
becomes "remove(ids[]) removes every present id and reports false when one is missing", asserting
that the present ids are gone, the `remove` event fired once per removed instance, and the return
is `false`; the case at `:241-252` follows the same reading. The guide sentences at `:197` and
`:238` state the one batch meaning in the workspace guide's words. Keep `remove()` and
`remove(id)` unchanged.

**Law.** `AGENTS.md`; `.claude/rules/patterns.md` § Managers § Batch operations;
`.claude/rules/documentation.md` § Parity; `.claude/rules/tests.md`; `.claude/rules/writing.md`.
Read the copies under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's
`.claude/rules/` differs.

**Host.** Linux, bash. Repository `/home/user/fleet/template` at commit `2eccc62`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/TemplateManager.ts` (the array branch of `remove` only), `src/core/types.ts`
only where the `remove` TSDoc states the batch meaning, `guides/template.md` at the two sentences
and the `remove` Methods row if it states the meaning, `tests/src/core/TemplateManager.test.ts` at
the cases named.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Insert the failing proof
first: rewrite the test cases to the ruled meaning, run
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/TemplateManager.test.ts`,
record the failing cases and count, then change the branch and record the same command green.
Sweep `all-or-nothing` case-insensitively over `src`, `tests`, `guides/template.md`, `README.md`
and classify every hit, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the finding closed with the file and line of each change, or stopped with the
deviation; the red-then-green record; the sweep and every hit classified; each gate command with
its exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a consumer inside this package depends on the atomic pre-check, or when a gate
fails for a cause you cannot attribute after the re-run. Decide, record, and carry on from the
wording of a sentence or a test title.

## Acceptance criteria

1. `remove(['a', 'missing'])` on a manager holding `a` removes `a`, emits `remove` once, and
   returns `false`, pinned by an executed assertion that went red first.
2. `rg -n -i 'all-or-nothing' src tests guides/template.md README.md` returns no hit.
3. The gate chain exits 0.
4. `git status --short` lists only owned files.
