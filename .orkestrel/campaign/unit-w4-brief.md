# Unit W4 — write the manifest script region

## Role and engine

`implementer`, Opus 5, clean context. This unit's work class is constraint-heavy and its default
engine is GPT-5.6 Sol; that bench has been dark for this campaign and
`.orkestrel/campaign/routing-v50b.md` records the substitution.

## Objective

Make `repair` and `overwrite` write the manifest's script region when the target's chain is the
recognized scaffold-generated shape, and refuse **without mutation** when it is not, so a target
receiving the generated distribution proof does not also need a hand edit to `package.json`.

## Why this unit exists

`.orkestrel/campaign/distribution-design-reconciliation.md` ruled that generating only the proof
file leaves every target hand-editing `prepublishOnly` — "which is exactly where `--mode release`
gets dropped". A proof that runs without release mode passes on an unreachable registry instead of
failing, so the gate reports success without proving the artifact installs. The manifest write is
what stops that.

## Context you must read first-hand

`AGENTS.md`; `.claude/rules/patterns.md`, `.claude/rules/architecture.md`,
`.claude/rules/typescript.md`, `.claude/rules/names.md`, and `.claude/rules/tests.md`; and
`.orkestrel/campaign/distribution-design-reconciliation.md` and
`.orkestrel/campaign/design-v50b-reconciliation.md`, which are the settled design.

### The seams

- `replaceManifestRanges(manifest: string, pins: DependencyPinSet): string | undefined` at
  `src/core/compilers.ts:1512` is the existing in-place region writer and the convention to follow:
  it returns the rewritten text, or `undefined` when it cannot recognize the shape.
- `DependencyPinSet` is at `src/core/types.ts:128`.
- `Materializer.declare(runtime, development, target)` at `src/server/Materializer.ts:409` calls
  `#redeclare` at `:1157`, which wraps `replaceManifestRanges`.
- `MaterializerInterface.declare` is declared at `src/server/types.ts:250`.
- Four call sites in `src/bin/CLI.ts`, at `:353`, `:413`, `:518`, and `:566`, each passing
  `pins.runtime, pins.development, target`.
- `package.json` is planned at `ownership: 'birth'` — `src/core/Compiler.ts:284`. Audit never
  compares a birth-owned path, so a missing script produces **no drift finding**. The write and the
  refusal therefore report through the non-blocking question channel, never through drift.
- That channel already exists: the `projects` advisory at `src/bin/CLI.ts:1215` fires when the
  manifest reaches no chain invoking a registered Vitest project, distinguishes a missing script
  from a missing gate, and prints the exact line to paste.

## What to build

**1. `replaceManifestScripts`** in `src/core/compilers.ts`, a sibling of `replaceManifestRanges`
with the same `string | undefined` convention. It replaces script values in place so every byte
outside the named ranges survives, and it returns `undefined` — writing nothing — when any named
script holds an unrecognized value.

**2. The recognized predecessor.** For each script the write touches, accept it when it is absent,
when it already equals the value the current compiler produces, or when it equals the value the
pre-change compiler produced for the same blueprint — that is, the chain without
`test:distribution` and without the `npm run test:distribution -- --mode release` row in
`prepublishOnly`. Anything else is a customized chain: refuse the whole write, mutate nothing, and
leave the existing advisory to tell the maintainer what to paste.

**3. Group the region arguments.** `declare` takes two positional dependency lists and this adds a
third region. `.claude/rules/patterns.md` § Options groups them under the entity noun rather than
growing the positional list, so declare `ManifestRegions` carrying the pin set and the script set,
and revise `declare(regions, target)`. Update all four call sites. This is the one shape decision
the design round adopted from the subjective lane, and it is not open.

## Unknowns

- Whether the pre-change `prepublishOnly` value is reconstructible from the current
  `blueprintToScripts` output alone, or whether the predecessor form must be derived another way.
  Settle it by reading the function and say which you did.
- Whether any focused test pins the current `declare` arity such that regrouping breaks it beyond a
  mechanical update. Report what you found.

## Scope

**Owned:** `src/core/compilers.ts`, `src/core/types.ts`, `src/server/types.ts`,
`src/server/Materializer.ts`, `src/bin/CLI.ts`, and the focused tests under `tests/src/core/`,
`tests/src/server/`, and `tests/src/bin/` that pin what you change.

**Off-limits:** `guides/` — a later unit owns it. `src/core/templates.ts` — the generated proof is
settled and this unit does not touch it. This repository's own `tests/distribution.test.ts`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `host.json`,
`vite.config.ts`, this repository's own `package.json`, and everything under `.orkestrel/`.

Do not commit, push, install a dependency, or run any `git` command that discards a working-tree
change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it: expected, found, exact evidence, done or
not done, and at most one short hypothesis. A subordinate detail — a helper's name, where a test
sits — is yours to settle, record, and carry on from. If a criterion cannot be closed with the
owned files, stop and say so rather than widening scope.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. A manifest whose named scripts all match a recognized predecessor is rewritten to include
   `test:distribution` and the `npm run test:distribution -- --mode release` row, with **every byte
   outside the replaced ranges identical**. Assert the byte-identity, not just the result.
5. A manifest with any named script holding an unrecognized value returns `undefined`, and the file
   on disk is unchanged. Assert both.
6. The refusal path still produces the existing non-blocking advisory naming what to paste.
7. `declare` takes the grouped regions and all four call sites pass them.
8. `npm run test:src:core`, `npm run test:src:server`, and `npm run test:src:bin` exit 0.
9. **Executed, not asserted.** Materialize a workspace outside this repository with a
   scaffold-generated manifest that predates the proof, run `repair` or `overwrite` against it, and
   show the manifest gaining both rows. Then customize one named script, re-run, and show the file
   unchanged and the advisory raised. Paste both manifests' relevant regions before and after.
10. `npm run build` exits 0, then `npm test` exits 0. Report per-project counts.

## Review evidence

Return the actual `git diff --stat` and `git status --short`.

## Output

Return, with no process diary: the diffstat and status; one line per criterion with its exit code or
evidence; the criterion 9 transcript with both manifests; the two unknowns answered; and anything
you could not close, named.
