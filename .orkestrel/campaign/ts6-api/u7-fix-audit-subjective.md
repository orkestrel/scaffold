<!-- workflow wf_aae63be9-2f8, agent a6d3bb728b289f96b, captured from journal.jsonl -->

**Lane held: SUBJECTIVE** (design fit, API and vocabulary, architecture fit, simplification, guide voice and product coherence), on Claude Opus 5. Work written by `builder` on Sonnet.

## Per-claim verdicts

**1. PASS.** `src/server/stages/TypeStage.ts` `#configure` reads `parseProjectConfig(execution.stdout)` unconditionally, spawns `['--showConfig', '-p', contained]` with `this.#mirror` as the working directory, calls `this.#refresh()` only after the `#configs` cache miss, and raises through `#fault` only when nothing parses. `guides/probe.md:707-714` states the source and the escaping-path consequence. The one-reading-per-stage cache and `tests/src/server/stages/TypeStage.test.ts` `reads one project configuration for the life of the stage` stand. `grep "execution.status === 0"` over `src tests guides`: no match.

**2. PASS.** `#check` raises `instrument`/`malformed` only under `diagnostics.length === 0 && execution.status !== 0`, with trimmed stderr when non-empty, else the exited-status or ended-by-signal sentence, through `#translate`. Its comment states the reading in the same words. A run with diagnostics is read from them; a zero exit with stderr noise returns issues.

**3. PASS.** `#issues` resolves against the mirror, charges the workspace only for an absent path or an undrafted `.json`, and projects mirror-relative → workspace-relative → `normalizePath`. `guides/probe.md:349-359` states the draft rule and names the diagnostic's path, not the exit code, as the separator. The malformed-project and no-file cases are present and green in the fix-a report (`TypeStage.test.ts` 25/25). See finding F1: two other sentences still state the pre-exception rule.

**4. PASS.** `collectWorkspaceFiles` is exported from `src/server/helpers.ts` with `@remarks` naming the skip list, the unreadable-directory tolerance, and the symbolic-link exclusion, plus an `@example`; the guide row sits after `matchesLiveProcess`; `tests/src/server/helpers.test.ts` `collects only a regular file outside the excluded trees and no symbolic link` covers `.git`, `dist`, `node_modules`, `tmp/type`, and the link. `TypeStage.#refresh` and `RuntimeStage.#snapshot`/`#sweep` call it. `grep "#walk"`: no match.

**5. PASS.** `tests/src/server/stages/TypeStage.test.ts` gates `reports a claimant issue for an import reachable only through a symbolic link` on a module-scope `symlinkSync` probe whose comment cites the mechanism ("A host that refuses `symlinkSync` with `EPERM`…"), not a platform, satisfying `.claude/rules/tests.md` line 39. `guides/probe.md:380-388` states that the mirror carries regular files only, that a link is not carried, and that the compiler's report of the absence arrives as a claimant issue. See F6 on the skip's form.

**6. PASS.** All six shapes are present and named for what they prove in `tests/src/server/helpers.test.ts` `describe('scanDiagnostics')`. `grep` for a `code` member on `Diagnostic` across `src`, `tests`, `guides`: no match; `src/server/types.ts` `Diagnostic` carries `path?`, `range?`, `message`, and both patterns keep an uncaptured `TS\d+`.

**7. PASS.** `loadWorkspaceVitest(workspace)` replaces the overloaded helper at `RuntimeStage` (constructor, `#runner`, `#replace`), `tests/src/server/helpers.test.ts`, `tests/src/core/errors.test.ts`, and the guide row in its old position. The failure contract is unchanged (`workspace`, `missing`/`malformed`, `context: { name: 'vitest/node' }`) and the `errors.test.ts` row `a tool the workspace does not install` still pins it. `grep "loadWorkspaceModule"`: no match. The row's added sentence — the compiler is spawned rather than loaded, so it is reached through `resolveWorkspaceBinary` — earns the narrower name.

**8. PASS.** `#displace` and `#createMirror` are the only names; `grep "#clear|#build("`: no match. Enumerating every `#name(` in `TypeStage.ts`, none of `start`, `stop`, `pause`, `resume`, `skip`, `abort`, `clear`, `destroy`, `execute` is used against its fixed meaning in `.claude/rules/names.md` § Fixed lifecycle vocabulary (`#destroy` carries that vocabulary's own meaning). `#place`/`#displace` is a deliberate pair and reads as one concept.

**9. PASS.** `src/server/helpers.ts` `normalizeValue` `@remarks` now describe the printed record (`tsc --showConfig` spells relative to the project file; key order is the compiler's and differs between majors). `src/core/types.ts` `Issue` `@example` range is a point (`end` equal to `start` at character 6), matching the remarks beside it.

**10. PASS.** Every sentence fix-b edit 1 lists is rewritten. `grep "resident"` over `guides/probe.md` and `src/**`: every survivor names the lint stage, the runtime stage, an overlay-consuming tool, or a resident process — none names a resident TypeScript service. No `lowers nothing`; the only `synchronous` in `guides/probe.md` is line 953 (a Vitest worker loop). The fix-b report names the sweep's pattern, its four paths, and a ruling per hit with its line. See F7 on one rewritten sentence's placement.

**11. PASS.** `guides/probe.md:42` states the zero-width range for the type and runtime stages and the published span for the lint stage; § Prerequisites carries the warm's obligation with the raising behaviour (`origin: 'workspace'`, `code: 'malformed'`, naming the project); § Cost reads "the declared projects" with the measurements intact ("over 4 runs" is a measurement's own run count, permitted). `grep "3b674fdf121c85efb9ed1bab25ceeec8"` over `src`, `tests`, `guides`: no match.

**12. PASS.** No `any`, no `as` beyond `as const`, which `.claude/rules/typescript.md:29` permits; no suppression; every nested function is an anonymous callback passed directly as an argument; `Diagnostic`, `ProjectConfig`, and `Execution` are fully readonly. `compilerOptions`, `files`, `include`, `stdout`, and `status` transliterate `tsc --showConfig` and the POSIX streams, and each TSDoc names the source it mirrors, which is the exemption `.claude/rules/names.md` grants. Every new or renamed export carries a guide row and an assertion. Of the reports' flagged decisions I refute one on the code: the skip-form answer (F6). The five fix-c sentences read true of the shipped stages; the residue beside one of them is F2.

**13. PASS, with the converse unruled.** `u7-fix.status.txt` lists no `package.json`, no `package-lock.json`, and no vendored path, and every path it lists falls inside the three briefs' owned sets. Every edit each report claims is present in the tree. The converse — that no unit wrote anything it did not report — is not decidable from the supplied evidence, because both diffs are cumulative working-tree captures; I refer that half to `checker`. Note E1.

## Findings outside the claims

**F1 (required). Two published sentences state the classification rule the fix superseded.**
`guides/probe.md:261` — "A diagnostic naming a project file, and one naming no file at all, raises a `workspace` / `malformed` failure." `src/server/stages/TypeStage.ts:65-68` — "A diagnostic naming a project file, and one naming no file at all, is the target tree's own configuration fault and raises rather than reporting". Both omit the drafted-`.json` exception that `#issues` implements and that `guides/probe.md:349-356` states, so the package documents one mechanism two ways and the `TypeStageInterface` method table — the row a caller reads first — carries the wrong one. Right looks like: both sentences carry the exception in the guide paragraph's own words, "unless the `.json` file is one the claim itself drafted".

**F2 (required). One doc block names its subject twice, differently.**
`src/core/types.ts:476` reads "Tears down every stage and releases the processes and the mirror they hold"; `:478` still reads "@returns A promise that settles when every engine has released its resources". The fix-b report flagged `:476, 478` together and the fix-c brief carried only `:476`. Right looks like: "@returns A promise that settles after every stage has released its resources".

**F3 (required). A rewritten remark left a ragged paragraph.**
`src/server/types.ts:135-137` — "…as a real file. Paths are absolute and the / stage resolves them, because only the stage knows the / workspace a candidate's declared path is relative to." Line 136 ends at about half the block's width. Right looks like: re-wrap the paragraph to the file's column.

**F4 (required). One guide bullet overruns the page's wrap.**
`guides/probe.md:1004` runs to about 110 characters where every neighbouring line stops at 100. Right looks like: re-wrap from "warm it started" through the end of the bullet.

**F5 (required). One comment overruns after the rename.**
`src/server/stages/RuntimeStage.ts:702` — "matches no key, the invalidation is dropped without an error, and the resident runner serves the previous" — grew past the block's width when `#walk` became `collectWorkspaceFiles`. Right looks like: re-wrap lines 699-705.

**F6 (required). The new skip inverts the suite's existing form and writes a double negative.**
`tests/src/server/stages/TypeStage.test.ts` uses `it.skipIf(!LINKS)`, while the suite's existing conditional skips are `it.runIf(DIRECTORY_LINKS)` at `tests/src/server/stages/RuntimeStage.test.ts:223` and `:269`. `.claude/rules/writing.md` § Sentence and paragraph order refuses a double negative, and one gate now reads two ways in one suite. Right looks like: `it.runIf(LINKS)(...)`, with `LINKS` unchanged.

**F7 (required, small). `OverlayInterface`'s remarks name a reader that holds no overlay.**
`src/server/types.ts:132-134` says "the lint stage's document protocol and the runtime stage's module resolver each read one candidate set through their own adapters", inside the remarks of the entity itself, while `guides/probe.md:186` says "`RuntimeStage` is the stage that holds one" and `src/server/stages/LintStage.ts` references no overlay at all. A reader of the interface is pointed at a consumer that does not exist. Right looks like: name the runtime stage's resolver as the reader, and state the lint stage's document protocol as a separate mechanism or drop it.

**F8 (observation). One load-bearing sentence dangles.**
`guides/probe.md:707-709` — "The project digest is the digest of the `compilerOptions` member …, read against the mirrored copy …, so the digest and the check read one set of files, and canonicalized by `computeDigest`." The final clause coordinates a participle with a noun phrase across an intervening result clause. Right looks like: split the canonicalization into its own sentence.

**E1 (dispatch evidence). `u7-fix-a.diff.txt` is not the fix-a slice.**
It carries `+export const TYPE_MIRROR = 'tmp/type'` at line 430 in `src/core/constants.ts` — a file fix-a's brief lists as off-limits — plus hunks for `src/server/Overlay.ts`, `src/server/parsers.ts`, `tests/src/server/Overlay.test.ts`, and `tests/src/server/Probe.test.ts`, none of which fix-a owned or reported touching. It is the cumulative U7 + fix-a working-tree diff. Attribute nothing to fix-a from it, and capture per-unit slices between units if claim 13's converse must be ruled.

## Referrals to the objective lane

- No case in `tests/src/server/stages/TypeStage.test.ts` drives `#check`'s new `instrument`/`malformed` branch (no diagnostic, non-zero exit; and the signal message when `status` is absent). Is that branch reachable and pinned?
- `filterUniqueIssues` and `matchesLiveProcess` are pinned only by the documented-example assertions in `tests/src/server/helpers.test.ts`; arrival order and the `EPERM` branch have no case of their own.
- `#issues` keys classification on `extname(resolved) === '.json'` after resolving against the mirror, while `drafted` is computed from a workspace-relative or mirror-relative spelling chosen by `escapesRoot`. Does a drafted `.json` whose resolved path leaves the mirror classify as the claim intends?
- The retuned budgets in `tests/src/server/Probe.test.ts` (6 s → 15 s and 20 s, one timeout 180 s → 300 s, `include` 1,200 → 3,000) are timing-class and host-dependent.

VERDICT: PASS
