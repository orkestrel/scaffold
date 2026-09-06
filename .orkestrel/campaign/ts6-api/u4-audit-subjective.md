<!-- workflow wf_0bb55c9c-be8, agent a308e6b32d2be834c, captured from journal.jsonl -->

## Lane

Subjective (design fit, proof voice, template vocabulary). Held in full. Correctness, portability, and evidence-sufficiency questions are referred, not adjudicated.

## Per-claim verdicts

**1. PASS.** No `typescript` import, value or type, in either owned file: `/home/user/scaffold/src/core/templates.ts` imports `createRequire` at 1044 and `vitest` at 1048; `/home/user/scaffold/tests/distribution.test.ts:392` imports `transformWithOxc` from `vite`. A sweep of both files for `typescriptCompilerFolder|createProgram|getTypeChecker|SymbolFlags|transpileModule|getPreEmitDiagnostics` returns nothing. One residual token: `templates.ts:1057` passes the string `'typescript/bin/tsc'` to `createRequire(...).resolve`, which is the CLI entry the unit brief prescribes (`u4-proof-template-brief.md:19`) and claim 2 requires, not an import.

**2. PASS.** The consumer module (`templates.ts:1561-1576`) carries `import * as entry`, the literal key record, and both assignments in the exact shape `m15-report.md:93-94` fixed. The scratch project (`1490-1511`) fixes `module`, `moduleResolution`, `noEmit`, `skipLibCheck`, `strict`, `target`, `types: []`, `files`. `checkProject` (`1520-1549`) runs `[TSC, '--noEmit', '--pretty', 'false', '-p', project]` through `runNode` (`1265-1267`, `process.execPath`); the located lines are the verdict, an unlocated line (`1537`), a line naming the scratch project (`1540`), and any stderr byte (`1522`) each raise an instrument fault, and a non-zero status with no reported line raises a refusal (`1545`) rather than standing as the verdict. Runtime keys come from real processes (`1890`, `1907` through `driveRuntime`; `2043` through the browser read). Deviation from "each resolution driver": both Node drives run `selectDrivers` (`1457-1461`), which narrows to drivers whose conditions resolve that entry. The narrowing is deliberate, commented, and the right design call — a driver that resolves nothing would report a failure the package never made. The ESM drive asserts the selection non-empty (`1892`); the require drive does not (`1912`). See referral R1.

**3. PASS on the quoted half; CANNOT RULE on the provenance half.** `u4-proof-template-report.md:118-143` quotes both plants, the make command for each, and TS2741 diagnostics naming `PLANTED_EXTRA` (line 4, `surfaced`) and `PLANTED_DECLARED` (line 3, `declared`) — and those line numbers independently corroborate the direction comment at `templates.ts:1555-1559`. The `node16` lines are verbatim; the `nodenext` and `bundler` lines are abridged by the report author with `'...'`, so they are not verbatim. `u4-proof-template.status.txt:1-5` and the diff carry no plant in `src/`. What is missing: the plant instrument (`plant.sh`) and the run logs the report cites are not retained — `/home/user/scaffold/.orkestrel/campaign/ts6-api/` holds only `u4-proof-template-{brief,report}.md`, `.diff.txt`, `.status.txt`, and `u4-partial.diff.txt`. "Made in a scratch copy and removed" therefore rests on the writer's report alone.

**4. FAIL.** The fence transform half is correct: `tests/distribution.test.ts:431-433` calls `transformWithOxc(source.join('\n'), 'example.ts', { target: 'esnext' })`, and the template carries no fence. The claim's second half is false as landed. `tests/distribution.test.ts:142` evaluates that transformed fence output from a string:

```
'		run = new AsyncFunction(\'module\', \'record\', preamble + \'\\n\' + block.source)',
```

`block.source` is `transformed.code` (`:435`). What right looks like: the fence block becomes a uniquely named scratch `.mjs` written into `workspace.path` and imported by `pathToFileURL(...).href` inside the driver, which is the shape `plan.md:52` fixes for the `vm` sites and the same hazard this clause names. The construct predates this unit (it is in no diff hunk) and the unit's brief named only `transpileModule` and `vm` sites, so the scoping decision is the Orchestrator's: restate the claim to the fence transform alone, or dispatch the `AsyncFunction` replacement as its own unit against `tests/distribution.test.ts:128-156`.

**5. PASS.** No hunk touches `driveRuntime` (`templates.ts:1595-1603`), `ESM_DRIVER_SOURCE`/`CJS_DRIVER_SOURCE` (`1088-1093`), the exports-map walk (`resolvePackageTarget` `1270`, `resolveTarget` `1295`), the `.d.cts`/`.d.mts` helpers (`targetToDeclaration` `1312-1320`, `resolveDeclaration` `1324-1344`), or `RELEASE` (`1066`). The absent-subpath control keeps its shape and its `silent` report at `1846-1874`; only its compile call changed.

**6. PASS on the deviation; CANNOT RULE on the regeneration proof.** The deviation is sound and independently corroborated: `src/core/compilers.ts:1302` declares `ownership: 'presence'` for `DISTRIBUTION_TEST_PATH`, so a replaced proof is kept, and scaffold's file is a bespoke proof the template has no branch for. The file's diff is confined to the import swap, the callback becoming `async`, and the transform call. The regeneration half rests on the writer's report alone (`u4-proof-template-report.md:76-86`), its commands carry placeholders (`<generated>`, `<the copy removed before the run>`) rather than the paths run, `diff -q` output is glossed as `(identical)` rather than quoted, and no log is retained.

**7. PASS.** `u4-proof-template.status.txt` shows `tests/src/core/templates.test.ts` unmodified; the report states no row reddened and gives the run summary (`report:177-184`). Corroboration within my reach: no file under `/home/user/scaffold/tests` names `readDeclaredExports`, `compileConsumer`, `checkProject`, `checkSurface`, `writeProject`, or `selectDrivers`, so neither removal nor addition can be named by an expectation. The truth of the quoted run belongs to `verifier`.

**8. FAIL.** The mechanical half holds: no `any`, no `as` assertion (the only `as const` is inside the generated consumer text at `templates.ts:1569`, which `.claude/rules/typescript.md` § Types permits), no suppression, and every in-body function is an anonymous callback passed directly as an argument (`1458`, `1565`, `1575`, `1893`, `2046-2049`). The prose half breaks at `src/core/templates.ts:1911`:

```
			// drive's. The runtime drive above ran either way.
```

`.claude/rules/writing.md` § Code tokens, references, and links: "Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`", and `.claude/rules/typescript.md` § Comments binds that file to code comments. This text ships into every target's generated proof, so the drift propagates fleet-wide. Right looks like: "The preceding runtime drive ran either way." The same comment's opening sentence (`1908-1910`) also fails `AGENTS.md` § Writing's first-read requirement — "A subpath `require` resolves to a module no typed CommonJS consumer can compile against carries no declared side to compare here" loses its relative pronoun; write "A subpath whose `require` target no typed CommonJS consumer can compile against carries no declared side to compare here."

**9. PASS.** Every hunk falls inside the distribution proof block (`templates.ts:1024-2077`) or `tests/distribution.test.ts`; `package.json`, the lockfile, the vendored files, and the config seeds are absent from `u4-proof-template.status.txt`. One mismatch, non-blocking: the report's quoted `git status --short` (`report:217-219`) lists only the two modified files, while `u4-proof-template.status.txt:3-5` also lists the untracked campaign records — a capture-order artifact rather than a claim about the work.

## Findings outside the claims

**F1 — required change. `src/core/templates.ts:1669-1675` produces values nothing reads.** `buildStage` joins each resolved declaration to `installed`:

```
			declaration: {
				module: declaration.module === undefined ? undefined : join(installed, declaration.module),
```

Every consumer of `Entry['declaration']` now reads only presence: `1651-1653` (classification), `1887`, `1904`, `2032` (three `=== undefined` guards). The absolute path was consumed by `readDeclaredExports(declaration)`, which this unit deleted. Why it matters: a reader meeting a field typed `string | undefined` assumes the proof opens that file, and it no longer does — this is the residue that makes a generated proof harder to understand than the thing it proves, and `AGENTS.md` § Design laws refuses a stored value that can drift from what is read. What right looks like: reduce the field to the fact its consumers use — `readonly declaration: { readonly module: boolean; readonly commonjs: boolean; readonly browser: boolean }`, set from `resolveDeclaration(...) !== undefined` — and drop the `join`. Keep the interface comment at `1169-1171` truthful about what the members now name. `entry.module`/`entry.commonjs`/`entry.browser` remain distinct facts (runtime target resolution), so no member collides.

**F2 — required change. `src/core/templates.ts:2046-2050` expresses one known driver as a filter, an assertion that the filter found it, and a flatMap over one element.**

```
					const drivers = RESOLUTIONS.filter((driver) => driver.label === BUNDLER)
					expect(drivers.map((driver) => driver.label)).toStrictEqual([BUNDLER])
					const reported = drivers.flatMap((driver) =>
```

This is machinery around a fact the file already knows, and it exists only to make the browser face reuse the shape the Node drives need. Compounding it, `1157-1158` writes the same word twice in adjacent lines of one object — `label: BUNDLER` beside `resolution: 'bundler'` — so the vocabulary splits at the point the constant was introduced to unify. What right looks like: name the row once at module scope beside `RESOLUTIONS` (a `BROWSER_DRIVER` binding that throws when the row is absent, in the style of the file's other module-scope work at `1685-1716`), then call `checkSurface` once with it and assert the result. That keeps the guard against the row's removal, drops the constant that now buys only a filter predicate, and lets `RESOLUTIONS` carry plain literals throughout.

**F3 — observation. Three senses of "surface" in one file.** `writeConsumerProbe` emits `export const surface` (`1588`), the new record type is `Surface` (`1480`), and the reverse-direction variable is `surfaced` (`1571`). `surfaced` was fixed by the unit brief (`u4-proof-template-brief.md:19`) and `surface` predates, so the one term the unit chose freely is the type. `Comparison` would leave the file with one meaning per word. Not blocking.

**F4 — observation. `interface Surface` at `1480` sits alone below the function block** while `Resolution`, `TargetResolution`, `Entry`, and `Stage` cluster at `1127-1199`. The file has precedent for late declarations (`SCRATCH`/`CACHE` at `1685-1686`), and placing the type beside its two consumers is defensible, so this is a consistency note rather than a required move.

**F5 — referral to the Orchestrator. Retention.** `.agents/orchestration.md` § Dispatch anatomy requires the exact executed instrument and the acceptance evidence in `.orkestrel/`. The report cites `<scratchpad>/u4/plant.sh` (`report:115`) and `<scratchpad>/u4/replicate-install.sh` (`report:166`); neither, nor any run log, is in `/home/user/scaffold/.orkestrel/campaign/ts6-api/`. This is what forces claim 3's CANNOT RULE, and the scratchpad is swept.

## Referrals (objective lane — no verdict from me)

- **R1.** `templates.ts:1912` — the require drive runs `selectDrivers(entry, 'commonjs')` with no non-empty assertion, so an entry whose CommonJS drivers all resolve nothing passes with `reported` empty and no type-level check taken. The ESM drive guards this at `1892`. Confirm whether `selectUntypable` (`1466-1474`) provably covers exactly that population, or whether the vacuum is silent.
- **R2.** `templates.ts:1522-1525` — any byte on the compiler's error stream becomes an instrument fault. Self-flagged at `report:235-237`.
- **R3.** `templates.ts:1537` — the control probe's expected `TS2307` is located, but rule whether any compiler major in range emits an unlocated diagnostic for a project whose only file cannot resolve its import, which would convert the firing control into a thrown instrument fault.
- **R4.** `templates.ts:1540` — `resolve(stage.consumer, located) === project` assumes the compiler prints the path relative to `stage.consumer`; the comment at `1078-1079` says "relative to the directory the compiler ran in". Rule that against `-p <absolute project path>` and `.claude/rules/portability.md` § Paths.
- **R5.** Claim 4's `new AsyncFunction` site (`tests/distribution.test.ts:142`) predates the unit; the scoping decision belongs to the Orchestrator.

VERDICT: FAIL 4 8
