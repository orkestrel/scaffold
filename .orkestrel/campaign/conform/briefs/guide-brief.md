# Conformance audit — guide

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/guide`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/guide` 0.0.15; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, format, format:check, lint:check, test, test:src, test:src:core, test:policy, test:config, test:guides, build, build:src, build:src:core, prepublishOnly, test:distribution, test:probe, test:bench, prepack, test:setup.
- Environments present: src/core.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15, @orkestrel/markdown ^0.0.12.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/guide/guides/guide.md`; index: `/home/user/fleet/guide/guides/README.md`; tests: `/home/user/fleet/guide/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 17; `should` in src and the package's own prose: 4; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **guide-c1** — `Source.examples(name)` does not follow `extends`; the retirement block naming `extractCodeLines`, `moduleDirs`, `moduleKeys` in `helpers.test.ts`; `README.md` § API names `patterns()` where the interface exposes `fences()`. (fix/units/guide-audit-verdict.md:71) — lane: objective
2. **guide-c2** — `EXTERNAL_SCHEMES` omits `file:`. (registry.md:175) — lane: objective
3. **guide-c3** — Parity resolves only exports, so a renamed interface member ships a stale guide sentence with every gate green; rule whether `tests/guides.test.ts` owes a member-level check under `.claude/rules/documentation.md` § Parity. (fix/units/test-audit-verdict.md:23) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
