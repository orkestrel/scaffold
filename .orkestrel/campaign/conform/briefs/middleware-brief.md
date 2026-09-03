# Conformance audit — middleware

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/middleware`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/middleware` 0.0.18; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, check:src:server, format, format:check, lint:check, test, test:src, test:src:core, test:src:server, test:policy, test:config, test:guides, build, build:src, build:src:core, build:src:server, prepack, prepublishOnly, test:distribution, test:probe, test:bench, test:setup.
- Environments present: src/core, src/server.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/abort ^0.0.8, @orkestrel/budget ^0.0.8, @orkestrel/contract ^0.0.15, @orkestrel/timeout ^0.0.8.
- Declared `@orkestrel/*` peer dependencies: @orkestrel/database ^0.0.12, @orkestrel/server ^0.0.17.
- Declared `@orkestrel/*` development dependencies: @orkestrel/database ^0.0.12, @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/router ^0.0.12, @orkestrel/scaffold ^0.0.59, @orkestrel/server ^0.0.17, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/middleware/guides/middleware.md`; index: `/home/user/fleet/middleware/guides/README.md`; tests: `/home/user/fleet/middleware/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 8; `should` in src and the package's own prose: 1; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 3 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **middleware-c1** — `Session.set` beside `SessionStoreInterface.set` (one word, two operations); `SessionLimits` as a bare `*Limits` for a partial; the `Input` suffix carrying two senses in one file; the restore step's callback type spelled inline rather than declared in `types.ts`. (fix/units/middleware-audit-verdict.md:36) — lane: subjective
2. **middleware-c2** — Tally drift: `size` where `count` is the lone unambiguous tally (`.claude/rules/names.md` § Tallies); the plan recorded it and took no row. (fix/breaking-plan.md:165) — lane: subjective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
