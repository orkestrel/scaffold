## Per-claim verdicts

1. **CONFIRMED.** Every row has `applied` or `noop` disposition in `conform-program-report.md:32-55`; the diff contains the corresponding edits or retained exempt state.

2. **REFUTED.** Added TSDoc violates the required “Thrown when …” form from `typescript.md:79`. Examples occur at `src/core/types.ts:400,408,425,445,498,515,534`, `src/core/programs/Program.ts:246`, and `src/core/programs/ProgramManager.ts:99,120,141,165,242,259,278`. The sweep `^\+.*@throws \{@link ProgramError\}` over `conform-program.diff` confirms these entered through this unit. Rewrite each as “Thrown when … (`'DESTROYED'`).”

3. **REFUTED.** The exact-name sweep `\b(STATUS_PRECEDENCE|buildNotices|…|ratingDefinition)\b` and mandatory-inflection sweep `\b(status_precedence|buildnotices|…|ratingdefinition)(s|es|ed|ing)\b`, run across `src`, `tests`, `guides/program.md`, `guides/README.md`, and `README.md`, are empty. However, the recorded inflection sweep at `conform-program-report.md:138-150` omits `buildQualification`, `buildDefinition`, `qualificationDefinition`, `rulingDefinition`, `lineDefinition`, and `ratingDefinition`. Add the complete pattern and paths to the report.

4. **REFUTED.** The behavioral captures contain the named red and green readings, but documentation rows lack their required recorded sweeps. For example, program-subj-10 and program-subj-14 state only resulting sites at `conform-program-report.md:50-54`; § Sweeps omits `\{@link [^}]+\}s|`FieldPath`s|`{{token}}`s` and `\(default `. Independent runs over `src` and `guides/program.md` are empty. Record those patterns and paths, along with the other documentation-row proofs.

5. **CONFIRMED.** Interface signatures at `src/core/types.ts:244-357,396-565` match the Surface and Methods rows at `guides/program.md:148-151,407-432`. Sweeps for `from '@src` in `guides/program.md` and `AGENTS §` in touched files are empty. Dependency mirrors containing those forms are off-limits and untouched.

6. **CONFIRMED.** The breaking table at `conform-program-report.md:181-198` names each removed public symbol and replacement. The sweep `"@orkestrel/program"` over `/home/user/fleet/**/package.json` finds only `program/package.json:2`, so no fleet consumer edit exists.

7. **CONFIRMED.** Current `git status --short` matches `conform-program.status:1-18`; every path is Owned. `package-lock.json`, off-limits files, and untracked files are absent. Exact old-name sweeps over `src` are empty, so no compatibility alias or shim remains.

8. **CONFIRMED.** The pattern `^\+.*(\.(skip|only|todo)\s*\(|\bretry\b|\btimeout\b|\bTODO\b|\bFIXME\b|console\.|\bdebugger\b)` over `conform-program.diff` is empty. The report names `format:check`, `lint:check`, `check`, `build`, and `test` with exit 0 at `conform-program-report.md:207-218`. Independent gate reading: **NOT-EVIDENCED**; the landing run settles it.

9. **REFUTED.** The disposition table’s evidence pointers do not match the tree. `conform-program-report.md:33` places `RecordingReason` at `tests/setup.ts:81` and `createRecordingEngine` at `:481`; their actual sites are `tests/setup.ts:92` and `:609`. Similar drift appears for `count`: the report cites `src/core/types.ts:387` and `ProgramManager.ts:118`, while the declarations are at `src/core/types.ts:402` and `src/core/programs/ProgramManager.ts:110`. Refresh every disposition pointer from the final tree.

## Findings outside the claims

- **O1.** `tests/setup.test.ts:4` uses a positional document pointer. Use “Each following contract is asserted …”.
- **O2.** `tests/setup.test.ts:465` counts table subjects. Use “matches the hand-written fixture table”.
- **O3.** `tests/setup.test.ts:723` counts rating lines. Use “gives the property rating distinct scoped lines”.
- **O4.** `tests/guides.test.ts:48` uses a positional pointer. Name the assertion that rejects an exported internal symbol.
- **O5.** `guides/program.md:932` uses a positional pointer. Use “as the preceding example shows”.
- **O6.** `tests/src/core/programs/ProgramManager.test.ts:157` says “hundreds of programs”, a count missed by the number-word sweep. Use “preserves count, lookup, order, and fresh arrays for a generated program collection”.

## Referrals to the Orchestrator

- **R1.** Can the report-only omissions and stale pointers from claims 3, 4, and 9 be corrected as landing metadata, or do they require a fix round?
- **R2.** Will a successor unit carry O1–O6 under the writing rules?
- **R3.** Will the landing verifier run the gate sequence that settles claim 8?

FAIL 2, 3, 4, 9