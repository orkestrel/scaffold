# Audit brief — U7 probe-typestage (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, API feel, vocabulary, guide voice), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the code and the contracts permit, false greens), and `checker` (Sonnet: mechanical conformance, scope honesty, the acceptance criteria as stated). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U7 moved probe's type stage off the in-process TypeScript language service onto the `tsc` process over a mirror of the workspace under `tmp/type/`. The unit's brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-probe-typestage-brief.md`; its report: `u7-probe-typestage-report.md`; the design: `plan.md` § Decision 1 and § Re-baseline, `design-subjective.md` § 1, `design-objective.md` § Decision 1, `orchestrator-measurements.md`, `m3m4-report.md`. Governing files: `/home/user/scaffold/AGENTS.md` (the same contract governs probe), `/home/user/fleet/probe/AGENTS.md` if present, `.claude/rules/portability.md` § Processes, `.claude/rules/tests.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/documentation.md`.

## Review evidence

The actual diff and status of the probe checkout: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-probe-typestage.diff.txt` and `u7-probe-typestage.status.txt` (captured by the Orchestrator after the unit exited). Read the diff in full; read the changed files under `/home/user/fleet/probe` at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. No file under `/home/user/fleet/probe/src/` names a compiler specifier, value or type; `loadWorkspaceModule` keeps its name and specifier parameter and has no `typescript` overload or bridge fallback; `Overlay` has no `sensitive` option.
2. A candidate draft naming a path the workspace holds is judged as that path's replacement: the mirror writes each draft at its mirrored declared path, a draft that breaks a consumer of the shadowed path reports that consumer's diagnostic, and a draft importing a sibling draft resolves to the sibling draft; the tests that pin these exist and the report quotes each diagnostic verbatim.
3. Nothing is written outside `tmp/` in the workspace; the mirror sits under `tmp/type/<pid>-<id>/`, is deleted at teardown, and a stale one is swept at boot by the pid rule; after `destroy` mid-inspection no file remains outside `tmp/`, pinned by a test.
4. The scratch project per selected project `extends` the mirrored project file and re-roots `rootDir`, `include`, `files`, `paths`, `incremental`, and `tsBuildInfoFile` into the mirror in the measured shape; `tsc` runs once per distinct selected project with `cwd` the mirror root so printed paths are workspace-relative; the child is spawned with `process.execPath` and `typescript/bin/tsc` resolved through `resolveWorkspaceBinary(workspace, 'typescript', 'tsc')`, whose `@example` matches its behaviour.
5. The parser maps `path(line,col): error TSnnnn: message` to an `Issue` with zero-based UTF-16 coordinates and `end` equal to `start`, joins indented elaboration lines, classifies a diagnostic on the project file or a line with no location as a workspace fault (`origin: 'workspace'`, `code: 'malformed'`), treats non-diagnostic stderr as an instrument fault, and never reads the exit code as the verdict; a test pins each shape from `m3m4-report.md`, including a `\r\n` file and a non-BMP character.
6. `Project.digest` is `computeDigest` over the `compilerOptions` member of `tsc --showConfig` run against the caller's project in the workspace, canonically serialized, unchanged by drafts written into the mirror; every documented receipt example in `types.ts` and `guides/probe.md` carries the new value's shape.
7. `destroy` terminates a running child (by process tree on Windows per the portability rule), `#unblock` keeps only the destroyed-stage refusal, the class TSDoc and every sentence in `types.ts` and `guides/probe.md` about a resident service, a synchronous check, the span's length, or the digest's source are rewritten, and the guide states the point range, the digest's source, and the cost readings with their date.
8. A `prove` call over probe's own workspace returns a receipt naming `typescript@6.0.3` and the named project's digest with the control breaking at `type`; the report quotes it.
9. `package.json` keeps the `typescript` peer at `^6.0.3` optional with no bridge row; `package-lock.json` and the vendored files are untouched.
10. No `any`, no assertion, no suppression, no nested function beyond the permitted shapes, readonly interface properties, single-word entity members, reusable types in `types.ts` before use, every exported helper tested (a `parsers.ts` module's parsers carry `parse*` names and tests), and no superfluous wrapper.
11. The report's claims match the diff, nothing outside the owned set changed, and the unit's own flagged claims hold or are refuted on the code; the vendored-population reading is reported with its command.
12. The two `RuntimeStage.ts` patches the unit returned, applied serially by the Orchestrator, are exact: `#alive` is replaced by the shared `matchesLiveProcess` with no behaviour change, and `#walk` skips the type mirror's directory and nothing else; `RuntimeStage`'s own suite still passes under the verifier.
13. The unit's flagged decision 1 holds as a contract: every diagnostic a selected project reports is a claimant issue, so a workspace whose own `check` is red earns no receipt; the guide states it in § What a probe proves and a test covers a diagnostic in a file the claim never touched.
14. The unit's flagged decisions 2 to 4 hold: `resolve` tolerates a JSON fault `--showConfig` recovers from while `inspect` raises the workspace fault, `context.project` carries the resolved workspace-relative spelling, and nothing in `inspect` depends on the cross-major `--showConfig` exit difference.
15. The unit's flagged decisions 5 and 6 hold: every inspection awaits the warm so the deadline has a floor stated in the guide, the retuned `Probe.test.ts` deadlines derive from a recorded measurement rather than a guess, and warming the declared projects together is independent per project (each reads the mirror and writes its own state file).

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
