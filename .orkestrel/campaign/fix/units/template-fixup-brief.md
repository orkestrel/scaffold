# Unit template-fixup — restore the no-argument `remove` overload and drop the stale citations

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/template` at commit `50da0d2` carries the batch family `.claude/rules/patterns.md`
§ Managers § Batch operations prescribes — `remove(): void`, `remove(id): boolean`,
`remove(ids): boolean` — with the s17-16 (`count`) and s17-17 (`template` returns `undefined`)
outcomes intact, and no prose cites a numbered `AGENTS §` section the pointer file no longer has.

## Context

**Ruling.** The unit applied s17-18 (drop the no-argument `remove()` overload). The objective audit
lane found that ruling contradicts `.claude/rules/patterns.md` § Managers § Batch operations as
written ("`method(): void` … No argument applies to all"), a rule a brief cannot repeal, and the
Orchestrator confirmed the fleet's other managers that own `clear` (console, interpret, table) keep
the no-argument form. s17-18 therefore closes **refused** by that rule text, and this unit
restores exactly what the s17-18 hunks deleted. The `clear`-versus-remove-all tension is recorded
as a question for the user, not resolved here.

**What to restore** (read the pre-unit versions with `git show 50da0d2~1:<path>`; the s17-18 hunks
are the ones touching `remove`, not the `count` or `template` hunks):

1. `src/core/types.ts`: the `remove(): void` overload on `TemplateManagerInterface` before the
   single-id overload, and the interface `@remarks` sentence that described `remove()` removing
   every registered template, in the pre-unit wording; drop the sentence "`clear` is the sole
   remove-all" from that block.
2. `src/core/TemplateManager.ts`: the `remove(): void` overload; the implementation signature
   `remove(target?: string | readonly string[]): boolean | void`; the `target === undefined` branch
   that emits `remove` per instance and clears the map; the pre-unit `@param` / `@returns`
   lines; the TSDoc sentences describing `remove()`; drop the "`clear` is the sole remove-all; a
   caller wanting per-instance observation …" sentences. Keep `#require`, `count`, and the
   `template` accessor as the unit left them.
3. `tests/src/core/TemplateManager.test.ts`: the two deleted cases "remove() removes every
   registered template and returns void" and "emits remove once per registered template for
   remove()", in their pre-unit describe; delete the case the unit added that proves
   `remove(manager.templates().map((one) => one.id))` purges the registry only if it duplicates
   the restored coverage — otherwise keep it (it is still true).
4. `guides/template.md`: the `remove` Methods row reads "Remove LISTED templates by id, ONE
   template by id, or ALL templates; emits `remove` per removed id." with `boolean` (or `void`) as
   its return cell, the `clear` row reads "Remove every registered template, emitting `clear`.",
   and the contract sentence "`clear` is the sole remove-all" is dropped; keep every `count` and
   `template`-returns-`undefined` edit.

**Stale citations (objective F2).** `src/core/TemplateManager.ts:155` reads "(AGENTS §9.2 batch
overloads)" and `guides/template.md:209` reads "(AGENTS §9.2)"; the pointer `AGENTS.md` has no
numbered sections. Ruling: drop the parenthetical citation from both lines you are already
rewriting; leave every other `§` citation in the package alone (pre-existing, recorded for the
next change).

**Law.** `AGENTS.md`; `.claude/rules/patterns.md` § Managers § Batch operations;
`.claude/rules/names.md` § Fixed lifecycle vocabulary; `.claude/rules/documentation.md` § Parity.

**Host.** Linux, bash. Repository `/home/user/fleet/template` at commit `50da0d2`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Build a throwaway probe, if you need one, under the
system temporary directory, never under the checkout. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/types.ts`, `src/core/TemplateManager.ts`, `guides/template.md`,
`tests/src/core/TemplateManager.test.ts` — each only at the sites named.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, `tmp/**`, every vendored guide mirror, every
other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Restore the tests first and
run `npm run test:src` to record them failing against the narrowed signature (quote the failing
count), then restore the overload and branch, then the prose, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per item — closed, with the file and line, or stopped with the deviation; the
failing-first count and the passing count; each gate command with its exit code and an excerpt for
any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the pre-unit hunks cannot be separated from the `count` / `template` hunks, or
when a gate fails for a cause you cannot attribute after the re-run.

## Acceptance criteria

1. `TemplateManagerInterface` and `TemplateManager` declare `remove(): void`, `remove(id): boolean`,
   `remove(ids): boolean`; `count` and `template(id): TemplateInterface | undefined` are unchanged.
2. The two restored tests failed before the overload returned and pass after it.
3. `rg -n 'sole remove-all|AGENTS §9\.2' src guides/template.md tests` returns no hit.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.
