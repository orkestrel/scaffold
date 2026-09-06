# Audit brief — U7-fix (round 2 over unit U7 probe-typestage: units U7-fix-a and U7-fix-b)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, vocabulary, guide voice), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the code and the contracts permit, false greens, portability), and `checker` (Sonnet: each prescribed edit against its prescription, the acceptance criteria as stated, scope honesty). Both fix units were written by `builder` on Sonnet, so each reviewer lane audits work an engine other than its own wrote. Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Round 1 (`/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-audit-verdict.md`) failed claims 5, 7, and 14 and carried the findings its § Findings outside the claims lists to three serial fix briefs: `u7-fix-a-brief.md` (code and tests, edits 1 to 11), `u7-fix-b-brief.md` (prose and fixtures, edits 1 to 6), and `u7-fix-c-brief.md` (the five resident-engine sentences fix-b's scope could not reach), in the same folder with their reports `u7-fix-a-report.md`, `u7-fix-b-report.md`, and `u7-fix-c-report.md`. Fix-b edited one sentence of `src/server/helpers.ts` (the `guardStage` TSDoc) under an off-limits clause the Orchestrator wrote ambiguously; rule that edit on its merits, not as a scope breach. The round-1 lanes are `u7-audit-{subjective,objective,checker}.md`; the mechanism's measurements are `orchestrator-measurements.md` and `m3m4-report.md`. Governing files: `/home/user/fleet/probe/AGENTS.md` (the same contract as scaffold's), `.claude/rules/tests.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/portability.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md`, all under `/home/user/fleet/probe/.claude/rules/`.

## Review evidence

The whole U7 change including every fix, as the actual diff and status of the probe checkout: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix.diff.txt` and `u7-fix.status.txt` (captured after fix-c); the fix-a slice alone is `u7-fix-a.diff.txt`. Read the whole diff in full; read the changed files under `/home/user/fleet/probe` at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `#configure` never reads `execution.status`: it spawns `--showConfig` against the mirrored project with the mirror as the current directory after a refresh on a cache miss, parses stdout, and throws the `workspace`/`malformed` fault only when nothing parses; the guide's digest paragraph states that source and the escaping-path consequence; the one-reading-per-stage cache and its test stand.
2. `#check` throws the `instrument`/`malformed` fault only when the run printed no diagnostic and did not exit 0, with the trimmed stderr as the message when present and otherwise the exit or the signal named; a run with diagnostics is read from them whatever stderr carries; a clean exit with stderr noise is clean.
3. `#issues` charges the workspace only for a diagnostic with no path or one against a `.json` file the claim did not draft, and projects every issue path into the mirror-relative, else workspace-relative, else normalized absolute spelling; the guide paragraph "**A diagnostic about a project belongs to the workspace.**" states the draft rule; the existing malformed-project and no-file tests still pass in the report.
4. `collectWorkspaceFiles` is the one walk: exported from `src/server/helpers.ts` with full TSDoc, tested over a scratch tree with the skip names and the mirror directory, used by both stages, and neither `#walk` remains; it carries no symbolic link.
5. The symbolic-link ruling is pinned by a `TypeStage.test.ts` case whose skip cites the mechanism (`symlinkSync` refused) rather than a platform name, and the guide paragraph "**A read is contained lexically only" states that a link is not carried and what the compiler then reports.
6. `scanDiagnostics` has one case per shape — `\r\n` twin, non-BMP columns 6, 9, 11, located elaboration join, unlocated elaboration join, a `warning` line, a non-diagnostic line yielding nothing — each named for what it proves, and `Diagnostic` carries no `code` anywhere in `src`, `tests`, or the guide.
7. `loadWorkspaceVitest(workspace)` replaces `loadWorkspaceModule` at every call site, test, and guide row; its failure contract (`workspace`, `missing` or `malformed`, `context.name` `'vitest/node'`) is unchanged and its `errors.test.ts` row still pins it.
8. `#displace` and `#createMirror` are the only names for what were `#clear` and `#build`, the comments naming them are updated, and no other private name in the class collides with the fixed lifecycle vocabulary of `.claude/rules/names.md`.
9. The `normalizeValue` remarks describe the compiler's printed record, and the `Issue` `@example` range is a point.
10. Every sentence the fix-b brief lists under edit 1 is rewritten to the shipped mechanism, "resident" survives only of the lint and runtime stages, the sweep in fix-b edit 5 names its pattern and paths and rules every hit, and no sentence in `guides/probe.md`, `src/server/Probe.ts`, `src/server/types.ts`, or `src/core/types.ts` still describes a resident TypeScript service, a synchronous check, or a compiler that lowers nothing.
11. The `Issue` Surface row states the zero-width range, § Prerequisites carries the warm's obligation with the raising behaviour, § Cost carries no count, and `3b674fdf121c85efb9ed1bab25ceeec8` appears nowhere under `src`, `tests`, or `guides`.
12. No `any`, no assertion, no suppression, no nested function beyond the permitted shapes, readonly interface members, single-word entity members, and every new or renamed export documented in the guide and tested; every report's flagged decisions and deviations are right or are refuted on the code, and the five fix-c sentences read true of the shipped stages.
13. Nothing outside the two briefs' owned files changed (`package.json`, `package-lock.json`, and every vendored file untouched), and each unit's report matches the diff slice it claims.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
