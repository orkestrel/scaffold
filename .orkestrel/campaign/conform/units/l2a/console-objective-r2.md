## Per-claim verdicts

**1. Every row applied / stopped / noop, none silently skipped — CONFIRMED**
The report's disposition table (`/home/user/scaffold/tmp/units/conform/conform-console-report.md:9-35`) carries a row for each of the brief's § Rows entries `console-obj-1`…`console-obj-9`, `console-subj-1`…`console-subj-15` (the brief declares no `console-subj-8`), plus `fleet-F1` and `fleet-F2`. I re-derived both `noop` claims rather than reading them: `isBrowserVuePath` and `readonly id` return no match over `/home/user/fleet/console/src`, and `/home/user/fleet/console/tests/setupBrowser.ts` exists, so F1's delete condition is absent and F2 has no class with the shape. No row is `stopped`. Every `applied` row is present at its site (see claim 2).

**2. Each applied row implements the refuter's operative repair — CONFIRMED**
Sampled at the sites, not from the report: `tests/guides.test.ts:62-66` (published-specifier `MODULES` plus the rewritten comment at `:56-61`); `tests/guides.test.ts:219-571` (`describe('flagship fences')` driving `createRecordingSink`); `tests/src/browser/helpers.test.ts:243-248`; `tests/src/core/Spinner.test.ts` via `waitForCondition`; `src/server/factories.ts:1620-1624` (factory and imports deleted); `tests/setupServer.ts:75-81` and `tests/setupBrowser.ts:43-47` (methods, not `const` arrows); `src/core/loggers/`, `src/core/renderers/` with `src/core/index.ts:5-7`; `LoggerManager.ts:121-131` (all-succeed, every name attempted) with `types.ts:489-491`; `Progress.ts:83-109`; `types.ts:970` `BarOptions`; `browser/helpers.ts:153` `scanParameters`; `server/types.ts:55-56` `stdout`/`stderr`; `helpers.ts:257`/`:326` `columns` with `width` unshadowed; `browser/types.ts:70-73` optional channels; `factories.ts:137-205` (full TSDoc on the async overload, own block on the sync one, `//` note on the implementation, both examples importing `@orkestrel/console`).

**3. No old name survives — BROKEN**
The renamed `ServerSinkOptions.out` / `.err` survives as the old word for the same thing, inside doc blocks this unit rewrote:

- `/home/user/fleet/console/src/server/types.ts:67` — "enable or disable its styler for the out target", three lines above the repaired `:70` "`styled` is the `stdout` target's construction-time fact".
- `/home/user/fleet/console/src/server/constants.ts:24` — "when the out stream is not a TTY", while its twin sentence at `src/server/types.ts:52` and its guide row at `guides/console.md:273` were both rewritten to "`stdout` stream".
- `/home/user/fleet/console/guides/console.md:603` — "keep generated ANSI paired with out stripping".
- `/home/user/fleet/console/tests/src/server/factories.test.ts:28` and `:224` — "a TTY out target and a piped err target", "when the out stream is not a TTY".

That these are the old form is the writer's own ruling: `/home/user/work/evidence/conform-console.diff:290`, `:321`, `:1630`, `:1638`, `:1641`, `:1757` delete exactly this phrasing elsewhere. The recorded sweep pattern `\b(out|err)\s*:` (report `:227-230`) matches the object-literal key spelling only, so it could not reach prose. A word-boundary sweep over the claim's own path set does not read empty.

**4. Failing-first proof per behavioural row; sweep per placement / naming / documentation row — CONFIRMED**
Runner captures exist and are runner output, not report prose: `/home/user/work/evidence/console-proofs/console-subj-1-red.txt`, `console-obj-4-control-planted.txt`, `console-obj-1-red-stale-fence.txt`, `console-obj-2-control-planted.txt`, `fix1-fence-{surface,server,columns}-control-red.txt` with their green twins. I read `fix1-fence-server-control-red.txt` in full: one real `FAIL … carries the server fence lines the transcription copies` with the assertion text. The defect-naming tests are in the diff (`conform-console.diff:1928`, `:2971`, `:3012`). `console-obj-3` records the anticipated no-red branch with its command and reason. Sweeps are recorded with pattern, paths, and a ruling per hit. The `console-subj-5` sweep's inadequacy is scored under claim 3, not double-counted here.

**5. Guide parity holds; no `AGENTS §` citation in touched files — CONFIRMED**
`ProgressInterface` (`src/core/types.ts:1201-1218`) matches `guides/console.md:373-378` exactly, with the readonly data (`succeeded`, `current`, `total`) in the Surface row at `:153`; `LoggerManagerInterface` (`types.ts:497-513`) matches `:334-343`; `ProcessCaptureInterface` matches `:382-388`. Every fence imports a published specifier (`guides/console.md:420, 452, 511, 588, 600, 626-627, 669, 677`); no `@src/*` import appears in any fence. `guides/README.md:42-47, 56-61` carry the two mirrors in alphabetical order. `AGENTS\s*§|§\s*\d` over the checkout hits only the vendored, off-limits mirrors `guides/emitter.md`, `guides/contract.md`, `guides/guide.md`.

**6. Every breaking change named under § Breaking — CONFIRMED**
I re-derived the removed and renamed export set from the diff rather than from the report: `^-export`/`^+export` over `/home/user/work/evidence/conform-console.diff` yields exactly `createProcessCapture` removed (`:1702`), `parseParameters` → `scanParameters` (`:603-604`), `ProgressBarOptions` → `BarOptions` (`:1442-1443`), plus barrel path rewrites (`:1189-1194`, star exports both sides, so no published symbol moves) and positional parameter renames. Every one appears in the report's § Breaking table (`:305-315`) with its consumers and the exact consumer edit, alongside the non-signature `LoggerManager.remove(names)` semantic change and the `StyleAccumulator` optionality. `normalizeVisible` (`:2386`) is a `tests/setup.ts` export, unpublished.

**7. Diff confined to Owned; off-limits untouched; no shim — CONFIRMED**
`^diff --git` over the diff returns 39 files, and every one is in `/home/user/work/evidence/conform-console.status:1-39`; each falls under `src/**`, `tests/**` (excluding the vendored `setupPolicy.ts`, `policy.test.ts`, `config.test.ts`, none of which appear), `guides/console.md`, `guides/README.md`, or `README.md`. No `package.json`, `package-lock.json`, `node_modules`, `configs/**`, `.claude/**`, or `scripts/**` hunk exists. `src/core/index.ts`, `src/browser/index.ts`, `src/server/index.ts` are pure `export *` rows with no alias or re-export, and `src/server/factories.ts` retains no delegate for the deleted factory.

**8. No skip / only / todo / retry / inflated timeout; § Gates named — first conjunct CONFIRMED; the gate run NOT-EVIDENCED**
`^\+.*(\.skip\(|\.only\(|\.todo\(|TODO|FIXME|debugger)` over the diff returns no hit, and no added line introduces a `retry` or a `timeout` option; the same sweep over `/home/user/fleet/console/tests` reaches only the vendored `setupPolicy.ts`, `config.test.ts`, and `distribution.test.ts`, none of which is in the status. The report's § Gates (`:279-285`) names `format:check`, `lint:check`, `check`, `build`, and `test`, each exit 0, each with a capture file that exists under `/home/user/work/evidence/console-proofs/`. The independent gate reading is NOT-EVIDENCED: a read-only lane cannot run it, and the Orchestrator's deciding run at landing settles it.

**9. Nothing hidden; report matches the diff — CONFIRMED**
No TODO, FIXME, `debugger`, commented-out code, `@ts-` directive, `eslint-disable`, `as` assertion, or `!` non-null enters the tree on any `+` line (`^\+.*( as [A-Z(]|!\.|!\)|@ts-|eslint-disable)` returns only prose containing the English word "as"). The report's § Files touched (`:98-136`) enumerates the same set the diff and status carry, with no file in one and not the others. § Observations and § Deviations disclose the out-of-scope residue and the `rm` and `npx` operational notes rather than concealing them.

## Findings outside the claims

None substantiated.

## Attacked and held

- **The flagship-fence transcriptions skip some fence statements.** `tests/guides.test.ts:262-289` omits the `reporter.table(...)` call of `guides/console.md:470-476`, and `:406-413` omits `paint`, `renderBox`, and `renderTable` from the fence at `:637-664`. This is correct, not a gap: every omitted line's comment is descriptive ("a bordered, width-aware grid", "content framed in box-drawing characters") rather than a claimed value, which is exactly what `.claude/rules/tests.md` § Cross-cutting proofs and the row's operative repair bind ("asserts every commented value"), and those fences' imports are still checked by `imports only real exports in every ```ts fence` at `:182-192`.
- **The fix-round fence controls redden a presence guard rather than a runtime assertion.** Planting a wrong comment in the guide breaks `carries the … lines the transcription copies`, not the executed case. The pair still binds a fence edit to a transcription edit, which is the rule's requirement, and the executed half asserts the real output independently.
- **`complete` survivors.** Every hit in `guides/console.md:82, 188, 252` and `src/core/constants.ts:465` is generic English, not the renamed `Progress` member; no `.complete` / `.completed` API form survives anywhere outside `node_modules`.
- **Moved class files.** `src/core/index.ts` star-exports both before and after, so `console-obj-8` and `console-obj-9` move no published symbol and owe no § Breaking row.

## Referrals to the Orchestrator

- **The exact replacement wording at `guides/console.md:603`** ("keep generated ANSI paired with out stripping") is ambiguous between "the sink's stripping" and "output stripping". The fix must not guess: name the wording in the fix brief. No transcription edit follows, because no presence guard in `tests/guides.test.ts:455-468` asserts that line.
- **`src/core/helpers.ts:167-169`** documents `selectWriter` with the string values `'out'` / `'err'` for `WriterSet` members. These are not the renamed option key, so they are outside claim 3; whether the package's one-concept-one-term ruling should reach a published example's sample data is a subjective-lane call, and that lane did not run this round.

## What closes claim 3

Replace the old word at each site, then record a sweep the question can actually answer.

- `/home/user/fleet/console/src/server/types.ts:67` → "enable or disable its styler for the `stdout` target."
- `/home/user/fleet/console/src/server/constants.ts:24` → "when the `stdout` stream is not a TTY".
- `/home/user/fleet/console/guides/console.md:603` → the wording the referral settles.
- `/home/user/fleet/console/tests/src/server/factories.test.ts:28` → "infers styling independently for a TTY `stdout` target and a piped `stderr` target"; `:224` → "falls back to 80 when the `stdout` stream is not a TTY".
- Record the sweep as `\b(out|err)\b` over `src`, `tests`, `guides/console.md`, `guides/README.md`, `README.md`, ruling each remaining hit: the permitted local bindings at `src/server/factories.ts:54-55, 58-59, 66, 77, 79`, the `selectWriter` example strings at `src/core/helpers.ts:167-169`, and ordinary English uses of "out". The narrow `\b(out|err)\s*:` pattern reports on the object-literal key spelling alone and must not be the recorded proof for this row.

VERDICT: FAIL 3; outside the claims: none
