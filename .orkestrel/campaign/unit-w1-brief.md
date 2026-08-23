# Unit W1 — guard the release-mode config shape

## Role and engine

`implementer`, Opus 5. The Codex bench is dark for this campaign; `.orkestrel/campaign/routing-v50b.md`
records the probe and the substitution. This unit's default engine is unchanged by that.

## Objective

Assert, in the vendored root-configuration proof, that every entry of the root `projects` array is a
**function**, so that a refactor to inline object entries cannot silently convert the publish gate
into a skip.

## Context

Read first-hand before editing: `AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
`.claude/rules/typescript.md`, `.claude/rules/writing.md`, and
`.orkestrel/campaign/release-mode-evidence.md`. No skill applies to this unit.

The defect, measured and recorded in `release-mode-evidence.md`: held constant at a `.ts`
configuration using `defineConfig` from `vitest/config` with `--mode release` on the command line, a
function `projects` entry makes `import.meta.env.MODE` read `release` while an inline object entry
makes it read `test`. `vite.config.ts:238` emits bare function references, which is why
`prepublishOnly`'s `npm run test:distribution -- --mode release` currently reaches the proof's
`import.meta.env.MODE === 'release'` branch. Nothing asserts that shape.

`tests/config.test.ts` already carries the idiom this assertion needs. At roughly line 162 it reads
`configuration.test?.projects`, then builds `controlled = projects.concat(control, concrete)` where
`control` is a named function entry and `concrete` is an **inline object** entry. Reuse that
existing `concrete` shape as the firing control rather than inventing a new one, and do not disturb
the assertion those values already serve.

Host environment: Linux, Node v22.22.2, `npm` available, network reachable. The working tree is
clean at HEAD and you are the only writer.

## Unknowns

None material. If the existing `control`/`concrete` values turn out to be scoped inside a single
test body such that reusing them would entangle two assertions, construct a local inline-object
value for your own control instead and record that choice in your report.

## Scope

**Owned:** `tests/config.test.ts`, and `host.json` only through regenerating its digests with the
project's own scripts.

**Off-limits:** every file under `src/`, `configs/`, and `guides/`; `vite.config.ts`;
`package.json`; every other file under `tests/`; everything under `.orkestrel/`.

`tests/config.test.ts` is vendored — `host.json:634` stores it and `dist/host/tests` ships it — so
editing it is a deliberate vendored-byte change that this release has accepted. After your edit you
must regenerate the vendored copy and the inventory, in this order, because the digests are computed
from the staged bytes:

```text
npm run build && npm run build:host && npm run build:inventory
```

Allowed tools: Read, Grep, Glob, Edit, Write, Bash. Do not commit, push, install a dependency, or
run any `git` command that discards a working-tree change.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it: expected, found, exact evidence, done or
not done, and at most one short hypothesis. Do not investigate beyond that or alter the plan. Where
a subordinate detail is yours to settle — which describe block the assertion joins, how the failure
message is worded — settle it, record it, and carry on.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npm run test:config` exits 0, and its output names your new assertion.
5. The new assertion carries a firing control proving the predicate can reject: an inline object
   entry is rejected by the same predicate that accepts every real entry. Record the control's
   evidence by making the assertion fail on purpose once — run `npm run test:config`, capture the
   red output naming the rejected control, restore it, and run the same command green. Report both
   readings verbatim. Do this by editing only your own new assertion; never by editing
   `vite.config.ts`.
6. `npm run build && npm run build:host && npm run build:inventory` all exit 0, and `git status`
   shows `host.json` and `dist/host/tests/config.test.ts` changed.
7. `npm run test:policy` exits 0, because the vendored pair is proved together.

## Review evidence

Return the actual `git diff` of `tests/config.test.ts` and the actual `git status --short`. A
description of the change is not the change.

## Output

Return, with no process diary:

1. The exact assertion you added, as a diff.
2. The red reading and the green reading from criterion 5, verbatim.
3. One line per acceptance criterion with its exit code.
4. Anything you could not close, named.
