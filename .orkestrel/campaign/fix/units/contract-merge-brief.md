# Unit contract-merge — reconcile contract's moved `origin/main` into the campaign branch

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; substitution recorded).
You perform the assignment directly and spawn nothing.

## Objective

The campaign branch of `/home/user/fleet/contract` carries every change `origin/main` gained since
the merge base and every outcome of the breaking unit and its fix-up, with the merge resolved,
staged, and left uncommitted for the Orchestrator to commit; the gate chain is green on the
resolved tree.

## Context

**Evidence.** `origin/main` moved from the merge base `3193da1` (Bump to 0.0.15) by three commits,
all unpublished (registry and `package.json` on main are 0.0.15):

- `e81ba64` Copy an exactly canonical array population directly
- `163490f` Build read diagnostics only on refusal and encode short previews once
- `c13cfae` Capture string refinement patterns at compile time

They touch `guides/contract.md`, `src/core/ContractCompiler.ts`, `src/core/combinators.ts`,
`src/core/helpers.ts`, `tests/setup.ts`, `tests/src/core/compilers.test.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/core/integration.test.ts` — every one of which the
campaign branch also changed (`git diff --stat 3193da1 HEAD`). The campaign branch's tip is
`5b0ed57`; its two commits since the base (`d24e79c`, `5b0ed57`) and their reports are at
`/home/user/scaffold/tmp/units/breaking/contract-report.md`. The renames and reshapes the branch
carries, which main's new code must adopt where it names them: `validateShapeDepth` →
`validateShape`; `createStringFaults`/`createNumberFaults`/`createArrayFaults` → `build*Faults`;
`isValidISOInstant` → `matchesISOInstant`; `INTRINSICS.reveal/declare/parent` and the flat
`read/write/members/present/apply/construct` → `INTRINSICS.reflect.*`; `ValueToSchemaOptions.maxDepth/maxProperties`
→ `limits.depth/limits.properties`; the traversal spines `schemaNodeToShape`, `buildShapeFromNode`,
`buildObjectShape`, `inferValue`, `inferArray`, `inferObject`, `inferSamples`,
`inferRecordSamples` removed (interned in `SchemaShaper`, `ValueInferer`, `SampleInferer`);
`canonicalizeValue` folded into `canonicalStringify`; `expansion: number | undefined`; the
cloners' class-scoped frozen empty-peer pattern (main's own `ContractCompiler.ts` pattern, which
the 0.0.15 merge kept from main).

**Precedent.** The 0.0.15 reconciliation (commit `20e3efd`) took main's `ContractCompiler.ts`
where the two sides implemented the same pattern and ported main's TSDoc into the branch's moved
factory. Keep both intents the same way: main's new capability and diagnostics land whole; the
branch's renames and reshapes stand; main's new code that names a renamed symbol adopts the new
name.

**Law.** `AGENTS.md`; `.claude/rules/architecture.md`; `.claude/rules/names.md` (the vendored copy
predates the vocabulary; the landed text is quoted in
`/home/user/scaffold/tmp/units/breaking/contract-brief.md` § Vocabulary). Main's new code is not
this unit's to audit: leave its shape as main wrote it unless a merge conflict or a renamed symbol
forces an edit, and record anything you notice under Observations.

**Host.** Linux, bash. Repository `/home/user/fleet/contract`, branch
`claude/orkestrel-npm-audit-deps-14ibta` at `5b0ed57`, committed clean at launch, `node_modules`
installed with the dev closure staged. `origin/main` is already fetched (`c13cfae`). Do not run
`npm install`. The user is working on contract in another session; do not push, and do not
touch `origin/main`.

**Standing conditions.** none.

## Unknowns

Whether main's new tests assert a symbol or message the branch renamed; report each such test and
the adoption you applied.

## Scope

**Owned.** Every file the merge touches inside `/home/user/fleet/contract`, except the off-limits
set.

**Off-limits.** `package.json` and `package-lock.json` beyond what the merge itself brings from
main (report any change there), `tests/setupPolicy.ts`, `tests/policy.test.ts`, `.claude/**`,
`configs/**`, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. Allowed git: `git merge --no-commit --no-ff origin/main`,
`git add` of resolved files, `git diff`, `git status`, `git log`, `git show`. Forbidden: `git commit`,
`git push`, `git checkout`, `git restore`, `git reset`, `git stash`, `git clean`, `git merge --abort`
(if the merge cannot be resolved, stop and report with the conflict list; the Orchestrator decides).

## Execution

A native subagent: perform the assignment directly and spawn nothing. Run
`git merge --no-commit --no-ff origin/main`; for each conflicted file, resolve by keeping both
intents as the Precedent states; then sweep main's additions for the renamed symbols (the list in
Evidence) and adopt them; then run `npm run lint` and `npm run format` only if needed to converge,
then:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

Leave the merge staged and uncommitted.

## Output

Return, as data: the conflicted files and how each was resolved (which side, what was ported);
every adoption applied to main's new code; the Unknowns answer; each gate command with its exit
code and an excerpt for any failure; `git status --short` (expected: staged merge, `MERGE_HEAD`
present); `git diff --cached --stat`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a conflict cannot be resolved without dropping one side's behavior, when main's
change contradicts a landed ruling (for example, reintroducing a state parameter on a published
signature), or when a gate fails for a cause you cannot attribute.

## Acceptance criteria

1. `git merge-base HEAD origin/main` after the Orchestrator's commit will be `c13cfae`; at return,
   `MERGE_HEAD` is `c13cfae` and no conflict marker remains (`rg -n '^(<<<<<<<|=======|>>>>>>>)' src tests guides`
   returns no hit).
2. The renamed-symbol sweep over `src`, `tests`, `guides` for every old name in Evidence returns no
   hit.
3. Main's three commits' tests (`compilers.test.ts`, `helpers.test.ts`, `integration.test.ts`
   additions) run and pass.
4. The gate chain exits 0 on the resolved tree.
5. `package.json` and `package-lock.json` carry no change beyond main's own.
