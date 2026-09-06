# Audit brief — U6 scaffold-seeds (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: guide voice, proposal argument, roadmap wording, the shape of the lint restriction and the seed comment), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness of every dependency reader and fixture, what the lint configuration and the manifest permit, false greens), and `checker` (Sonnet: mechanical conformance, the acceptance criteria as stated, scope honesty, parity). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U6 made scaffold's seeds, constants, manifest, lint configuration, guide, roadmap, and proposal state what the campaign shipped. Its brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u6-scaffold-seeds-brief.md`; its report: `u6-scaffold-seeds-report.md`; the design: `plan.md`; the dependency and rollup measurements: `orchestrator-measurements.md`. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/workspace.md` (§ Policy instruments, § Configuration authority), `.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/tests.md` § Expensive proofs, `.agents/orchestration.md` § Publishing the fleet (a vendored byte change bumps scaffold).

## Review evidence

The actual diff and status of the scaffold checkout: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u6-scaffold-seeds.diff.txt` and `u6-scaffold-seeds.status.txt`. Read the diff in full; read the changed files at their new state where the diff is not enough. The lockfile and `host.json` changes are the Orchestrator's tracked install and build, recorded in `u6-install.log.txt`, and are outside the unit's claims.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `DECLARATION_DEV_DEPENDENCIES` in `src/core/constants.ts` keeps `@microsoft/api-extractor` and no longer names `vite-plugin-dts`; `package.json` no longer declares it; every reader and fixture derived from the constant — `src/core/compilers.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/constants.test.ts`, `tests/src/core/fixtures/source-manifest.txt`, `tests/src/core/fixtures/setup-false-manifest.txt`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/main.test.ts` — is updated so no expectation, packument fixture, or planned-dependency list names the package, and a blueprint with published source still plans `@microsoft/api-extractor`.
2. `.oxlintrc.json` adds the `typescript` specifier to the restricted imports of every population block that carries a `no-restricted-imports` block, with a message naming the reason, in the same `patterns` shape the blocks already use; no other rule changed; and, because the file is vendored, the report names the bump obligation this creates for scaffold.
3. `guides/scaffold.md` states, in its declaration passages, that the rollup runs `tsc` as a process and api-extractor's own engine, one file per face, with the specifier rewrite the server and browser faces apply; in its distribution-proof passages, the proof's two-direction type-system shape; in its policy passages, that the syntax-shaped rules live in the oxlint plugin; every table row whose symbol changed is updated and no row names a removed symbol; the guide's prose obeys `.claude/rules/writing.md` and states no count.
4. `PROPOSAL.md` names the parser Vite re-exports as the control path at every site that named the compiler API, the sentences the brief lists (lines 251, 355, 409 to 410, 636, 724 to 727) and any other `grep -n 'ts\.\|compiler API' PROPOSAL.md` reveals, and the proposal's argument is intact rather than hollowed.
5. `ROADMAP.md` rewrites the campaign's 2026-09-05 row to what remains, names `vite-plugin-dts` as live nowhere, adds the rows the brief lists (the rollup's `succeeded` reading and `logLevel: none`, the policy readers' names, the TSDoc first sentences in `configs/policy.ts` and `tests/setupPolicy.ts`, the drive-harness consolidation), rules the `@packageDocumentation` row on a reading of `dist/src/core/index.d.ts` the report states, and states no count.
6. The `config` project's budget in the root `vite.config.ts` seed (`src/core/templates.ts`) and in scaffold's own `vite.config.ts` is sized from a contended run the report states and its rationale names the two-face real Vite build with the `tsc` and extractor spawns rather than the linter's child caps alone; the seed and scaffold's file agree.
7. `MINIMUM_NODE_VERSION` and every `engines` range are unchanged; no file outside the brief's owned set changed (`package-lock.json`, `host.json`, `configs/**`, `tests/setupPolicy.ts`, and every region of `src/core/templates.ts` other than the root config seed's rationale and budget are untouched in the diff); the report's claims match the diff.
8. No `any`, assertion, suppression, or nested function beyond the permitted shapes was added; every changed prose line obeys the substitution table and states no count.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
