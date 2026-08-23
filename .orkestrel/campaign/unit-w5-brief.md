# Unit W5 — report a setup surface that has no proof

## Role and engine

`implementer`, Opus 5, clean context.

## Objective

Make `audit` report a target that carries setup helpers and no proof over them, so the fleet can
name which packages lack a setup proof instead of the gap staying invisible.

## Why this unit exists, and what it deliberately does not do

The user asked for the setup gap to close. A design round ruled, on written rules and measurement,
that scaffold must **not** generate a setup proof:
`.claude/rules/workspace.md:137` states that when no file matches `tests/setup*.test.ts` scaffold
emits neither the project nor the script; `.claude/rules/tests.md:59` fixes the proof's subject as
**behaviour**, which `src/core/compilers.ts:1129` already refuses to generate; and every candidate
assertion measured red in scaffold's own checkout. Read
`.orkestrel/campaign/design-v50b-reconciliation.md` for the full ruling before you start.

So the gap is **visibility**, not reachability. `Blueprint.setup` stays. This unit adds one
non-blocking question and nothing else.

## Context you must read first-hand

`AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
`.claude/rules/typescript.md`, and `.claude/rules/writing.md`; and the reconciliation named above.

### The seams, verified

- `#targetQuestions` at `src/bin/CLI.ts:1280` is the merge site. Its siblings are `#projectQuestion`
  at `:1117` and `#dependencyQuestion` at `:1242`. A new private method slots in beside them and its
  result is pushed in the same fixed order.
- `Question.field` at `src/core/types.ts:515` is a plain `string`. **No type change is needed.**
- `TargetQuestion` at `src/bin/types.ts:228` adds `groups: readonly Group[]`. The setup proof lives
  in the `tests` group.
- `HOST_PATHS` at `src/core/constants.ts:138` is the vendored path list and includes
  `tests/setupPolicy.ts`. Every target carries that file and it is non-empty, so a question that
  does not exclude vendored paths fires everywhere and is worthless.
- `Blueprint.setup` is derived at `src/bin/CLI.ts:970` from any file in `tests/` starting with
  `setup` and ending `.test.ts`.
- `ARTIFACT_TEMPLATES.tests.setup` at `src/core/templates.ts` is the **empty string**. A freshly
  materialized workspace carries an empty `tests/setup.ts`, and it must **not** fire this question.

### A binding constraint on the mechanism

`typescript` is a **devDependency** of this package, not a runtime dependency. `src/` must not
import it, or the published CLI breaks on install. You therefore cannot parse a setup module to
count its exports, and you must not add an npm dependency — `AGENTS.md` forbids it without an
explicit request.

Choose a predicate that separates a filled setup module from the empty seed using what is already
available. Settle the exact test yourself against the rules and record what you chose and why. The
binding property is that a fresh workspace is silent and a workspace with real setup helpers and no
proof is reported.

## What the change makes false

Apply this before you finish, because it is where this campaign's briefs have repeatedly failed.
`tests/src/bin/CLI.test.ts` asserts `audit.questions` with `toStrictEqual` at lines 934, 1072, 1106,
1139, and 1261. Every one of those goes false wherever your new question fires in its fixture. Own
them and update them; do not weaken an exact assertion into a loose one to avoid the work.

## Scope

**Owned:** `src/bin/CLI.ts`, `src/core/constants.ts` if the predicate needs a centralized constant
(`.claude/rules/architecture.md` forbids declaring one elsewhere), and `tests/src/bin/CLI.test.ts`.

**Also owned, conditionally:** if you export a new symbol from a barrel, `guides/scaffold.md` gains
its parity table row — and that file is **vendored** (`host.json:604`), so you must then run
`npm run build && npm run build:inventory` or `readHostFloor` refuses to hydrate and the
`src:server` suite goes red. Prefer a private method that exports nothing, which avoids all of this.
Touch no guide prose either way; another unit owns the rewrite.

**Off-limits:** `src/core/templates.ts`, `src/core/compilers.ts`, `src/core/types.ts`,
`src/server/`, this repository's own `tests/distribution.test.ts`, `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts`, `package.json`, and everything
under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it: expected, found, exact evidence, done or
not done, and at most one short hypothesis. A subordinate detail — the method's name, the message's
wording, which describe block a test joins — is yours to settle, record, and carry on from.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `grep -rn "from 'typescript'" src/` returns nothing outside a template string, and
   `package.json` gained no dependency.
5. A target with a non-empty non-vendored `tests/setup*.ts` and no `tests/setup*.test.ts` reports
   exactly one new non-blocking question naming the modules it found. Assert it.
6. A freshly materialized workspace — whose `tests/setup.ts` is the empty seed — reports **no** such
   question. Assert it. This is the criterion that stops the question being noise.
7. A target that already carries a setup proof reports no such question. Assert it.
8. A target carrying only the vendored `tests/setupPolicy.ts` beside an empty seed reports no such
   question. Assert it.
9. The question is non-blocking: it changes no exit code. Assert it.
10. `npm run test:src:bin` exits 0.
11. `npm run build` exits 0, then `npm test` exits 0. Report per-project counts. If `npm test`
    fails, run each link of its `&&` chain separately and report every one, because the chain
    short-circuits and hides every project after the first failure.

## Review evidence

Return the actual `git diff` of `src/bin/CLI.ts` and the actual `git status --short`.

## Output

Return, with no process diary: the diff and status; one line per criterion with its exit code or
evidence; the predicate you chose and why; and anything you could not close, named.
