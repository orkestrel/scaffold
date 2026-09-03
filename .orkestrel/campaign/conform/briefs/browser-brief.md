# Conformance audit — browser

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/browser`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/browser` 0.0.14; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, check:src:server, format, format:check, lint:check, test, test:src, test:src:core, test:src:server, test:policy, test:config, test:guides, build, build:src, build:src:core, build:src:server, prepack, prepublishOnly, test:distribution, test:probe, test:bench, test:setup.
- Environments present: src/core, src/server.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/html ^0.0.7, @orkestrel/websocket ^0.0.10.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/browser/guides/browser.md`; index: `/home/user/fleet/browser/guides/README.md`; tests: `/home/user/fleet/browser/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 2; `should` in src and the package's own prose: 1; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **browser-c1** — `parseBrowserChord` is a throwing `parse*` in `helpers.ts`; `evaluate(expression, timeout?)` carries a positional timeout; `findInStore`'s plurality; the driver-interface split that would let drive methods leave the consumer contract. (fix/units/browser-audit-verdict.md:59) — lane: subjective
2. **browser-c2** — The `helpers.ts` ↔ `parsers.ts` module cycle, proven safe by the dist probe, is recorded as a shape observation; rule it against § Kind purity's leaf-pair law. (fix/units/browser-audit-verdict.md:62) — lane: objective
3. **browser-c3** — Finder resolution spawns without `@orkestrel/process`, rejected this campaign as an unrequested dependency; rule under `.claude/rules/portability.md` § Processes and executables as the package stands. (registry.md:173) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
