# Conformance audit — agent

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/agent`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/agent` 0.0.19; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, format, format:check, lint:check, test, test:src, test:src:core, test:policy, test:config, test:guides, build, build:src, build:src:core, prepack, prepublishOnly, test:distribution, test:probe, test:bench, test:setup.
- Environments present: src/core.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/abort ^0.0.8, @orkestrel/budget ^0.0.8, @orkestrel/contract ^0.0.15, @orkestrel/database ^0.0.12, @orkestrel/emitter ^0.0.8, @orkestrel/queue ^0.0.11, @orkestrel/timeout ^0.0.8, @orkestrel/tool ^0.0.12, @orkestrel/workflow ^0.0.16, @orkestrel/workspace ^0.0.6.
- Declared `@orkestrel/*` peer dependencies: none.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/scaffold ^0.0.59, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/agent/guides/agent.md`; index: `/home/user/fleet/agent/guides/README.md`; tests: `/home/user/fleet/agent/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 54; `should` in src and the package's own prose: 0; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 2 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **agent-c1** — `InstructionInterface.format` is a string beside the object-shaped manager members; a successor row for the per-item level. (fix/units/agent-audit-verdict.md:30) — lane: subjective
2. **agent-c2** — The seeded `RunOutcome` in `#pump` is a masked-not-surfaced guard recorded for a future drive change. (fix/units/agent-audit-verdict.md:29) — lane: objective
3. **agent-c3** — `guides/agent.md` names `consume` as a method reference; the `AgentEventMap` Types row gained `exhaust` while the row was rewritten — confirm the guide matches the shipped map. (fix/units/agent-audit-verdict.md:43) — lane: subjective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
