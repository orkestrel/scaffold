<!-- checker on native Sonnet, workflow wf_8a54447e-081, agent a5d096cb22c8b9319; law read of the pending document; retained 2026-09-20 -->

## Table 1 — Forbidden or non-conforming lines

| Line | Text | Rule (file:line) | Departure |
|---|---|---|---|
| — | — | — | None found. Every reviewed line (surface scope, file placement, naming forms, barrel/export handling, permission floor, deviation contract, control/plant use, gate ordering) matches its governing rule and the standing rulings. No line adds a surface, adds a package, amends a scaffold rule, touches a vendored/content-owned path, or invents a fixed name outside what `.claude/rules/architecture.md`, `names.md`, and `patterns.md` admit. |

Two items reviewed and found within rule bounds, not raised as departures because each stays inside a scope the brief explicitly leaves to the executor's judgment (`AGENTS.md` § Deviation protocol, "Resolve an ancillary choice within the owned scope"), matching the brief's own Deviation contract line 138 ("Decide, record, and carry on from: the ownership's placement..."):
- Line 89 (`u7b-brief.md:89`), the WeakSet ownership-placement choice between `constants.ts` and a `#` static — `.claude/rules/architecture.md:58` (`constants.ts` holds frozen object/array **data**) leaves ambiguity for a mutable ownership tracker, but the brief defers the decision to the unit rather than mandating the `constants.ts` option.
- Lines 58-60, the `PLANT-ORDER`/`PLANT-LEAK` controls plant into the implementation files under test (`Button.ts`, `Delegate.ts`), not into the test files verifying them, consistent with `.agents/orchestration.md` § Permission floor's plant rule and `AGENTS.md` § TTTDD's failing-proof requirement.

## Table 2 — File paths the document instructs an executor to create or edit

| File path | Rule row placing it |
|---|---|
| `src/browser/types.ts` | `.claude/rules/architecture.md:18` (Interfaces/types → `*/types.ts`) |
| `src/browser/constants.ts` | `.claude/rules/architecture.md:19` (Constants/data → `*/constants.ts`) |
| `src/browser/helpers.ts` (new) | `.claude/rules/architecture.md:21` (Pure helpers → `*/helpers.ts`) |
| `src/browser/validators.ts` | `.claude/rules/architecture.md:22` (Guards → `*/validators.ts`) |
| `src/browser/Button.ts` (new) | `.claude/rules/architecture.md:39` (Implementations, one class per file); lone-class-flat-at-root placement per `.claude/rules/architecture.md:213-217` (Entity subfolders nest only when a family exists) |
| `src/browser/Delegate.ts` (new) | `.claude/rules/architecture.md:39`, same placement basis as `Button.ts` |
| `src/browser/index.ts` | `.claude/rules/architecture.md:38, 254-290` (Public exports / Barrel exports) |
| `tests/src/browser/Button.test.ts` (new) | `.claude/rules/names.md:215` (Test → source filename without extension + `.test`) |
| `tests/src/browser/Delegate.test.ts` (new) | `.claude/rules/names.md:215` |
| `tests/src/browser/helpers.test.ts` (new) | `.claude/rules/names.md:215` |
| `tests/src/browser/validators.test.ts` | `.claude/rules/names.md:215` |
| `tests/src/browser/index.test.ts` | `.claude/rules/names.md:215`; barrel export-set/no-listener assertion basis in `.claude/rules/architecture.md:149-152` |
| `tmp/units/u7b-report.md` (Output section) | no row — process/orchestration artifact, not a source or test file the centralized-file or naming tables govern |

The document adds no surface beyond `browser` (the package's existing core/browser/server/styles set): it scopes every write to `src/browser/**` and `tests/src/browser/**`, explicitly forbids a subpath export, side-effect entry, build wrapper, or manifest row, and touches no `app/**`, `src/core/**`, `src/styles/**`, `guides/**`, `package.json`, or `configs/**` path.
