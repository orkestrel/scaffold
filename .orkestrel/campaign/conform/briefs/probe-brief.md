# Conformance audit — probe

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/probe`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/probe` 0.0.11; scripts: clean, copy, format, format:check, lint, lint:check, check, check:src, check:src:core, check:src:server, check:src:bin, test, test:src, test:src:core, test:src:server, test:src:bin, test:policy, test:config, test:setup, test:guides, test:distribution, test:probe, test:bench, build, build:src, build:src:core, build:src:server, build:src:bin, prepack, prepublishOnly.
- Environments present: src/core, src/server, src/bin.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/lsp ^0.0.5, @orkestrel/mcp ^0.0.27, @orkestrel/queue ^0.0.11, @orkestrel/timeout ^0.0.8, @orkestrel/tool ^0.0.12.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/probe/guides/probe.md`; index: `/home/user/fleet/probe/guides/README.md`; tests: `/home/user/fleet/probe/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 0; `should` in src and the package's own prose: 0; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 13 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **probe-c1** — `RuntimeStage` mints an exact-match overlay; a miss surfaces as a candidate-miss issue rather than a silent wrong answer; rule whether the behaviour is stated where a reader meets it. (registry.md:168) — lane: objective
2. **probe-c2** — The standing Oxlint language-server arming failure on this container predates the campaign; rule whether the arming path's deadline and failure behaviour are stated and tested as `.claude/rules/tests.md` § Delay requires. (npm-audit-deps-findings.md:867) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
