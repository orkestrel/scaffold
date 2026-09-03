# Conformance audit — sea

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/sea`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/sea` 0.0.13; scripts: clean, copy, scaffold, lint, check, check:src, check:src:server, format, format:check, lint:check, test, test:src, test:src:server, test:integration, test:policy, test:config, test:guides, build, build:src, build:src:server, prepack, prepublishOnly, test:distribution, test:probe, test:bench, test:setup.
- Environments present: src/server.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/process ^0.0.9.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/sea/guides/sea.md`; index: `/home/user/fleet/sea/guides/README.md`; tests: `/home/user/fleet/sea/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 7; `should` in src and the package's own prose: 4; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 7 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **sea-c1** — `readPEOffset` returns the sentinel `0` on a short read where the `read*` contract returns or throws; `ELFNoteHeader` names the header half of a type whose `total` spans the whole padded entry; the injector's alias `noteEntryTotal` → `noteTotal`. (fix/units/sea-audit-verdict.md:22) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
