# Conformance audit — mcp

Read `/home/user/scaffold/tmp/units/conform/brief.md` first; this file adds the package's facts and its carry rows.

## Package facts

- Repository: `/home/user/fleet/mcp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean.
- Manifest: `@orkestrel/mcp` 0.0.27; scripts: clean, copy, scaffold, lint, check, check:src, check:src:core, check:src:browser, check:src:server, format, format:check, lint:check, test, test:src, test:src:core, test:src:browser, test:src:server, test:policy, test:config, test:conformance, test:distribution, test:probe, test:guides, test:integration, build, build:src, build:src:core, build:src:browser, build:src:server, prepack, prepublishOnly, test:bench, test:setup.
- Environments present: src/core, src/browser, src/server.
- Declared `@orkestrel/*` runtime dependencies: @orkestrel/codec ^0.0.1, @orkestrel/contract ^0.0.15, @orkestrel/emitter ^0.0.8, @orkestrel/process ^0.0.9, @orkestrel/sse ^0.0.5, @orkestrel/tool ^0.0.12, @orkestrel/websocket ^0.0.10.
- Declared `@orkestrel/*` peer dependencies: @orkestrel/router ^0.0.12, @orkestrel/server ^0.0.17.
- Declared `@orkestrel/*` development dependencies: @orkestrel/guide ^0.0.15, @orkestrel/probe ^0.0.11, @orkestrel/router ^0.0.12, @orkestrel/scaffold ^0.0.59, @orkestrel/server ^0.0.17, @orkestrel/test ^0.0.11.
- Guide: `/home/user/fleet/mcp/guides/mcp.md`; index: `/home/user/fleet/mcp/guides/README.md`; tests: `/home/user/fleet/mcp/tests/`.
- Measured 2026-09-02 by the Orchestrator's grep (a text sweep, coverage limited to the pattern): `AGENTS §` citations across src, tests, guide, index, and README: 0; `should` in src and the package's own prose: 15; `.skip(`/`.todo(`/`.only(`/`skipIf` sites under tests: 3 (the vendored `tests/policy.test.ts` and `tests/config.test.ts` account for a baseline you read before ruling); `@ts-` directives: 0; `/tmp` literals in src: 0. Read each population before ruling; the number is a bound, not a finding.

## Carry rows (claim C)

Each row is an item the campaign record left open against this package. Rule each one as the shared
brief's claim C requires, by the lane the row names (an unnamed row is the objective lane's).

1. **mcp-c1** — Publish `createHTTPClientTransport` once from core and drop the two face delegates; `createScopeMessageListener` returns a function and sits in `factories.ts`; `MCPSessionOptions` and `MCPSessionMiddlewareOptions` share `ttl` and `capacity` with different meanings (group the entity's knobs under a `session` key); the bare `ScopeInterface` beside `cacheScope`. (fix/units/mcp-audit-verdict.md:47) — lane: subjective
2. **mcp-c2** — `tests/src/core/MCPLegacyClientTransport.test.ts:397` carries a 20 ms race that loses under full-suite load; rule it against `.claude/rules/tests.md` § Delay (wait for a named condition, never a fixed delay). (registry.md:171) — lane: objective
3. **mcp-c3** — The four wire headers left the server face with no fleet consumer; rule under the barrel law. (fix/units/mcp-audit-verdict.md:52) — lane: objective

## Successor context

The campaign's earlier audit of this package (the src-audit slices, the fix round, the breaking
unit, and the voice unit) landed on the tree you read. Everything those rounds closed is closed;
attack what they did not name, and attack their own rulings where the tree still shows the class
they repaired.
