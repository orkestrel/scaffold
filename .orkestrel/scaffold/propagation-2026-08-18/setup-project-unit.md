# Unit: register the conditional `setup` cross-cutting project

## Role and engine

`implementer` on **GPT-5.6 Sol**. Contract, compiler, template, and validator work — objective and
constraint-heavy.

## Objective

`scaffold overwrite` refuses `/workspace/ollama` because its manifest names a Vitest project the
planned configuration does not register: `setup`. A two-lane adversarial design pass ruled the
project canonical and conditional. Implement that ruling in scaffold so a workspace with a root
`tests/setup*.test.ts` proof plans, generates, and gates the `setup` project — and every workspace
without one is byte-identically unchanged.

The full reconciliation is at `tmp/setup-project-reconciliation.md`. The ruling is settled; do not
reopen the fork.

## The design, fixed

1. **`Blueprint` gains `readonly setup: boolean`** in `src/core/types.ts` (the interface starts at
   line 158; `readonly bin: boolean` at line 170 is the model — mirror its TSDoc voice). The fact is
   structural so that project registration, the `test:setup` script, and gate reachability stay
   atomic: the validator in `src/bin/CLI.ts:716-725` identifies planned projects from the compiled
   plan, so a runtime-only conditional in generated configuration text is insufficient.
2. **Derivation.** Wherever the CLI builds a blueprint from an existing target (audit, repair,
   overwrite), derive `setup` from an exact-case root match of `tests/setup*.test.ts` in the target
   tree. `scaffold new` sets it `false` — a new workspace has no setup proof yet. Find the actual
   derivation sites; they are an unknown below.
3. **Generation.** When `setup` is true, the generated root `vite.config.ts` registers a `setup`
   project whose include is `['tests/setup*.test.ts']`, Node environment, browser disabled,
   `./tests/setup.ts` in setupFiles — match the shape of the existing cross-cutting project
   factories in `src/core/templates.ts`. The generated manifest gains
   `"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"`
   and the `test` chain invokes it with the other non-isolated cross-cutting proofs. When `setup` is
   false, emit none of this, byte-identically to today.
4. **Ecosystem parity.** Every mechanism that constructs, parses, guards, infers, or compares a
   `Blueprint` handles the field: factories, parsers, validators, inferers, compilers, and the JSON
   surfaces of the CLI. Follow the `bin` field through the codebase and give `setup` the same
   treatment at every site. TTTDD: change `types.ts` first, typecheck, then implement.
5. **Rules.** Land the following texts. Wording is fixed by the reconciliation; adjust only
   placement and surrounding list punctuation.

   In `.claude/rules/tests.md`, replace the mirror-rule line
   "Resolve a `setup*` module test against its sibling `setup*.ts` module inside `tests/`." with:

   ```md
   - Resolve each root `tests/setup*.test.ts` proof against its sibling `tests/setup*.ts` module. A
     root `tests/setup.test.ts` file can prove several setup modules when their helpers serve
     several projects.
   ```

   In `.claude/rules/tests.md` § Cross-cutting proofs, add the table row:

   ```md
   | `tests/setup*.test.ts`       | Reusable behavior exported from sibling `tests/setup*.ts` modules works as the workspace's suites require                      |
   ```

   and after that table:

   ```md
   - Put each root `tests/setup*.test.ts` proof in the `setup` project. Keep its assertions on
     exported test-infrastructure behavior: do not duplicate production behavior there, and do not
     move setup-helper assertions into another cross-cutting proof.
   ```

   In `.claude/rules/workspace.md`, add to the cross-cutting project matrix:

   ```md
   | `setup`        | `tests/setup*.test.ts`       | Reusable behavior exported from the root test setup modules works as the consuming suites require | `test`                                |
   ```

   and after that matrix:

   ```md
   - Define the `setup` project only when a root file matches `tests/setup*.test.ts`, exact-case.
     Include every matching file. When registered, emit `test:setup` and run it from `test`. When no
     file matches, emit neither the project nor the script.
   ```

   Add `test:setup` to the cross-cutting script list sentence in `workspace.md` ("Each cross-cutting
   project has its own script too: …").
6. **Guides.** `Blueprint` is public API; update its documentation wherever the guides document it,
   and keep `tests/guides.test.ts` parity green.

## Standing conditions — known, do not report as deviations

- The tree is clean at `da01121` apart from ignored `tmp/`.
- Your sandbox denies loopback `listen` and some `spawnSync` (`git`, `oxlint` observed). Expect
  sandbox EPERM in `src:server`, `src:bin`, and `config` project runs; report those as
  sandbox-blocked, never as failures. The Orchestrator re-runs them unsandboxed.
- This repository formats with `oxfmt`; check owned files with
  `npx oxfmt --config .oxfmtrc.json --check <files>`.
- Do not run `npm run build`; the Orchestrator rebuilds and probes the real ollama overwrite after
  acceptance.

## Pins that must not move — verify, and stop if one must

- `tests/src/core/compilers.test.ts` digest (generated source-workspace manifest byte-stability):
  a `setup: false` blueprint's manifest must be byte-identical to today's, so the digest holds. If
  it moves, your conditional leaks into the default path — that is a defect, not a pin update.
- `tests/src/core/compilers.test.ts:449` region (this repository's `vite.config.ts` byte-identity
  with its generated form): scaffold has no `tests/setup*.test.ts`, so its generated config must not
  change. Do not edit `vite.config.ts`.
- `tests/src/core/Compiler.test.ts` artifact counts (47 total, 32 host-origin): no `HOST_PATHS` row
  changes in this unit.

## Scope

**Owned files:** `src/core/types.ts`, `src/core/templates.ts`, `src/core/compilers.ts`,
`src/core/constants.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/parsers.ts`,
`src/core/validators.ts`, `src/core/inferers.ts` (whichever of these the `bin`-parity sweep
actually reaches), `src/bin/CLI.ts`, `src/server/helpers.ts` if target inspection lives there,
`guides/*.md` for `Blueprint` parity, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, and
`tests/src/**` for proofs.

**Off-limits:** `vite.config.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`, `configs/**`, `AGENTS.md`, every other `.claude/**` and `.agents/**` file,
`dist/**`.

**Permissions.** Do not commit, push, install, publish, or run `npm run build`.

## Execution

Perform this assignment directly. Spawn nothing.

## Governing law

`AGENTS.md` (TTTDD, types first), `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/names.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
`.claude/rules/documentation.md`. Rule edits follow `AGENTS.md` § Instruction files.

## Unknowns

- Where blueprint derivation from an existing target actually happens for each verb, and whether
  one shared site serves audit, repair, and overwrite. Find it, name it in your report, and put the
  detection there so all three verbs agree.
- Whether the project validator's planned-project set is computed from the blueprint or re-parsed
  from generated text. Name which, and show the `setup` row flows into it.
- Whether any existing test enumerates the cross-cutting project set or script set exhaustively and
  therefore needs the new member added. Find them by running the suites, not by grep alone.

## Acceptance criteria

1. A new proof: a blueprint with `setup: true` generates a root config registering the `setup`
   project and a manifest whose `test:setup` exists and whose `test` chain invokes it; with
   `setup: false`, both are absent and the generated bytes equal today's (pin the equality against
   a fixture captured before your change). Record the proof red-then-green: the red is the
   `setup: true` expectation failing before the generator change.
2. A pinning test: a manifest naming `setup` with no matching root file is still refused by the
   validator, with the message at `src/bin/CLI.ts:724`.
3. `npm run check` exits 0.
4. `npx vitest run --project src:core` passes with counts recorded before and after.
5. `npx vitest run --project policy` and `--project guides` pass.
6. `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0 (report sandbox EPERM separately
   if the binary spawn is blocked; then lint only your owned files).
7. `npx oxfmt --config .oxfmtrc.json --check <owned files>` exits 0.
8. The three pins above did not move.

## Output

The derivation and validator sites you found; the final `Blueprint` diff; the red/green record for
criterion 1; test counts before and after per project; each acceptance command's exit status with
sandbox-blocked results labelled; and the exact rule text as landed. No process diary.

## Deviation contract

Stop and report if a pin must move, if the validator cannot see the blueprint fact, if the `bin`
parity sweep reaches a file not in the owned list, or if the fixed rule text collides with
surrounding text in a way placement cannot resolve. Report expected, found, exact evidence, done or
not done, at most one hypothesis. Ancillary choices — where a directive sits in a list, fixture
naming, project factory ordering — are yours; decide and record.
