# AD4-9b — checker lane (Sonnet, native; Read, Grep, Glob) — returned 2026-09-15

Subject: D4-9b (the overload pin's name, controls, door, and the collision key), diff `D49b-diff.patch.txt`, report `D49b-scaffold-overload-pin-report.md`, gates `D49b-scaffold-gates-orchestrator.log.txt`, probe `P23-d49b-key-probe.md`. Brief: `AD49b-audit-brief.md`.

VERDICT AD4-9b — MECHANICAL lane (checker, Sonnet)

1. CONFIRMED — `tests/setupPolicy.test.ts:161` `it('reads each signature of an exported function overload'`, directly preceded by blank line 160 and followed by blank line 191 before `it('locates declarations across comments and CRLF while normalizing paths'` at `tests/setupPolicy.test.ts:192`. Grep over the file returns no occurrence of `reads an exported function overload as one name`.
2. CONFIRMED — `tests/setupPolicy.test.ts:171-175` asserts `buildResult` at lines 1, 2, 3; `:176-178` `export default 1` → `export statement is unsupported at tests/setupServer.ts:1: ExportDefaultDeclaration`; `:179-186` `export import Legacy = require('node:path')` → `export declaration is unsupported at tests/setupServer.ts:1: TSImportEqualsDeclaration`; `:187-189` `export = 1` → `export statement is unsupported at tests/setupServer.ts:1: TSExportAssignment`.
3. CONFIRMED — `tests/setupPolicy.ts:83-90` carries the `function overload` row (two signatures plus `waitForCondition` implementation) directly after the `function` row at `:83`; `tests/setupPolicy.test.ts:21-40` loops `POLICY_SURFACE_EXPORT_CASES` and asserts each scenario's violation at `line: 1` through `inspectPolicyWorkspace`.
4. CONFIRMED — `tests/setupPolicy.ts:1985` builds the dedupe key from `path`, `name`, `owner` only (no `line`); `tests/setupPolicy.test.ts:42-68` asserts the filtered list equals exactly one violation at line 1; report red-then-green readings at `D49b-scaffold-overload-pin-report.md:17-18`; `P23-d49b-key-probe.md:20-31` independently reproduces both readings by mutation (key with `line` restored fails one test, 32 passed; restored key passes 33/33).
5. CONFIRMED — `D49b-diff.patch.txt:93-130` (`git diff HEAD`) moves `host.json` only at the `guides/agent.md` entry digest, `guides/tool.md` entry digest, `tests/setupPolicy.ts` entry digest, and the manifest digest; the report's closing note (`D49b-scaffold-overload-pin-report.md:69-75`) correctly attributes the `guides/agent.md`/`guides/tool.md` movement to the pre-existing floor refresh (ledger `K-scaffold-floor-69`, `.orkestrel/campaign/ledger.md:469`) and the `tests/setupPolicy.ts` entry's prior value `9f3ab06e…` to D4-9 (`D49-diff.patch.txt:10`, matching); D4-9b's own movement is `9f3ab06e…` → `22f94ac2…` plus the manifest digest, confirmed against the live diff. Staged count unchanged: `D49b-scaffold-gates-orchestrator.log.txt:63,66` both report `staged 172 file(s)`.
6. CONFIRMED — `D49b-diff.patch.txt` names only `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `host.json` in scope (D4-9b delta), consistent with the standing facts on the rest of the dirty tree; every gate step in `D49b-scaffold-gates-orchestrator.log.txt` exits 0 (`exit=0` at lines 9, 13, 25, 67, 109) and `D49b-scaffold-gates-test-full.log.txt` shows every sub-suite passed with no failures; the hunks (`D49b-diff.patch.txt:69-90, 131-207`) carry no `any`, `as`/`!` assertion, nested function declaration, or default export — `export default 1` and `export = 1` are fixture string literals, not code — and no numeral count in added prose (line numbers `1`/`2`/`3` in `toEqual` are data values, not counts of a growable set).

outside:
- required: none found beyond claim 7/8, which the brief assigns to the subjective/objective lanes.
- recommended: none.
- carry-forward: none.

Claims 7 and 8 require design-fit and correctness judgment (test-name adequacy under `.claude/rules/tests.md`, semantic completeness of the key change across every TypeScript declaration-merging form, and the ship/no-ship recommendation) that the mechanical lane cannot rule on from file:line evidence alone — referred to the `reviewer` and `analyst` lanes per the brief's lane assignment.

VERDICT: PASS
