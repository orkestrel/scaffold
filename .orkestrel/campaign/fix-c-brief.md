# FIX-C — the setup question fires wrongly and advises wrongly

## Role and engine

`implementer`, Opus 5, clean context.

## Objective

Close four defects an adversarial audit found in the `setup` audit question, all in
`src/bin/CLI.ts#setupQuestion`. This question is the whole of what this release does about the setup
gap, and it ships to every maintainer in the fleet.

Read `.orkestrel/campaign/audit-v50-final-reconciliation.md` first.

## Defect 1 — it fires on a workspace scaffold just created

The filter treats any non-empty setup module as one a maintainer wrote into. That rests on a false
premise, stated in the comment at `src/bin/CLI.ts:1284-1290`: "Every `tests/setup*.ts` module
scaffold writes is seeded with the empty string."

`ARTIFACT_TEMPLATES.tests.setup` is the empty string. **`ARTIFACT_TEMPLATES.tests.global` is not** —
`src/core/templates.ts:1088` is `export function setup(): void {}`, and the materialized
`tests/setupGlobal.ts` is 33 bytes. So a blueprint with `global: true` fires the question on a
freshly materialized workspace, with nothing for the maintainer to have done wrong. An objective
lane measured this on a generated workspace and confirmed it live on `mcp`.

The premise is false, the comment stating it is false, and both must go.

## Defect 2 — the remedy names a proof that does not pair with the modules it lists

Measured on this repository:

> "carries test setup modules that no proof covers: **tests/setup.ts, tests/setupServer.ts**. Add
> **tests/setup.test.ts** asserting the behavior they export."

The vendored pairing law disagrees. `testToPolicyStem` at `tests/setupPolicy.ts:758` maps
`tests/setupServer.test.ts` to the stem `setupServer`, and `stemToPolicyCandidates` at `:771` maps
that stem to `tests/setupServer.ts`. So `tests/setup.test.ts` pairs with `tests/setup.ts` and
nothing else; `tests/setupServer.ts` wants `tests/setupServer.test.ts`.

The message hard-codes one filename however many modules it lists. Derive the remedy per module from
the same list the message already interpolates.

## Defect 3 — it goes permanently silent on the first proof written

`if (blueprint.setup) return undefined` short-circuits on the presence of **any**
`tests/setup*.test.ts`. A maintainer who follows the advice writes one proof, the question
disappears, and every other setup module stays uncovered forever with no further signal.

Key the silence on **per-module** coverage rather than on the blueprint flag, so the question names
what is still uncovered and disappears only when nothing is.

## Defect 4 — the guide repeats the false premise

`guides/scaffold.md` states "every setup module scaffold seeds is empty". **You do not fix this** —
`guides/` belongs to FIX-E. Say in your report exactly what the guide must now say, so that unit can
own it.

## The constraint that still binds

`typescript` is a **devDependency** of this package. `src/` must not import it, and no npm
dependency may be added. Whatever predicate replaces the emptiness test reads what is already
available.

## Unknowns

Whether any other `ARTIFACT_TEMPLATES.tests.*` entry a workspace can receive is seeded non-empty.
Enumerate every artifact `blueprintToTestArtifacts` emits, report each one's seeded content, and say
which are non-empty. A predicate that special-cases one path by name is wrong if a second path has
the same shape.

## Scope

**Owned:** `src/bin/CLI.ts`, `src/core/constants.ts` if the predicate needs a centralized constant
(`.claude/rules/architecture.md` forbids declaring one elsewhere), and `tests/src/bin/CLI.test.ts`.

**Off-limits:** `guides/` — FIX-E owns it. `src/core/templates.ts`, `src/core/compilers.ts`,
`src/server/`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`tests/distribution.test.ts`, `host.json`, `vite.config.ts`, `package.json`, everything under
`.orkestrel/`.

If you add a barrel export, `guides/scaffold.md` gains a parity row and that file is **vendored** —
prefer a private method that exports nothing and avoid the whole question.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it. Predicate shape, message wording, and
test placement are yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `grep -rn "from 'typescript'" src/` returns nothing outside a template string, and `package.json`
   gained no dependency.
5. **Executed.** Materialize a `global: true` workspace outside this repository and show `audit`
   reports **no** setup question against it. This is defect 1 and it must be shown, not asserted.
6. **Executed.** A workspace carrying a filled `tests/setup.ts` and a filled `tests/setupServer.ts`
   with no proof reports a question naming **both** modules and naming
   `tests/setup.test.ts` and `tests/setupServer.test.ts` as the remedy.
7. **Executed.** The same workspace after writing `tests/setup.test.ts` alone still reports a
   question, naming `tests/setupServer.ts` and no longer naming `tests/setup.ts`. This is defect 3.
8. **Executed.** A workspace where every filled setup module has its paired proof reports no
   question at all.
9. The question stays non-blocking and `audit` still exits 0 because of it; a writing verb is still
   never refused over it.
10. `npm run test:src:bin` exits 0.
11. `npm run build` exits 0, then `npm test` exits 0. If `npm test` fails, run each link of its `&&`
    chain separately and report every one.

## Review evidence

Return the actual `git diff` of `src/bin/CLI.ts` and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the criterion 5 through 8 transcripts; the unknown answered with the full enumeration; the
exact sentence the guide must now carry, for FIX-E; and anything you could not close, named.
