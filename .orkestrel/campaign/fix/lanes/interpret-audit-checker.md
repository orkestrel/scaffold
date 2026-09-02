<!-- task afeb9ac6c7e276944.output -->
## Per-claim verdicts

**Claim 1** — CONFIRMED. The report's Rows section (`/home/user/scaffold/tmp/units/breaking/interpret-report.md:7-19`) lists all thirteen rows the brief assigns (s12-25, s12-26, s12-29, s12-30, s12-34, s12-35, s12-37, s12-38, s12-39, s12-42, s12-43, s12-45, s12-21), each marked "applied." None are refused or stopped, so the rule-quote requirement for a refused row does not trigger.

**Claim 2** — CONFIRMED. `Grep` for `\b(GeneratorOptions|createTemplate|ManagerAddOptions|INTERPRET_ID|deriveAggregateField|INVALID_TEMPLATE|DEFAULT_ABBREVIATIONS|DEFAULT_CORRECTIONS|DEFAULT_ACTIONS|DEFAULT_DOMAINS|DEFAULT_VERBS)\b` returns no hits under `/home/user/fleet/interpret/src` and `/home/user/fleet/interpret/tests`. The only guide hit is `createTemplate` in `/home/user/fleet/interpret/guides/template.md`, a vendored mirror of the separate `@orkestrel/template` package's own export (off-limits per the brief's Scope § Off-limits), not interpret's removed factory. `\.register\(|\.unregister\(` and inflected `register`/`registered`/`registering` in `tests/src/core/Interpret.test.ts` return no hits. New contract symbols are declared in `/home/user/fleet/interpret/src/core/types.ts`: `count` at lines 587, 745, 762, 776; `RecordOptions` at line 607; `canonicalizeNode` documented and re-exported in the guide (`guides/interpret.md:315,369,380`).

**Claim 5** — CONFIRMED. `/home/user/fleet/interpret/guides/interpret.md` carries the moved symbols throughout (`count` rows at lines 117-129, 493-852; `RecordOptions` at 118, 800; `canonicalizeNode` at 315, 369, 380; `narrator` grouping at 109-120, 685-697). This package's parity `INTERNAL` list lives only in `/home/user/fleet/interpret/tests/guides.test.ts` (no in-guide `INTERNAL` table), consistent with the report's scope. The report's Tests changed section names specific new assertions for each behavior claim (unmatched-axis omission, cycle-marker rendering, per-element computation binding), not substring checks, matching the report's own text.

**Claim 6** — CONFIRMED. `/home/user/scaffold/tmp/units/breaking/interpret.status` lists only `README.md`, `guides/interpret.md`, `src/core/**`, and `tests/**` (excluding `setupPolicy.ts`/`policy.test.ts`) as modified. Nothing under `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a vendored guide mirror appears in the status output.

**Claim 7** — CONFIRMED (evidence is the report's quotation, not an independent re-run). The report quotes the exact command and exit code for each gate at `/home/user/scaffold/tmp/units/breaking/interpret-report.md:111-115`: `npm run format:check` → exit 0, `npm run lint:check` → exit 0, `npm run check` → exit 0, `npm run build` → exit 0, `npm test` → exit 0. This lane has no shell and does not re-execute the chain; per the brief's own instruction, the verdict rests on whether these quotes exist, and they do.

## Terminal line

PASS
