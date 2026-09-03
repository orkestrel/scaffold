# Conformance audit — program

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/program`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/program` 0.0.11; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, format, format:check, lint:check, test, test:src, test:src:core, test:policy, test:config, test:guides, build, build:src, build:src:core, prepack, prepublishOnly, test:distribution, test:probe, test:bench, test:setup.
- Environments present: src/core.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/qualifier ^0.0.12, @orkestrel/rater ^0.0.12, @orkestrel/reason ^0.0.8.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/program/guides/program.md`; index: `/home/user/fleet/program/guides/README.md`; tests: `/home/user/fleet/program/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 14; `should` in src and the package's own prose: 0; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **program-c1** — A uniform error surface wrapping the raw `DataCloneError` with `ProgramError('DEFINITION')`; the `buildNotice` / `buildNotices` pair (the plural returns `Determination[]`). (fix/units/program-audit-verdict.md:27) — lane: subjective
2. **program-c2** — Tally drift: `size` where `count` is the lone unambiguous tally (`.claude/rules/names.md` § Tallies). (fix/breaking-plan.md:165) — lane: subjective
3. **program-c3** — Two verbs for one guard operation (`Checks whether` at `errors.ts:44` beside `Determines whether` on the sibling guards). (voice/units/voice-program-audit-verdict.md:36) — lane: subjective
4. **program-c4** — `Program` and `ProgramManager` carry a class summary only; public methods carry no TSDoc on the class or on `ProgramInterface`. (voice/units/voice-program-audit-verdict.md:48) — lane: subjective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
