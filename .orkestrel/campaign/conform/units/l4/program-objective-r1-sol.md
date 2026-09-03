## Per-claim verdicts

1. **CONFIRMED.** Every row has an `applied` or evidenced `noop` disposition in `conform-program-report.md:30-58`.

2. **REFUTED.** `program-obj-3` requires presence guards for every transcribed fence line, but `tests/guides.test.ts:253-256` guards only the fence tail while `tests/guides.test.ts:195-250` transcribes its setup too. Also, `src/core/types.ts:267-270` combines `DESTROYED`, `MISMATCH`, and `RESERVED` under one `@throws` tag despite `program-subj-6` requiring a tag per code. Expand the presence guard and split each error code into its own `@throws` entry, mirrored on the classes.

3. **CONFIRMED.** These sweeps were empty across `src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src`, `guides/program.md`, `guides/README.md`, and `README.md`:
   - `\b(STATUS_PRECEDENCE|buildNotices|buildLimits|tallyProgram|isBrowserVuePath|buildQualification|buildDefinition|ScriptedQualifier|ScriptedReason|logicalPremises|qualificationDefinition|rulingDefinition|lineDefinition|ratingDefinition)\b`
   - The same alternatives followed by `(s|es|ed|ing)`, case-insensitive.
   - `manager\.size|readonly\s+size|aggregate\??\.by\b|\.by\b|[{,][[:space:]]*by:|\bby\?:|symbol\.kind`

4. **REFUTED.** The controls do not isolate each repair as `.claude/rules/tests.md` requires. `npm run test:setup` reports `9 failed, 76 passed (85)` in `obj1-obj2-obj5-setup-red.txt:10-202`; `npm run test:guides` reports `2 failed, 24 passed (26)` in `obj3-guides-red.txt:10-1109`; and `npm run test:src:core` reports `7 failed, 209 passed (216)` in `obj4-obj6-src-core-red.txt:10-159`. The report also states that the `createRecordingEngine` and `recordEvents` tests remained unchanged at `conform-program-report.md:33-34`, so their defect-naming tests are absent from the diff. Run each plant independently and record the named test failing, then the same command passing.

5. **CONFIRMED.** The method tables at `guides/program.md:400-443` match the call signatures at `src/core/types.ts:281-351` and `src/core/types.ts:413-554`; readonly members appear at `guides/program.md:148-151`; guide imports use published specifiers; and the `AGENTS §` sweep over the owned population was empty.

6. **CONFIRMED.** The replacement map and consumer edit forms appear at `conform-program-report.md:180-194`. The `\"@orkestrel/program\"` sweep over `/home/user/fleet/**/package.json` matched this package’s manifest and no dependent manifest.

7. **CONFIRMED.** `git status --short` and `git diff --name-only HEAD` list only Owned paths. `package-lock.json`, `node_modules`, and off-limits paths are absent. The compatibility-pattern sweep over diff additions found `alias` only at `src/core/validators.ts:338`, where it means a type alias, not a compatibility mechanism.

8. **CONFIRMED for prohibited controls; gate reading NOT-EVIDENCED.** The pattern `\.skip\(|\.only\(|\.todo\(|\bretry\b|\btimeout\b` was empty across diff additions and the owned population. `conform-program-report.md:202-221` names each required command with exit 0, but the landing run settles those gates.

9. **CONFIRMED.** The `TODO|FIXME|console\.|debugger` sweep was empty across diff additions and the owned population. The disposition table accounts for every changed hunk, and current status matches the supplied status evidence.

## Findings outside the claims

O1. `src/core/types.ts:457` and `src/core/programs/ProgramManager.ts:187` add “the new program’s id.” This uses temporal `new`, which `.claude/rules/writing.md` § Claims and time bans. Write: “After appending the program, the `add` event fires with its id.”

O2. `tests/guides.test.ts:227-250` destroys the program only after every assertion succeeds. An assertion failure skips cleanup, contrary to `.claude/rules/tests.md` § Discovery and adequacy audit. Put the execution and assertions in `try`, with `program.destroy()` in `finally`.

## Referrals to the Orchestrator

R1. Does `guides/program.md:173-176` accurately claim that the complete tally record derives from `STATUSES` when `completeTallies` hard-codes every status at `src/core/helpers.ts:824-830`? The refuter prescribed that prose, so this lane makes no verdict on it.

FAIL 2, 4