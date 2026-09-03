# Conformance audit — sqlite

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/sqlite`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/sqlite` 0.0.9; scripts: clean, copy, scaffold, lint, check, check:src, check:src:server, format, format:check, lint:check, test, test:src, test:src:server, test:policy, test:config, test:guides, build, build:src, build:src:server, prepublishOnly, test:distribution, test:probe, test:bench, prepack, test:setup.
- Environments present: src/server.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/sqlite/guides/sqlite.md`; index: `/home/user/fleet/sqlite/guides/README.md`; tests: `/home/user/fleet/sqlite/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 12; `should` in src and the package's own prose: 1; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **sqlite-c1** — `SQLiteStatementInterface.run` is a synonym for `execute` under § Fixed lifecycle vocabulary; the guide describes `run`/`get`/`all`/`iterate` with the prose verb "Execute"; the guide's `## Contract` preamble names a `src/server/sqlite` directory that does not exist. (fix/units/sqlite-audit-verdict.md:33) — lane: subjective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
