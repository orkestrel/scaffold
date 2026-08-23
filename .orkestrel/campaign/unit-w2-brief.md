# Unit W2 — delete `Blueprint.distribution` and generate the proof

## Role and engine

`implementer`, Opus 5. This unit's work class is constraint-heavy and its default engine is
GPT-5.6 Sol; that bench was dark for this campaign and `.orkestrel/campaign/routing-v50b.md`
records the probe, the recovery attempt, and the substitution.

## Objective

Make `@orkestrel/scaffold` generate `tests/distribution.test.ts` into every publishing workspace
that lacks one, as a presence-owned template-origin artifact, and delete `Blueprint.distribution`
as the derived duplicate that made the emission unreachable.

## Context you must read first-hand before editing

`AGENTS.md`; `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `.claude/rules/architecture.md`,
`.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/patterns.md`, and
`.claude/rules/writing.md`; and these campaign artifacts, which are the design you implement rather
than reopen:

- `.orkestrel/campaign/distribution-design-reconciliation.md` — the settled core design.
- `.orkestrel/campaign/design-v50b-reconciliation.md` — the settled browser-stage design and the
  three corrections it carries.
- `.orkestrel/campaign/browser-stage-evidence.md` — the browser stage, rehearsed end to end.
- `.orkestrel/campaign/design-v50b-brief-successor.md` — why selection reads export targets.

No skill applies to this unit.

### A working reference implementation, already proven

`.orkestrel/campaign/rehearsal/drive.mjs` is a committed instrument that **already performs the
browser stage correctly against a real published package**: it resolves the browser through the
same ladder `configs/browsers.ts` implements, reads declaration value exports through the
TypeScript checker over module symbols with aliases resolved, serves a built bundle on a loopback
port, drives it in Chromium, and compares the two name sets. It passed first time.
`.orkestrel/campaign/rehearsal/stage.sh` performs the install and the Vite bundle.

Read both and lift their mechanics. They are read-only reference; do not edit them.

### The exact seams

- `src/core/types.ts:189` declares `readonly distribution: boolean` on `Blueprint`, and the
  `@remarks` block at `:158` names `distribution` in its list of structural facts.
- `src/core/compilers.ts:298` computes `const distributes = blueprint.distribution && publishes`,
  where `publishes` is `blueprint.src.length > 0` at `:295`. A second `distributes` exists at
  `:632`.
- `src/core/compilers.ts:377` gates the `test:distribution` script, `:427` gates the
  `prepublishOnly` row, and `:804` gates the Vitest `distribution` project.
- `src/core/compilers.ts:1999` raises a non-blocking question when `distribution` is set with no
  `src`. That state becomes unrepresentable, so the question goes with the field.
- `src/bin/CLI.ts:981` derives the field from the file's presence. That derivation is the
  self-fulfilling loop and it is deleted.
- `src/core/constants.ts:241` declares `DISTRIBUTION_TEST_PATH`. It stays and is now the path the
  artifact is planned at.
- `src/core/compilers.ts:1153` is `blueprintToTestArtifacts`, where the artifact is emitted.
- `ContentArtifact` in `src/core/types.ts:369` inherits `ownership: Ownership` unnarrowed, so
  `origin: 'template'` with `ownership: 'presence'` is already representable. No contract change is
  needed for the ownership itself.

## What to build

**1. Delete the field.** Remove `Blueprint.distribution`, its `@remarks` mention, its derivation in
`#derive`, and the question at `compilers.ts:1999`. Replace every `distributes` with the existing
`publishes` predicate. A published workspace distributes; a workspace with no `src` does not.

**2. Plan the artifact.** In `blueprintToTestArtifacts`, when the workspace publishes, emit
`DISTRIBUTION_TEST_PATH` with `group: 'tests'`, `ownership: 'presence'`, `origin: 'template'`, and
the generated content. Presence is what makes `audit` report a target lacking the proof as drift
while never touching a target that replaced it — the bespoke proofs in `brief`, `mcp`, `probe`,
`process`, and `scaffold` must survive byte-identical.

**3. Write the generated proof** as a new `ARTIFACT_TEMPLATES` entry in `src/core/templates.ts`.
Every assertion derives at runtime from the installed artifact. Emit no package name, no export
name, and no tally. It asserts:

- The workspace packs with `npm pack --ignore-scripts` and produces one tarball, which installs
  into an isolated consumer. Under `--mode release` any install failure is fatal.
- Every relative file target the installed `exports` map names exists inside the installed package.
- Package resolution rejects an absent subpath.
- For each subpath, the declaration value exports read through the TypeScript **checker over module
  symbols**, aliases resolved, type-only symbols dropped — never a declaration-text walk.
- For each Node entry, the runtime key set equals that name set, both directions, by name and never
  by count. Drive the `import` condition; drive the `require` condition only where the subpath
  declares one.
- For each **browser** entry, the same comparison, through a real browser. Build a consumer of the
  installed package with the Vite Node build API, serve it on a loopback port, launch through
  `resolveBrowser` imported from the workspace's own `../configs/browsers.js`, evaluate, compare.
- A consumer compiles under `node16`, `nodenext`, and `bundler`, with the absent subpath as a
  firing control that must fail.

**4. Three corrections the design carries, each measured.** Getting any of them wrong ships a proof
that reports success without proving anything:

- **Selection reads export targets, never subpath names.** A subpath is a browser entry when its
  target lies under the built browser output directory. `@orkestrel/indexeddb` publishes its browser
  face at the **root** subpath `.`, so a name-driven rule drives a browser bundle through Node and
  the miss is silent.
- **The declaration locator walks conditions recursively for the first `types` key.**
  `@orkestrel/indexeddb`'s root entry is flat rather than condition-nested, so a fixed
  `entry.import.types` read returns a JavaScript file there.
- **`resolveBrowser` returns `PlaywrightProviderOptions`, not a path, and never reports absence** —
  its last resort is an unverified channel. Attempt the launch and classify the rejection; never
  probe first and decide. Map `launchOptions.executablePath`, `launchOptions.channel`,
  `connectOptions.wsEndpoint`, and the empty case.

**5. Failure semantics.** The proof reads `import.meta.env.MODE`. Under `release` an unreachable
registry and an unlaunchable browser both **fail**. Outside release mode each skips, citing the
exact mechanism. W1 landed the guard that keeps `--mode release` reaching this value.

## Unknowns

- Whether the generated proof's own wall-clock fits the `distribution` project's 120-second test and
  hook timeouts once a browser branch is added. Measure it and report the reading; if it does not
  fit, report that rather than raising the timeout, and name the number you measured.
- Whether `@orkestrel/test` needs a branch. The census says `test` alone cannot import it. Report
  what your design does there.

## Scope

**Owned:** `src/core/types.ts`, `src/core/compilers.ts`, `src/core/templates.ts`,
`src/core/constants.ts`, `src/bin/CLI.ts`, and the focused tests under `tests/src/core/` and
`tests/src/bin/` that assert the behaviour you change.

**Off-limits:** `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, and
`host.json` — all vendored, and another unit owns them. `vite.config.ts`. `package.json`. Everything
under `.orkestrel/`, `configs/`, and `guides/`. `tests/distribution.test.ts` in **this** repository:
scaffold's own bespoke proof is exactly what presence ownership must leave untouched, and editing it
would destroy the evidence that it does.

Allowed tools: Read, Grep, Glob, Edit, Write, Bash. Do not commit, push, install a dependency, or
run any `git` command that discards a working-tree change. You are the sole serial writer.

## Execution

Perform this assignment directly and spawn nothing.

## Deviation contract

A conflict with the objective stops you and you report it: expected, found, exact evidence, done or
not done, and at most one short hypothesis. Do not investigate beyond that or alter the plan. Where
a subordinate detail is yours — a helper's name, which describe block an assertion joins, how a
failure message is worded — settle it, record it, and carry on.

If a criterion cannot be closed with the owned files, stop and say so rather than widening scope.

## Acceptance criteria

Ordered so a cheap gate cannot be skipped by an expensive one failing first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `Blueprint` declares no `distribution` member, and `grep -rn "blueprint.distribution" src/`
   returns nothing.
5. `npm run test:src:core` and `npm run test:src:bin` exit 0.
6. A compiled plan for a blueprint with `src: ['core']` contains an artifact at
   `tests/distribution.test.ts` with `ownership: 'presence'` and `origin: 'template'`; a plan for a
   blueprint with no `src` contains none. Assert both in the focused tests.
7. The generated proof's text contains the target-prefix selection rule and contains no rule keyed
   on a subpath name.
8. **Executed, not asserted.** Materialize a workspace from a browser-face blueprint into a scratch
   directory outside the repository, and run the generated proof's browser branch against a real
   installed browser-face package to a pass. Scaffold declares `playwright`, so this is executable
   here. Report the command and its output. If the branch cannot be executed in this container,
   report exactly what blocked it rather than reporting the generated text as evidence.
9. `npm run build` exits 0.
10. `npm test` exits 0. Report per-project counts. Treat a timing failure as an observation with
    both readings rather than a criterion; the Orchestrator takes the authoritative run after you
    exit.

## Review evidence

Return the actual `git diff --stat` and the actual `git status --short`. For the generated proof,
return its full text as a file you wrote, not as a description.

## Output

Return, with no process diary:

1. `git diff --stat` and `git status --short`.
2. One line per acceptance criterion with its exit code or its evidence.
3. The criterion 8 execution transcript.
4. The two unknowns, answered with measurements.
5. Anything you could not close, named.
