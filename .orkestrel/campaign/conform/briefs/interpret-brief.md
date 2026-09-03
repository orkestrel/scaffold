# Conformance audit — interpret

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/interpret`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/interpret` 0.0.11; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, format, format:check, lint:check, test, test:src, test:src:core, test:policy, test:config, test:guides, build, build:src, build:src:core, prepublishOnly, test:distribution, test:probe, test:bench, prepack, test:setup.
- Environments present: src/core.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/reason ^0.0.8, @orkestrel/template ^0.0.5.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/interpret/guides/interpret.md`; index: `/home/user/fleet/interpret/guides/README.md`; tests: `/home/user/fleet/interpret/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 10; `should` in src and the package's own prose: 1; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **interpret-c1** — `InterpretEventMap` publishes `add` without `remove`; variable-length aggregates have no declarable computation. (fix/units/interpret-audit-verdict.md:43) — lane: subjective
2. **interpret-c2** — The overload-forced statements at `src/core/Interpret.ts:336-337`. (fix/units/interpret-audit-verdict.md:48) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
