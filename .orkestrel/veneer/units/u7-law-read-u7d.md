<!-- checker on native Sonnet, workflow wf_8a54447e-081, agent a4163ce993144dcd4; law read of the pending document; retained 2026-09-20 -->

## Findings

**Table 1 — forbidden actions, surface/package additions, scaffold-rule amendments, vendored-file touches, inadmissible fixed names, or contradictions of standing rulings**

| Line | Text | Rule (file:line) | Departure |
| --- | --- | --- | --- |
| — | — | — | None found. Every reviewed line stays inside `tests/` and `guides/veneer.md`, touches no `src/**`, `app/**`, `package.json`, or vendored file, adds no package, adds no subpath export/side-effect entry/build wrapper/manifest row, and amends no scaffold rule. |

Verification notes behind the "none found" reading:

- Lines 5-9 (role/engine constraints: no commit, no install, no `scaffold repair`, no tree-wide `format`/lint `--fix`/`build`, no `git checkout`/`restore`/`stash`/`reset`/`clean`/`add`) match `.agents/orchestration.md` § Permission floor and § Long-running commands verbatim; no departure.
- Scope lines 79-83 name `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts` (item 7 only), `guides/veneer.md`, and the report as owned, with `tests/fixtures/oracle/**`, `src/**`, `package.json` off-limits — none of these are the vendored content-owned set. `guides/scaffold.md:1141-1142` names scaffold's content-owned setup files as exactly `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`; the brief's owned files are outside that set, so none is vendored or content-owned.
- No line mentions `vue`, `Vue`, a fifth surface, RTL, or an `app/vue` or `src/vue` path (`Grep` over the brief for `vue|Vue` returned no matches); the objective and all eight items stay inside the styles-pilot guide section (`## Styles`) already present per `guides/veneer.md`'s existing `### Files`/`### Scripts`/`### Departures from the workspace rows`, consistent with the standing ruling that surfaces are core, browser, server, and styles only, and Vue is a deferred service.
- Category-union additions `selector`/`variable` and the `engine` component value (lines 91-98) are real domain states naming an existing discriminant column (`Component`/`category`), not a renamed `kind`/`type` axis — consistent with `.claude/rules/names.md:118,121` (Named discriminants) and `AGENTS.md` § Design laws "Real domain states only" / "Named discriminants."
- Reader/helper names (`readDeferrals`, `readCompatibility`, `readBuiltCascade`, `readBootstrapCascade`, `scanOracleFixture`, `ORACLE_TIMEOUT`, `BOOTSTRAP_CASCADE_PATH`) follow the fixed `read*`/`scan*`/UPPER_SNAKE_CASE forms in `.claude/rules/names.md:97-99,179`. The `PLANT-*` control labels (lines 61-69) are brief-only instrument names, not committed source symbols — line 68 explicitly bars naming a test after a control, matching `.claude/rules/tests.md:135-141` (Probes: "prove the instrument can fail... promote or delete... never commit a probe").
- Controls restore by manual edit and byte comparison (lines 61-69, 115), never by the banned `git` undo commands, matching `.agents/orchestration.md` § Permission floor ("A role that must undo its own edit undoes exactly that edit").
- Item 8's gate list (lines 129-131) is a scoped subset, consistent with `AGENTS.md` § Work process ("Use scoped checks and tests during development").
- No line proposes a subpath export, a side-effect entry, a build wrapper, a manifest row, or a change to any scaffold rule file; `package.json` and everything under `src/**` are explicitly off-limits (line 83).

**Table 2 — file paths the document tells an executor to create or edit, with the placing rule**

| Path | Create/edit | Rule row (file:line) |
| --- | --- | --- |
| `tests/setupConformance.ts` | edit | `.claude/rules/tests.md:21` (a root `tests/setup*.test.ts` proof is resolved against its sibling `tests/setup*.ts` module) |
| `tests/setupConformance.test.ts` | edit | `.claude/rules/tests.md:21` (same sibling-pair rule) |
| `tests/conformance.test.ts` | edit | `.claude/rules/tests.md:56` (Cross-cutting proofs table: `tests/conformance.test.ts` proves "where this package drifts from the official tooling it tracks") |
| `tests/setupStyles.ts` | edit (item 7, `BOOTSTRAP_CASCADE_PATH` read only) | `.claude/rules/tests.md:198` (Place helpers by environment: `tests/setupStyles.ts` is CSS/style helpers and compiled cascade) |
| `guides/veneer.md` | edit (§ Compatibility rows, new `### Deferred selectors` subsection under `## Styles`) | `.claude/rules/names.md:216` (Files and folders: Guide → lowercase domain, e.g. `agents.md`) and `AGENTS.md` § Documentation contract (one guide per package, user standing ruling) |
| `u7d-report.md` | create | no rule row in the coding rule set; placed by `.agents/orchestration.md` § Dispatch anatomy ("Write the unit's returned report in the SAME action that commits its code... under `<unit>-report.md`") |

The document adds no surface: every owned or off-limits path stays inside `tests/` and `guides/veneer.md` for the existing Veneer package, touches no `src/**`, `app/**`, or `package.json`, and names no Vue, RTL, or fifth-surface work.
