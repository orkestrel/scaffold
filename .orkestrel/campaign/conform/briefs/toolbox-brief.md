# Conformance audit — toolbox

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/toolbox`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/toolbox` 0.0.11; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, check:src:server, format, format:check, lint:check, test, test:src, test:src:core, test:src:server, test:policy, test:config, test:guides, build, build:src, build:src:core, build:src:server, prepack, prepublishOnly, test:distribution, test:probe, test:bench, test:setup.
- Environments present: src/core, src/server.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/agent ^0.0.19, @orkestrel/contract ^0.0.15, @orkestrel/database ^0.0.12, @orkestrel/form ^0.0.3, @orkestrel/relation ^0.0.10, @orkestrel/server ^0.0.17, @orkestrel/terminal ^0.0.13, @orkestrel/tool ^0.0.12, @orkestrel/workflow ^0.0.16, @orkestrel/workspace ^0.0.6.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/toolbox/guides/toolbox.md`; index: `/home/user/fleet/toolbox/guides/README.md`; tests: `/home/user/fleet/toolbox/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 12; `should` in src and the package's own prose: 1; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **toolbox-c1** — The two-vocabulary seam: `createTerminalRoutes` and its constants beside `TerminalBridge` on the factory's return type. (fix/units/toolbox-audit-verdict.md:26) — lane: subjective
2. **toolbox-c2** — The s10-18 rename remainder: `databaseToolCode` → `inferDatabaseCode` and `relationToolCode` → `inferRelationCode`, left deferred by the fix round. (fix/breaking-plan.md:168) — lane: subjective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
