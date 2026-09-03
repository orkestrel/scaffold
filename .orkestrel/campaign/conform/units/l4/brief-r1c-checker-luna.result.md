1. CONFIRMED — All rows have corresponding tree evidence: renamed builders in `src/core/helpers.ts:51-338`, moved fences in `tests/guides.test.ts:342-494`, validator docs in `src/core/validators.ts:47-270`, and fixture renames in `tests/setup.ts:47-80`. F1/F2 no-op sweeps are clean.

2. not held

3. CONFIRMED — Callable old-name sweep over `src/**`, `tests/**`, `guides/brief.md`, `guides/README.md`, and `README.md` finds only retained `BriefManager.brief`, `briefs`, and `gap(s)` message uses. The case-insensitive inflection sweep finds no old helper symbol. `gateDefinition`, `.complete`, `.kind`, and `entry.conclusion` sweeps are clean.

4. not held

5. CONFIRMED — Guide builders and helpers match current exports at `guides/brief.md:365-477`; method tables match interfaces at `guides/brief.md:640-711`; executed fences and their assertions are at `tests/guides.test.ts:342-494`. All guide fences import `@orkestrel/brief`; no `AGENTS §` citation exists in the touched-file sweep.

6. not held

7. CONFIRMED — The status lists only owned paths at `/home/user/work/evidence/conform-brief.status:1-22`; the diff names the same paths at `/home/user/work/evidence/conform-brief.diff:1-4534`. Alias, compatibility, shim, and re-export addition sweeps are clean; `src/core/index.ts:1-12` contains only expected barrel exports.

8. not held — The landing gate is outside this read-only lane. The added-line sweep for the first conjunct is clean.

9. CONFIRMED — Added-line sweeps over `/home/user/work/evidence/conform-brief.diff` find no TODO, deferred work, debug residue, console calls, commented-out code, alias, shim, or compatibility text. The report disposition table at `/home/user/scaffold/tmp/units/conform/conform-brief-report.md:60-77` matches the changed paths and observed repairs.

Findings outside the claims

none

Referrals

- Orchestrator: Has the landing gate chain run independently with `format:check`, `lint:check`, `check`, `build`, and `test` all exiting 0?

Claims attacked and held

- Claims 1, 3, 5, 7, and 9 held after independent tree, diff, status, parity, and residue sweeps.

VERDICT: PASS

Journal

left for the driver

Deviation

none