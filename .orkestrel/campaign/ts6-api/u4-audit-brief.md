# Audit brief — U4 proof-template (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, proof voice, template vocabulary), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the compiler and the runtime permit, false greens, portability), and `checker` (Sonnet: mechanical conformance, the acceptance criteria as stated, scope honesty). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U4 moved the generated distribution proof off the in-process compiler: the declared-value walk becomes a type-system proof checked by the workspace's `tsc` process over a throwaway consumer (the template carries no fence, so the fence rule's only site was scaffold's own bespoke proof, whose one `transpileModule` call now transforms through Vite's `transformWithOxc`). The unit's first dispatch died on a session limit after a partial edit; the second finished it (the brief's § Standing condition). The unit's brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u4-proof-template-brief.md`; its report: `u4-proof-template-report.md`; the design: `plan.md` § Decision 2 and § Re-baseline; the measurements: `m15-report.md` (the two-direction shape and its diagnostics), `m3m4-report.md` § Table and § Differences, `orchestrator-measurements.md` § Vite's re-exported parser and transformer. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`, `.claude/rules/portability.md` § Processes and § Paths, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.

## Review evidence

The actual diff and status of the scaffold checkout: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u4-proof-template.diff.txt` and `u4-proof-template.status.txt`. Read the diff in full; read `src/core/templates.ts` (the proof block) and `tests/distribution.test.ts` at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. Neither the proof template in `src/core/templates.ts` nor the regenerated `tests/distribution.test.ts` names a `typescript` specifier, value or type, and `typescriptCompilerFolder`, `createProgram`, `getTypeChecker`, `SymbolFlags`, and `transpileModule` appear in neither.
2. For each installed entry and each resolution driver the proof reads the runtime keys through a real import, writes a consumer module carrying `import * as entry`, the literal key record, and both assignments (`Record<keyof typeof entry, true> = published` and `Record<keyof typeof published, true> = declared`), writes a scratch `tsconfig.json` fixing `module`, `moduleResolution`, `target`, `strict`, `noEmit`, `types: []`, `skipLibCheck`, and `files`, and runs the workspace's `typescript/bin/tsc` through `process.execPath` with `--noEmit --pretty false -p <scratch>`; the diagnostics decide, never the exit code alone; an unlocated line or one naming the scratch project is an instrument fault.
3. The report quotes two planted controls verbatim: an extra runtime key and an undeclared name each redden with the member named in a TS2741, made in a scratch copy and removed, never in `src/`.
4. Every former `transpileModule` fence transforms through `transformWithOxc(code, name, { target: 'esnext' })` from `vite`, and nothing is evaluated from a string; a `vm` site, if one existed, became a scratch `.mjs` imported by `pathToFileURL`.
5. The absent-subpath control, the runtime drivers, the exports-map walk, the `.d.cts` and `.d.mts` resolution helpers, and the release mode are unchanged in behaviour.
6. Scaffold's own `tests/distribution.test.ts` is a bespoke presence-owned proof, not template output (the unit's deviation, which the Orchestrator accepts: `src/core/compilers.ts:1302` claims the path by presence and `inventory-distillate.md` had separated the copies); the unit therefore left it in place and moved only its `transpileModule` fence to `transformWithOxc`, and nothing else in that file changed. The template's regeneration is proved instead on a materialized workspace: `repair --offline --groups tests` writes the removed proof back byte-identical to `fillTemplate` over the blueprint, and the report quotes the command and its output.
6a. `tests/distribution.test.ts` under npm 11 (`PATH=/opt/npm11/bin:$PATH`) is green in default mode, and the npm 10 failure the report characterizes (`Cannot read properties of null (reading 'edgesOut')` from a materialized workspace's `npm install`) is a host condition no file this unit changed reaches: the assertion at about line 908 and the install step it reads predate the unit.
7. `tests/src/core/templates.test.ts` was not edited; the report names each of its rows that redden and the expectation U5 must carry, or states that none reddened with the run's summary.
8. No `any`, no assertion, no suppression, no nested function beyond the permitted shapes; every helper the template declares keeps the template's own placement conventions; the proof's prose follows the writing rules (no count, no `should`, no `simply`).
9. Nothing outside the owned block and the generated proof changed; `package.json`, `package-lock.json`, every vendored file, and the config seeds are untouched; the report's claims match the diff.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
