# Conformance audit — scaffold

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/scaffold`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/scaffold` 0.0.59; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, check:src:server, check:src:bin, format, format:check, lint:check, test, test:src:core, test:src:server, test:src:bin, test:policy, test:config, test:guides, test:distribution, test:probe, test:bench, build, build:src, build:src:core, build:src:server, build:src:bin, build:host, build:inventory, prepack, prepublishOnly.
- Environments present: src/core, src/server, src/bin.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/console ^0.0.11, @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/markdown ^0.0.12, @orkestrel/process ^0.0.9, @orkestrel/template ^0.0.5.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/html ^0.0.7, @orkestrel/probe ^0.0.11, @orkestrel/test ^0.0.11.
- Guide: `/home/user/scaffold/guides/scaffold.md`; index: `/home/user/scaffold/guides/README.md`; tests: `/home/user/scaffold/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: unmeasured; `should` in src and the package's own prose: unmeasured; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: unmeasured (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: unmeasured; `/tmp` literals in src: unmeasured. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **scaffold-c1** — `tests/setupPolicy.ts` walks top-level statements while the oxlint policy plugin sees inside a class body; rule whether the split matches `.claude/rules/workspace.md` § Policy instruments (one instrument per rule) or leaves a rule with no instrument. (npm-audit-deps-findings.md:571) — lane: objective
2. **scaffold-c2** — `AGENTS §N` citations survive in guides and tests across the fleet; rule scaffold's own guides and tests. (npm-audit-deps-findings.md:518) — lane: objective
3. **scaffold-c3** — Scaffold's vendored host surface moved (names.md vocabulary, tests.md helpers); the `dist/host` inventory and `host.json` must match the committed canon. (fix/units/scaffold-adopt-audit-verdict.md:16) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
