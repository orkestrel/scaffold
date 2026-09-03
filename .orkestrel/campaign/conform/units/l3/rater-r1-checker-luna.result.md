1. CONFIRMED — All rows have tree evidence: edits appear at `README.md:20`, `tests/guides.test.ts:195`, `tests/setup.ts:155`, `src/core/helpers.ts:40`, `guides/rater.md:223`, and related files. The `isBrowserVuePath` sweep is clean. Classes at `src/core/Rater.ts:47`, `src/core/errors.ts:18`, and `tests/setup.ts:155` show no fleet-F2 violation.

2. not held

3. REFUTED — The exact word-boundary sweep over `src/**`, `tests/**`, `guides/rater.md`, `guides/README.md`, and `README.md` is empty. The required case-insensitive inflection sweep is not empty: it matches legitimate `LineDefinition` and `RatingDefinition` symbols at `src/core/types.ts:27`, `src/core/validators.ts:65`, `tests/setup.ts:98`, and `guides/rater.md:69`. The report records these matches, so the stated empty-sweep condition is false.

4. not held

5. CONFIRMED — `src/core/index.ts:1-7` exports the source surface, and `guides/rater.md:64-153` documents it, including the renamed builders. Its method table at `guides/rater.md:275-278` matches `RaterInterface` members at `src/core/types.ts:168-174`. Guide fences use `@orkestrel/rater` at `guides/rater.md:22`, `90`, `125`, `160`, `192`, and `280`. The `AGENTS §` sweep over all touched files is empty.

6. not held

7. CONFIRMED — `conform-rater.status:1-11` lists only owned files, matching the diff headers at `conform-rater.diff:1`, `31`, `49`, `203`, `353`, `527`, `558`, `677`, `829`, `869`, and `999`. The added-line compatibility/shim sweep is empty. No `package-lock.json`, `node_modules`, or off-limits path appears.

8. not held

9. CONFIRMED — The added-line sweep over `conform-rater.diff` is clean for TODOs, deferred work, debug residue, retries, and test modifiers. The diff headers match the report's touched-file table. Current owned-file sweeps show no added hidden residue.

Findings outside the claims

- F-1 — `tests/src/core/validators.test.ts:35` says `accepts the three stage literals`. Replace the title with `accepts the Stage literals`; delete the count without changing the assertions.
- F-2 — `guides/reason.md`, `guides/contract.md`, `guides/emitter.md`, and `guides/guide.md` contain `via` and `AGENTS §N` prose. Fix the owning package guides, then refresh these byte-identical mirrors.

Referrals

- R-1 — The case-insensitive old-name sweep matches valid PascalCase type names. Orchestrator: rule whether those distinct type symbols are exempt from the sweep's empty-result requirement.
- R-2 — `.oxlintrc.json:87-90` scopes `policy/no-nested-functions` to `src/**` and `app/**`, while the architecture rule applies to tests. Orchestrator: decide whether the fleet-wide policy instrument must include `tests/**`.

VERDICT: FAIL 3

Journal

Deviation

None. All named files were readable, and containment showed no tree change.