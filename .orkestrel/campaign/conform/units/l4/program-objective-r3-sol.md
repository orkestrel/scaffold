## Per-claim verdicts

1. **CONFIRMED.** The disposition table covers every brief row as `applied` or evidenced `noop`; no row is omitted (`conform-program-report.md:31-58`).

2. **REFUTED.** The program-subj-6 changes place overload-specific notes in public TSDoc at `src/core/types.ts:239-240` and `src/core/types.ts:496`, contrary to `typescript.md:83`, which requires single-line `//` comments. Both lines are additions in `conform-program.diff:1268,1520`. Move each note outside the TSDoc into a single-line comment before its overload block.

3. **CONFIRMED.** The word-boundary sweep for `STATUS_PRECEDENCE|buildNotices|buildLimits|tallyProgram|isBrowserVuePath|buildQualification|buildDefinition|ScriptedQualifier|ScriptedReason|logicalPremises|qualificationDefinition|rulingDefinition|lineDefinition|ratingDefinition` and the case-insensitive `s|es|ed|ing` sweep returned empty across `src`, package-owned `tests`, `guides/program.md`, `guides/README.md`, and `README.md`. The remaining `.size` hits are permitted `Set.size` uses at `src/core/helpers.ts:537` and `tests/setup.test.ts:477`.

4. **REFUTED.** The exact program-obj-1 test name at `tests/setup.test.ts:313` does not occur in the diff. Its body calls `destroy()` only once at `tests/setup.test.ts:315-318`, so an implementation that increments only on its first call satisfies a test named “counts every destroy.” Add a second call and an expectation of `destroyCount === 2`, then capture the corresponding red and green command readings. The existing control records `1 failed, 84 passed (85)` and `85 passed (85)` in `program-obj-1-red.txt:28-29` and `program-obj-1-green.txt:5-6`.

5. **CONFIRMED.** Program methods in `src/core/types.ts:284-358` match `guides/program.md:405-409`; manager methods in `src/core/types.ts:406-573` match `guides/program.md:426-432`. Readonly members appear in Surface rows at `guides/program.md:148-151`. The `from '@src` guide-fence sweep and `AGENTS §` sweep returned empty on the owned paths. Flagship transcription and presence guards are at `tests/guides.test.ts:192-265`.

6. **CONFIRMED.** The breaking table names each removed or renamed published symbol and its replacement at `conform-program-report.md:180-190`. The `"@orkestrel/program"` package-manifest sweep over `/home/user/fleet`, excluding ignored directories, found only this package at `package.json:2`; no fleet consumer edit is owed.

7. **CONFIRMED.** Every path in `conform-program.status:1-18` is owned. No off-limits path, lockfile, or dependency tree appears. The old-name sweeps returned empty, which also excludes compatibility aliases and re-exports.

8. **CONFIRMED.** The added-line sweep `\.skip\(|\.only\(|\.todo\(|retry|timeout` over `conform-program.diff` returned empty. The report names `format:check`, `lint:check`, `check`, `build`, and `test` with commands and reported exit 0 at `conform-program-report.md:204-212`. The independent gate reading is **NOT-EVIDENCED** in this read-only lane; the Orchestrator’s landing run settles it.

9. **CONFIRMED.** Added-line and owned-tree sweeps for `TODO|FIXME|console\.|debugger` returned empty. Diff review found no deferred or commented-out implementation. The report’s disposition and touched-file tables match the diff and status (`conform-program-report.md:31-79`).

## Findings outside the claims

None.

## Referrals to the Orchestrator

None.

FAIL 2, 4