# CONDITIONS (`cn`) audit — `checker` on Sonnet verdict

**Claim 1 — Delta and scope: CONFIRMED.** `cn-status.txt:1-2` lists exactly ` M tests/setupServer.test.ts` and ` M tests/setupServer.ts`; `cn.diff:1-97` shows only those two files' hunks; no vendored file, no `src/**`, no `app/**`, no sibling-unit file appears.

**Claim 2 — The mechanism: CONFIRMED.** `cn.diff:68-75` (the exported `normalizeMediaCondition`): signature unchanged; the `undefined` pass-through kept; the leading at-rule strip kept; the split on `/\s+and\s+/u`; the map through `normalizeMediaFeature`; the rejoin with `' and '` in written order. `cn.diff:46-57`: the module-scope `normalizeMediaFeature` carries the former single-feature body verbatim (`min-width` → `width >=`; integer `max-width` → `width <=`; fractional `max-width` → `width <` of the ceiling; else unchanged), a top-level declaration preceding the export. The doc blocks at `cn.diff:33-41` and `59-66` follow every code token with a noun or a quoted literal, with no banned term and no count.

**Claim 3 — The proof: CONFIRMED, mutation named.** `cn.diff:9-11` adds the compound assertion and `cn.diff:12-14` its reversed twin. The first fails under the single-feature body restored (the anchored pattern returns the compound raw on both sides, and the sides differ); the second additionally fails under a rewrite touching only the leading feature. Neither side of either comparison is identical text, so a fix that fails to rewrite the targeted feature produces unequal strings. `b-modal-cn-report.md:79-87` records the failing-first run (`1 failed | 96 passed (97)`) with the exact command, `:89-93` the isolated reversed-twin mutation red with the identical shape, `:95` the green rerun (`Tests 97 passed (97)`). The single-feature cases and the `@supports` control are unchanged.

**Claim 4 — Acceptance criteria: CONFIRMED.** `b-modal-cn-report.md:99-105`: format, lint, and typecheck exit 0; the scoped run under `--project setup` exits 0 with `Tests 97 passed (97)`, the deviation recorded under the criterion's own fallback clause (`:107-114`); `test:conformance` exits 0 with `22 passed (22)` and no ledger row changed; the report carries every § Output item.

**Claim 5 — Law and report: CONFIRMED, counts listed.** No `any`, `as`, `!`, suppression, mock, or nested function beyond the named callback passed to `.map`. No unconditionally banned term in the report. Counts stated: `1 failed | 96 passed (97)` (`:86`), `Tests 97 passed (97)` (`:95`, `:104`), `Tests 22 passed (22)` (`:105`); each a measurement tied to its command.

## Findings outside the claims

None.

VERDICT: PASS
