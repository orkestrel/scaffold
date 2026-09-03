1. CONFIRMED — Applied repairs and evidenced noops are present in `src/core/types.ts:242-556`, `src/core/helpers.ts:202-1027`, `tests/setup.ts:90-640`, `tests/guides.test.ts:192-269`, and `guides/program.md:128-365`. The `formatGroupKey` exemption is documented at `src/core/helpers.ts:600-610`; Fleet-F2 has no matching class shape at `Program.ts:74-90` and `ProgramManager.ts:38-48`.

2. not held

3. CONFIRMED — The word-boundary old-name pattern and the case-insensitive inflection pattern `(...)(s|es|ed|ing)` returned no matches across `src/**`, `tests/**`, `guides/program.md`, `guides/README.md`, and `README.md`. The recorded population names those paths.

4. not held

5. CONFIRMED — Updated Surface and helper rows are present at `guides/program.md:128-365`; method tables and data members are present at `guides/program.md:400-436`; published-specifier fences occur at `guides/program.md:37,114,185,255,321,340,359,381`. Fence execution and presence guards are implemented at `tests/guides.test.ts:192-269`. The `AGENTS §` sweep over touched files returned no matches.

6. not held

7. CONFIRMED — `conform-program.status:1-18` lists only owned files. No package lock, `node_modules`, off-limits path, compatibility alias, or re-export appears; `src/core/index.ts:1-8` contains only direct star exports, and the old-name sweep is empty.

8. not held

9. CONFIRMED — Added-line sweeps over `conform-program.diff:1-3986` for TODO/FIXME/debug residue, commented-out code, skips/only/todo tests, retries, and timeout changes returned no matches. The disposition table at `conform-program-report.md:28-58` matches the diff headers and current replacements.

Findings outside the claims

none

Referrals

none

VERDICT: PASS

Journal

Left for the driver.

Deviation

None. No tree change was made, and no required file was unread.