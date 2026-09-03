# Conformance audit — indexeddb

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/indexeddb`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/indexeddb` 0.0.9; scripts: clean, copy, scaffold, lint, check, check:src, check:src:browser, format, format:check, lint:check, test, test:src, test:src:browser, test:policy, test:config, test:guides, build, build:src, build:src:browser, prepublishOnly, test:distribution, test:probe, test:bench, prepack, test:setup.
- Environments present: src/browser.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/indexeddb/guides/indexeddb.md`; index: `/home/user/fleet/indexeddb/guides/README.md`; tests: `/home/user/fleet/indexeddb/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 16; `should` in src and the package's own prose: 0; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 3 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **indexeddb-c1** — `open` is a state boolean on `IndexedDBDatabaseInterface` and the verb on the store manager; `context.stores.open(name)` beside `transaction.store(name)` returns one interface under two verbs; the database's list behind `stores.names`. (fix/units/indexeddb-audit-verdict.md:28) — lane: subjective
2. **indexeddb-c2** — The guide's 'Explicit transaction control and cursor movement' fence still names its scope callback parameter `tx` (an abbreviation § Rejected naming bans) after the s16-11 repair renamed the interface signatures. (fix/units/indexeddb-report.md:104) — lane: subjective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
