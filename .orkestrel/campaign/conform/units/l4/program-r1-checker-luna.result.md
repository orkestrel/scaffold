1. **CONFIRMED** — The tree contains the operative repairs for every applied row. The documented `program-obj-9` exemption remains at `src/core/helpers.ts:601-619` and `guides/program.md:350`. The `fleet-F2` trigger is absent: `Program` places private fields before `id` at `src/core/programs/Program.ts:74-90`, and `ProgramManager` has no `id` field at `src/core/programs/ProgramManager.ts:38-48`.

2. not held

3. **CONFIRMED** — The word-boundary old-name sweep over `src`, `tests`, `guides/program.md`, `guides/README.md`, and `README.md` is empty. The case-insensitive inflection sweep over the same population is also empty. The structural `by`/`size`/`symbol.kind` sweep is clean except for permitted `Set.prototype.size` uses at `src/core/helpers.ts:536` and `tests/setup.test.ts:477`.

4. not held

5. **CONFIRMED** — Current exports are the guide’s documented surface at `src/core/index.ts:1-8` and `guides/program.md:129-394`. Interface methods and implementation methods match at `src/core/types.ts:242-554`, `guides/program.md:400-435`, `src/core/programs/Program.ts:168-274`, and `src/core/programs/ProgramManager.ts:223-318`. The flagship fence transcriptions and presence guards are at `tests/guides.test.ts:186-266`. No imported guide fence uses `@src/*`, and the `AGENTS §` sweep is empty in touched files.

6. not held

7. **CONFIRMED** — `/home/user/work/evidence/conform-program.status:1-18` lists only owned files. The current barrel at `src/core/index.ts:1-8` contains no compatibility alias or selective re-export, and the old-name sweep over the owned population is empty.

8. not held

9. **CONFIRMED** — The added-line residue sweep over `/home/user/work/evidence/conform-program.diff:1-3897` finds no TODO, deferred marker, commented-out code, debugger, or console-debug residue. Structural commented-code sweeps over `src` and changed tests are empty. The `deferred` occurrence at `tests/setup.test.ts:12` is unchanged header prose, not added residue. The disposition-covered changes appear in the diff hunks.

Findings outside the claims

- **F-1** — `src/core/helpers.ts:452-453` counts duplicate members as “two rating lines or two notices.” Replace with “duplicate rating lines or notices share an id.”
- **F-2** — `tests/setup.test.ts:465` counts “the first four subjects.” Replace with “the subject entries.”
- **F-3** — `tests/setup.test.ts:723` counts “two lines.” Replace with “the rating lines.”
- **F-4** — `tests/setup.test.ts:780` counts “two broken fixtures.” Replace with “broken fixtures.”
- **F-5** — `tests/setup.test.ts:4` uses “below.” Replace with “listed.”
- **F-6** — `tests/guides.test.ts:48` uses “below.” Replace with “following.”
- **F-7** — `guides/program.md:932` uses “above.” Replace with “in the preceding example.”

Referrals

none

VERDICT: FAIL none; outside the claims: F-1, F-2, F-3, F-4, F-5, F-6, F-7

Journal

Leave for the driver.

Deviation

None. All required files were readable; no tree changes were made.