# Fix dossier: probe

Verified fix-producing findings for the `probe` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s09-01 — DRIFT

1. package=probe file=src/server/helpers.ts:89-93, :118-122, :331-335, :371-374, :413-417 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: The same guarded read of a native fault's `code` — `typeof error === 'object' && error !== null && 'code' in error && error.code === …` — is written out at each of those sites, and again in `src/server/stages/RuntimeStage.ts:769`, while `isRefusedName` at :216-227 already holds a hardened version of the same read.
   repair: Export one leaf from `src/server/helpers.ts`, `readFaultCode(error: unknown): string | undefined`, built on the `attempt`-guarded read `isRefusedName` already uses, unit-test it, and replace every inline read with a comparison against its result.

## s09-02 — DRIFT

2. package=probe file=src/server/helpers.ts:73, :108, :730 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: The workspace-escape test `path === '..' || path.startsWith(`..${sep}`) || isAbsolute(path)` is written three times — twice inside `resolveWorkspaceFile` and once inside `normalizeValue` — so the containment rule that decides refusals and digest portability has three homes that can drift apart.
   repair: Export `escapesRoot(root: string, target: string): boolean` from `src/server/helpers.ts`, test it, and call it at all three sites.

### Verification

**Judge (DRIFT/high):** Both lanes agree the three-clause containment test is written verbatim three times and that the rule fires with no deliberate-exception evidence. The subjective lane's reshape rests on one decisive claim - "A leaf that recomputes `relative` cannot serve :108 at all" - and that claim is false: :108 p

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: export the shared kernel over the already-computed relative path — `escapes(path: string): boolean` returning `path === '..' || path.startsWith(`..${sep}`) || isAbsolute(path)` — unit-test it, and call it at all three sites, leaving each caller's own `''` handling and its own choice of root where they are.

## s09-03 — DRIFT

3. package=probe file=src/server/stages/RuntimeStage.ts:632, :636 rule=`.claude/rules/architecture.md` § Kind purity ("Module-scope constants live only in `constants.ts`") verdict=CONFIRMED
   wrong: The specification-lifetime bound is the bare literal `64` written twice inside `#runner`, while every other tuned bound in this package — `PROBE_DEADLINE`, `LINT_DEADLINE`, `PROBE_KEYS` — is a named, documented constant in `src/core/constants.ts`. The class TSDoc at :68-75 and `guides/probe.md` both state the value in prose, so a change has to be made in four places.
   repair: Add `export const PROBE_SPECIFICATIONS = 64` to `src/core/constants.ts` with the retention rationale in its `@remarks`, read it at both branches of `#runner`, and add its row to `guides/probe.md` § Constants.

## s09-04 — DRIFT

4. package=probe file=src/server/stages/RuntimeStage.ts:374, :524 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: The plugin identity `'orkestrel-runtime-overlay'` is a literal both where the plugin is declared (:374) and where `#project` decides whether a workspace project carries it (:524). A typo in either turns every claim against an instrumented project into a `workspace` issue that names the target tree for this package's own defect.
   repair: Add `export const RUNTIME_PLUGIN = 'orkestrel-runtime-overlay'` to `src/core/constants.ts` and read it at both sites.

