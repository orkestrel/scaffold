# Unit ts7-audit-scaffold — falsify stage 2 in scaffold (`6c46f547` on the branch, not yet on `main`)

## Role and lane

Three blind lanes read this one brief:

- Subjective lane, `reviewer` on Opus 5: API shape and naming (`APP_BROWSER_TYPESCRIPT_RANGE`, the fork's `@remarks`), the guide and proposal prose, the TSDoc voice, whether the change reads as one convention.
- Objective lane, `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench: correctness against the constraints, the override's placement and value in every config and template, the browser fork's test, the range literals, the fixture registry, `host.json`, the distribution proof's refusal and its control.
- `checker` on Sonnet, in addition: the acceptance criteria against the diff, scope honesty (no file outside the owned set), the writing rules over the prose (no count in prose, no substitution-table term, sentence-case headings), guide parity rows.

A `verifier` on Sonnet runs the authoritative gates in `/home/user/scaffold` beside the lanes. Each lane performs the assignment directly, spawns nothing, writes no file, and runs no command.

## Subject and review evidence

The diff `tmp/units/ts7-seven.diff.txt` (`git diff 47200d6c -- . ':!.orkestrel'`, 956 lines) and the status `tmp/units/ts7-seven.status.txt`; the report `tmp/units/ts7-seven-report.md`; the brief `tmp/units/ts7-seven-brief.md`; the rulings `tmp/units/ts7-reconciliation.md`; the measurements `.orkestrel/campaign/ts7/orchestrator-measurements.md`; the constraints `.orkestrel/campaign/ts7/design-objective.md`. The tree at `HEAD` (`6c46f547`) carries the change; read files directly for pointers.

## Already established

Stage 1 (`47200d6c`) landed with the full chain and the release-mode distribution proof green. Rehearsal 2 measured the override landing the rollup. The stage-2 unit reports the full chain green and the release-mode distribution proof red on `@orkestrel/probe@0.0.12`'s optional peer `typescript@^6.0.3` (`ERESOLVE` on a fresh install; the control with that row removed installs); that refusal is the reconciliation's R6 and is not under audit here, and the `probe` unit that widens the peer has landed in its own checkout.

## Claims

1. `package.json` moves `typescript` to `^7.0.2` and no other range; `npx tsc --version` prints `Version 7.0.2`; no tsconfig changed.
2. `bundleTypes.invokeOptions.typescriptCompilerFolder: ''` sits in `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, and in each of the core, browser, and server `dts` templates in `src/core/templates.ts`, each with a one-line reason; the value `''` reaches api-extractor's truthiness guard (`node_modules/@microsoft/api-extractor/lib-esm/api/CompilerState.js:101-104`) and nothing else; the byte-identity proof in `tests/src/core/compilers.test.ts` holds.
3. A blueprint selecting `app/browser` receives `typescript` at `APP_BROWSER_TYPESCRIPT_RANGE` (`^6.0.3`) through `blueprintToDevDependencies`, every other blueprint receives `^7.0.2`, a test pins each, and the constant's TSDoc and the guide name `vuejs/language-tools` issue 5381 as the trigger to delete it.
4. Every range literal the move makes false is updated and none else moved: `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/bin/CLI.test.ts` (messages, fixture manifests, and the two-major `typescript` packument), the two manifest snapshots; `app-only-toolchain.txt` stays on `^6.0.3` by the fork; `tests/src/bin/helpers.test.ts` untouched and green.
5. `host.json` carries the new `guides/scaffold.md` digest and the root digest and no other change.
6. The prose: `guides/scaffold.md` § Dependency floors states the 7 floor, the override's reason, and the browser limit; the Surface row for the constant; `PROPOSAL.md`'s amended sentences (the pin, the control path, the fallback reader, C12, the candidate row) are true against the measurements; `ROADMAP.md`'s scaffold rows (the browser limit, R1 to R3) and fleet row carry a close condition each; every sentence obeys `AGENTS.md` § Writing and `.claude/rules/writing.md`.
7. No file outside the brief's owned set changed; nothing outside `.orkestrel/` was committed except the owned files; no discarding git command ran.
8. The verifier's chain is green: `format:check`, `lint:check`, `check`, `build`, `test`; the release-mode distribution proof's red names `@orkestrel/probe@0.0.12`'s peer and nothing else.

## Threshold

Stage 2 is accepted for `main` (after the `probe` release and re-pin) when claims 1 to 8 hold; a failing claim is a fix-round item with the lane's exact prescription.

## Output

Per-claim verdicts with evidence (a quote and its line in the diff or the file, and the pointer checked), then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
